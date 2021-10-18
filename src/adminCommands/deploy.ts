import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

module.exports = {
    data: {
        name: "설치",
        command: "deploy",
    },
    async execute(message: any) {
        const commands = [];
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file: string) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: "9" }).setToken(config.token);
        try {
            await rest.put(
                Routes.applicationGuildCommands(config.appID, message.guildId),
                { body: commands }
            );

            await message.reply("Deployed!");
        } catch (error) {
            console.error(error);
        }
    },
};
