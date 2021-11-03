import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName("퇴장").setDescription("봇을 채널에서 퇴장시킵니다."),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(interaction.guildId);
        if (guildQueue) {
            await guildQueue.leave();
            await interaction.editReply({
                embeds: [new MessageEmbed().setColor("#008000").setTitle(":white_check_mark: 완료").setDescription("봇을 퇴장시켰습니다.")],
            });
        } else {
            await interaction.editReply({
                embeds: [new MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("참가한 채널이 없습니다.")],
            });
        }
    },
};
