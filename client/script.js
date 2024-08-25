const socket = io('http://localhost:3000')

const mainApp = document.getElementById('app')
const nameCard = document.getElementById('card')
const msgInput = document.getElementById('msgInput')
const sendBtn = document.getElementById('form')
const messageContainer = document.querySelector('.message-history')
const nameForm = document.getElementById('nameForm')
const nameInput = document.getElementById('name')

let name;

nameForm.addEventListener('submit', e=>{
    e.preventDefault()
    name = nameInput.value
    console.log(name)
    socket.emit('join', name)
    mainApp.classList.remove('unactive')
    mainApp.classList.add('active')
    nameCard.style.display = "none"



})




 socket.on('someJoined', name =>{
    console.log(name)

    if(mainApp.classList.contains('active')) appendWelcome(name)
    
})




socket.on('send-message', data =>{
    appendMessage(data.name, data.message, 'incomming')
    console.log(data);
    
})

sendBtn.addEventListener('submit', e=>{
    e.preventDefault()

    let message = msgInput.value
    socket.emit('send-message', message)

    appendMessage(name, message , 'outgoing')

    msgInput.value = ''
})





function appendMessage(name,message, type){
    const messageElement = document.createElement('div')
    messageElement.classList.add('message', type)

    const userInfo = document.createElement('div')
    userInfo.classList.add('userInfo')
    const h3 = document.createElement('h3')
    h3.classList.add('userName')
    h3.innerText = name
    userInfo.append(h3)

    const text = document.createElement('div')
    text.classList.add('text')
    const p = document.createElement('p')
    p.innerText = message;
    text.append(p)
    
    messageElement.append(userInfo)
    messageElement.append(text)
    messageContainer.append(messageElement)


}

function appendWelcome(name){
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')

    const text = document.createElement('div')
    text.classList.add('text')
    const p = document.createElement('p')
    p.innerText = `${name} has joined the chat`;
    text.append(p)
    
    messageElement.append(text)
    messageContainer.append(messageElement)


}
