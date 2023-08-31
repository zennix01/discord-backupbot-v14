const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const db = global.db;
let zxayar = require('../zxconfig');
module.exports = {
name: "kanal-kur",
aliases: ["channel-setup", "kanalkur", "kanalkurulum", "kanal-setup"],
execute: async (client, message, args) => {
    
if(message.author.id !== `${zxayar.botsahip}`)return message.reply({content:` **Komudu Kullanmak İçin Yetkin Yetersiz!**`})
   
let kanal = args[0];
let kanaldata = await db.get(`kanalbackup-${message.guild.id}_${kanal}`)

if (!kanal || isNaN(kanal)) return message.reply(`Doğru Bir ID Giriniz!\n\`${zxayar.prefix}kanal-kur <Rol ID>\``)
if (!kanaldata) return message.reply(` **Databasede \`${kanal}\` ID'ye Sahip Bir kanal Bulunamadı!**`)
    
let x = await message.reply(`Databasede \`${kanal}\` ID'ye Sahip Kanal Aranıyor Lütfen Bekleyiniz..` )
    
let type = kanaldata.type;
let newChannel;
    
    if ((type == 0) || (type == 5)) {
      newChannel = await message.guild.channels.create({
        name: kanaldata.name,
        type: kanaldata.type,
        nsfw: kanaldata.nsfw,
        parent: kanaldata.parentID,
        position: kanaldata.position + 1,
        rateLimitPerUser: kanaldata.rateLimit
      })
      x.edit(`[\`${newChannel.name}\`] Adlı Yazı Kanalı Kuruluyor ve Kanal İzinleri Ayarlanıyor!**`)
      const newOverwrite = [];
      for (let index = 0; index < kanaldata.writes.length; index++) {
        const kanalverisi = kanaldata.writes[index];
        newOverwrite.push({
          id: kanalverisi.id,
          allow: new PermissionsBitField(kanalverisi.allow).toArray(),
          deny: new PermissionsBitField(kanalverisi.deny).toArray()
        });
      }
      await newChannel.permissionOverwrites.set(newOverwrite);
      return;

    } else if (type == 2) {

      newChannel = await message.guild.channels.create({
        name: kanaldata.name,
        type: kanaldata.type,
        parent: kanaldata.parentID,
        position: kanaldata.position + 1,
        bitrate: kanaldata.bitrate,
       userLimit: kanaldata.userLimit
      })
      x.edit(`[\`${newChannel.name}\`] Adlı Ses Kanalı Kuruluyor Ve Rol İzinleri Ayarlanıyor!`)
      const newOverwrite = [];
      for (let index = 0; index < kanaldata.writes.length; index++) {
        const kanalveri = kanaldata.writes[index];
        newOverwrite.push({
          id: kanalveri.id,
          allow: new PermissionsBitField(kanalveri.allow).toArray(),
          deny: new PermissionsBitField(kanalveri.deny).toArray()
        });
      }
      await newChannel.permissionOverwrites.set(newOverwrite);
      return;

    } else if (type == 4) {

      newChannel = await message.guild.channels.create({
        name: kanaldata.name,
        type: kanaldata.type,
        position: kanaldata.position + 1,
      })
      x.edit(`[\`${newChannel.name}\`] Adlı Katagori Kanalı Kuruluyor Ve Rol İzinleri Ayarlanıyor!`)
      const newOverwrite = [];
      for (let index = 0; index < kanaldata.writes.length; index++) {
        const kanalveri = kanaldata.writes[index];
        newOverwrite.push({
          id: veri.id,
          allow: new PermissionsBitField(kanalveri.allow).toArray(),
          deny: new PermissionsBitField(kanalveri.deny).toArray()
        });
      }
      await newChannel.permissionOverwrites.set(newOverwrite);
      return;
    }else {
      x.edit(`[\`${newChannel.name}\`] Adlı Kanalı Kuramadım Kurucuma Ulaşmalısın!`)
    }
  }
}
