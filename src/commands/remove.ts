import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("삭제")
        .setDescription("재생 목록에서 곡을 삭제합니다.")
        .addIntegerOption((option: any) =>
            option
                .setName("번호")
                .setDescription("곡의 번호를 입력하세요.")
                .setRequired(true)
        ),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            await interaction.editReply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#008000")
                        .setTitle(":x: 삭제 완료")
                        .setDescription(
                            `[${
                                guildQueue.songs[
                                    interaction.options.getInteger("번호") - 1
                                ].name
                            }](${
                                guildQueue.songs[
                                    interaction.options.getInteger("번호") - 1
                                ].url
                            }) \`(${
                                guildQueue.songs[
                                    interaction.options.getInteger("번호") - 1
                                ].duration
                            })\`을 재생 목록에서 삭제했습니다.`
                        ),
                ],
            });
            guildQueue.remove(interaction.options.getInteger("번호") - 1);
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
