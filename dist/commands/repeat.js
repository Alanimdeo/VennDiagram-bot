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
    data: new builders_1.SlashCommandBuilder()
        .setName("반복")
        .setDescription("곡의 반복을 설정합니다.")
        .addIntegerOption((option) => option
        .setName("설정")
        .setDescription("없음: 반복을 끕니다. 곡: 한 곡만 반복합니다. 목록: 재생 목록 전체를 반복합니다.")
        .setRequired(true)
        .addChoice("없음", 0)
        .addChoice("곡", 1)
        .addChoice("목록", 2)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (guildQueue) {
                const emoji = interaction.options.getInteger("설정") == 0 ? "arrow_right" : interaction.options.getInteger("설정") == 1 ? "repeat" : "repeat_one";
                yield interaction.editReply({
                    embeds: [
                        new discord_js_1.MessageEmbed()
                            .setColor("#008000")
                            .setTitle(`:${emoji}: 반복 ${interaction.options.getInteger("설정") == 0 ? "해제" : "설정"}됨`)
                            .setDescription(`반복이 ${interaction.options.getInteger("설정") == 0 ? "해제" : "설정"}되었습니다.${interaction.options.getInteger("설정") > 0 ? `\n현재 설정: ${interaction.options.getInteger("설정") == 1 ? "곡" : "목록"}` : ""}`),
                    ],
                });
                guildQueue.setRepeatMode(interaction.options.getInteger("설정"));
            }
            else {
                yield interaction.editReply({
                    embeds: [new discord_js_1.MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("재생 중인 음악이 없습니다.")],
                });
            }
        });
    },
};
