module.exports = {
    data: {
        name: "테스트",
        command: "test",
    },
    async execute(message: any) {
        const command = message.content.split(" ");
        command.shift();
        command.shift();
        await message.reply(`=admin test ${command}`);
    },
};
