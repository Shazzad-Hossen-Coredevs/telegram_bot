const { Markup } = require('telegraf');
const menu_buttons = [
        [Markup.button.callback('Wallet', `button_wallet`),
        Markup.button.callback('Swap', `button_swap`)],
        [Markup.button.callback('Pools', `button_swap`),
        Markup.button.callback('Statistics', `button_swap`)],
        [Markup.button.callback('Referral', `button_swap`),
        Markup.button.callback('Info', `button_swap`)],
        [Markup.button.callback('Settings', `button_swap`)]

];

module.exports= {
    menu_buttons
}
