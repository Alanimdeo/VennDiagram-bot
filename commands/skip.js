const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("다음")
        .setDescription("다음 곡을 바로 재생합니다."),
    async execute(interaction) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#008000")
                        .setTitle(":fast_forward: 다음 곡")
                        .setDescription(
                            `다음 곡을 재생합니다.\n다음 곡: ${
                                guildQueue.songs.length > 1
                                    ? `[${guildQueue.songs[1].name}](${guildQueue.songs[1].url}) \`(${guildQueue.songs[1].duration})\``
                                    : "없음"
                            }`
                        ),
                ],
            });
            guildQueue.skip();
        } else {
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":warning: 오류")
                        .setDescription("재생 중인 음악이 없습니다."),
                ],
            });
        }
    },
};
