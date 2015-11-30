module.exports = require('./lib/player');
module.exports.audio = media('audio');
module.exports.video = media('video');

function media (kind) {
  return function (urls, dom) {
    return module.exports(kind, urls, dom);
  };
}
