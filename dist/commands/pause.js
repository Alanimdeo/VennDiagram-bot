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
        .setName("일시정지")
        .setDescription("음악을 일시정지합니다.")
        .addNumberOption((option) => option.setName("시간").setDescription("일시정지할 시간을 입력하세요. (초)")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (!guildQueue) {
                yield interaction.editReply({
                    embeds: [new discord_js_1.MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("재생 중인 음악이 없습니다.")],
                });
            }
            else {
                guildQueue.setPaused(true);
                yield interaction.editReply({
                    embeds: [
                        new discord_js_1.MessageEmbed()
                            .setColor("#ffff00")
                            .setTitle(":pause_button: 일시정지")
                            .setDescription(`현재 재생 중인 [${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url})을(를) ${interaction.options.getNumber("시간") ? `${interaction.options.getNumber("시간")}초 동안 ` : ""}일시정지했습니다.\n\`/재생\` 명령어를 사용하여 다시 재생할 수 있습니다.`),
                    ],
                });
                if (interaction.options.getNumber("시간")) {
                    yield sleep(interaction.options.getNumber("시간") * 1000);
                    if (guildQueue.paused == true) {
                        guildQueue.setPaused(false);
                        yield interaction.followUp({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setColor("#0067a3")
                                    .setTitle(":arrow_forward: 재생 중")
                                    .setDescription(`[${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url}) \`(${guildQueue.nowPlaying.duration})\`을(를) 다시 재생합니다.`)
                                    .setThumbnail(guildQueue.nowPlaying.thumbnail),
                            ],
                        });
                    }
                }
            }
        });
    },
};
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
