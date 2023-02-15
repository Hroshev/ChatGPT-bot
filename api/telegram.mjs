import bot from '../bot.mjs'

export default async ({body}, {json}) => {
    console.debug(body);
    return json(body && body.update_id ? await bot.receiveUpdates([body]): {status: false})
}