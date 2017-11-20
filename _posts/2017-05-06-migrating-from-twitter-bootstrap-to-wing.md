---
layout: post
section-type: post
title: Migrating from Twitter Bootstrap to Wing
description: I have successfully converted this website from using Bootstrap to now using Wing, a CSS framework that (I believe) is less cumbersome. This blog will discuss about my reason for the migration, the kinks that I have encountered during the move, my opinion on Wing, and some reflections along the process of the migration.
title-img: 
title-img-caption: 
category: coding
tags: [ 'bootstrap', 'wingcss', 'web-loadtime-optimization', 'technical-debt' ]
comments-enabled: true
---

My interest for optimizing webpage load times in my own projects were first found when I used to have wallpaper-sized images loading in every page of my old blog when I was much younger (yes the remains are still visible). I was not aware of the problem at first, attributing the problem to my slow internet connection, until when I invited others to my blog and they too noticed the problem. It was not an immediately visible problem unless if you stayed long enough on the page to notice that the header wallpaper was a timed event that changes every few seconds. And if I remember the structure correctly, it fetches images from an array of url to display the images, i.e. I have been sending infinite requests to fetch these images when you simply are staring at a single page, perhaps not even looking at the header. My inexperience and lack of knowledge had brought upon quite the disaster (laughs).

Fast-forward to today when I'm now a little bit more experienced, have undergone basic programming education, and have come across concepts such as technical debt, the experience in programming has entirely evolved for me at a personal level. Along with my practices and studies in mathematical proofs, I am now more mindful when I code and I tend to think ahead for the code I write. In mathematics, especially when it comes to theory, we would usually look for a more generalized way to work on certain problems so that we may apply the same concepts across a wider range of problems instead of just a few problems. In the same essense, a lot of code are written in such a way that we may reuse them later on, or that it is easier and safer for us to make further improvements or new features on our current project.

The above are just my reflections after having moved to the new framework.

I did not put too much thought into why I wanted to move from Twitter Bootstrap to [Wing](http://usewing.ml). It was more of a project that I wanted to do for fun, and that I wanted to use a framework that is less cumbersome than Bootstrap. I did not put too much thought into my choice of framework either, which means that I will likely have to make another migration in the future. But then again, I do not do this professionally and it is fun to just try things out for myself.

---

### The Migration

Perhaps the largest part that I have to give a complete remake is the navigation bar, that was built very closely with Bootstrap, and had a lot more classes attached to it. Since this site is built with Jekyll, my goal is to use the very same navigation.html in my \_includes folder for both large and small screens, both of which behave very differently, without having to resort to repeating my code, or making two different navigation bars. The threshold that I use for gauging if a screen is large or small (medium screen size belongs to this category for me) is 767px. The @media element allows me to achieve just what I want.

Having moved away from actively watching web development for some time, perhaps this little problem now shows me how CSS alone can entirely change the behavior and styling of the same HTML across different screen sizes, in a more practical manner.

The overall structure of the navigation bar, HTML-wise, is very similar to the original. But in order to completely rip Bootstrap off from it, it was completely rewritten, and that gave me a really good understanding of how the navigation bar was envisioned by PannosSakkos. The CSS (actually written in SCSS) is not bad either, and I liked how we are basically coding for different HTML elements when they are actually the same. What might not have felt as nice was tying the two (screen size styles) together eventually, and double checking if the code [smells](https://en.wikipedia.org/wiki/Code_smell) right for me.

The JS was a little bit painful, especially since I had to struggle and eventually realize that $(window).width(), when used globally, is determined at loadtime instead of runtime. The lack of that knowledge lead me on a pretty wild goose chase. And another problem was with normal toggling behaviors, where most of us would generically use a binary counter to work between executing two different functions. That did not work out with the toggling of the navigation bar in small and medium screen sizes. Instead, I had to resort to checking if the menu items are already visible when the menu button is clicked instead.

```js
// This function hides the navigation bar when one of
//      the links is clicked when we have a small or medium screen
//      being used by the user
$(".menu-items a").click(function(e) {
    if ( $(window).width() <= 767 ) {
        $(".nav-items").slideUp('fast');
    }
});

// This click listener toggles the menu dropdown
// Note: I avoided using the toggling click event for two reasons:
//      1. jQuery does not support it anymore
//      2. When the dropdown is hidden by the above click event,
//         the toggling click event does not record the slideUp, and thus
//         the next click of the menu button does nothing (visually)
$(".menu-dropdown").click(function(event) {
    if ($(".nav-items").css("display") == "block") {
        $(".nav-items").slideUp('fast');
    } else {
        $(".nav-items").slideDown('fast');
    }
});
```

Not everything was working perfectly with just the above, since when the navigation menu will remain hidden when the user switches to a large screen when the menu is hidden in the small screen. And so I needed the following resize listener to force the navigation menu to reappear when switching to a large screen, given that it was hidden (otherwise, every little resize will repeatedly change the CSS property of the navigation menu).

```js
// This resize listener is important to show the .nav-items element
//      when the user resizes from a small or medium screen size to
//      a large one. Without this function, when .nav-items is hidden
//      in the small screen, it will not reappear in the large screen.
$(window).on('resize', function(event) {
    event.preventDefault();

    if ($(window).width() > 767) {
        if ( $(".nav-items").css("display") == "none" ) {
            $(".nav-items").css("display", "block");
        }
    }
});
```

---

## Opinion on Wing

With lessons learnt from remaking the navigation bar, refactoring the rest of the website to work for Wing was quite the breeze. It is important to highlight that there is _no offsetting feature in Wing_, as compared to Bootstrap. The workaround was to create empty div that wraps around the desired div, so that the three divs compose of a total of 12 columns (which is the grid system used by Wing).

Another utility that Wing does not prepare for its consumers, even though there are classes that hide elements when the user is using a phone or a tablet, is a class that hides elements when users are using large screens such as a desktop. But I guess that is likely to be left for the developer to decide for the threshold of which he or she would consider a large screen.

Perhaps one problem that I do not particularly enjoy having, or perhaps I am just not used to (or perhaps that my understanding of the grid system is wrong), is that the grid system does not actually strictly follow a 12-column grid rule. Even on the guide provided by the developer on their main website shows that you may go beyond 12 columns in a row.

{% include image.html src="wing_example_12-col-grid.gif" caption="Bug? Feature?" %}

Otherwise, it is definitely a CSS framework that one can use, of course for small projects or if one enjoys fiddling around, adding his or her own styles.

---

## Conclusion

The migration took me less than 24 hours in total, probably (I did not really time myself, and this probably says that my website is a pretty small file doesn't it?). I would say that it was a nice exercise, and of course, again, a nice look into another grid system perceived by another developer. Wing was developed alone if I am not mistaken, and by a pretty young man no less. I do appreciate its simplicity, but I have no guarantees if I would continue using it.
