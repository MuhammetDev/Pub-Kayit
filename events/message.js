const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
let talkedRecently = new Set();
module.exports = async message => {
if(message.author.bot) return

  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
    setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    const emoji = ["✅"];
let koçovalı = db.fetch(`kural_${message.author.id}`);
if (koçovalı === null)
return message.channel
      .send(
        new Discord.MessageEmbed()
        .setColor('RED')
          .setDescription(` ✅ Basarak Botu Kullanabilirsni `)
          .setFooter(`Eva•Bot`)
          .setTimestamp())

.then(async function(embed) {
  const emoji = ["✅"];
  const filter = (reaction, user) =>
  emoji.includes(reaction.emoji.name) && user.id === message.author.id;
  await embed.react(emoji[0]).catch(function() {});

  var reactions = embed.createReactionCollector(filter);
  reactions.on("collect", async function(reaction) {
    if (reaction.emoji.name === "✅") {
      await embed.reactions.removeAll();
      await db.set(`kural_${message.author.id}`, "nul");
      return embed.edit(
        new Discord.MessageEmbed()
          .setDescription(`Botu Kullanbilirsin`)
      );
    }
  });
});

    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};