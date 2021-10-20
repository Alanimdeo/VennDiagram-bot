import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("셔플")
        .setDescription("곡 목록을 섞습니다."),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            try {
                guildQueue.shuffle();
                await interaction.editReply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("#ff0000")
                            .setTitle(":twisted_rightwards_arrows: 셔플")
                            .setDescription("곡을 섞었습니다."),
                    ],
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            await interaction.editReply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":warning: 오류")
                        .setDescription("재생 중인 음악이 없습니다."),
                ],
            });
        }
    },
};
