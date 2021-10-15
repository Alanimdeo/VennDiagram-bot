const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("목록")
        .setDescription("재생 목록을 확인합니다."),
    async execute(interaction) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            let message = ":scroll: 재생 목록\n";
            guildQueue.songs.forEach((song, index, array) => {
                message += `\n\`[${String(index + 1).padStart(
                    String(array.length).length,
                    "0"
                )}]\`: **${song.name}** \`(${song.duration})\``;
            });
            message += `\n\n총 곡 수: **${guildQueue.songs.length}**곡, 재생 시간: **?**`;
            await interaction.editReply(message);
        } else {
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":warning: 오류")
                        .setDescription("재생 목록이 없습니다."),
                ],
            });
        }
    },
};
