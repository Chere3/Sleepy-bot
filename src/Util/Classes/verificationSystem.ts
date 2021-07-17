import { MessageActionRow, MessageButton } from "discord-buttons";
import {
  Channel,
  Client,
  Guild,
  GuildMember,
  MessageEmbed,
  User,
} from "discord.js";
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

    const amsg = await this.usuario.send(a).catch(() => {
      return this.channel
        .send(
          `${this.usuario} Tienes los DMS desactivados!. Por activalos e intentalo más tarde.`
        )
        .then((a) => a.delete({ timeout: 5000 }));
    });
    this.channel.send(
      `${this.usuario} Revisa tus mensajes privados, te he enviado algunas preguntas adicionales`
    );
    const filter = (x) => {
      return x.author.id === this.usuario.id;
    };
    const aaaa = await this.usuario.dmChannel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });

    if (!aaaa.size) {
      this.usuario.send(
        `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
      );
      return amsg.delete();
    }

    const b = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(`\`\`\`¿Por que llegaste al servidor?\`\`\``)
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

    amsg.edit(b);

    const bbbb = await this.usuario.dmChannel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });

    if (!bbbb.size) {
      this.usuario.send(
        `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
      );
      return amsg.delete();
    }

    const c = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(`\`\`\`¿Qué edad tienes?\`\`\``)
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

    amsg.edit(c);

    const cccc = await this.usuario.dmChannel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });

    if (!cccc.size) {
      this.usuario.dmChannel.send(
        `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
      );
      return amsg.delete();
    }

    const d = new MessageEmbed()
      .setColor(`RED`)
      .setDescription(`\`\`\`¿Como te describirías?\`\`\``)
      .setTimestamp()
      .setFooter(`Manda un mensaje con la respuesta.`);

    amsg.edit(d);

    const dddd = await this.usuario.dmChannel.awaitMessages(filter, {
      max: 1,
      time: 60000,
    });

    if (!dddd.size) {
      this.usuario.send(
        `El tiempo para contestar ha caducado, pon el comando \`sb!verify\` para reintentar.`
      );
      return amsg.delete();
    }

    amsg.delete();
    const schema = [
      aaaa.first().content,
      bbbb.first().content,
      cccc.first().content,
      dddd.first().content,
    ];

    return schema;
  }

  async veri() {
    this.checkAccount().then((switcher: boolean) => {
      if (switcher == true) {
        this.passed().catch(() => {});
        this.Logger().catch(() => {});
      }

      if (switcher == false) {
        this.preguntas().then((pregunta: Array<string>) => {
          const mala = new MessageEmbed()
            .setColor(0x00ad0e0e)
            .setAuthor(`🛑 No has superado los estandares de calidad.`)
            .setDescription(
              `Lo siento pero no has superado mis estandares de calidad para poder entrar al servidor. Por intentalo más tarde poniendo sb!verify`
            );
          pregunta.forEach((a) => {
            if (a.length < 5) {
              return this.channel
                .send(mala)
                .then((a) => a.delete({ timeout: 5000 }));
            }

            if (a.length > 100) {
              return this.channel
                .send(mala)
                .then((a) => a.delete({ timeout: 5000 }));
            }

            nombres.forEach((a) => {
              if (this.usuario.username.includes(`${a}`)) {
                return this.channel
                  .send(mala)
                  .then((a) => a.delete({ timeout: 5000 }));
              }
            });
          });
        });
      }
    });
  }

  async passed() {
    this.usuario
      .send(
        `Bienvenido al servidor!. Pasate por ${channels.autoroles} para tener una experiencia más personalizada en el servidor.`
      )
      .catch(() => {});
    this.member.roles.add(`859902022181453825`).catch(() => {});
  }

  async checkAccount() {
    // Check all about a discord user
    this.guild.channels.cache
      .get("862050517458747442")
      .send(`${this.usuario} Estoy revisando tu cuenta, espera un momento`)
      .then((a) => a.delete({ timeout: 5000 }))
      .catch(() => {});
    const age = new TimeStamp(this.usuario.createdTimestamp).relativeNum("día");

    if (Number(age) <= 30) {
      return false;
    }

    if (this.usuario.bot == true) {
      return true;
    }

    if (this.usuario.username.length < 1) {
      return false;
    }
    this.blacklist.forEach((a) => {
      if (this.usuario.username == `${a}`) {
        return false;
      }
    });

    return true;
  }

  async Logger() {
    const si = new MessageEmbed()
      .setColor(`GREEN`)
      .setAuthor(`${this.usuario.tag} Ha pasado la verificación.`)
      .setThumbnail(this.usuario.displayAvatarURL())
      .setDescription(
        `El usuario **${
          this.usuario.tag
        }** ha pasado la verificación satisfactoriamente, ahora podrá ver todos los canales.\n\n **La cuenta fue creada:** <t:${new TimeStamp(
          `${this.usuario.createdTimestamp}`
        ).OutDecimals()}:R>`
      )
      .setTimestamp();
    this.guild.channels.cache
      .get(`865905530668187688`)
      .send(si)
      .catch(() => {});
  }

  async preguntasLogger() {
    this.preguntas().then((pregunta: Array<string>) => {
      const respuestas = new MessageEmbed()
      .setColor(`YELLOW`)
      .setDescription(`**¿Desde hace cuántos años estas en discord?**\n${pregunta[0]}\n**¿Por que llegaste al servidor?**\n${pregunta[1]}\n**¿Qué edad tienes?**\n${pregunta[2]}\n**¿Como te describirías?**\n${pregunta[3]}\n\n**Cuenta creada:**<t:${new TimeStamp(this.usuario.createdTimestamp).OutDecimals()}:R>`)
      .setAuthor(this.usuario.tag, this.usuario.displayAvatarURL())
      .setTimestamp();

      const rechazar = new MessageButton()
      .setStyle("red")
      .setID(`r_${this.usuario.id}`)
      .setLabel(`Rechazar`);

      const aceptar = new MessageButton()
      .setStyle("green")
      .setID(`a_${this.usuario.id}`)
      .setLabel(`Aceptar`);

      const b = new MessageActionRow()
      .addComponent(rechazar)
      .addComponent(aceptar);

      this.guild.channels.cache.get(`865905530668187688`).send(respuestas, {components: [b]}).catch(() => {}); 
    })
  }

  async Deny() {
    const mensaje = new MessageEmbed()
      .setColor(0xFF0000)
      .setAuthor(`🛑 Un moderador ha revisado tu solicitud.`)
      .setDescription(
        `El moderador que ha visto tu solicitud ha decidido que tus respuestas no son lo suficientemente aptas para poder entrar al servidor. Intentalo de nuevo **presionado** la reaccion de verificación`
      );
    this.usuario.send(mensaje).catch(() => {});
  }
}
