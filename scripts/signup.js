let signupFrm = document.getElementById('signup-form');
let signupEmail = document.getElementById('email');
let firstName = document.getElementById('firstName');
let secondName = document.getElementById('secondName');
let signupPassword = document.getElementById('password');
let passwordConfirmation = document.getElementById('cfrmPassword');
let error = document.querySelector('.signup_error');
let loader = document.querySelector('.signupu_loads');

const url = 'https://ibahoo.herokuapp.com';
let status;

/**
 * Methods for signup validation
 */
const verify = (
  firstName,
  secondName,
  email,
  password,
  passwordConfirmation,
  obj
) => {
  const nameFormat = /^[a-z ,.'-]+$/i;
  const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

  if (!nameFormat.test(firstName)) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'first Name should be provided and valid';
    return false;
  }
  if (!nameFormat.test(secondName)) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'second Name should be provided and valid';
    return false;
  }
  if (password.length < 3) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML =
      'Please create strong password, at least 3 characters long';
    return false;
  }
  if (password !== passwordConfirmation) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'Your password should match';
    return false;
  }
  if (!emailFormat.test(email)) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'Email shoulld look like test@gmail.com';
    return false;
  } else {
    subimit(obj);
  }
};

function subimit(obj) {
  loader.style.display = 'inline-block';

  fetch(`${url}/ibahoo/users/signup`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      if (status != 201) {
        error.style.color = 'rgb(174, 44, 12)';
        error.innerHTML = data.msg;
      } else {
        console.log(data);
        error.style.color = 'rgba(0, 44, 32, 0.795)';
        error.innerHTML = 'Account successfully created';
        setTimeout(() => {
          window.location = './coming_soon';
        }, 4000);
      }
    });
}
signupFrm.onsubmit = (e) => {
  e.preventDefault();
  const emailData = signupEmail.value;
  const firstNameValue = firstName.value;
  const secondNameValue = secondName.value;
  const passwordValue = signupPassword.value;
  const cfrmPasswordValue = passwordConfirmation.value;

  const submitOption = {
    email: emailData,
    firstName: firstNameValue,
    secondName: secondNameValue,
    password: passwordValue,
  };

  verify(
    firstNameValue,
    secondNameValue,
    emailData,
    passwordValue,
    cfrmPasswordValue,
    submitOption
  );
};
