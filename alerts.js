const axios = require('axios');
const sendTelegramMessage = require('./telegram');
const sendDiscordMessage = require('./discord');
const sendEmail = require('./email');
const sendSMS = require('./sms');
const { loadHistory, saveHistory } = require('./history');

async function checkMemeCoins() {
  const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      category: 'meme-token',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
    },
  });

  let history = loadHistory();
  const topMovers = res.data.filter(coin => coin.price_change_percentage_24h > 10);

  for (const coin of topMovers) {
    if (history.includes(coin.id)) continue;

    const message = `🚀 *${coin.name}* is moving!
Price: $${coin.current_price}
24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%`;

    await sendTelegramMessage(message);
    await sendDiscordMessage(message);
    await sendEmail('Coin Alert 🚨', message);
    await sendSMS(message);

    history.push(coin.id);
  }

  saveHistory(history);
}

checkMemeCoins();
