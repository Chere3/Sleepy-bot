import { MessageComponent } from "discord-buttons";
import { Client } from "discord.js";
import { Verification } from "../Util/Classes/verificationSystem";

export const run = async (bot:Client, button: MessageComponent) => {
    if (button.id == "veriButton") {
        new Verification(button.clicker.user, button.guild, button.channel, button.clicker.member).veri()
    }

    if (button.id.length == 20) {
        const user = await bot.guilds.cache.get(`859574854575587350`).members.cache.get(`${button.id.slice(2)}`);
        if (button.id.startsWith("a_")) {
            new Verification(user.user, user.guild, null, user).passed()
        }
        if (button.id.startsWith("r_")) {
            new Verification(user.user, user.guild, null, user).Deny()

        }
        
    }
}