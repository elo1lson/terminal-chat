const http = require('http').createServer()
const io = require('socket.io')(http)
const chalk = require('chalk')
const port = 3000
const user = process.env.USER
const { green, red, blue } = chalk

io.on('connection', (socket) => {
  let date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  if (hours < 10) hours = '0' + hours
  if (minutes < 10) minutes = '0' + minutes

  date = hours.toString() + ':' + minutes.toString()
  const newUser = {
    user,
    timestamp: date
  }
  socket.emit('newUser', newUser)

  socket.on('message', (evt) => {
    let msg = {
      content: evt,
      name: process.env.USER
    }
    socket.broadcast.emit('message', msg, date)
  })

})

io.on('disconnect', (evt) => {
  console.log('disconnected')
})

http.listen(port,
  () => console.log(`server listening on port: ${port}`))