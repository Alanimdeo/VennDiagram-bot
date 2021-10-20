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
        .setName("삭제")
        .setDescription("재생 목록에서 곡을 삭제합니다.")
        .addIntegerOption((option) => option
        .setName("번호")
        .setDescription("곡의 번호를 입력하세요.")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            let guildQueue = interaction.client.player.getQueue(interaction.guildId);
            if (guildQueue) {
                yield interaction.editReply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("#008000")
                            .setTitle(":x: 삭제 완료")
                            .setDescription(`[${guildQueue.songs[interaction.options.getInteger("번호") - 1].name}](${guildQueue.songs[interaction.options.getInteger("번호") - 1].url}) \`(${guildQueue.songs[interaction.options.getInteger("번호") - 1].duration})\`을 재생 목록에서 삭제했습니다.`),
                    ],
                });
                guildQueue.remove(interaction.options.getInteger("번호") - 1);
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
