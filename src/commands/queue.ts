const { Builder } = require("@discordjs/builders");

const { Song } = require("discord-music-player");

module.exports = {
    data: new Builder.SlashCommandBuilder()
        .setName("목록")
        .setDescription("재생 목록을 확인합니다."),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            let message = ":scroll: 재생 목록\n";
            guildQueue.songs.forEach(
                (song: typeof Song, index: number, array: Array<any>) => {
                    message += `\n\`[${String(index + 1).padStart(
                        String(array.length).length,
                        "0"
                    )}]\`: **${song.name}** \`(${song.duration})\``;
                }
            );
            message += `\n\n총 곡 수: **${guildQueue.songs.length}**곡, 재생 시간: **?**`;
            await interaction.editReply(message);
        } else {
            await interaction.editReply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":warning: 오류")
                        .setDescription("재생 목록이 없습니다."),
                ],
            });
        }
    },
};
