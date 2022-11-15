const client = require('..')


client.on("ready", async () => {

  client.MongoConnect()

  const userdb = await client.botdb.findOne({
         userID: client.user.id
     }) 

      if(!userdb){
         const newuser = new client.botdb({ userID: client.user.id })
         await newuser.save();
         
         userdb = await client.botdb.findOne({ userID: client.user.id })
     }

  let shard = Math.floor(Math.random() * 2) + 35

  await client.botdb.updateOne({
         userID: client.user.id
     }, { $set: {
         "shard": shard
     }
     })

});
