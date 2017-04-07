---
layout: post
section-type: post
title: Setting up LaTeX on Sublime Text
category: coding
tags: [ 'sublimetext3', 'latex', 'mactex', 'macos' ]
---

I have long developed the habit of keeping handwritten notes for my studies. Even today, I still hold onto my notes for Calculus from more than 3 years ago. But as I continue on further, it does seem more and more cumbersome to bring all of my finalized hard copies with me to wherever I move, even more so with my current nomadic lifestyle, switching between Co-op jobs and studies every term. And so I have decided to give $$\LaTeX$$ a try.

*The following is a documentation of my setup for LaTeX on Sublime Text 3, along with what I have tried as I complete my setup up till my current point. Hopefully my experience will give someone an idea as to what they might want to try if they are setting up a workspace for LaTeX.*

***

### Getting started

Since I am not familiar with the multitude of packages available for LaTeX, I installed MacTex2016 on my MacBook Pro that comes with almost all of the essentials and slowly picked off certain packages that I know that I will not need for certain. While I say that, I am still left with [MacTex](https://www.tug.org/mactex/) taking up about 4 to 5GB of space on my machine. Hopefully, as time goes by, as I keep removing unused packages, the size will shrink. It would be handy if the package manager that comes with MacTex, [TeX Live Utility](https://amaxwell.github.io/tlutility/), can recognize when was the last time a package was used.

After updating all the remaining packages (which was a lot so that took some time), I gave [TeXShop](http://pages.uoregon.edu/koch/texshop/) a try. While it is a convenient text editor for LaTeX in some respect, and I even wrote some snippets to help with my workflow, it did not make me feel comfortable and at home. However, it is still a fairly friendly editor for users new to LaTeX.

And then the spark of idea came: I wonder if I can have a set up on Sublime Text, which I have been using for quite some time? Of course, I was not the only one to have the idea, and I have come across packages on Sublime Text that works with LaTeX.

*** 

### Congifuring my workspace

Turns out that [LaTeXTools](https://github.com/SublimeText/LaTeXTools) (see the package on [packagecontrol.io](https://packagecontrol.io/packages/LaTeXTools)) does exactly everything that I needed, along with a nifty Math-Live Preview right in Sublime Text!

{% include image.html src="/img/posts/Setting-up-LaTeX-on-Sublime-Text/latex_math-live_sample.png" caption="Working sample of Math-Live Preview, featuring Riemann-ian Integration and the famous Dirichlet function." %}

In order for the Math-Live Preview to work, I needed Ghostscript. The wiki on LaTeXTools says that it should come with the full distribution of MacTex but running 'which gs' showed me no result in my Terminal. So I installed Ghostscript using Homebrew. The only thing extra to do is to point LaTeXTools to where Ghostscript is installed on my machine, which was not difficult.

Now it would be nice if I can also look at the exported PDF alongside my code while I am working and make sure that my document looks right. But instead of using Skim, the PDF Viewer recommended by the developers of LaTeXTools, I decided to go with the native Preview app. And ideally, I wish to keep the focus of the windows to remain on Sublime Text as I export my TeX file. Turns out it is rather easy to set up with the package: Under **Settings - User** for LaTeXTools in the Preferences, just putting this in the config does exactly what I want.

```json
{
	// Viewer Settings
	"viewer": "preview",
	"open_pdf_on_build": true,
	"disable_focus_hack": true
}
```

With that done, I now have the following workspace:

{% include image.html src="/img/posts/Setting-up-LaTeX-on-Sublime-Text/latex_workspace_sample.png" caption="The Workspace and a happy man" %}

***

### Workflow facilitation

The work was not done yet. To set up my .tex documents such that it exports in the format that I wish to, there are quite some headings to include, and would be pretty hefty to have to type it out all the time. This will be where Snippets come in. There is, unfortunately, no distinction between templates and snippets on Sublime, where templates is a closer representation of what I wanted, but that does not really matter as long as it delivers.

Now my ideal way of typing in LaTeX is such that I think more about the math and worry less about the syntax of the code, and thus it is important that I can quickly create environments, or write fractions and summations on the fly. Again, Snippets in Sublime Text comes to my rescue.

```xml
<snippet>
	<content><![CDATA[
\sum_{${1:Iterator}}^{${2:Upper Bound}}${3:}
]]></content>
	<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
	<tabTrigger>summ</tabTrigger>
	<!-- Optional: Set a scope to limit where the snippet will trigger -->
	<scope>text.tex.latex</scope>
</snippet>
```

With this snippet, when I am in a .tex document (the scope), and when I type the keyword 'summ' and press 'TAB', the command for the summation in LaTeX is pasted and my cursor immediately selects ${1:Iterator}. A second press on 'TAB' will send me to ${2:Upper Bound}, and a third 'TAB' will place me after the summation command. The snippet above allows my input of a summation command to sound similar to how it rolls out from my mouth:

#### "The summation from *iterator* to *upper bound* of...\"

Not sure if the scope in Snippets is not well-documented or I am just blind, but if you wish to look into what options you have (if you are trying to use the snippet in a different context), here is the [Gist](https://gist.github.com/japorized/30bc17f04fbc1494ece3b1e8dcdbc95f) of it (oohh... a random pun).

***

### Conclusion

It was fairly easy to set up this workspace and there was very little trouble that I have encountered, aside from the tiny adjustments that I wanted to add for my TeX export formatting (e.g. a little bit more spacing after each theorem or definition, which was not that well-documented, and I am using ntheorem), and my wild goose chase for trying to get templates into Sublime Text (with Sublimetmpl rather than the currently built-in Snippet).

While having LaTeX will solve the problem of having an increasingly cumbersome luggage, this does not change my personal preference of handwriting my notes. Have I made my notes more easily sharable such that others can read? Yes. Is writing my notes in LaTeX and on a digital device a more effective way of remembering what I have learnt, as compared to good ol' pencil scribbles? We shall see, and I have little faith in that.