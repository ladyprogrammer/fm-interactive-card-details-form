export function confirmCardDetails() {
  document.querySelector('.card-form').classList.add('card-form--hide');
  document.querySelector('.thanks').classList.add('thanks--show');
}

export function continueThanks() {
  document.querySelector('.card-form').classList.remove('card-form--hide');
  document.querySelector('.thanks').classList.remove('thanks--show');
  clearFields();
}

function clearFields() {
  const inputFields = document.querySelectorAll('.card-form__input');
  inputFields.forEach( inputField => {
    inputField.value = '';
  });
}

export function updateRealtime(sourceElement, targetElement) {
  targetElement.innerHTML = sourceElement.value;
}

export function updateRealtimeCardDigits(event) {
  const cardFields = document.querySelectorAll('.card-front__card-digits');
  const digits = event.currentTarget.value.split(' ');

  for(let [index, cardField] of cardFields.entries()) {
    cardField.innerHTML = digits[index] || '';
  }
}