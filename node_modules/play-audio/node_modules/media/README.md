## media

Lightweight Wrapper For HTML5 Media API

```js
media = require('media')

media.audio('song.mp3').autoplay()
media.video('totoro.mp4').autoplay()
```

## Install

```bash
$ npm install media
```

## Browser Compatibility

```js
media.audio(['song.mp3', 'song.ogg']).autoplay()
```

## Displaying Controls

```js
parent = document.querySelector('.my-player')
media.audio(['song.mp3', 'song.ogg'], parent).autoplay.controls()
```

## API

Example:

```js
media.audio('foo.mp3').volume(0.3).controls().loop().on('ended', function(){
  console.log('End of the song reached')
})
```

Reference:

* media(type, uri, parentElement)
* .controls
* .currentTime
* .element
* .loop
* .muted
* .on(event, function)
* .pause
* .play
* .preload
* .src(url)
* .volume(number)

## Events

* abort
* durationchange
* ended
* error
* pause
* play
* progress
* timeupdate

[See complete reference](http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#mediaevents)
