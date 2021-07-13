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
        `\`\`\`¿Por que llegaste al servidor?\`\`\``
      )
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

      amsg.edit(b)
      
      const bbbb = await this.channel.awaitMessages(filter, {
        max: 1,
        time: 60000,
      });

      if(!bbbb.size) {
        this.channel.send(
          `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
        );
        return amsg.delete();
      }

      bbbb.first().delete();

      const c = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(
        `\`\`\`¿Qué edad tienes?\`\`\``
      )
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

      amsg.edit(c)
      
      const cccc = await this.channel.awaitMessages(filter, {
        max: 1,
        time: 60000,
      });

      if(!cccc.size) {
        this.channel.send(
          `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
        );
        return amsg.delete();
      }

      cccc.first().delete();

      const d = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(
        `\`\`\`¿Como te describirías?\`\`\``
      )
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

      amsg.edit(d)
      
      const dddd = await this.channel.awaitMessages(filter, {
        max: 1,
        time: 60000,
      });

      if(!dddd.size) {
        this.channel.send(
          `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
        );
        return amsg.delete();
      }

      dddd.first().delete();

      amsg.delete();
      const schema = [aaaa.first().content, bbbb.first().content, cccc.first().content, dddd.first().content];

      return schema
  }

  async veri() {
    this.preguntas().then((pregunta: Array<string>) => {
      const mala = new MessageEmbed().setColor(0x00ad0e0e).setAuthor(`🛑 No has superado los estandares de calidad.`).setDescription(`Lo siento pero no has superado mis estandares de calidad para poder entrar al servidor. Por intentalo más tarde poniendo sb!verify`);
      pregunta.forEach(a => {
        if (a.length < 5) {
          return this.channel.send(mala).then(a => a.delete({timeout: 5000}))
        }
      })
    })
  }
}
