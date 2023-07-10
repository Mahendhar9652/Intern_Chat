var userDisplay = document.getElementById("userDisplay") as HTMLSelectElement;
var messageUserDisplay = document.getElementById('user') as HTMLElement;
var messageInput = document.getElementById('message-input') as HTMLInputElement;
var msgsDisplay = document.getElementById('msgs') as HTMLElement;
var leftMsgs = document.getElementsByClassName('left-msgs')[0] as HTMLElement;
var rightMsgs = document.getElementsByClassName('right-msgs')[0] as HTMLElement;
var userImage = document.getElementById("userImage") as HTMLImageElement;
var clearMsgs = document.getElementById("clearMsgs") as HTMLButtonElement;

function getUsernameFromURL(): string | null {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');
  return username;
}

const msgUsername: string | null = getUsernameFromURL();

interface UserType {
  username: string;
  password: string;
  confirmPassword: string;
  image: string;
  email: string;
  bio: string;
}

interface MsgType {
  senderUsername: string | null;
  receiverUsername: string | null;
  message: string;
  date: string;
  time: string;
  type: string;
}

const allUserData: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
const loginUserData: UserType[] = JSON.parse(sessionStorage.getItem("loginUser") || '[]');
var msgs: MsgType[] = JSON.parse(localStorage.getItem("msgs") || '[]');
const allLoginUserList: Login[] = JSON.parse(localStorage.getItem("loginUser") || "[]");


loginUserData.forEach(user => {
  const option = document.createElement("option");
  option.textContent = user.username;
  userDisplay.appendChild(option);
  if (user.image) {
    userImage.src = user.image;
    userImage.style.display = "block";
  } else {
    userImage.style.display = "none";
  }
});


const filteredUsersData = allUserData.filter(user => user.username === msgUsername);
let onlineOrOffline =allLoginUserList.some(user=>user.username === msgUsername);




filteredUsersData.forEach(user => {
  messageUserDisplay.innerHTML += `
    <div class="card" style="width: 18rem;">
      ${user.image ? `<img src="${user.image}" class="card-img-top profile-img" alt="...">` : ''}
      <div class="card-body">
      <div class='card-div'>
      <h5 class="card-title">${user.username}</h5>
        ${onlineOrOffline ? `<p class="card-text online">online</p>` : `<p class='card-text'>offline</p>`}
      </div>
      </div>
    </div>`;
});

function send(): void {
  const msgObj: MsgType = {
    senderUsername: loginUserData[0].username,
    receiverUsername: msgUsername,
    message: messageInput.value,
    date: '',
    time: '',
    type: "message",
  };

  const dateObj = new Date();
  msgObj.date = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
  msgObj.time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
  msgs.push(msgObj);
  localStorage.setItem("msgs", JSON.stringify(msgs));
  msgsRendering();
  messageInput.value = '';
}

function msgsRendering() {
  let filteredMsgs = msgs.filter(
    (msg) =>
      (msg.senderUsername === loginUserData[0].username &&
        msg.receiverUsername === msgUsername) ||
      (msg.senderUsername === msgUsername &&
        msg.receiverUsername === loginUserData[0].username)
  );

  var sendingMsgs = filteredMsgs.filter(
    (msg) => msg.senderUsername === loginUserData[0].username
  );
  var receivingMsgs = filteredMsgs.filter(
    (msg) => msg.senderUsername === msgUsername
  );

  leftMsgs.innerHTML = '';
  rightMsgs.innerHTML = '';

  sendingMsgs.forEach((msg, index) => {
    rightMsgs.innerHTML += `
      <div class='msg-container'>
        <p class='msg-text'>${msg.message}</p>
      </div>`;
  });

  receivingMsgs.forEach((msg, index) => {
    leftMsgs.innerHTML += `
      <div class='msg-container'>
        <p class='msg-text'>${msg.message}</p>
      </div>`;
  });
}




function logoutUsers(): void {
  let indexs = allLoginUserList.findIndex((user, index) => user.username == loginUser[0].username);
  allLoginUserList.splice(indexs, 1);
  localStorage.setItem("loginUser", JSON.stringify(allLoginUserList));
  sessionStorage.clear();
  window.location.href = "../index.html";
 }

msgsRendering();
