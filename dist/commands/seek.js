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
        .setName("이동")
        .setDescription("지정한 시간으로 이동합니다. `[시간:]분:초` 또는 `초` 형식으로 입력 가능합니다.")
        .addStringOption((option) => option
        .setName("시간")
        .setDescription("이동할 시간을 입력하세요.")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (guildQueue) {
                let seekTime = 0;
                let displayTime = "";
                if (!/^[0-9:.]+$/.test(interaction.options.getString("시간"))) {
                    yield interaction.editReply();
                }
                else if (interaction.options.getString("시간").includes(":")) {
                    var input = interaction.options.getString("시간").split(":");
                    displayTime = interaction.options.getString("시간");
                    if (input.length == 3)
                        seekTime =
                            Number(input[0]) * 3600000 +
                                Number(input[1]) * 60000 +
                                Number(input[2]) * 1000;
                    else
                        seekTime =
                            Number(input[0]) * 60000 + Number(input[1]) * 1000;
                }
                else {
                    seekTime = Number(interaction.options.getString("시간")) * 1000;
                    if (seekTime > 59999) {
                        if (seekTime > 3599999)
                            displayTime =
                                parseInt(String(seekTime / 3600000)) +
                                    ":" +
                                    parseInt(String((seekTime % 3600000) / 60000))
                                        .toString()
                                        .padStart(2, "0") +
                                    ":" +
                                    parseInt(String(((seekTime % 3600000) % 60000) / 1000))
                                        .toString()
                                        .padStart(2, "0");
                        else
                            displayTime =
                                parseInt(String(seekTime / 60000)) +
                                    ":" +
                                    parseInt(String((seekTime % 60000) / 1000))
                                        .toString()
                                        .padStart(2, "0");
                    }
                    else
                        displayTime =
                            "0:" +
                                parseInt(String(seekTime / 1000))
                                    .toString()
                                    .padStart(2, "0");
                }
                guildQueue.seek(seekTime);
                yield interaction.editReply({
                    embeds: [
                        new discord_js_1.MessageEmbed()
                            .setColor("#0067a3")
                            .setTitle(":fast_forward: 시간 이동 완료")
                            .setDescription(`재생 시간을 \`${displayTime}\`으로 이동했습니다.`),
                    ],
                });
            }
            else {
                yield interaction.editReply({
                    embeds: [
                        new discord_js_1.MessageEmbed()
                            .setColor("#ff0000")
                            .setTitle(":warning: 오류")
                            .setDescription("재생 중인 음악이 없습니다."),
                    ],
                });
            }
        });
    },
};
