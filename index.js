require('dotenv').config();

const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
const { api } = require('./utils/apiCaller');
const { menu_buttons } = require('./components/buttons/button');

const bot = new Telegraf(process.env.BOT_TOKEN);
//password map to take password
const passwordStates = new Map();

bot.start(async (ctx) => {
    //check if user exist in database or not
    const res = await api.get(`/user/check?username=${ctx.from.id}`);
    //if user not exist then it will ask for setup password
    if (res.status === 404) {
        ctx.reply('Please enter a password: ');
        passwordStates.set(ctx.from.id, 'waiting_for_password');
    }
    //if user exist then it will reply with welcome  user
    else ctx.reply(` Welcome ${ctx.from.first_name || '' + ' ' + ctx.from.last_name || ''}`);
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))

bot.command('menu', (ctx => {

    const keyboard = Markup.inlineKeyboard(
        menu_buttons,
    );

    // Send a message with the keyboard
    ctx.reply(`Please select options`, keyboard);
}));


bot.on('message', async (ctx) => {

    //check if  password setting up in progress or not
    if (passwordStates.get(ctx.from.id) === 'waiting_for_password') {
        api.post('/user', {
            username: ctx.from.id,
            password: ctx.message.text
        }).then(async res => {
            console.log(res);
            await ctx.reply('Password set successfull');
        }).catch(async err => {
            console.log(err);
            await ctx.reply('Something went wrong');
        })

    }




});

bot.action('button_wallet', (ctx) => {
    ctx.reply(`You clicked on Wallet Button`);
});


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
