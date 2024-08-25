const io = require('socket.io')(3000,{cors: {origin:"*"}} )


const users ={}

io.on('connection', socket =>{
    socket.on('join', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('someJoined', name)
        console.log(users)

    })



    // console.log('new User')
    socket.on('send-message', data =>{
        
        console.log(users)
        socket.broadcast.emit('send-message', {message: data, name: users[socket.id]})
    })
    


})

