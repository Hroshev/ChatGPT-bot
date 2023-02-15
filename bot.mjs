import TeleBot from "telebot";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";
dotenv.config()

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

// bot.on('text', async (msg) => {
//     await msg.text.startsWith('/') ? null : await msg.reply.text(`Я не понимаю что ты мне написал! \n@${msg.from.username}: ${msg.text}\n\nОтправь свою геопозицию`)
// });

//Start command
bot.on('/start', async (msg) => {
    await msg.reply.text('👋')
    await msg.reply.text('Для взаимодействия с OpenAI, выберите в меню модель соответствующую вашему вопросу.')
    await msg.reply.text('⚠️Внимание!')
    await msg.reply.text('1.Данные обрабатываются в 2021 году, поэтому ИИ может не знать о текущих событиях.\n\n 2.Бот не отвечает на прошлые сообщения, данные обрабатываются на стороне сервера. \n\n 3.Бот отвечает только на текстовые сообщения')
});

//Help command
bot.on('/help', async (msg) => await msg.reply.text('Для взаимодействия с OpenAI, выберите в меню модель соответствующую вашему вопросу.'));

//Vercel command
bot.on('/env', async (msg) => await msg.reply.text(process.env.VERCEL_ENV));

//Send sticker
bot.on('sticker', async (msg) => await msg.reply.text('👍'));


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

//classic
bot.on('/classic', async (msg) => {
    await msg.reply.text('Как я могу вам помочь?')
    bot.on('text', async (msg) => {
        await msg.text.startsWith('/') ? null : await msg.reply.text(`Я не понимаю что ты мне написал! \n@${msg.from.username}: ${msg.text}\n\nОтправь свою геопозицию`)
    });
})

export default bot