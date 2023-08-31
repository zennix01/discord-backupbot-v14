const { Client , Partials , ActivityType,WebhookClient, EmbedBuilder, OAuth2Scopes, GatewayIntentBits, AuditLogEvent, Events, Collection, ChannelType, PermissionFlagsBits } = require('discord.js')
let zxayar = require('./zxconfig');
const { readdir } = require('fs');
const {joinVoiceChannel} = require('@discordjs/voice')

const zennix = global.client = new Client({
    intents:[GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.MessageContent],
      scopes:[
      OAuth2Scopes.Bot,
      OAuth2Scopes.ApplicationsCommands
    ],partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction,
      Partials.User,
      Partials.GuildMember,
      Partials.ThreadMember,
      Partials.GuildScheduledEvent
    ],
      presence: {
        activities: [{
          name: zxayar && zxayar.presence.length > 0 ? zxayar.presence : "@zennix01",
          type: ActivityType.Streaming,
          url:"https://www.twitch.tv/"
        }],
        status: 'dnd'
      }
    });
    const { YamlDatabase } = require('five.db');
    const db = global.db = new YamlDatabase();

zennix.on(Events.ClientReady,async () => {
    let channel = zennix.guilds.cache.get(zxayar.sunucuıd).channels.cache.get(zxayar.botseskanali)
    joinVoiceChannel({channelId: channel.id,guildId: channel.guild.id,adapterCreator: channel.guild.voiceAdapterCreator,group: zennix.user.id,
    selfDeaf:true,selfMute:true
              });
            })


const webHook = new WebhookClient({ url: zxayar.webhookurl });
async function kanalsend(message, entry) {
let zxembed = new EmbedBuilder()
.setColor("#2f3136")
.setDescription(`${message}`)
return webHook.send({ embeds: [zxembed] }).catch(err => {
console.err("Webhook Gönderilemedi!")
    })
}

const komutlar = zennix.komutlar = new Collection();
const aliases = zennix.aliases = new Collection();
readdir("./komutlar/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
let zxprop = require(`./komutlar/${f}`);
console.log(`[KOMUTLAR] ${zxprop.name} Yüklendi!`);
komutlar.set(zxprop.name, zxprop);
zxprop.aliases.forEach(alias => { aliases.set(alias, zxprop.name); });
            
        });
  
});
  
zennix.login(zxayar.token).then(() => 
console.log('\x1b[32m%s\x1b[0m',` ${zennix.user.tag} Başarıyla Giriş Yaptı!`)).catch((err) => console.log(`Bot Giriş Yapamadı / Sebep: ${err}`));


zennix.on(Events.MessageCreate, async (message) => {
if (zxayar.prefix && !message.content.startsWith(zxayar.prefix)) return;
const args = message.content.slice(1).trim().split(/ +/g);
const komutlar = args.shift().toLowerCase();
const cmd = zennix.komutlar.get(komutlar) || [...zennix.komutlar.values()].find((e) => e.aliases && e.aliases.includes(komutlar));
 const zxembed = new EmbedBuilder().setColor(`#2f3136`)
.setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }) })
.setFooter({ text: zxayar && zxayar.presence.length > 0 ? zxayar.presence : "Zx Was Here", iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }) })
if (cmd) {cmd.execute(zennix, message, args, zxembed);}})

setInterval(async () => {
if(zxayar.backupsystem){
let guild = zennix.guilds.cache.get(zxayar.sunucuıd);
 console.log(`[BACKUP] Sunucu Yedeği Alınıyor! `)
 kanalsend(`**[BACKUP] Sunucu Yedeği Alınıyor!** Tarih: <t:${Math.floor(Date.now() / 1000)}:f>`)
await roleBackUp(guild,zxayar.sunucuıd)
await channelBackUp(guild,zxayar.sunucuıd)
    }
}, 60000)/// 1 SAAT
//600000 * 6 = 1 saat


async function roleBackUp(guild, guildID) {
    if (db.includes("rolbackup-")) {
db.all().filter(x => x.ID.includes("rolbackup-")).forEach(x => {
db.delete(x.ID)
        })}
  
    
guild.roles.cache.forEach(async role => {
let rolperm = [];
await guild.channels.cache.filter(zx =>
zx.permissionOverwrites.cache.has(role.id)).forEach(zx => {
let kanalperm = zx.permissionOverwrites.cache.get(role.id);
rolperm.push({ id: zx.id, allow: kanalperm.allow.toArray(), deny: kanalperm.deny.toArray() });
            });
db.set(`rolbackup-${guildID}_${role.id}`,
            {
                roleID: role.id,
                name: role.name,
                color: role.hexColor,
                hoist: role.hoist,
                position: role.position,
                permissions: role.permissions.bitfield.toString(),
                mentionable: role.mentionable,
                members: role.members.map(m => m.id),
                writes: rolperm
            })
    });
console.log(`[BACKUP] Rollerin Verileri Başarıyla Yedeklendi!`)
kanalsend(`**[BACKUP] Sunucunun Rol Yedeği Başarıyla Alınıyor!**`)
};

async function channelBackUp(guild, guildID) {
if (db.all().includes("kanalbackup-")) {
db.all().filter(data => data.ID.includes("kanalbackup-")).forEach(data => {
db.delete(data.ID)
        })
    }
if (guild) {
    const channels = [...guild.channels.cache.values()];
    for (let index = 0; index < channels.length; index++) {
    const kanal = channels[index];
    let kanalPerms = [];
    kanal.permissionOverwrites.cache.forEach(ZX => {
    kanalPerms.push({ id: ZX.id, type: ZX.type, allow: `${ZX.allow.bitfield}`, deny: `${ZX.deny.bitfield}` });
            });
if (kanal.type == 4) { 
db.set(`kanalbackup-${guildID}_${kanal.id}`,
    {
        type: kanal.type,
        channelID: kanal.id,
        name: kanal.name,
        position: kanal.position,
        writes: kanalPerms
                    })
}
if ((kanal.type == 0) || (kanal.type == 5)) {
db.set(`kanalbackup-${guildID}_${kanal.id}`,
    {
        type: kanal.type,
        channelID: kanal.id,
        name: kanal.name,
        nsfw: kanal.nsfw,
        parentID: kanal.parentId,
        position: kanal.position,
        rateLimit: kanal.rateLimitPerUser,
        writes: kanalPerms
})}
if (kanal.type == 2) {
db.set(`kanalbackup-${guildID}_${kanal.id}`,
    {
        type: kanal.type,
        channelID: kanal.id,
        name: kanal.name,
        bitrate: kanal.bitrate,
        userLimit: kanal.userLimit,
        parentID: kanal.parentId,
        position: kanal.position,
        writes: kanalPerms
                    })
}}
console.log(`[BACKUP] Kanal Verileri Başarıyla Yedeklendi!`);
kanalsend(`**[BACKUP] Kanal Verileri Başarıyla Yedeklendi!**`);
}}


