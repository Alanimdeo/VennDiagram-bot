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
        .setName("재생")
        .setDescription("음악을 재생합니다.")
        .addStringOption((option) => option
        .setName("제목")
        .setDescription("음악 제목을 입력하세요.")
        .setRequired(false)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (interaction.options.getString("제목")) {
                let queue = interaction.client.player.createQueue(interaction.guildId);
                yield queue.join(interaction.member.voice.channel);
                let song = yield queue
                    .play(interaction.options.getString("제목"))
                    .catch(() => {
                    if (!guildQueue)
                        queue.stop();
                });
                console.log(song);
                yield interaction.editReply({
                    embeds: [
                        new discord_js_1.MessageEmbed()
                            .setColor("#008000")
                            .setTitle(":white_check_mark: 추가 완료")
                            .setDescription(`[${song.name}](${song.url}) \`(${song.duration})\`을(를) 재생 목록에 추가했습니다.`)
                            .setThumbnail(song.thumbnail),
                    ],
                });
            }
            else {
                if (guildQueue) {
                    try {
                        guildQueue.setPaused(false);
                        yield interaction.editReply({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setColor("#0067a3")
                                    .setTitle(":arrow_forward: 재생")
                                    .setDescription(`[${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url}) \`(${guildQueue.nowPlaying.duration})\`을(를) 다시 재생합니다.`)
                                    .setThumbnail(guildQueue.nowPlaying.thumbnail),
                            ],
                        });
                    }
                    catch (err) {
                        yield interaction.editReply({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setColor("#ff0000")
                                    .setTitle(":warning: 오류")
                                    .setDescription("재생할 음악이 없습니다."),
                            ],
                        });
                    }
                }
                else
                    yield interaction.editReply({
                        embeds: [
                            new discord_js_1.MessageEmbed()
                                .setColor("#ff0000")
                                .setTitle(":warning: 오류")
                                .setDescription("재생할 음악이 없습니다."),
                        ],
                    });
            }
        });
    },
};
