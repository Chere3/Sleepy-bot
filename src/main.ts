import { Collection, Client } from "discord.js"
import { config } from './config'
import { handlers } from './Util/Functions/handlers'
import Captain from 'captainjs'
import login from './Database/login'
import './Typings'
import { Verification } from "./Util/Classes/verificationSystem"
import { TimeStamp } from "./Util/Classes/time"

global.prettyConsole = new Captain.Console({
    "use_colors": true,
    "debug": false,
    "format": "§8[§d%time%§8] [%prefix%§8] §7%message%",
    "log_prefix": "§aLog",
    "warn_prefix": "§eWarn",
    "error_prefix": "§cError",
    "info_prefix": "§bInfo",
    "debug_prefix": "§bDebug"
});

const TempoClient = new Client({partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"], disableMentions: "everyone", fetchAllMembers: true})

require("discord-buttons")(TempoClient);

TempoClient.verification = Verification

TempoClient.commands = new Collection();
TempoClient.time = TimeStamp;
handlers(TempoClient)

login.then(() => { global.prettyConsole.log(`Se ha conectado a la database satisfactoriamente.`) })

TempoClient.login(config.auth.token)