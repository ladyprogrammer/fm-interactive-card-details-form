const cardNumberField = document.cardForm.cardNumber;
const expiryMonthField = document.cardForm.expiryMonth;
const expiryYearField = document.cardForm.expiryYear;
const expiryClass = '.card-form__expiry-date';
const cvcField = document.cardForm.cvc;


validateInput = (element, regex, isEmptyOK, targetClass = null) => {
  const elementGroup = (targetClass) ? document.querySelector(targetClass) : element.parentElement;

  if ( regex ) {
    ( ! regex.test(element.value) ) ? elementGroup.classList.add('show-error') : elementGroup.classList.remove('show-error');
  }
  if ( ! isEmptyOK ) {
    ( element.value === '' ) ? elementGroup.classList.add('show-error') : elementGroup.classList.remove('show-error');
  }
}

document.cardForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const cardNumberRegex = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
  const cardNumberIsEmptyOK = true;
  const expiryMonthRegex = null;
  const expiryMonthIsEmptyOK = false;
  const expiryYearRegex = null;
  const expiryYearIsEmptyOK = false;
  const cvcRegex = null;
  const cvcIsEmptyOK = false;
  

  validateInput(cardNumberField, cardNumberRegex, cardNumberIsEmptyOK);
  validateInput(expiryMonthField, expiryMonthRegex, expiryMonthIsEmptyOK, expiryClass);
  const expiryFieldset = document.querySelector(expiryClass);
  if ( ! expiryFieldset.classList.contains('show-error') ) 
    validateInput(expiryYearField, expiryYearRegex, expiryYearIsEmptyOK, expiryClass);
  validateInput(cvcField, cvcRegex, cvcIsEmptyOK);
});

cardNumberField.addEventListener('input', (e) => {
  const parentElement = cardNumberField.parentElement;
  parentElement.classList.remove('show-error');
});

expiryMonthField.addEventListener('input', (e) => {
  const parentElement = document.querySelector(expiryClass);
  parentElement.classList.remove('show-error');
});

expiryYearField.addEventListener('input', (e) => {
  const parentElement = document.querySelector(expiryClass);
  parentElement.classList.remove('show-error');
});

cvcField.addEventListener('input', (e) => {
  const parentElement = cvcField.parentElement;
  parentElement.classList.remove('show-error');
});

cardNumberField.addEventListener('keypress', (e) => {
  const regex = /^[0-9]$/;
  const fieldLength = cardNumberField.value.length;
  if ( regex.test(e.key) && fieldLength <= 18 ) {
    if (fieldLength === 4 || fieldLength === 9 || fieldLength === 14) 
      cardNumberField.value = cardNumberField.value + " ";
  }
  else {
    e.preventDefault();
  }
});

cardNumberField.addEventListener('blur', (e) => {
  const cardValue = cardNumberField.value.replaceAll(" ", "");
  const firstGroup = cardValue.slice(0, 4);
  const secondGroup = cardValue.slice(4, 8);
  const thirdGroup = cardValue.slice(8, 12);  
  const fourthGroup = cardValue.slice(12, 16);
  cardNumberField.value = firstGroup + " " + secondGroup + " " + thirdGroup + " " + fourthGroup;
})

expiryMonthField.addEventListener('keypress', (e) => {
  let regex;
  if (expiryMonthField.value === '') {
    regex = /^[0-1]$/;
  } else {
    regex = (expiryMonthField.value === '0') ? /^[1-9]$/ : /^[0-2]$/;
  }
  if ( ! regex.test(e.key)) {
    e.preventDefault();
  }
});

expiryYearField.addEventListener('keypress', (e) => {
  let regex;
  if (expiryYearField.value === '') {
    regex = /^[2-3]$/;
  } else {
    regex = (expiryYearField.value === '2') ? /^[3-9]$/ : /^[0-9]$/;
  }
  if ( ! regex.test(e.key)) {
    e.preventDefault();
  }
});

cvcField.addEventListener('keypress', (e) => {
  const regex = /^[A-Z0-9]$/;
  if( ! regex.test(e.key) ) {
    e.preventDefault();
  }
});