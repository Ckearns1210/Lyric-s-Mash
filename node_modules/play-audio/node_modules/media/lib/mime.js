var table = {
  aif  : "audio/x-aiff",
  aiff : "audio/x-aiff",
  wav  : "audio/x-wav",
  mp3  : 'audio/mpeg',
  m3u  : "audio/x-mpegurl",
  mid  : "audio/midi",
  midi : "audio/midi",
  m4a  : 'audio/m4a',
  ogg  : 'audio/ogg',
  mp4  : 'video/mp4',
  ogv  : 'video/mp4',
  webm : 'video/webm',
  mkv  : 'video/x-matroska',
  mpg  : 'video/mpeg'
};

module.exports = mimeOf;

function mimeOf(url){
  return table[ url.split('.').slice(-1)[0] ];
}
