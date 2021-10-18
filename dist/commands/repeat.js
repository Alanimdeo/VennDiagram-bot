"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Builder = require("@discordjs/builders").Builder;
var Discord = __importStar(require("discord.js"));
module.exports = {
    data: new Builder.SlashCommandBuilder()
        .setName("반복")
        .setDescription("곡의 반복을 설정합니다.")
        .addIntegerOption(function (option) {
        return option
            .setName("설정")
            .setDescription("없음: 반복을 끕니다. 곡: 한 곡만 반복합니다. 목록: 재생 목록 전체를 반복합니다.")
            .setRequired(true)
            .addChoice("없음", 0)
            .addChoice("곡", 1)
            .addChoice("목록", 2);
    }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var guildQueue, emoji;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, interaction.deferReply()];
                    case 1:
                        _a.sent();
                        guildQueue = interaction.client.player.getQueue(interaction.guildId);
                        if (!guildQueue) return [3 /*break*/, 3];
                        emoji = interaction.options.getInteger("설정") == 0
                            ? "arrow_right"
                            : interaction.options.getInteger("설정") == 1
                                ? "repeat"
                                : "repeat_one";
                        return [4 /*yield*/, interaction.editReply({
                                embeds: [
                                    new Discord.MessageEmbed()
                                        .setColor("#008000")
                                        .setTitle(":" + emoji + ": \uBC18\uBCF5 " + (interaction.options.getInteger("설정") == 0
                                        ? "해제"
                                        : "설정") + "\uB428")
                                        .setDescription("\uBC18\uBCF5\uC774 " + (interaction.options.getInteger("설정") == 0
                                        ? "해제"
                                        : "설정") + "\uB418\uC5C8\uC2B5\uB2C8\uB2E4." + (interaction.options.getInteger("설정") > 0
                                        ? "\n\uD604\uC7AC \uC124\uC815: " + (interaction.options.getInteger("설정") == 1
                                            ? "곡"
                                            : "목록")
                                        : "")),
                                ],
                            })];
                    case 2:
                        _a.sent();
                        guildQueue.setRepeatMode(interaction.options.getInteger("설정"));
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, interaction.editReply({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor("#ff0000")
                                    .setTitle(":warning: 오류")
                                    .setDescription("재생 중인 음악이 없습니다."),
                            ],
                        })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
};