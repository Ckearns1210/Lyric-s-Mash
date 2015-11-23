var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
 profile: {
   username: {
     type: String,
     required: true,
     lowercase: true
   },


 },

 data: {
   oauth: { type: String, required: true },
   favorites: [{
     lyric: {
       type: mongoose.Schema.Types.ObjectId
     },
   }]
 }

});
