const form = document.getElementById('form');
const firstname_input =document.getElementById('firstName');
const email_input =document.getElementById('email');
const password_input =document.getElementById('password');
const error_message=document.getElementById('error_message');
//const submit_button=document.querySelector('button[type="submit"]');
form.addEventListener('submit',(e)=>{
    let errors=[];
    if(firstname_input){
        errors=getSignUpErros(firstname_input.value,email_input.value,password_input.value);
}else{
    errors=getLoginErros(email_input.value,password_input.value);
}
if(errors.length > 0){
    e.preventDefault()
    showError(errors.join('. '));
}else{
    hideError();
}
})
function getSignUpErros(firstname,email,password){
let errors=[];
if(firstname==='' || firstname===null){
 errors.push('The First Name is required');
 firstname_input.parentElement.classList.add('incorrect');
}
if(email==='' || email===null){
    errors.push('The Email is required');
    email_input.parentElement.classList.add('incorrect');
   }
   if(password==='' || password===null){
    errors.push('The password is required');
    password_input.parentElement.classList.add('incorrect');
   }
   return errors;
}

function getLoginErros(email,password){
    let errors=[];
    if(email==='' || email===null){
        errors.push('The Email is required');
        email_input.parentElement.classList.add('incorrect');
       }
       if(password==='' || password===null){
        errors.push('The password is required');
        password_input.parentElement.classList.add('incorrect');
       }
       return errors;
    }
    function showError(message){
        error_message.textContent = message;
        error_message.classList.remove('d-none');
        error_message.classList.add('alert', 'alert-danger');
    }
    function hideError(){
        error_message.textContent='';
        error_message.classList.add('d-one');
    }
const allInputs=[firstname_input,email_input,password_input].filter(Boolean);
allInputs.forEach(input =>{
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect');
            hideError();
        }
    })
})
