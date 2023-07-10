var loginUsername = document.getElementById("username") as HTMLInputElement;
var loginPassword =  document.getElementById("password") as HTMLInputElement;

interface Login {
    username: string;
    password: string;
}

const allUser: Login[] = JSON.parse(localStorage.getItem("users") || "[]");
const allLoginUser: Login[] = JSON.parse(localStorage.getItem("loginUser") || "[]");
const myLoginForm = document.getElementById("myForm") as HTMLFormElement;

myLoginForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const usernameValue = loginUsername.value.trim();
  const passwordValue = loginPassword.value.trim();

  // Validate username
  if (usernameValue === "") {
    alert("Please enter a username");
    return;
  }

  // Validate password
  if (passwordValue === "") {
    alert("Please enter a password");
    return;
  }

  const currentUser: Login[] = allUser.filter(user => user.username === usernameValue);

  if (currentUser.length === 0) {
    alert("User not found");
  } else {
    const matchedUser = currentUser[0];

    if (matchedUser.password !== passwordValue) {
      alert("Incorrect password");
    } else {
      allLoginUser.push(matchedUser);
      sessionStorage.setItem("loginUser", JSON.stringify(currentUser));
      localStorage.setItem("loginUser", JSON.stringify(allLoginUser));
      window.location.href = "./Components/Home.html";
    }
  }
});
