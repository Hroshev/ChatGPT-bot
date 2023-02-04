const { Telegraf, Markup, Extra } = require('telegraf');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const API_KEY = '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';
const BOOT_TOKEN = '5840606992:AAFCszKDGIkbyI_FS7wNvhf7iCQV-mDz3p8';
const API_WETHER = 'a74f2027eda7c610d7e5483e3a31417d';



const bot = new Telegraf(BOOT_TOKEN);

//Команды
bot.telegram.setMyCommands([
    {command: 'start', description:'Начальное приветствие'},
    {command: 'weather', description:'Узнать прогноз погоды'},
    {command: 'openai', description:'Чат-бот с ИИ'}
])

// Start
bot.start((ctx) => {
    ctx.replyWithSticker('https://tlgrm.eu/_/stickers/fdb/2c3/fdb2c3d5-ae19-3b60-8ffc-7b3b8099cfe5/192/31.webp');
    ctx.reply(`👋 \nПривет, ${ctx.from.first_name}. \nДля взаимодействия с ботом выбирите один из пунктов меню 👀`,
    // Extra.markup(
    //     Markup.keyboard([
    //         ['/openai'],
    //         ['/weather'],
    //     ])
    //     .oneTime()
    //     .resize()
    // ).HTML()
    )
})

//Прогноз погоды
bot.command('weather', async (ctx) => {
    await ctx.reply(`Отправьте свою геопозицию для получение информации о погоде⛅`,
    bot.on('message', async (ctx)=>{
        if (ctx.message.location) {
            const openWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${API_WETHER}&lang=ru&units=metric`;
            const response = await axios.get(openWeather);
            ctx.reply(
                `Погода в городе ${response.data.name}☔ 
                \nТемпература: ${Math.round(response.data.main.temp)}°
                \nЗа окном:  ${response.data.weather[0].description}
                \nВетер: ${response.data.wind.speed} м/c, СВ
                \nВлажность: ${response.data.main.humidity}%
                `)
        } else {
            ctx.reply(`Вы не отправили свою геопозицию, поворите снова`)
        }
    })
    )
})

//OpenAI
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

// Прослушивание кнопки grammar
bot.action('grammar', (ctx) => {
    ctx.editMessageText('Введите ваш текст! \n⚠️Bot переведет весь ваш текст на английский язык⚠️ \n\nПример: \n-Did you eat что-нибудь сегодня? \n-Did you eat anything today?', 
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

// Прослушивание кнопки code
bot.action('code', (ctx) => {
    ctx.editMessageText('Введите ваш текст! \nОпишите что именно вы хоте создать? Для точного ответа укажите язык программирования на котором вы хотите получить ответ, какие методы или библиотеки необходимо использовать.', 
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: question,
                temperature: 0,
                max_tokens: 1000,
                top_p: 1.0,
                frequency_penalty: 0.5,
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

// Else если пользователь ничего не выбрал
bot.on('message', async (ctx) => {
    const text = ctx.message.text;
    const user = ctx.from.username;
    await ctx.reply(`Я не понимаю что ты мне написал! \n@${user}:  ${text}`)
    await ctx.replyWithSticker('https://tlgrm.eu/_/stickers/fdb/2c3/fdb2c3d5-ae19-3b60-8ffc-7b3b8099cfe5/192/35.webp');
})

bot.launch().then(() => {
    console.log('Бот запущен!');
});