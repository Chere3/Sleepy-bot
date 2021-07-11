import { Collection } from 'discord.js'
import { BaseCommand } from '../Util/Classes/BaseCommand'
import Captain from 'captainjs'
import { MessageActionRow, MessageButton, MessageComponentTypes, MessageMenu } from 'discord-buttons'

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, BaseCommand>
        verification: Object
    }

    interface Channel {
        send(
            content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions,
          ): Promise<Message>;
          send(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
          send(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
          send(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
          send(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
          send(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
          awaitMessages(filter: CollectorFilter, options?: AwaitMessagesOptions): Promise<Collection<Snowflake, Message>>;
          
    }
}


declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string
            MONGO_URI: string
        }

        interface Global {
            prettyConsole: Captain.Console
        }
    }
}