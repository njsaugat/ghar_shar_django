export function checkConfPassword(confPassword, password) {
  if (confPassword.value.length <= 0) {
    callInvalid(confPassword);
    createError(confPassword, 'Confirm your password');
    return false;
  } else if (confPassword.value !== password.value) {
    callInvalid(confPassword);
    createError(confPassword, 'Both passwords must match');
    return false;
  } else {
    callValid(confPassword);
    return true;
  }
}

function callInvalid(element) {
  element.classList.add('invalid');
}

function callValid(element) {
  element.classList.add('valid');
}

function createError(element, message) {
  const span = document.createElement('span');
  span.innerText = message;
  span.classList.add('error');
  element.parentNode.appendChild(span);
}
