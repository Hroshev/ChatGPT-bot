import TeleBot from "telebot"
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

bot.on(['/start', '/help'], async (msg) => {
  await msg.reply.text('👋')
  await msg.reply.text('На данный момент бот находится в стадии разработки')
  await msg.reply.text('❗❗❗Внимание❗❗❗\n\n 🔻 Данные обрабатываются в 2020 году, поэтому ИИ может не знать о текущих событиях.\n\n 🔻 Бот не отвечает на прошлые сообщения, данные обрабатываются на стороне сервера. \n\n 🔻 Бот отвечает только на текстовые сообщения.')
})

bot.on(['/classic', '/creative', '/code'], (msg) => msg.reply.text('В стадии разработки. Вы можете писать сообщение и получать ответ от бота без выбора моделей'))

bot.on('sticker', (msg) => msg.reply.text('Cool 👍'))


// Set up OpenAI API with timezone
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
    timeZone: process.env.TZ
});
const openai = new OpenAIApi(configuration);

bot.on('text', async (msg) => {
  if (msg.text.startsWith('/')) return;
  try {
    // Send typing action
    bot.sendAction(msg.chat.id, 'typing')
    // Use OpenAI API to generate response to user text
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg.text,
        temperature: 0.3,
        max_tokens: 1000,
        top_p: 0.8,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
    })
    
    // Send response back to user
    await msg.reply.text(response.data.choices[0].text)
  } catch (error) {
    console.error(error)
    await msg.reply.text(`Что-то пошло не так😱\n Код ошибки от сервера: ${error.response.status}`)
  }
})

export default bot