import { Channel, Client, Guild, MessageEmbed, User } from "discord.js";

export class Verification {
  usuario: User;
  guild: Guild;
  channel: Channel;

  constructor(usuario: User, guild: Guild, channel) {
    this.usuario = usuario;
    this.guild = guild;
    this.channel = channel;
  }

  async preguntas() {
    const a = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(
        `\`\`\`¿Desde hace cuantos días o meses o años estas en discord?\`\`\``
      )
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

    const amsg = await this.channel.send(a);
    const filter = (x) => {
      return x.author.id === this.usuario.id;
    };
    const aaaa = await this.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });

    if (!aaaa.size) {
      this.channel.send(
        `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
      );
      return amsg.delete();
    }

    aaaa.first().delete();
    const b = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(
        `\`\`\`¿Que pretendes hacer en el servidor?\`\`\``
      )
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

      

  }
}
