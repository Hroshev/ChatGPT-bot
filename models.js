
// English
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
});


//Написание текста 
bot.on('message', async (ctx) =>{
    const question = ctx.message.text;
    try {
        const configuration = new Configuration({
            apiKey: API_KEY,
          });
          const openai = new OpenAIApi(configuration);          
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            temperature: 0.4,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });

          console.log(response.data);
          const answer = response.data.choices[0].text;
          ctx.reply(answer);


    }catch (error) {
        // console.error(error);
        ctx.reply(`Что-то пошло не так😱. \nПожалуйста, повторите попытку позже. \n\nКод ошибки от сервера: ${error.response.status}  \n\nОтвет от сервиса: ${error.response.data.error.code}`);
    }
});

//Написание кода или функции 
bot.on('message', async (ctx) =>{
    const question = ctx.message.text;
    try {
        const configuration = new Configuration({
            apiKey: API_KEY,
          });
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

          console.log(response.data);
          const answer = response.data.choices[0].text;
          ctx.reply(answer);


    }catch (error) {
        // console.error(error);
        ctx.reply(`Что-то пошло не так😱. \nПожалуйста, повторите попытку позже. \n\nКод ошибки от сервера: ${error.response.status}  \n\nОтвет от сервиса: ${error.response.data.error.code}`);
    }
});
