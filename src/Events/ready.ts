import { Client } from "discord.js"

export const run = async (bot: Client) => {
    const statuses = [
        `SEXO`,
        `VER SEXO`, 
        `PRUEBAS`,
        `SLASH COMMANDS 😳`
    ], status = statuses[Math.floor(Math.random() * statuses.length)]



    setInterval(() => {
        bot.user.setPresence({ status: "dnd", activity: { name: status, type: "WATCHING" } })
    }, 10000)

}