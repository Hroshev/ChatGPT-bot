const { Telegraf, Markup, Extra } = require('telegraf');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const API_KEY = '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';
const BOOT_TOKEN = '5840606992:AAFCszKDGIkbyI_FS7wNvhf7iCQV-mDz3p8';

const bot = new Telegraf(BOOT_TOKEN);


// Отправить фотографию
// bot.on('photo', async (ctx) =>{})


bot.start((ctx) => {
    ctx.reply(`👋 \nПривет, ${ctx.from.first_name} \n\nВыбирите один из пунктов меню ➤`,
    Extra.markup(
        Markup.keyboard([
            ['/openai'],
        ])
        .oneTime()
        .resize()
    ).HTML()
    )
})


bot.command('openai', async (ctx) => {
    await ctx.reply(`Я бот, который взаимодействует с OpenAI API и может отвечать на ваши вопросы по определенным темам. \n\n Выберете модель или структуру из списка меню, которая подходит для вашего вопроса✨  \n\n⚠️<b>Данная моделей по умолчанию обрабатывется в 2021 году, поэтому она может не знать о текущих событиях.</b>⚠️`,
    Extra.markup(
        Markup.inlineKeyboard([
            [Markup.callbackButton('Grammar English ', 'grammar')],
            [Markup.callbackButton('Writing code', 'code')],
        ])
    ).HTML()
    )
})

//Прослушивание кнопки grammar
bot.action('grammar', (ctx) => {
    ctx.editMessageText('Введите ваш текст! \nBot отредактирует ваше сообщение на Английском языке.  \n\nПример: \n-Did you eat что-нибудь сегодня? \n-Did you eat anything today?', 
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Correct this to standard English: ${question}`,
                temperature: 0,
                max_tokens: 250,
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
    }))
})

bot.launch().then(() => {
    console.log('Бот запущен!');
});