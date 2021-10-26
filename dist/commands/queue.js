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
Object.defineProperty(exports, "__esModule", { value: true });
const { Song } = require("discord-music-player");
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
module.exports = {
    data: new builders_1.SlashCommandBuilder().setName("목록").setDescription("재생 목록을 확인합니다."),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (guildQueue) {
                let message = ":scroll: 재생 목록\n";
                guildQueue.songs.forEach((song, index, array) => {
                    message += `\n\`[${String(index + 1).padStart(String(array.length).length, "0")}]\`: **${song.name}** \`(${song.duration})\``;
                });
                message += `\n\n총 곡 수: **${guildQueue.songs.length}**곡, 재생 시간: **?**`;
                yield interaction.editReply(message);
            }
            else {
                yield interaction.editReply({
                    embeds: [new discord_js_1.MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("재생 목록이 없습니다.")],
                });
            }
        });
    },
};
