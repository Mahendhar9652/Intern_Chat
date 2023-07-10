"use strict";
const allUserLists = JSON.parse(localStorage.getItem("users") || "[]");
const loginUserr = JSON.parse(sessionStorage.getItem("loginUser") || '[]');
const allLoginUserLists = JSON.parse(localStorage.getItem("loginUser") || "[]");
// Get the necessary HTML elements
const profileInfo = document.getElementsByClassName('profile-info')[0];
const profileEditContainer = document.getElementsByClassName('profile-edit')[0];
const profileEditForm = document.getElementsByClassName('profile-form')[0];
const userImagess = document.getElementById("userImage");
const emailInput = document.querySelector('#email');
const imageInput = document.querySelector('#image');
const bioInput = document.querySelector('#bio');
const profileForm = document.querySelector('.profile-form');
// Populate user display options and set user image
loginUserr.forEach(user => {
    const option = document.createElement("option");
    option.textContent = user.username;
    userImagess.src = user.image;
    userDisplay.appendChild(option);
});
// Filter and display user profile information
const filteredUserss = allUserLists.filter(user => user.username == loginUserr[0].username);
filteredUserss.forEach(user => {
    profileInfo.innerHTML += `
    <div class="card-group" style="width: 18rem;">
      <div class="card-heading">User Details</div>
      ${user.image ? `<img src="${user.image}" class="card-img-top profile-img" alt="...">` : ''}
      <div class="card-body">
        <div>
          <label class="card-label">Username:</label>
          <span class="card-text card-username">${user.username}</span>
          ${user.email ? `<p class="card-text"><label class="card-label">Email:</label>${user.email}</p>` : ''}
          ${user.bio ? `<p class="card-text"><label class="card-label">Bio:</label>${user.bio}</p>` : ''}
        </div>
        <button class="btn btn-primary update-btn" onclick="profileEdit('${user.username}')">Edit</button>
      </div>
    </div>
  `;
});
function logoutUser() {
    let indexs = allLoginUserLists.findIndex((user, index) => user.username == loginUser[0].username);
    allLoginUserLists.splice(indexs, 1);
    localStorage.setItem("loginUser", JSON.stringify(allLoginUserLists));
    sessionStorage.clear();
    window.location.href = "../index.html";
}
// Handle profile edit form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const filteredIndex = allUserLists.findIndex(user => user.username === loginUserr[0].username);
    if (emailInput.value != allUserLists[filteredIndex].email && imageInput.value != allUserLists[filteredIndex].image) {
        allUserLists[filteredIndex].username = loginUserr[0].username;
        allUserLists[filteredIndex].email = emailInput.value;
        allUserLists[filteredIndex].image = imageInput.value;
        allUserLists[filteredIndex].bio = bioInput.value;
        console.log(allUserLists);
        alert('Updated successfully');
        localStorage.setItem("users", JSON.stringify(allUserLists));
        logoutUser();
    }
    else {
        alert('Details already exist');
    }
    profileForm.reset();
}
profileForm.addEventListener('submit', handleFormSubmit);
// Profile edit function
function profileEdit(profile) {
    profileEditContainer.style.display = profileEditContainer.style.display == 'none' ? 'flex' : 'none';
    profileInfo.style.display = profileInfo.style.display == 'none' ? 'flex' : 'none';
}
