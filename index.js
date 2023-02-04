const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

const API_KEY = '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';
const BOOT_TOKEN = '6150217326:AAGz4AiXarY0T5Fv9iKEVt7PcEinWsD0pL4';

const bot = new Telegraf(BOOT_TOKEN);

//Set bot commands
bot.telegram.setMyCommands([
    {command: 'start', description:'Начальное приветствие'},
    {command: 'english', description:'Грамматика английского языка'},
    {command: 'code', description:'Написать код'},
    {command: 'text', description:'Написать текст'},
    {command: 'faq', description:'Ответы на вопросы'},
    {command: 'product', description:'Придумать название для компании'},
    {command: 'chat', description:'Чат с ИИ'},
    {command: 'interview', description:'Создает вопросы для интервью'},
])

//Start command
bot.start(async (ctx) => {
    await ctx.reply('👋')
    await ctx.reply(`Привет, ${ctx.from.first_name}`)
    await ctx.reply('Я взаимодействую с OpenAI API и могу отвечать на ваши вопросы по определенным темам')
    await ctx.reply('Данные обрабатываются в 2021 году, поэтому ИИ может не знать о текущих событиях.⚠️')
    await ctx.reply('Для взаимодействия с ботом выберете модель или структуру, которая подходит для вашего вопроса из списка меню✨')
})

//English grammar command
bot.command('english', async (ctx) => {
    await ctx.reply('Введите ваш текст')
    await ctx.reply('Бот переведет весь ваш текст на английский язык')
    await ctx.reply('Пример: \n-Did you eat что-нибудь сегодня? \n-Did you eat anything today?',
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;

        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Correct this to standard English: ${question}`,
                temperature: 0,
                max_tokens: 500,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
            await ctx.reply(`Ответ от сервиса: ${error.response.data.error.code}`)
        }
    })
    )
})

//Create code command
bot.command('code', async (ctx) => {
    await ctx.reply('Укажите что именно должен делать ваш код')
    await ctx.reply('Какой язык программирования нужно использовать? Укажите необходимые библиотеки если требуется',
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
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
            await ctx.reply(`Ответ от сервиса: ${error.response.data.error.code}`)
        }
    })
    )
})

//Create text command
bot.command('text', async (ctx) => {
    await ctx.reply('Что именно нужно написать?')
    await ctx.reply('Пример: \nНапиши текст на 50 слов с использованием следующих слов: Украина, Владимир Зеленский',
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                temperature: 0.5,
                max_tokens: 800,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
            await ctx.reply(`Ответ от сервиса: ${error.response.data.error.code}`)
        }
    })
    )
})

//Create faq command
bot.command('faq', async (ctx) => {
    await ctx.reply('Отвечает на вопросы, основываясь на имеющихся знаниях',
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                temperature: 0,
                max_tokens: 600,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
            await ctx.reply(`Ответ от сервиса: ${error.response.data.error.code}`)
        }
    })
    )
})

//Create product command
bot.command('product', async (ctx) => {
    await ctx.reply('Генерирует названия для собственного бренда',
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                temperature: 0.8,
                max_tokens: 200,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
            await ctx.reply(`Ответ от сервиса: ${error.response.data.error.code}`)
        }
    })
    )
})

//Create chat command
bot.command('chat', async (ctx) => {
    await ctx.reply('Напиши сообщение для получения ответа',
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                temperature: 0.9,
                max_tokens: 250,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
            });
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
            await ctx.reply(`Ответ от сервиса: ${error.response.data.error.code}`)
        }
    })
    )
})

//Create interview command
bot.command('interview', async (ctx) => {
    await ctx.reply('Пример: \nСоставьте список из 8 вопросов для интервью с автором научной фантастики:',
    bot.on('message', async (ctx) =>{
        const question = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                temperature: 0.5,
                max_tokens: 700,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
            await ctx.reply(`Ответ от сервиса: ${error.response.data.error.code}`)
        }
    })
    )
})

bot.launch().then(() => {console.log('Bot started')})