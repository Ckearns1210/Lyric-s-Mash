var domify = require('domify'),
    templates = require("./templates");

module.exports = render;

function render(media){
  return domify(templates[media + '.html']);
}
