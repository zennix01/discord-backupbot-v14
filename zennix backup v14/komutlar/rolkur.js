const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const db = global.db;
let zxayar = require('../zxconfig');
module.exports = {
name: "rol-kur",
aliases: ["rol-setup", "rolkur", "rolkurulum","role-setup"],
execute: async (client, message, args, zxembed) => {
      
if(message.author.id !== `${zxayar.botsahip}`)return message.reply(`**Komudu Kullanmak İçin Yetkin Yetersiz!**`)
       
let rol = args[0];
let roldata = await db.get(`rolebackup-${message.guild.id}_${rol}`)
        
if (!rol || isNaN(rol)) return message.reply(`Doğru Bir ID Giriniz!\n\`${zxayar.prefix}rol-kur <Rol ID>\`` )
if (!roldata) return message.reply(` **Veritabanında \`${rol}\` ID'ye Sahip Bir Rol Bulunamadı!**`)

let x = await message.reply(` **Lütfen Bekleyiniz..**`)

const newRole = await message.guild.roles.create({
            name: roldata.name,
            color: roldata.color,
            hoist: roldata.hoist,
            position: roldata.position,
            permissions: roldata.permissions,
            mentionable: roldata.mentionable,
            reason: "Zennix Rol Backup Sistemi!"
        });

setTimeout(() => {
let kanalizin = roldata.writes;
if (kanalizin) kanalizin.forEach((zx, index) => {
let channel = message.guild.channels.cache.get(zx.id);
    if (!channel) return;
        setTimeout(() => {
        let obj = {};
        zx.allow.forEach(p => {
        obj[p] = true;
                 });
        zx.deny.forEach(p => {
         obj[p] = false;
                    });
                    channel.permissionOverwrites.create(newRole, obj).catch(console.error);
                }, index * 5000);
            });
        }, 5000);


let length = roldata.members.length;
if (length <= 0) return console.log(`[${newRole.name}] Database Üzerinde Role Kayıtlı Kullanıcı Olmadığından Rol Dağıtımı İptal Edildi!`);
x.edit(`**Database Üzerinde \`${length}\` Rol'e Sahip Üye Bulundu, Rol Açıldı[\`${newRole.name}\`] Ve Dağıtılmaya Başlanıyor!**`)
let zx = roldata.members;
if (zx.length <= 0) return;
        zx.every(async id => {
let member = message.guild.members.cache.get(id);
if (!member) { console.log(`[${newRole.name}] ${id}'li Üye Sunucuda Bulunamadı!`); return true; }
await member.roles.add(newRole.id).then(e => {
console.log(`[${newRole.name}] ${member.user.tag} Üyesine Rol Verildi!`);
            }).catch(e => {
console.log(`[${newRole.name}] ${member.user.tag} Üyesine Rol Verilemedi!`);
            });
x.edit(`[\`${newRole.name}\`] Adlı Rol Başarıyla Bütün Kullanıcılara Dağıtıldı!`)
        });
      
    }
}
