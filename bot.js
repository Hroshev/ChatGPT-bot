const { Telegraf } = require('telegraf');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const API_KEY = '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';
const BOOT_TOKEN = '5840606992:AAFCszKDGIkbyI_FS7wNvhf7iCQV-mDz3p8';

const bot = new Telegraf(BOOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(`👋 \nПривет, ${ctx.from.first_name} \n\nЯ бот, который взаимодействует с OpenAI и может отвечать на ваши вопросы по определенным темам. \n\n Выберете модель или структуру из списка меню, которая подходит для вашего вопроса✨  \n\n⚠️Данная моделей по умолчанию обрываются в 2021 году, поэтому она может не знать о текущих событиях.⚠️`);
});

bot.on('message', async (ctx) =>{
    const question = ctx.message.text;
    try {
        const configuration = new Configuration({
            apiKey: API_KEY,
          });
          const openai = new OpenAIApi(configuration);          
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Correct this to standard English: ${question}`,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });

          console.log(response.data.choices);
          const answer = response.data.choices[0].text;
          ctx.reply(answer);


    }catch (error) {
        // console.error(error);
        ctx.reply(`Что-то пошло не так😱. \nПожалуйста, повторите попытку позже. \n\nКод ошибки от сервера: ${error.response.status}  \n\nОтвет от сервиса: ${error.response.data.error.code}`);
    }
});

bot.launch();