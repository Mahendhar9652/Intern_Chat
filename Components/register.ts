var username = document.getElementById("username") as HTMLInputElement;
var password = document.getElementById("password") as HTMLInputElement;
var confirmPassword = document.getElementById("confirm-password") as HTMLInputElement;
var myForm = document.getElementById("myForm") as HTMLFormElement;

const users: { username: string, password: string, confirmPassword: string }[] = JSON.parse(localStorage.getItem("users") || "[]");

function formSubmit(e: Event): void {
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

  const newUser: { username: string; password: string; confirmPassword: string } = {
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

