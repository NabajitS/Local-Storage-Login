let main = document.querySelector('.main');
let overlayContainer = document.querySelector('.container');
let welcomeString = document.getElementById('welcome-string');
let introDiv = document.querySelector('.intro-div');

let createAccountBtn = document.querySelector('.create-account');
let signInBtn = document.querySelector('.sign-in');

let logoutBtn = document.querySelector('.logout-btn');


window.addEventListener('load', check_if_loggedin);


function opacityAndVisibility(opacity, visibility) {
    overlayContainer.style.opacity = `${opacity}`;
    overlayContainer.style.visibility = `${visibility}`;
}



logoutBtn.addEventListener('click', function () {
    localStorage.setItem('loggedIn', 'false');
    introDiv.style.display = 'block';
    logoutButtonDisplay();
})



// To make the screen back to default and logout of the currently open account on logout button press
function logoutButtonDisplay() {
    opacityAndVisibility(0, 'hidden');
    main.style.opacity = '1';
    main.style.visibility = 'visible'

    welcomeString.textContent = '';

    document.querySelector(`.create-account-form`).style.display = 'none';
    document.querySelector(`.sign-in-form`).style.display = 'none';

    let inputs = document.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.value = '';
    })

    logoutBtn.style.display = 'none';

    signInBtn.style.display = createAccountBtn.style.display = 'inline';
    
}


function check_if_loggedin() {
    let n = localStorage.getItem('loggedIn');
    console.log(n);
    if (n == 'true') {
        main.style.opacity = 0;
        main.style.visibility = 'hidden';

        introDiv.style.display = 'none';
        signInBtn.style.display = createAccountBtn.style.display = 'none';


        welcomeString.textContent = `Welcome Bro ${localStorage.getItem('currentLoggedUser')}`

        logoutBtn.style.display = 'inline';
        logoutBtn.addEventListener('click', function () {
            logoutButtonDisplay();
        })
    }

    if (n == 'false') {
        main.style.opacity = 1;
        main.style.visibility = 'visible';
    }
}




createAccountBtn.addEventListener('click', function (e) {
    logoutButtonDisplay();
    whichFormAndOverlay(e);
})

document.querySelector('.create-account-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let userName = document.getElementById('create-username');
    let passWord = document.getElementById('create-password');

    localStorage.setItem(`${userName.value}`, `${passWord.value}`)

    if (userName.value && passWord.value) {

        //TO keep track if user is logged in
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentLoggedUser', `${userName.value}`);

        opacityAndVisibility(0, 'hidden');
        main.style.opacity = '0';
        main.style.visibility = 'hidden'

        signInBtn.style.display = createAccountBtn.style.display = 'none';
        welcomeString.textContent = 'Thanks For joining us ' + userName.value;

        logoutBtn.style.display = 'inline';
    }
})




signInBtn.addEventListener('click', function (e) {
    logoutButtonDisplay();
    whichFormAndOverlay(e);
})

function checkUserExists(username) {
    for (let i = 0; i < localStorage.length; i++) {
        let keyName = localStorage.key(i);
        if (keyName == username) {
            return keyName;
        }
    }
}


function signInFunc(e) {
    e.preventDefault();

    let userName = document.getElementById('sign-in-username');
    let passWord = document.getElementById('sign-in-password');

    let takeUsername = checkUserExists(userName.value);

    if (userName.value && passWord.value) {

        if (takeUsername && passWord.value == localStorage.getItem(takeUsername)) {

            opacityAndVisibility(0, 'hidden');
            main.style.opacity = '0';
            main.style.visibility = 'hidden'

            welcomeString.textContent = `Welcome Bro ${takeUsername}`
        

        signInBtn.style.display = 'none';
        createAccountBtn.style.display = 'none';

        //TO keep track if user is logged in
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentLoggedUser', `${takeUsername}`);

        //For the logout button
        logoutBtn.style.display = 'inline';
    }
}
}

document.querySelector('.sign-in-form').addEventListener('submit', signInFunc)


//Selects which form to display based on click on either sign in or create account

function whichFormAndOverlay(e) {
    opacityAndVisibility(1, 'visible')

    introDiv.style.display = 'none';

    let formSelect = e.target.classList.contains('create-account') ? 'create-account' : 'sign-in';
    document.querySelector(`.${formSelect}-form`).style.display = 'block';
}




