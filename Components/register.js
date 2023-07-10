"use strict";
var username = document.getElementById("username");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");
var myForm = document.getElementById("myForm");
const users = JSON.parse(localStorage.getItem("users") || "[]");
function formSubmit(e) {
    e.preventDefault();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    // Validate username
    if (usernameValue === '') {
        alert('Please enter a username');
        return;
    }
    // Validate password
    if (passwordValue === '') {
        alert('Please enter a password');
        return;
    }
    if (passwordValue.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    // Validate confirm password
    if (confirmPasswordValue === '') {
        alert('Please confirm your password');
        return;
    }
    if (passwordValue !== confirmPasswordValue) {
        alert('Passwords do not match');
        return;
    }
    const newUser = {
        username: usernameValue,
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
    };
    users.push(newUser);
    console.log(users);
    alert('Registered successfully');
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = '../';
}
myForm.addEventListener('submit', formSubmit);
