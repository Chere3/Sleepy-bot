import { Channel, Client, Guild, GuildMember, MessageEmbed, User } from "discord.js";
import { nombres } from "../assets/blacklist";
import { channels } from "../assets/channels";
import { TimeStamp } from "./time";

export class Verification {
  usuario: User;
  guild: Guild;
  channel: Channel;
  member: GuildMember;
  blacklist: typeof nombres;

  constructor(usuario: User, guild: Guild, channel, member: GuildMember) {
    this.usuario = usuario;
    this.guild = guild;
    this.channel = channel;
    this.member = member;
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

        if (a.length > 100) {
          return this.channel.send(mala).then(a => a.delete({timeout: 5000}))
        }


        nombres.forEach(a => {
          if (this.usuario.username.includes(`${a}`)) {
            return this.channel.send(mala).then(a => a.delete({timeout: 5000}))
          }
        })

        return 

      })
    })
  }

  async passed() {
    this.usuario.send(`Bienvenido al servidor!. Pasate por ${channels.autoroles} para tener una experiencia más personalizada en el servidor.`).catch(() => {})
    this.member.roles.add(`859902022181453825`).catch(() => {})
  }

  async checkAccount() {
    // Check all about a discord user
    this.guild.channels.cache.get("862050517458747442").send(`${this.usuario} Estoy revisando tu cuenta, espera un momento`).catch(() => {});
    const age = new TimeStamp(this.usuario.createdTimestamp).relativeNum("día");
    
    if (Number(age) > 30) {
      return false;
    }



    return true;
    
  }
}
