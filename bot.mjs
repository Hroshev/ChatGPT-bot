import TeleBot from "telebot"
import dotenv from 'dotenv'
import mongo from './db.mjs'
import { Configuration, OpenAIApi } from "openai"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

//Command
bot.on(['/start', '/help'], (msg) => msg.reply.text('Привет, 👋\n\n Для взаимодействия с OpenAI, выберите в меню модель соответствующую вашему вопросу.\n\n ❗❗❗Внимание❗❗❗\n\n ◾ Данные обрабатываются в 2021 году, поэтому ИИ может не знать о текущих событиях.\n\n ◾ Бот не отвечает на прошлые сообщения, данные обрабатываются на стороне сервера. \n\n ◾ Бот отвечает только на текстовые сообщения.'))
bot.on('/env', (msg) => msg.reply.text(process.env.VERCEL_ENV))
// bot.on('/user', async (msg) => msg.reply.text(JSON.stringify(await fetchUser(msg.chat))))

//Send sticker
bot.on('sticker', (msg) => msg.reply.text('👍Cool'))

bot.on('text', async (msg) => {
    if (msg.text.startsWith('/')) return;
    let user = await fetchUser(msg.chat)
    const data = {id:user.id, count: user.count ? ++user.count : 1}
    user = await fetchUser(data)
    return msg.reply.text(`Я не понимаю что ты написал! \n@${msg.from.username}: ${msg.text} \n ${user.count}`)
})

export default bot

//MongoDB
const users = mongo.db('AI_bot').collection('Users')

async function fetchUser(data) {
    // console.debug(data)
    const filter = {id: data.id}
    await users.updateOne(filter, {$set: data}, {upsert: true})
    return await users.findOne(filter)
}

// async function updateUser({id} = {}, data) {

// }

//OpenAi
function getOpenai(model, temperature, max_tokens, top_p, frequency_penalty, presence_penalty) {
    return (() => {
      bot.on('text', async (msg) =>{
        //   await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
          try {
              const configuration = new Configuration({apiKey: process.env.API_KEY,});
              const openai = new OpenAIApi(configuration);
              const response = await openai.createCompletion({
                  model,
                  prompt: msg.text,
                  temperature,
                  max_tokens,
                  top_p,
                  frequency_penalty,
                  presence_penalty,
              });
              await msg.reply.text(response.data.choices[0].text);
          }catch (error) {
              return await msg.reply.text(`Что-то пошло не так😱\n Код ошибки от сервера: ${error.response.status}`)
          }
      });
    })();
  }