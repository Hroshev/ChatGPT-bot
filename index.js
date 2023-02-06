const dontev = require('dotenv').config();
const axios = require('axios');
const { Telegraf } = require('telegraf');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({apiKey: process.env.API_KEY,});
const openai = new OpenAIApi(configuration);



const bot = new Telegraf(process.env.BOOT_TOKEN);

function GetOpenai(model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty) {
    bot.on('message', async (ctx) =>{
        await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
        try {
            const message = ctx.message.text;
            const response = await openai.createCompletion({
                model,
                prompt: `${prompt} ${message}`,
                temperature,
                max_tokens,
                top_p,
                frequency_penalty,
                presence_penalty,
            });
            const answer = response.data.choices[0].text;
            await ctx.reply(answer);

        }catch (error) {
            await ctx.reply(`Что-то пошло не так😱\n Код ошибки от сервера: ${error.response.status}`)
        }
    })
  }

//Set bot commands
bot.telegram.setMyCommands([
    {command: 'start', description:'Начальное приветствие'},
    {command: 'english', description:'Английская грамматика'},
    {command: 'jscode', description:'Написать JS-код'},
    {command: 'text', description:'Написать текст'},
    {command: 'faq', description:'Ответы на вопросы'},
    {command: 'product', description:'Придумайте название'},
    {command: 'chat', description:'Чат с AI'},
    {command: 'interview', description:'Создание вопросов для интервью'},
]);

//Start command
bot.start(async (ctx) => {
    await ctx.reply(`👋\nПривет, ${ctx.from.first_name}!`);
    await ctx.reply('Я взаимодействую с API OpenAI и могу ответить на ваши вопросы по конкретным темам.');
    await ctx.reply('Данные обрабатываются в 2021 году, поэтому ИИ может не знать о текущих событиях.⚠️');
    await ctx.reply('Чтобы взаимодействовать с ботом, выберите в меню модель или структуру, соответствующую вашему вопросу✨');
});


//English grammar command
bot.command('english', async (ctx) => {
    const question = 'Correct this to standard English:'
    await ctx.reply('Введите ваш текст! \nБот переведет текст на английский язык', new GetOpenai("text-davinci-003", question, 0.0, 600, 1.0, 0.0, 0.0));
})

//Create jscode command
bot.command('jscode', async (ctx) => {
    const question = 'Write this code using JavaScript:'
    await ctx.reply('Укажите что именно должен делать ваш код? Какие библиотеки необходимо использовать?', new GetOpenai("text-davinci-002", question, 0.0, 1000, 1.0, 0.5, 0.0))
})

//Create text command
bot.command('text', async (ctx) => {
    const question = 'Создай грамотный и уникальный текст:'
    await ctx.reply('Что именно нужно написать?')
    await ctx.reply('Пример: \nНапиши статью на тему "Проблемы современного мира"', new GetOpenai("text-davinci-003", question, 0.5, 800, 1.0, 0.5, 0.0))
})

//Create faq command
bot.command('faq', async (ctx) => {
    const question = 'Дай точный ответ на вопрос:'
    await ctx.reply('Отвечает на вопросы, основываясь на имеющихся знаниях', new GetOpenai("text-davinci-003", question, 0.0, 800, 1, 0.0, 0.0))
})

//Create product command
bot.command('product', async (ctx) => {
    const question = 'Сгенерируй 6 креативных названий:'
    await ctx.reply('Генерирует названия для бренда, имя животного...', new GetOpenai("text-davinci-003", question, 0.7, 700, 1.0, 0.0, 0.0))
})

//Create chat command
bot.command('chat', async (ctx) => {
    await ctx.reply('Начни свой чат с AI')
    await ctx.reply('Бот не умеет запоминать прошлое сообщение, ответ вы получаете от сервера!', new GetOpenai("text-davinci-003", null, 0.6, 700, 1, 0.4, 0.8))
})


//Create interview command
bot.command('interview', async (ctx) => {
    await ctx.reply('Пример: \nСоставьте список из 8 вопросов для интервью с автором научной фантастики:', new GetOpenai("text-davinci-003", null, 0.5, 700, 1.0, 0.0, 0.0))
})

bot.launch()