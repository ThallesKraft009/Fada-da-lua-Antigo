const { Schema, model } = require("mongoose");

const tudo = new Schema({
  id: { type: String },
  
  kaede: {
    ping: { type: String, default: "0" },
    users: { type: String, default: "0" },
    servers: { type: String, default: "0" }
  }
});


module.exports = model("conexao", tudo);
