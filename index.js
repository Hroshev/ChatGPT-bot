const dontev = require('dotenv').config();
const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require("openai");

function getOpenai(model, temperature, max_tokens, top_p, frequency_penalty, presence_penalty) {
    return (() => {
      bot.on('text', async (ctx) =>{
          await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
          try {
              const configuration = new Configuration({apiKey: process.env.API_KEY,});
              const openai = new OpenAIApi(configuration);
              const response = await openai.createCompletion({
                  model,
                  prompt: ctx.message.text,
                  temperature,
                  max_tokens,
                  top_p,
                  frequency_penalty,
                  presence_penalty,
              });
              await ctx.reply(response.data.choices[0].text);
          }catch (error) {
              return await ctx.reply(`Что-то пошло не так😱\n Код ошибки от сервера: ${error.response.status}`)
          }
      });
    })();
  }
  
const bot = new Telegraf(process.env.BOOT_TOKEN);

//Set bot commands
bot.telegram.setMyCommands([
    {command: 'start', description:'Начальное приветствие'},
    {command: 'classic', description:'Классическиий режим'},
    {command: 'creative', description:'Творческий режим'},
    {command: 'code', description:'Написание кода'},
]);

//Start command
bot.start(async (ctx) => {
    await ctx.reply('👋');
    await ctx.reply('Для взаимодействия с OpenAI, выберите в меню модель соответствующую вашему вопросу.');
    await ctx.reply('⚠️Внимание!');
    await ctx.reply('1.Данные обрабатываются в 2021 году, поэтому ИИ может не знать о текущих событиях.\n\n 2.Бот не отвечает на прошлые сообщения, данные обрабатываются на стороне сервера. \n\n 3.Бот отвечает только на текстовые сообщения');
});

//classic
bot.command('classic', async (ctx) => {
    await ctx.reply('Как я могу вам помочь?', getOpenai("text-davinci-003", 0.0, 1000, 1.0, 0.0, 0.0));
})

//creative
bot.command('creative', async (ctx) => {
    await ctx.reply('Что нужно придумать или написать?', getOpenai("text-davinci-003", 0.5, 1000, 1.0, 0.5, 0.0))
})

//code
bot.command('code', async (ctx) => {
    await ctx.reply('Что нужно создать?', getOpenai("text-davinci-002", 0.0, 1000, 1.0, 0.5, 0.0))
})

bot.launch()