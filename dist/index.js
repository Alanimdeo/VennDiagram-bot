"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("모듈 로딩 중..");
const fs = require("fs");
const Discord = require("discord.js");
const { Player } = require("discord-music-player");
const config = require("./config.json");
console.log("모듈 로딩 완료!");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});
client.player = new Player(client, {
    leaveOnEmpty: false,
    leaveOnEnd: false,
});
client.commands = new Discord.Collection();
client.adminCommands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`명령어 불러오는 중.. (${command.data.name})`);
    client.commands.set(command.data.name, command);
    console.log(client.commands);
}
const adminCommandFiles = fs
    .readdirSync("./adminCommands")
    .filter((file) => file.endsWith(".js"));
for (const file of adminCommandFiles) {
    const command = require(`./adminCommands/${file}`);
    console.log(`관리자 명령어 불러오는 중.. (${command.data.name})`);
    client.adminCommands.set(command.data.command, command);
}
client.once("ready", () => {
    console.log(`로그인 완료! 토큰: \x1b[32m${config.token}\x1b[0m\n준비 완료!`);
});
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
        return;
    yield command.execute(interaction);
}));
client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    console.log("msg");
    if (!message.content.toLowerCase().startsWith("=admin"))
        return;
    console.log(message.content);
    console.log(message.content.split(" ")[1]);
    const command = client.adminCommands.get(message.content.split(" ")[1]);
    if (!command)
        return;
    console.log(command);
    yield command.execute(message, client.commands);
}));
console.log("Discord 서버에 로그인 중..");
client.login(config.token);
