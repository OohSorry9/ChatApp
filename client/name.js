const socket = io('http://localhost:3000')

const nameForm = document.getElementById('nameForm')
const nameInput = document.getElementById('name')

let NAME = 'john';

nameForm.addEventListener('submit', e=>{
    e.preventDefault()
    const name = nameInput.value
    console.log(name)
    NAME = name
    
    location.href = '/client/chat-app.html'

})



