export function checkPassword(password) {
  if (password.value.length < 6) {
    callInvalid(password);
    createError(password, 'Password must be at least 6 characters');
    return false;
  }
  callValid(password);
  return true;
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
