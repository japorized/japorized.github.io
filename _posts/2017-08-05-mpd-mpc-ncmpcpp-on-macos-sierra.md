---
layout: post
type: post
title: mpd + mpc + ncmpcpp on macOS Sierra
description: We look into how I have setup mpd, mpc and ncmpcpp in the terminal on macOS Sierra, documenting the gimmicks that I have encountered, and how I have worked around them. Hopefully this will provide the help that some Mac users are looking for.
title-img: 
title-img-caption: 
category: Coding
tags: [ 'shell', 'music', 'macos', 'mpd', 'mpc' ,'ncmpcpp', 'homebrew' ]
comments-enabled: true
---

This was a fun thing I was doing by the side and thinking it would be pretty neat to have a music player right from my terminal, with hotkeys that allow me to blaze through my playlists and library. That was definitely something that iTunes could not do, not without clicking all over the application, fumbling through your songs that has the same title and cover art but of different versions or different instruments, which I would usually append with something like (violin) or (piano) to the title, over the tiny dropdown from the search bar. To clarify, I do not dislike the iTunes app. I used it very frequently, and I use an iPhone. It is a decent app, but not particularly great.

And I have been toying with my terminal a lot more, recently. I came across the trio by just searching online, and thought I would give 'em a try.

Allow me to admit that I am not entirely familar with everything that I have done in the process (much to my chagrin), but I will try my best in explaining wherever that may be confusing.

---

### Installing the Trio
Installing [mpd](https://www.musicpd.org), [mpc](https://www.musicpd.org/clients/mpc/) and [ncmpcpp](https://rybczak.net/ncmpcpp/) are quite easy if you have any of the popular package managers. I use [Homebrew](https://brew.sh) so I will just show you through the installation process using it.
```shell
brew install mpd mpc ncmpcpp
```
mpd is the core of the trio, that reads your music directory (we will look at this later), plays your songs, keeps your playlists, etc. But it has no interface of its own, and mpd alone cannot start your music or make selections. That is where we need clients to do our bidding. mpc is a useful but basic command line interface (cli) for mpd, which should allow you to start playing music via commands. But we do not want to stop there, since we want a full interface that allows us to make playlists, select tracks, and possibly even editing tags. There are many such text-based user interface, but we will use ncmpcpp in our case here.

Before we delve deeper, for documentation sake and for you to determine if this guide is still relevant, here are the version numbers of mpd and ncmpcpp on my machine today.
```shell
bash$ mpd --version
Music Player Daemon 0.20.9
bash$ ncmpcpp -v
ncmpcpp 0.8
```

---

### Configuring mpd
We will first configure mpd, since it is the core of what we are trying to do. Note that there are two ways that you may configure mpd, either globally (which applies to the entire system, for all users) or per user. I did not go with the global route, since it requires us to set file permissions for the entire tree of which mpd will traverse, all the way down to root. I decided to avoid doing that, but if you wish to, here is a [guide](https://wiki.archlinux.org/index.php/Music_Player_Daemon) which I have referenced while setting up mpd (note that it is based on Arch Linux).

mpd automatically searches for `~/.mpd/mpd.conf` as its default configuration file on macOS. You may come across other comments saying that mpd also looks into `~/.config/mpd/mpd.conf`, but it did not for me, and repeatedly told me to locate a config file every time I run `mpd`. So I would recommend that you run `mkdir .mpd` in your home directory. If you wish to keep all your configurations in one place, like in `.config` but mpd does not search for your configuration file by itself, you can run `mpd /path/to/mpd.conf`.

You may wish to copy the configuration example that comes with your mpd installation as your config file template. It should be named as `mpdconf.example`, so you can try to use `find / -name "mpdconf.example"` to locate where it is. The below command should work for those who use Homebrew without changing their installation path. Do remember to change `mpd_version` to the current version of mpd that you are using.
```shell
cp /usr/local/Cellar/mpd/mpd_version/share/doc/mpd/mpdconf.example ~/.mpd/
```

Here are some of the most commonly-used configurations for mpd. mpd did not automatically create these files for me when I have specified them in the configuration file, so you may wish to create these files before running mpd for the first time.
```graph
# Essentials
db_file 		"~/.mpd/mpd.db"		# The music database
pid_file 		"~/.mpd/mpd.pid"	# This is where mpd stores its PID
music_directory 	"~/Music"		# mpd will scan this folder for music
playlist_directory 	"~/.mpd/playlist/"	# Where mpd stores playlists that have
						# been created in mpd
state_file 		"~/.mpd/mpd.state"	# The current state of mpd is stored here
sticker_file 		"~/.mpd/mpd.sticker"	# The sticker database

# Server-related
bind_to_address 	"localhost"		# You may change this to anything you wish,
						# like "127.0.0.1"
port 			"6600"			# The address port

# Audio hardware
audio_output {
     type		"osx"
     name		"CoreAudio"
     mixer_type		"software"
     path		"/tmp/mpd.fifo"
     format		"44100:16:2"
} 
```
I have not tampered too much with how hardware and software interact myself, so I do not really understand how the `#Audio hardware` worked out. But without it, your Mac might possibly not play any sound unless if mpd is somehow able to detect your sound hardware on its own.

That should now allow you to start mpd without any problems. Go ahead and do that by running `mpd`. We can now move on to configure ncmpcpp.

---

### Configuring ncmpcpp
By default, ncmpcpp will look for its config file from `~/.ncmpcpp/config`. So you can `mkdir .ncmpcpp` in your home directory. We will copy 2 files from the docs that come with the ncmpcpp installation, namely `config` and `bindings`, in which the latter allows us to configure keybindings for ncmpcpp. Once again, note that you should replace `ncmpcpp_version` with the version that you are using.
```shell
cp /usr/local/Cellar/ncmpcpp/ncmpcpp_version/share/doc/ncmpcpp/bindings ~/.ncmpcpp/bindings
cp /usr/local/Cellar/ncmpcpp/ncmpcpp_version/share/doc/ncmpcpp/config ~/.ncmpcpp/config
```
Here are a couple of the more important configs that you will want setup for ncmpcpp, with the locations as examples:
```graph
ncmpcpp_directory = "~/.ncmpcpp/"  		# Where ncmpcpp should locate its designated folder
lyrics_directory = "~/.ncmpcpp/Lyrics"		# Where ncmpcpp stores lyric files once downloaded
mpd_host = "localhost"				# This must match the bind_to_address config in mpd
port = "6600"					# This must match the port config in mpd
mpd_music_dir = "~/Music"			# You must add this if you wish to be able to edit
						# your music tags

# Optional
allow_for_physical_item_deletion = "no"	# This disables you from deleting music files from
						# ncmpcpp, which could be something that you will
						# never wish to do
```
Fortunately, this time, you can tell ncmpcpp where your ncmpcpp-related files are, so feel free to move `.ncmpcpp` to wherever you wish, and just specify where it is for `ncmpcpp_directory`.
And yes, ncmpcpp can look for lyrics and download them. You will have to look into that on your own since I rarely listen to songs with lyrics these days.

For first time users of ncmpcpp, it could be daunting to use ncmpcpp since you have no knowledge of how to navigate the client. To save yourself the hassle of having to scour the Internet looking for a guide, open up your `bindings` file and add in the following lines.
```graph
def_key "9"
   show_help
```
This will allow you to hit `9` on your keyboard to bring up the help page.

---

### We're done!
Not entirely, but things should work now. If you have already fired up mpd, go ahead and run `ncmpcpp`.

{% include image.html src="mpd-ncmpcpp_scrot.png" caption="My Working ncmpcpp" %}

Your UI for ncmpcpp will look rather different from what's in the screenshot. You can make these visual changes in the ncmpcpp config file. Here's the [website](http://dotshare.it/category/mpd/ncmpcpp/) that I used to get inspiration on how I have designed my own UI.

---

### Bonuses
Remember that we installed mpc? This cli is a gem if you do not want to repeatedly navigate to your ncmpcpp window. You can toggle play/pause by running `mpc toggle` and change volumes just by running commands. I made a `.command` file with `mpc toggle` as the only line so that I may use Spotlight to launch it, which is very nifty for quickly playing/pausing mpd. If you've bought the Powerpack of Alfred, you can even run your commands directly in them, I believe.

Since I don't play many songs with lyrics, and most of my songs have rather confusing or hard-to-remember names, I decided to use `terminal-notifier` to inform me of the song that is currently playing whenever the next song plays. ncmpcpp has a config named `execute_on_song_change` that allows users to run commands at every change of songs. Here's my shell script for doing that.
```shell
#!/bin/bash
IFS=$'\t' read album artist title \
  <<< "$(mpc --format="%album%\t%artist%\t%title%")"

terminal-notifier -title "$title" -subtitle "$album" -message "$artist" -appIcon ~/Pictures/Album\ Artwork/Unknown_Artist_Artwork.jpg -sender com.coppertino.VOX
```

---

### Ending
This should finish up this guide. Feel free to throw me questions and I'd be happy to help if I can.
