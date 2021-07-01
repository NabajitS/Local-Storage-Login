let overlayContainer = document.querySelector('.container');
let createAccountBtn = document.querySelector('.create-account');
let signInBtn = document.querySelector('.sign-in');

let logoutBtn = document.querySelector('.logout-btn');


function opacityAndVisibility(opacity, visibility) {
    overlayContainer.style.opacity = `${opacity}`;
    overlayContainer.style.visibility = `${visibility}`;
}

// window.addEventListener('load', check_if_loggedin);


// To make the screen back to default and logout of the currently open account on logout button press
function logoutButtonDisplay(username, password) {
    opacityAndVisibility(1, 'visible');

    document.querySelector(`.create-account-form`).style.display = 'none';
    document.querySelector(`.sign-in-form`).style.display = 'none';

    username.value = password.value = '';
    
    logoutBtn.style.display = 'none';
}




createAccountBtn.addEventListener('click', function (e) {
    whichFormAndOverlay(e);
})

document.querySelector('.create-account-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let userName = document.getElementById('create-username');
    let passWord = document.getElementById('create-password');

    localStorage.setItem(`${userName.value}`, `${passWord.value}`)

    if (userName.value && passWord.value) {

        opacityAndVisibility(0, 'hidden');

        document.querySelector('p').textContent = 'Thanks For joining us ' + userName.value;

        logoutBtn.style.display = 'inline';
        logoutBtn.addEventListener('click', function () {
            logoutButtonDisplay(userName, passWord);
        })
    }
})




signInBtn.addEventListener('click', function (e) {
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
    function forPassword() {

        // name = takeUsername;
        if (takeUsername && passWord.value == localStorage.getItem(takeUsername)) {

            opacityAndVisibility(0, 'hidden');
            document.querySelector('p').textContent = `Welcome Bro ${takeUsername}`
        }
    }

    if (userName.value && passWord.value) {
        forPassword();

        //TO keep track if user is logged in
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentLoggedUser', `${takeUsername}`);

        //For the logout button
        logoutBtn.style.display = 'inline';
        logoutBtn.addEventListener('click', function () {
            logoutButtonDisplay(userName, passWord);
        })
    }
}

document.querySelector('.sign-in-form').addEventListener('submit', signInFunc)






function check_if_loggedin() {
    let n = localStorage.getItem('loggedIn');
    console.log(n);
    if (n == 'true') {
        overlayContainer.style.opacity = 0;
        overlayContainer.style.visibility = 'hidden';

        document.querySelector('p').textContent = `Welcome Bro ${localStorage.getItem('currentLoggedUser')}`
    }

    if(n == 'false'){
        overlayContainer.style.opacity = 1;
        overlayContainer.style.visibility = 'visible';
    }
}


//Selects which form to display based on click on either sign in or create account
function whichFormAndOverlay(e) {
    // overlayContainer.style.opacity = 1;
    // overlayContainer.style.visibility = 'visible';

    let formSelect = e.target.classList.contains('create-account') ? 'create-account' : 'sign-in';
    document.querySelector(`.${formSelect}-form`).style.display = 'block';
}







// document.querySelector('.sign-in-form').addEventListener('submit', function (e) {
//     e.preventDefault();

//     let userName = document.getElementById('sign-in-username');
//     let passWord = document.getElementById('sign-in-password');

//     function forPassword() {
//         let takeUsername = showId(userName.value);

//         if (takeUsername && passWord.value == localStorage.getItem(takeUsername)) {
//             overlayContainer.style.opacity = 0;
//             overlayContainer.style.visibility = 'hidden';

//             document.querySelector('p').textContent = `Welcome Back ${userName.value}`
//         }
//     }

//     if (userName.value && passWord.value) {
//         forPassword();
//     }
// })


