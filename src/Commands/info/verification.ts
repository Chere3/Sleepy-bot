import { MessageButton } from "discord-buttons";
import { Client, MessageEmbed } from "discord.js";
import { colors } from "../../Util/assets/colors";
import { BaseCommand } from "../../Util/CLasses/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";


export default class NameCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "verimsg",
description: "Este comando es para dar el mensaje de verificaciΓ³n",
category: "info",
aliases: ["Aliases", "Aliase2"],
nsfw: false,
dev: true,
guildOnly: true,

usage: (prefix: "sb!") => "verimsg",
example: (prefix: "prefix") => "verimsg"
      })
  }


async run(base: TempContext) {
    const embed = new MessageEmbed()
    .setTitle("π©πππππππππ π πΊπππππ π½πππππ π€")
    .setImage(`https://imgur.com/9SPtO11.gif`)
    .setColor(colors.color1)
    .setFooter(`Presiona el boton de abajo para verificarte!`);

    const button = new MessageButton()
    .setEmoji("πͺ")
    .setStyle("blurple")
    .setID("veriButton");

    base.channel.send(embed, button)
}}