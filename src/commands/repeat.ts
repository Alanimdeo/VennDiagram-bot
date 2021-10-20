import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("반복")
        .setDescription("곡의 반복을 설정합니다.")
        .addIntegerOption((option: any) =>
            option
                .setName("설정")
                .setDescription(
                    "없음: 반복을 끕니다. 곡: 한 곡만 반복합니다. 목록: 재생 목록 전체를 반복합니다."
                )
                .setRequired(true)
                .addChoice("없음", 0)
                .addChoice("곡", 1)
                .addChoice("목록", 2)
        ),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            const emoji =
                interaction.options.getInteger("설정") == 0
                    ? "arrow_right"
                    : interaction.options.getInteger("설정") == 1
                    ? "repeat"
                    : "repeat_one";
            await interaction.editReply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#008000")
                        .setTitle(
                            `:${emoji}: 반복 ${
                                interaction.options.getInteger("설정") == 0
                                    ? "해제"
                                    : "설정"
                            }됨`
                        )
                        .setDescription(
                            `반복이 ${
                                interaction.options.getInteger("설정") == 0
                                    ? "해제"
                                    : "설정"
                            }되었습니다.${
                                interaction.options.getInteger("설정") > 0
                                    ? `\n현재 설정: ${
                                          interaction.options.getInteger(
                                              "설정"
                                          ) == 1
                                              ? "곡"
                                              : "목록"
                                      }`
                                    : ""
                            }`
                        ),
                ],
            });
            guildQueue.setRepeatMode(interaction.options.getInteger("설정"));
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
