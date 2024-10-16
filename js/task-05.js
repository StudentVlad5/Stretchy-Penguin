const nameInput = document.querySelector('#name-input');
const nameOutput = document.querySelector('#name-output');

nameInput.addEventListener('input',(event)=>{
    nameOutput.textContent = event.currentTarget.value;
    if(!event.currentTarget.value.length) {
        nameOutput.textContent = "Anonymous";
    }
})