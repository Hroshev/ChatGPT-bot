const { Telegraf, Markup, Extra } = require('telegraf');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

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
bot.start(async (ctx) => {
    await ctx.reply('👋')
    await ctx.reply(`Привет, ${ctx.from.first_name}`)
    await ctx.reply('Для взаимодействия с ботом выбирите один из пунктов меню')
})


// //Прогноз погоды
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

// //OpenAI
bot.command('openai', async (ctx) => {
    await ctx.reply('Я взаимодействую с OpenAI API и могу отвечать на ваши вопросы по определенным темам')
    await ctx.reply('Данные обрабатываются в 2021 году, поэтому ИИ может не знать о текущих событиях.⚠️')
    await ctx.reply('Выберете модель или структуру, которая подходит для вашего вопроса✨',
    Extra.markup(
        Markup.inlineKeyboard([
            [Markup.callbackButton('Grammar English ', 'grammar')],
            [Markup.callbackButton('Writing code', 'code')],
        ])
    )
    )
})

// Else если пользователь ничего не выбрал
bot.on('message', async (ctx) => {
    const text = ctx.message.text;
    const user = ctx.from.username;
    await ctx.reply(`Я не понимаю что ты мне написал! \n@${user}:  ${text}`)
    await ctx.replyWithSticker('https://tlgrm.eu/_/stickers/fdb/2c3/fdb2c3d5-ae19-3b60-8ffc-7b3b8099cfe5/192/35.webp');
})

bot.launch().then(() => {console.log('Bot started')})