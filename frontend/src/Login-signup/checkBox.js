export function checkCheckBox(checkbox) {
  if (!checkbox.checked) {
    createError(checkbox, 'Required');
    return false;
  }
  return true;
}
function createError(element, message) {
  const span = document.createElement('span');
  span.innerText = message;
  span.classList.add('error');
  element.parentNode.appendChild(span);
}
