let loginFrm = document.getElementById('login-form');
let loginEmail = document.getElementById('login_email');
let loginPassword = document.getElementById('login_password');
let loginError = document.querySelector('.error');
let loginLoader = document.querySelector('.login_loader');

const loginUrl = 'https://ibahoo.herokuapp.com';
let loginStatus;

const verifyData = (email, password, obj) => {
  const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

  if (password.length < 3) {
    loginError.style.color = 'rgb(174, 44, 12)';
    loginError.innerHTML =
      'Please create strong password, at least 3 characters long';
    return false;
  }
  if (!emailFormat.test(email)) {
    loginError.style.color = 'rgb(174, 44, 12)';
    loginError.innerHTML = 'Email shoulld look like test@gmail.com';
    return false;
  } else {
    loginSubimit(obj);
  }
};

function loginSubimit(obj) {
  loginLoader.style.display = 'inline-block';

  fetch(`${loginUrl}/ibahoo/users/login`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      loginStatus = res.status;
      return res.json();
    })
    .then((data) => {
      if (loginStatus != 200) {
        loginError.style.color = 'rgb(174, 44, 12)';
        loginError.innerHTML = data.msg;
      } else {
        console.log(data);
        loginError.style.color = 'rgba(0, 44, 32, 0.795)';
        loginError.innerHTML = 'Successfully loged in';
        setTimeout(() => {
          window.location = './coming_soon';
        }, 4000);
      }
    });
}
loginFrm.onsubmit = (e) => {
  e.preventDefault();
  const emailData = loginEmail.value;
  const passwordValue = loginPassword.value;

  const submitOption = {
    email: emailData,
    password: passwordValue,
  };

  verifyData(emailData, passwordValue, submitOption);
};
