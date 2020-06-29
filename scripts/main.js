const signing = document.querySelector('.signing');
const sideDrawer = document.querySelector('.sideDrawer');
const signing_btn = document.querySelector('.log-in');
const signup_btn = document.querySelector('.sign-up');
const signingUp = document.querySelector('.signing_up');

let loginDisplay = false;
let signUpDisplay = false;
let sideDraw = false;

const toggleLogin = (loginDisplay) => {
  sideDraw = true;
  signUpDisplay = false;
  toggleDisplay(signUpDisplay, signingUp, sideDraw);
  toggleDisplay(loginDisplay, signing, sideDraw);
};

const toggleSignup = (signUpDisplay) => {
  sideDraw = true;
  loginDisplay = false;
  toggleDisplay(loginDisplay, signing, sideDraw);
  toggleDisplay(signUpDisplay, signingUp, sideDraw);
};

function toggleDisplay(display, element, sideDraw) {
  if (display && sideDraw) {
    element.style.display = 'inherit';
    sideDrawer.style.display = 'inherit';
  } else {
    element.style.display = 'none';
    sideDrawer.style.display = 'none';
  }
}

signing_btn.addEventListener('click', () => {
  loginDisplay = !loginDisplay;
  toggleLogin(loginDisplay);
});
signup_btn.addEventListener('click', () => {
  signUpDisplay = !signUpDisplay;
  toggleSignup(signUpDisplay);
});

sideDrawer.addEventListener('click', () => {
  loginDisplay = false;
  signUpDisplay = false;
  toggleDisplay(loginDisplay, signing);
  toggleDisplay(signUpDisplay, signingUp);
});
