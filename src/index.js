const { Client, LocalAuth, Poll } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const db = require('../data.json')
const fs = require('fs')

const client = new Client(
  {
    authStrategy: new LocalAuth({
      dataPath: '../auth'
    })
},{ puppeteer: {args: ['--no-sandbox']},}
);

let count = db;

client.on('qr', (qr) => {
  qrcode.generate(qr, {small: true})
});

client.on('ready', () => {
  console.log('client is ready!')
})

client.on('message', async (message)=> {
  // console.log(message)
  if( message.body === '!ping') {
    await message.reply('pong')
  } else if( message.body === '!bomdia') {
    await message.reply(`
    E o bom dia especial de hoje vai para:

  - Quem já sofreu por uma Marcelle
  - Fãs dos Barões da Pisadinha
  - Quem tem sdds das olimpíadas
  - Galera da cerveja 
  - Usuários do Canva
  - Torcida do Cruzeiro
  - Quem já cagou hoje
  - Ex jogadores de zombie tsunami
  - Canhotos do país
  - Mulheres com mais de 1,70 e óculos
    `)
  } else if( message.body === '!excelente') {
    count.exc = count.exc + 1
    
    fs.writeFile('data.json', JSON.stringify(count, null, 2), (err)=> {
      if(err) console.log(err)
    })
    await message.reply(`Voces ja se sentiram excelente ${count.exc} vezes`)
  }else if( message.body === '!janas') {
    await message.reply(new Poll('Janas hoje?', ['Lógico, bora', 'Nem, sou cusão']));
  }
  else if (message.body === '!groupinfo') {
    let chat = await message.getChat();
    if (chat.isGroup) {
      message.reply(`
            *Group Details*
            Name: ${chat.name}
            Description: ${chat.description}
            Created At: ${chat.createdAt.toString()}
            Created By: ${chat.owner.user}
            Participant count: ${chat.participants.length}
        `);
    } else {
      message.reply('This command can only be used in a group!');
    }
}

})

client.initialize();
