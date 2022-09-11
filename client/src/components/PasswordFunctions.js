//Toggle password visibility
//checking password strength

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const pwbtn = document.getElementById("pwbtn");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    pwbtn.classList.remove("fa-eye-slash", "fas");
    pwbtn.classList.add("fa", "fa-eye");
  } else {
    passwordInput.type = "password";
    pwbtn.classList.remove("fa-eye", "fa");
    pwbtn.classList.add("fas", "fa-eye-slash");
  }
}

function toggleConfirmPassword() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const cpwbtn = document.getElementById("cpwbtn");
  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    cpwbtn.classList.remove("fa-eye-slash", "fas");
    cpwbtn.classList.add("fa", "fa-eye");
  } else {
    confirmPasswordInput.type = "password";
    cpwbtn.classList.remove("fa-eye", "fa");
    cpwbtn.classList.add("fas", "fa-eye-slash");
  }
}

function checkPasswordStrength(pw) {
  const strengthBar = document.getElementById("strengthBar");
  if (pw.length < 1) {
    strengthBar.style.width = "0%";
  } else if (
    pw.length < 7 &&
    (!pw.match(/[a-z]+/) ||
      !pw.match(/[A-Z]+/) ||
      !pw.match(/[0-9]+/) ||
      !pw.match(/[$#@!&%*]+/))
  ) {
    strengthBar.style.width = `${pw.length * 2.5}%`;
    strengthBar.style.backgroundColor = "red";
  } else if (
    pw.length < 7 &&
    pw.match(/[a-z]+/) &&
    pw.match(/[A-Z]+/) &&
    pw.match(/[0-9]+/) &&
    pw.match(/[$#@!&%*]+/)
  ) {
    strengthBar.style.width = `${pw.length * 2.5}%`;
    strengthBar.style.backgroundColor = "yellow";
  } else if (
    pw.length >= 7 &&
    (!pw.match(/[a-z]+/) ||
      !pw.match(/[A-Z]+/) ||
      !pw.match(/[0-9]+/) ||
      !pw.match(/[$#@!&%*]+/))
  ) {
    let strength = pw.length > 13 ? 32 : pw.length * 2.5;
    strengthBar.style.width = `${strength}%`;
    strengthBar.style.backgroundColor = "yellow";
  } else if (
    pw.length >= 7 &&
    pw.match(/[a-z]+/) &&
    pw.match(/[A-Z]+/) &&
    pw.match(/[0-9]+/) &&
    pw.match(/[$#@!&%*]+/)
  ) {
    let strength = pw.length > 11 ? 50 : pw.length * 4.5;
    strengthBar.style.width = `${strength}%`;
    if (strength < 41) strengthBar.style.backgroundColor = "#32cd32";
    else strengthBar.style.backgroundColor = "green";
  }
}

export { togglePassword, toggleConfirmPassword, checkPasswordStrength };
