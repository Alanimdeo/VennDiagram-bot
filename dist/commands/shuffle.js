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
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName("셔플")
        .setDescription("곡 목록을 섞습니다."),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (guildQueue) {
                try {
                    guildQueue.shuffle();
                    yield interaction.editReply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor("#ff0000")
                                .setTitle(":twisted_rightwards_arrows: 셔플")
                                .setDescription("곡을 섞었습니다."),
                        ],
                    });
                }
                catch (err) {
                    console.error(err);
                }
            }
            else {
                yield interaction.editReply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("#ff0000")
                            .setTitle(":warning: 오류")
                            .setDescription("재생 중인 음악이 없습니다."),
                    ],
                });
            }
        });
    },
};
