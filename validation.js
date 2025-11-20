const form = document.getElementById('form');
const firstname_input = document.getElementById('firstName');
const email_input = document.getElementById('email');
const password_input = document.getElementById('password');
const error_message = document.getElementById('error_message');
//const submit_button=document.querySelector('button[type="submit"]');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let errors = getSignUpErros(firstname_input.value, email_input.value, password_input.value);

    if (errors.length > 0) {
        showError(errors.join('. '));
        return;
    }
    hideError();
    
    try {
        saveData();  // will throw error if duplicate
        window.location.href = "index.html";
    } catch (e) {
        return;  // stop redirect if duplicate email
    }
});
    
function getSignUpErros(firstname, email, password) {
    let errors = [];
    if (firstname === '' || firstname === null) {
        errors.push('The First Name is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if (email === '' || email === null) {
        errors.push('The Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password === null) {
        errors.push('The password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

function getLoginErros(email, password) {
    let errors = [];
    if (email === '' || email === null) {
        errors.push('The Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password === null) {
        errors.push('The password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}
function showError(message) {
    error_message.textContent = message;
    error_message.classList.remove('d-none');
    error_message.classList.add('alert', 'alert-danger');
}
function hideError() {
    error_message.textContent = '';
    error_message.classList.add('d-none');
}
const allInputs = [firstname_input, email_input, password_input].filter(Boolean);
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            hideError();
        }
    })
})


//local storage 
function saveData() {
    let name, email, password;
    name = document.getElementById("firstName").value;

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    //  localStorage.setItem("name",name);
    //  localStorage.setItem("email", email);
    //  localStorage.setItem("password",password);

    let user_records = new Array();
    user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
    if (user_records.some(user => user.email === email)) {

        email_input.parentElement.classList.add('incorrect');

        showError("This email is already registered. Try another one.");
        throw new Error("Duplicate email"); // stop execution
    }else {
        user_records.push({
            "name": name,
            "email": email,
            "password": password
        })
        localStorage.setItem("users", JSON.stringify(user_records));
    }
}

function getData() {
    let email, password;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    let user_records = new Array();
    user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
    if (user_records.some((v) => {
        return v.email == email && v.password == password;
    })) {
        hideError();
        window.location.assign("main");
        let current_user = user_records.filter((v) => {
            return v.email == email && v.password == password
        })[0];
        localStorage.setItem("name", current_user.name);
        localStorage.setItem("email", current_user.email);
        window.location.assign("index.html"); 
    }
    else {
        showError('the email or the password is incorrect')
    }
    
}

