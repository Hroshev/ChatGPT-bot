import { Telegraf } from 'telegraf';
import dotenv from 'dotenv'
dotenv.config()
import { Configuration, OpenAIApi } from "openai"

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("text", ctx => ctx.reply("Hello"));

bot.telegram.setWebhook(`${process.env.VERCEL_URL}/bot`)
bot.startWebhook('/bot', null, process.env.PORT)

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));