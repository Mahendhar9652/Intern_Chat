"use strict";
const userDetailD = document.getElementById("userDisplay");
const userImageD = document.getElementById("userImage");
const recentUsersDisplay = document.getElementById("display");
const allUserss = JSON.parse(localStorage.getItem("users") || "[]");
const loginUsers = JSON.parse(sessionStorage.getItem("loginUser") || '[]');
var msgs = JSON.parse(localStorage.getItem("msgs") || '[]');
const allLoginUsersLists = JSON.parse(localStorage.getItem("loginUser") || "[]");
function logout() {
    let indexs = allLoginUsersLists.findIndex((user, index) => user.username == loginUser[0].username);
    allLoginUsersLists.splice(indexs, 1);
    localStorage.setItem("loginUser", JSON.stringify(allLoginUsersLists));
    sessionStorage.clear();
    window.location.href = "../index.html";
}
loginUsers.forEach(user => {
    const option = document.createElement("option");
    option.textContent = user.username;
    userDetailD.appendChild(option);
    if (user.image) {
        userImageD.src = user.image;
        userImageD.style.display = "block";
    }
    else {
        userImageD.style.display = "none";
    }
});
function renderRecentUsers() {
    let msgsUser = msgs.filter((user) => user.senderUsername == loginUsers[0].username);
    let recentUsers = [];
    msgsUser.forEach((user) => {
        if (!recentUsers.some((recentUser) => recentUser.user === user.receiverUsername ||
            recentUser.user === user.senderUsername)) {
            recentUsers.push({ user: user.receiverUsername });
        }
        if (!recentUsers.some((recentUser) => recentUser.user === user.senderUsername ||
            recentUser.user === user.receiverUsername)) {
            recentUsers.push({ user: user.senderUsername });
        }
    });
    recentUsers.forEach((user) => {
        recentUsersDisplay.innerHTML += `
        <div class='card'>
          <div class='card-body'>
            <h1>${user.user}</h1>
            <button class="btn btn-primary" onclick="messageNavigatePages('${user.user}')">Message</button>
          </div>
        </div>
      `;
    });
}
renderRecentUsers();
function messageNavigatePages(username) {
    window.location.href = `./message.html?username=${username}`;
}
