const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const dontev = require('dotenv').config();
const bot = new Telegraf(process.env.BOOT_TOKEN);


//Set bot commands
bot.telegram.setMyCommands([
    {command: 'start', description:'Начальное приветствие'},
    {command: 'english', description:'Грамматика английского языка'},
    {command: 'jscode', description:'Написать код на JS'},
    {command: 'text', description:'Написать текст'},
    {command: 'faq', description:'Ответы на вопросы'},
    {command: 'product', description:'Придумать название'},
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

function getOpenai(model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty) {
    bot.on('message', async (ctx) =>{
        const messageText = ctx.message.text;
        try {
            const configuration = new Configuration({apiKey: process.env.API_KEY,});
            const openai = new OpenAIApi(configuration);          
            const response = await openai.createCompletion({
                model,
                prompt: prompt + messageText,
                temperature,
                max_tokens,
                top_p,
                frequency_penalty,
                presence_penalty,
            });
            await ctx.reply(response.data.choices[0].text);

        }catch (error) {
            await ctx.reply('Что-то пошло не так😱')
            await ctx.reply(`Код ошибки от сервера: ${error.response.status}`)
        }
    })
  }

//English grammar command
bot.command('english', async (ctx) => {
    await ctx.reply('Введите ваш текст! \nБот переведет все на английский язык', getOpenai("text-davinci-003", 'Correct this to standard English:', 0.1, 500, 1.0, 0.5, 0.0))
})

//Create jscode command
bot.command('jscode', async (ctx) => {
    await ctx.reply('Укажите что именно должен делать ваш код? Какие библиотеки необходимо использовать?', getOpenai("text-davinci-002", 'Write this code using ES6 JavaScript:', 0, 1000, 1.0, 0.5, 0.0))
})

//Create text command
bot.command('text', async (ctx) => {
    await ctx.reply('Что именно нужно написать?')
    await ctx.reply('Пример: \nНапиши статью на тему "Проблемы современного мира"', getOpenai("text-davinci-003", 'Создай грамотный и уникальный:', 0.55, 800, 1.0, 0.5, 0.0))
})

//Create faq command
bot.command('faq', async (ctx) => {
    await ctx.reply('Отвечает на вопросы, основываясь на имеющихся знаниях', getOpenai("text-davinci-003", 'Дай точный ответ на вопрос:', 0, 800, 1, 0.0, 0.0))
})

//Create product command
bot.command('product', async (ctx) => {
    await ctx.reply('Генерирует названия для бренда, имя животного...', getOpenai("text-davinci-003", 'Сгенерируй 6 креативных названий:', 0.8, 700, 1.0, 0.0, 0.0))
})

//Create chat command
bot.command('chat', async (ctx) => {
    await ctx.reply('Начни свой чат с ИИ')
    await ctx.reply('Бот не умеет запоминать прошлое сообщение, ответ вы получаете от сервера!', getOpenai("text-davinci-003", '', 0.7, 500, 1, 0.5, 0.8))
})

//Create interview command
bot.command('interview', async (ctx) => {
    await ctx.reply('Пример: \nСоставьте список из 8 вопросов для интервью с автором научной фантастики:', getOpenai("text-davinci-003", '', 0.5, 700, 1.0, 0.0, 0.0))
})

bot.launch()