const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("정지")
        .setDescription("재생 중인 곡을 정지합니다."),
    async execute(interaction) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#0067a3")
                        .setTitle(":stop_button: 정지")
                        .setDescription(`재생 중인 음악을 정지했습니다.`),
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
