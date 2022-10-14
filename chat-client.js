var socket = require('socket.io-client')('http://localhost:3000');//('http://34.151.243.202');
var username = null
const chalk = require('chalk');
const repl = require('repl')

socket.on('disconnect', function () {
  console.log('');
});

socket.on('connect', () => {
  try {
    console.log(chalk.red('==== BOBI CHAT ===='))

  } catch (e) {
    console.log(e);
  }

})
socket.on('newUser', user => {
  console.log(chalk.gray(user.timestamp) + ' | ' + chalk.green(process.env.USER) + ' acaba de entrar no chat');
})

socket.on('message', (data) => {
  console.log(chalk.gray(user.timestamp) + ' | ' + chalk.green(process.env.USER) + ': ' + chalk.blue(data.content));
})

repl.start({
  prompt: '',
  eval: (cmd) => {
    socket.send(cmd)
  }
})