/*----------------------Adatok validálása-------------------------*/

let nameInput = document.form.username;
let emailInput = document.form.email;
let passwordInput = document.form.password;
let rePasswordInput = document.form.repassword;

let userNameIsValid = false;
let emailIsValid = false;
let passwordIsValid = false;
let passwordsAreSame = false;

nameInput.onchange = () => {
    let username = nameInput.value;
    // console.log(nameInput.value);
    // let userValid = false;
    // if (username.length > 5) {
    //     userValid = true;
    // }
    userNameIsValid = username.length > 5 ? true : false;
    document.querySelector(".error-username").style.display = userNameIsValid ?
        "none" :
        "block";
    document.querySelector("button").disabled = allInputsAreInvalid();
};

emailInput.onchange = () => {
    let email = emailInput.value;
    emailIsValid = email.length > 5 && email.includes("@") ? true : false;
    document.querySelector(".error-email").style.display = emailIsValid ?
        "none" :
        "block";
    document.querySelector("button").disabled = allInputsAreInvalid();
};

passwordInput.onchange = () => {
    let password = passwordInput.value;
    passwordIsValid = password.length > 5 ? true : false;
    document.querySelector(".error-password").style.display = passwordIsValid ?
        "none" :
        "block";
    document.querySelector("button").disabled = allInputsAreInvalid();
};

rePasswordInput.onchange = () => {
    let rePassword = rePasswordInput.value;
    let originPassword = passwordInput.value;
    passwordsAreSame =
        rePassword.length > 5 && rePassword === originPassword ? true : false;
    document.querySelector(".error-re-password").style.display = passwordsAreSame ?
        "none" :
        "block";
    document.querySelector("button").disabled = allInputsAreInvalid();
};

function allInputsAreInvalid() {
    let allInvalid = true;
    if (userNameIsValid && emailIsValid && passwordIsValid && passwordsAreSame) {
        allInvalid = false;
    }
    return allInvalid;
}

/*-------------------------Server -re küldés (& Bejelentkezés + cookie)------------------------*/

document.querySelector("button").addEventListener("click", () => {
    const user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    // XMLHttpRequest -el:
    const httpRequestObj = new XMLHttpRequest();
    const URL = "http://localhost:3000/users";
    httpRequestObj.open("POST", URL);
    httpRequestObj.setRequestHeader(
        "Content-Type",
        "application/json; charset=UTF-8"
    );
    httpRequestObj.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            const responseTextObj = JSON.parse(this.responseText);
            alert(
                `Hello ${responseTextObj.name}! Your datas have been successfully saved!`
            );
            setUserStatus();
            setCookie(responseTextObj.id, 1);
            window.location = "index.html";
        }
    };
    httpRequestObj.send(JSON.stringify(user));
});

/*-------------------------Cookie & LocalStorage-----------------------------------------*/

function setUserStatus() {
    localStorage.setItem("user", "signed_in");
}

function setCookie(userId, expirationDay) {
    const now = new Date();
    now.setTime(now.getTime() + expirationDay * 24 * 60 * 60 * 1000);
    const expires = now.toUTCString();
    document.cookie = `user_id=${userId};expires=${expires};path=/`;
    createSignOutLink();
}

function createSignOutLink() {
    const parent = document.querySelector("form");
    const link = document.createElement("a");
    link.textContent = "Kilépés";
    link.style.color = "teal";
    link.className = "signout";
    link.href = "#";
    link.onclick = () => {
        link.remove();
        localStorage.removeItem("user");
        document.cookie = `user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    };
    parent.appendChild(link);
}