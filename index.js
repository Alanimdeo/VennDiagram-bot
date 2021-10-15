console.log("모듈 로딩 중..");
const fs = require("fs");
const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const { Player } = require("discord-music-player");

const config = require("./config.json");
console.log("모듈 로딩 완료!");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});
client.player = new Player(client, {
    leaveOnEmpty: false,
    leaveOnEnd: false,
});

client.commands = new Collection();

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`명령어 불러오는 중.. (${command.data.name})`);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log(
        `로그인 완료! 토큰: \x1b[32m${config.token}\x1b[0m\n준비 완료!`
    );
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    await command.execute(interaction);
});

console.log("Discord 서버에 로그인 중..");
client.login(config.token);
