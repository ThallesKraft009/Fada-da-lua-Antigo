const { Schema, model } = require("mongoose");

const userset = new Schema({
  shard: { type: String },
  userID: { type: String }
  
});


module.exports = model("Bot-Canary", userset);
