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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
module.exports = {
    data: new builders_1.SlashCommandBuilder().setName("다음").setDescription("다음 곡을 바로 재생합니다."),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (guildQueue) {
                yield interaction.editReply({
                    embeds: [
                        new discord_js_1.MessageEmbed()
                            .setColor("#008000")
                            .setTitle(":fast_forward: 다음 곡")
                            .setDescription(`다음 곡을 재생합니다.\n다음 곡: ${guildQueue.songs.length > 1
                            ? `[${guildQueue.songs[1].name}](${guildQueue.songs[1].url}) \`(${guildQueue.songs[1].duration})\``
                            : "없음"}`),
                    ],
                });
                guildQueue.skip();
            }
            else {
                yield interaction.editReply({
                    embeds: [new discord_js_1.MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("재생 중인 음악이 없습니다.")],
                });
            }
        });
    },
};
