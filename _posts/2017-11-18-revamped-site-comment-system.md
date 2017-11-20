---
layout: post
type: post
title: Revamped Site Comment System
description: 
title-img: staticman_banner.png
title-img-caption: Bringing user-generated contents to static sites! Wait! Does that mean that the site is now dynamic!?
category: siteupdate
tags: [ 'siteupdate', 'staticman', 'disqus', 'commentsystem' ]
comments-enabled: true
---

While this site originally relied on Disqus for its commenting system, I have decided to entirely replace that dependency with a system that is more design-customizable. Disqus has more features, indeed, allowing me to have avatars for the commenters in a painless way, for example. All that, if the reader opens up an account of Disqus. Given my targetted audience, who are mostly those that I know in reality, that is likely a big turn off for them to communicate with me here if they do not have such an account.

That said, the main reason for replacing Disqus is to get full control over user-generated contents, which for now is mainly comments on the site. With Disqus, contents are ther difficult or impossible to control, not to mention that they actually do not live in the site but on Disqus, and one may find the discussion from simply obtaining a Disqus link, which brings you to a page on Disqus instead of the site it "serves".

As a smaller push factor, there is little to no control over the UI of the commenting system with Disqus, making it rather difficult for me to have full control over the design of my site. For those who are privacy-centric, Disqus itself has at least 3 different trackers, from Facebook, Twitter, and Google Analytics, and I have been trying to remove as much of these trackers as I can find from the site. Disqus is also cumbersome to load, particularly for those who have sluggish connections.

---

### Meeting Staticman

I came across [Staticman](https://staticman.net/) quite some time ago and really liked the idea of finally able to allow user-generated content to be added to a static site. It greatly relies on the git workflow, such that every user-generated content is sent to the site developer as a pull request. The developer can then decide on whether to further "moderate" the content, or allow Staticman to immediately push the change to the repository so that the site can be rebuilt and almost immediately re-delivered to the user. The latter simply relies on how fast can the static site generator rebuild the site before the user gets redirected to the page.

While I have yet to implement it, it is possible to create threaded replies, thus making it theoretically possible to create a forum on Github Pages. But of course, to do that, it is best that one has his or her own server to dedicatedly serve Staticman and rebuild the static page instead of relying on Github to build the site, which is a queued process. I think that starts to blur the line between static and dynamic sites, which is rather exciting to think about for me.

Another exciting thing to know about is how we can easily support markdown in the comments since the site is built with Jekyll on Github Pages, which uses kramdown. Since I have MathJax added to the site, I will leave a comment below to see if we can get LaTeX to parse in the comments. And with that, we will have Staticman living wonderfully in our little ecosystem.

---

### Other Updates

With Staticman introduced into the mini-system, I have also cleaned up a lot of the names of my files and directories, making it much easier to rely on Liquid to parse the syntax and build the site programmatically.

And as my main CSS file starts growing bigger, I have started to reorganize my rule sets, and start identifying them and their role.

{% include image.html src="reorganizing_css.png" caption="That is not an organization that you see in CSS everyday :sweat:" %}

---

### Upcoming Updates

The next plan is to perhaps start modularizing my CSS files, so that it makes it much easier to maintain and refactor the code base. I have also just realized that CSS now supports variables natively, which means that I may start using that instead of the variables in scss/sass. Of course, it is not always optimal to use `@import` in CSS, but I find it a good way to help me modularize my code. This means that I may start using more JS tools, such as Grunt.

Speaking of JS tools, perhaps the plan that follows after restructuring my CSS files will be to start using npm to manage some of the libraries that I use. I have not begun using too much of nodejs, still managing my libraries (not yet frameworks) the old-fashioned way that I have adopted since almost 8 years ago. It is high time that I start learning these new fancy tools as I also start to get more familiar with command line tools.

<small>This post is written using terminal vim, with i3-gaps as tiling manager, all on an XOrg server on a Windows OS :wink: But I shall leave that in another post to talk about.</small>
