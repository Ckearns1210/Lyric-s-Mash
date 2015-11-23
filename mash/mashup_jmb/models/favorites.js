var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
  lyrics_mash: String,
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],

});
var Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
