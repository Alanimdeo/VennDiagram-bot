import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("재생")
        .setDescription("음악을 재생합니다.")
        .addStringOption((option: any) => option.setName("제목").setDescription("음악 제목을 입력하세요.").setRequired(false)),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(interaction.guildId);
        if (interaction.options.getString("제목")) {
            let queue = interaction.client.player.createQueue(interaction.guildId);
            await queue.join(interaction.member.voice.channel);
            let song = await queue.play(interaction.options.getString("제목")).catch(() => {
                if (!guildQueue) queue.stop();
            });
            console.log(song);
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#008000")
                        .setTitle(":white_check_mark: 추가 완료")
                        .setDescription(`[${song.name}](${song.url}) \`(${song.duration})\`을(를) 재생 목록에 추가했습니다.`)
                        .setThumbnail(song.thumbnail),
                ],
            });
        } else {
            if (guildQueue) {
                try {
                    guildQueue.setPaused(false);
                    await interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#0067a3")
                                .setTitle(":arrow_forward: 재생")
                                .setDescription(
                                    `[${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url}) \`(${guildQueue.nowPlaying.duration})\`을(를) 다시 재생합니다.`
                                )
                                .setThumbnail(guildQueue.nowPlaying.thumbnail),
                        ],
                    });
                } catch (err) {
                    await interaction.editReply({
                        embeds: [new MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("재생할 음악이 없습니다.")],
                    });
                }
            } else
                await interaction.editReply({
                    embeds: [new MessageEmbed().setColor("#ff0000").setTitle(":warning: 오류").setDescription("재생할 음악이 없습니다.")],
                });
        }
    },
};
