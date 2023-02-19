import TeleBot from "telebot"
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

bot.on(['/start', '/help'], (msg) => msg.reply.text('Привет, 👋\n\n Этот бот взаимодействует с OpenAI API и умеет отвечать на ваши вопросы\n\n ❗❗❗Внимание❗❗❗\n\n 🔻 Данные обрабатываются в 2020 году, поэтому ИИ может не знать о текущих событиях.\n\n 🔻 Бот не отвечает на прошлые сообщения, данные обрабатываются на стороне сервера. \n\n 🔻 Бот отвечает только на текстовые сообщения.'))
bot.on('sticker', (msg) => msg.reply.text('Cool 👍'))

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
    timeZone: 'Europe/Kyiv' //Set up OpenAI API with your timezone
});
const openai = new OpenAIApi(configuration);

bot.on('text', async (msg) => {
  if (msg.text.startsWith('/')) return;
  try {
    bot.sendAction(msg.chat.id, 'typing')
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg.text,
        temperature: 0,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    // Send response back to user
    await msg.reply.text(response.data.choices[0].text)
  } catch (error) {
    await msg.reply.text(`Что-то пошло не так😱\n Ошибки от сервера`)
  }
})

export default bot