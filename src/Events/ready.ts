import { Client } from "discord.js"

export const run = async (bot: Client) => {
    const statuses = [
        `SEXO`,
        `VER SEXO`, 
        `PRUEBAS`,
        `SLASH COMMANDS 😳`
    ], status = statuses[Math.floor(Math.random() * statuses.length)]

    const types = [
        `WATCHING`,
        `PLAYING`, 
        `COMPETING`,
        `CUSTOM_STATUS`,
        `LISTENING`
    ], type = types[Math.floor(Math.random() * types.length)];

    const activity = [
        `dnd`, 
        `idle`,
        `online`
    ], estado = activity[Math.floor(Math.random() * statuses.length)];



    setInterval(() => {
        bot.user.setPresence({ status: estado, activity: { name: status, type: `${type}` } })
    }, 10000)

}