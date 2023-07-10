const logOut = document.getElementById("logout") as HTMLButtonElement;
const usersContainers = document.getElementById("users") as HTMLElement;
const userDisplays = document.getElementById("userDisplay") as HTMLSelectElement;
const userImages = document.getElementById("userImage") as HTMLImageElement;
const userSearch = document.getElementById("usersSearch") as HTMLInputElement;

interface UserType {
  username: string;
  password: string;
  confirmPassword: string;
}

const allUsersList: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
const currentLoginUser: UserType[] = JSON.parse(sessionStorage.getItem("loginUser") || '[]');
const allLoginUserListss: Login[] = JSON.parse(localStorage.getItem("loginUser") || "[]");

currentLoginUser.forEach(user => {
  const option = document.createElement("option");
  option.textContent = user.username;
  userImages.src = user.image;
  userDisplays.appendChild(option);
});

function renderUsers(userList: UserType[]): void {
  usersContainers.innerHTML = ""; 

  userList.forEach(user => {
    usersContainers.innerHTML +=  
    `<div class="card" style="width: 18rem;">
    ${user.image ? `<img src="${user.image}" class="card-img-top profile-img" alt="...">` : ''}
    <div class="card-body">
      <h5 class="card-title">${user.username}</h5>
      ${user.email ? `<p class="card-text">${user.email}</p>` : ''}
      ${user.bio ? `<p class="card-text">${user.bio}</p>` : ''}
      <button class="btn btn-primary" onclick="messageNavigatePage('${user.username}')">Message</button>
    </div>
  </div>`;
  });
}

const exceptLoginUser:UserType[] = allUsersList.filter(user => user.username !=currentLoginUser[0].username);

function searchFun(): void {
  const searchTerm = userSearch.value.toLowerCase();
  if (searchTerm === "") {
    renderUsers(exceptLoginUser);
  } else {
    const searchedUsers = allUsersList.filter(user => user.username.toLowerCase().includes(searchTerm));
    renderUsers(searchedUsers);
  }
}

logOut.addEventListener("click", () => {
  let indexs = allLoginUserListss.findIndex((user, index) => user.username == loginUser[0].username);
  allLoginUserListss.splice(indexs, 1);
  localStorage.setItem("loginUser", JSON.stringify(allLoginUserListss));
  sessionStorage.clear();
  window.location.href = "../index.html";

});

function messageNavigatePage(username: string): void {
  window.location.href = `./message.html?username=${username}`;
}

// Initial rendering of all users
renderUsers(exceptLoginUser);
