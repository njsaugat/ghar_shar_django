function callInvalid(element) {
  element.classList.add("invalid");
}

function callValid(element) {
  element.classList.add("valid");
}

function createError(element, message) {
  const span = document.createElement("span");
  span.innerText = message;
  span.classList.add("error");
  element.parentNode.appendChild(span);
}

export function checkEmail(email) {
  if (email.value.length <= 0) {
    callInvalid(email);
    createError(email, "Enter a valid email");
    return false;
  } else if (!validateEmail(email.value)) {
    callInvalid(email);
    createError(email, "You have entered an invalid email address!");
  } else {
    callValid(email);
    return true;
  }
}

function validateEmail(mail) {
  if (mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return true;
  }
  return false;
}
