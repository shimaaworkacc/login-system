
var users = [];

var userNameInput = document.getElementById('signupName');
var userEmailInput = document.getElementById('signupEmail');
var userPasswordInput = document.getElementById('signupPassword');


if (JSON.parse(localStorage.getItem('users'))) {
  users = JSON.parse(localStorage.getItem('users'));
}

document.getElementById('signupName').addEventListener('input', function () {
  validateName();
});

document.getElementById('signupEmail').addEventListener('input', function () {
  validateEmail();
});

document.getElementById('signupPassword').addEventListener('input', function () {
  validatePassword();
});

function validateName() {
  var nameRegex = /^(?:[a-zA-Z]{3,}(?: [a-zA-Z]{3,})*)$/;
  if (nameRegex.test(userNameInput.value)) {
    userNameInput.classList.add('is-valid');
    userNameInput.classList.remove('is-invalid');
    if (userNameInput.nextElementSibling) {
      userNameInput.nextElementSibling.classList.add('d-none');
    }
    return true;
  } else {
    userNameInput.classList.add('is-invalid');
    userNameInput.classList.remove('is-valid');
    if (userNameInput.nextElementSibling) {
      userNameInput.nextElementSibling.classList.replace('d-none', 'd-block');
    }
    return false;
  }
}

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
document.getElementById('signupBtn').addEventListener('click', addUser);
function addUser() {
  if (validateName() && validateEmail() && validatePassword()) {
    addToStorage();
  }
  else {
    document.getElementById('signupError').classList.replace('d-none', 'd-block');
  }
}

function checkExistingUser() {
  var email = userEmailInput.value;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      document.getElementById('existsError').classList.replace('d-none', 'd-block');//exists
      return true;
    }
  }
  document.getElementById('existsError').classList.replace('d-block', 'd-none');
  return false;
}
function addToStorage() {
  if (checkExistingUser() === false) {
    users.push({
      name: userNameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
    });
    localStorage.setItem('users', JSON.stringify(users));
    clearInputs();
    document.getElementById('signupError').classList.replace('d-none', 'd-block');
    document.getElementById('signupError').classList.replace('text-danger', 'text-success');
    document.getElementById('signupError').innerHTML = 'User registered successfully!';

  }
}

function home() {
  window.location.href = 'home.html';
}

function clearInputs() {
  userNameInput.value = '';
  userEmailInput.value = '';
  userPasswordInput.value = '';
  userNameInput.classList.remove('is-valid', 'is-invalid');
  userEmailInput.classList.remove('is-valid', 'is-invalid');
  userPasswordInput.classList.remove('is-valid', 'is-invalid');
  if (userNameInput.nextElementSibling) {
    userNameInput.nextElementSibling.classList.add('d-none');
  }
  if (userEmailInput.nextElementSibling) {
    userEmailInput.nextElementSibling.classList.add('d-none');
  }
  if (userPasswordInput.nextElementSibling) {
    userPasswordInput.nextElementSibling.classList.add('d-none');
  }
}