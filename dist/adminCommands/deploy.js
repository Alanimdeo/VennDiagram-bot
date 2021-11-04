"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    data: {
        name: "설치",
        command: "deploy",
    },
    execute(message, commands) {
        return __awaiter(this, void 0, void 0, function* () {
            const guildCommands = [];
            yield commands.map((command) => guildCommands.push(command.data.toJSON()));
            yield message.guild.commands.set(guildCommands);
            yield message.reply(`Complete! Commands(${guildCommands.length}): ` +
                guildCommands
                    .map((command) => command.name)
                    .toString()
                    .replace(/,/g, ", "));
        });
    },
};
