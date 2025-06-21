
var users = [];

var userEmailInput = document.getElementById('LoginEmail');
var userPasswordInput = document.getElementById('LoginPassword');


if (JSON.parse(localStorage.getItem('users'))) {
  users = JSON.parse(localStorage.getItem('users'));
}

document.getElementById('LoginEmail').addEventListener('input', function () {
  validateEmail();
});

document.getElementById('LoginPassword').addEventListener('input', function () {
  validatePassword();
});

function validateEmail() {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(userEmailInput.value)) {
    userEmailInput.classList.add('is-valid');
    userEmailInput.classList.remove('is-invalid');
    if (userEmailInput.nextElementSibling) {
      userEmailInput.nextElementSibling.classList.replace('d-block', 'd-none');
    }
    return true;
  } else {
    userEmailInput.classList.add('is-invalid');
    userEmailInput.classList.remove('is-valid');
    userEmailInput.nextElementSibling.classList.replace('d-none', 'd-block');
    return false;
  }
}

function validatePassword() {
  if (userPasswordInput.value.length >= 6) {
    userPasswordInput.classList.add('is-valid');
    userPasswordInput.classList.remove('is-invalid');
    userPasswordInput.nextElementSibling.classList.replace('d-block', 'd-none');
    return true;
  } else {
    userPasswordInput.classList.add('is-invalid');
    userPasswordInput.classList.remove('is-valid');
    userPasswordInput.nextElementSibling.classList.replace('d-none', 'd-block');
    return false;
  }
}

document.getElementById('loginBtn').addEventListener('click', login);

function login() {
  if (validateEmail() && validatePassword()) {
    checkExistingUser();

  }
  else {
    document.getElementById('loginError').classList.replace('d-none', 'd-block');
  }
}

function checkExistingUser() {
  var email = userEmailInput.value;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      if (users[i].password === userPasswordInput.value) {
        home(users[i].name);
        return true;
      }
      else {
        document.getElementById('loginError').innerHTML = 'Incorrect password';
        document.getElementById('loginError').classList.replace('d-none', 'd-block');
        return false;
      }
    }
  }
  document.getElementById('loginError').innerHTML = "Sorry, couldn't find this email";
  document.getElementById('loginError').classList.replace('d-none', 'd-block');

  return false;
}
function home(name) {
  document.getElementById('home').classList.replace('d-none', 'd-block');
  document.getElementById('home').innerHTML += `<h1>Welcome, ${name}!</h1>`;
  document.getElementById('loginSection').classList.replace('d-block', 'd-none');
  document.getElementById('signupSection').classList.replace('d-block', 'd-none');
}