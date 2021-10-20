import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("이동")
        .setDescription(
            "지정한 시간으로 이동합니다. `[시간:]분:초` 또는 `초` 형식으로 입력 가능합니다."
        )
        .addStringOption((option: any) =>
            option
                .setName("시간")
                .setDescription("이동할 시간을 입력하세요.")
                .setRequired(true)
        ),
    async execute(interaction: any) {
        await interaction.deferReply();
        let guildQueue = interaction.client.player.getQueue(
            interaction.guildId
        );
        if (guildQueue) {
            let seekTime: number = 0;
            let displayTime: string = "";
            if (!/^[0-9:.]+$/.test(interaction.options.getString("시간"))) {
                await interaction.editReply();
            } else if (interaction.options.getString("시간").includes(":")) {
                var input = interaction.options.getString("시간").split(":");
                displayTime = interaction.options.getString("시간");
                if (input.length == 3)
                    seekTime =
                        Number(input[0]) * 3600000 +
                        Number(input[1]) * 60000 +
                        Number(input[2]) * 1000;
                else
                    seekTime =
                        Number(input[0]) * 60000 + Number(input[1]) * 1000;
            } else {
                seekTime = Number(interaction.options.getString("시간")) * 1000;
                if (seekTime > 59999) {
                    if (seekTime > 3599999)
                        displayTime =
                            parseInt(String(seekTime / 3600000)) +
                            ":" +
                            parseInt(String((seekTime % 3600000) / 60000))
                                .toString()
                                .padStart(2, "0") +
                            ":" +
                            parseInt(
                                String(((seekTime % 3600000) % 60000) / 1000)
                            )
                                .toString()
                                .padStart(2, "0");
                    else
                        displayTime =
                            parseInt(String(seekTime / 60000)) +
                            ":" +
                            parseInt(String((seekTime % 60000) / 1000))
                                .toString()
                                .padStart(2, "0");
                } else
                    displayTime =
                        "0:" +
                        parseInt(String(seekTime / 1000))
                            .toString()
                            .padStart(2, "0");
            }
            guildQueue.seek(seekTime);
            await interaction.editReply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#0067a3")
                        .setTitle(":fast_forward: 시간 이동 완료")
                        .setDescription(
                            `재생 시간을 \`${displayTime}\`으로 이동했습니다.`
                        ),
                ],
            });
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
