## Telegram Bot for Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPonomareVlad%2FTeleVercelBot&env=TELEGRAM_BOT_TOKEN&envDescription=Telegram%20Bot%20Token%20from%20%40BotFather&project-name=telegram-bot&repo-name=telegram-bot)


### Studying and developing a telegram bot that interacts with the OpenAI API


### How to use for your project

Press the blue button to create a new project on Vercel

Create a new project your GitHub and deploy

Next, in the settings of your project add a new variable

In Deployment, go to your project and click "Set WebHook Url"

```bash
API_KEY  '<your OpenAI token>'
```


### Run locally

You need to create a .env file and add your keys

```bash
API_KEY = '<your OpenAI token>'
TELEGRAM_BOT_TOKEN = '<your telegramm token>'
```

Install all dependencies

```bash
npm i
```

Check that ngrok is installed

```bash
ngrok -v
```

Set your authtoken via the command line

```bash
ngrok authtoken <you-token>
```

Run localhost in the terminal 

```bash
npm run dev
```

Run ngrok in a new terminal after starting localhost

```bash
npm run start or ngrok http 3000
```

Install webhook

Now you can make some changes in [bot.mjs](bot.mjs)

[Documentation for TeleBot](https://github.com/mullwar/telebot)

### Template structure:

- [api/telegram.mjs](api/telegram.mjs) — Endpoint function for WebHooks
- [api/setWebhook.mjs](api/setWebhook.mjs) — Function for setting WebHook URL

###### P.S. Don't forget to remove or restrict [api/setWebhook.mjs](api/setWebhook.mjs) function before going to production
