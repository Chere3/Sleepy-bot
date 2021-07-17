import { MessageComponent } from "discord-buttons";
import { Client } from "discord.js";
import { Verification } from "../Util/Classes/verificationSystem";

export const run = async (bot:Client, button: MessageComponent) => {
    if (button.id == "veriButton") {
        new Verification(button.clicker.user, button.guild, button.channel, button.clicker.member).veri()
    }
}