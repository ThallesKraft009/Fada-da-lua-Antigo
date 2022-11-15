module.exports = {
  run: async (client) => {

const mongoose = require("mongoose");

const giveawaySchema = new mongoose.Schema(
    {
        messageId: String,
        channelId: String,
        guildId: String,
        startAt: Number,
        endAt: Number,
        ended: Boolean,
        winnerCount: Number,
        prize: String,
        messages: {
            giveaway: String,
            giveawayEnded: String,
            title: String,
            inviteToParticipate: String,
            drawing: String,
            dropMessage: String,
            winMessage: mongoose.Mixed,
            embedFooter: mongoose.Mixed,
            noWinner: String,
            winners: String,
            endedAt: String,
            hostedBy: String
        },
        thumbnail: String,
        image: String,
        hostedBy: String,
        winnerIds: { type: [String], default: undefined },
        reaction: mongoose.Mixed,
        botsCanWin: Boolean,
        embedColor: mongoose.Mixed,
        embedColorEnd: mongoose.Mixed,
        exemptPermissions: { type: [], default: undefined },
        exemptMembers: String,
        bonusEntries: String,
        extraData: mongoose.Mixed,
        lastChance: {
            enabled: Boolean,
            content: String,
            threshold: Number,
            embedColor: mongoose.Mixed
        },
        pauseOptions: {
            isPaused: Boolean,
            content: String,
            unPauseAfter: Number,
            embedColor: mongoose.Mixed,
            durationAfterPause: Number,
            infiniteDurationText: String
        },
        isDrop: Boolean,
        allowedMentions: {
            parse: { type: [String], default: undefined },
            users: { type: [String], default: undefined },
            roles: { type: [String], default: undefined }
        }
    },
    { id: false }
);


const giveawayModel = mongoose.model('giveaways', giveawaySchema);



const { GiveawaysManager, BonusEntry } = require('discord-giveaways');



const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways() {
        
        return await giveawayModel.find().lean().exec();
    }


    async saveGiveaway(messageId, giveawayData) {
        
        await giveawayModel.create(giveawayData);

        return true;
    }

    
    async editGiveaway(messageId, giveawayData) {
        
      
        await giveawayModel.updateOne({ messageId }, giveawayData).exec();
        return true;
    }

    
    async deleteGiveaway(messageId) {
        
        await giveawayModel.deleteOne({ messageId }).exec();
        
        return true;
    }
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉",
        lastChance: {
            enabled: false,
            content: '⚠️ **ÚLTIMA CHANCE DE ENTRAR !** ⚠️',
            threshold: 5000,
            embedColor: '#FF0000',
           
        },
      bonusEntries: [
        {
            
            bonus: (member, giveaway) =>
              (member.roles.cache.some((r) => r.name === `Ativo💬`) ? 2 : null),
            cumulative: false
        },{
          bonus: (member, giveaway) =>
          (member.roles.cache.some((r) => r.name === `Papudo🎷`) ? 3 : null),
            cumulative: false
        },{
          bonus: (member, giveaway) =>
          (member.roles.cache.some((r) => r.name === `Popular👑`) ? 4 : null),
            cumulative: false
        },{
  bonus: (member, giveaway) =>
          (member.roles.cache.some((r) => r.name === `👁‍🗨👅👁�1�7�🗨💬`) ? 5 : null),
            cumulative: false        
        },{
          bonus: (member, giveaway) =>
          (member.roles.cache.some((r) => r.name === `👅Línguarudo👅`) ? 6 : null),
            cumulative: false        
        },{
          bonus: (member, giveaway) =>
          (member.roles.cache.some((r) => r.name === `📡alguém por favor pare esta criança🖐`) ? 7 : null),
            cumulative: false
        }
    ]
    }
});


client.giveawaysManager = manager;
      


  }
}
