import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("일시정지")
        .setDescription("음악을 일시정지합니다.")
        .addNumberOption((option: any) => option.setName("시간").setDescription("일시정지할 시간을 입력하세요. (초)")),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(interaction.guildId);
        console.log(guildQueue);
        if (!guildQueue) {
            await interaction.editReply({
                embeds: [new MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("재생 중인 음악이 없습니다.")],
            });
        } else {
            guildQueue.setPaused(true);
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#ffff00")
                        .setTitle(":pause_button: 일시정지")
                        .setDescription(
                            `현재 재생 중인 [${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url})을(를) ${
                                interaction.options.getNumber("시간") ? `${interaction.options.getNumber("시간")}초 동안 ` : ""
                            }일시정지했습니다.\n\`/재생\` 명령어를 사용하여 다시 재생할 수 있습니다.`
                        ),
                ],
            });
            if (interaction.options.getNumber("시간")) {
                await sleep(interaction.options.getNumber("시간") * 1000);
                if (guildQueue.paused == true) {
                    guildQueue.setPaused(false);
                    await interaction.followUp({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#0067a3")
                                .setTitle(":arrow_forward: 재생 중")
                                .setDescription(
                                    `[${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url}) \`(${guildQueue.nowPlaying.duration})\`을(를) 다시 재생합니다.`
                                )
                                .setThumbnail(guildQueue.nowPlaying.thumbnail),
                        ],
                    });
                }
            }
        }
    },
};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
