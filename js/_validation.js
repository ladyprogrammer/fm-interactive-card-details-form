import { confirmCardDetails, updateRealtimeCardDigits } from "./_ui.js";

export const cardFields = {
  cardholder: {
    field: document.cardForm.cardholder,
    isEmptyOK: false,
  },
  cardNumber: {
    field: document.cardForm.cardNumber,
    regex: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
    isEmptyOK: true,
  },
  expiryDate: {
    month: {
      field: document.cardForm.expiryMonth,
      customErrorClass: '.card-form__expiry-date',
      isEmptyOK: false,
    },
    year: {
      field: document.cardForm.expiryYear,
      customErrorClass: '.card-form__expiry-date',
      isEmptyOK: false,
    }
  },
  cvc: {
    field: document.cardForm.cvc,
    isEmptyOK: false
  },
  confirmButton: {
    field: document.cardForm.confirmButton
  }
}

export function formSubmit(event) {
   // disable default form submission behavior
   // this function needs to be rewritten if form submission without JS is required
  event.preventDefault();
};

export function validateForm(event) {
  const { cardholder, cardNumber, expiryDate, cvc } = cardFields;
  checkInput(cardholder);
  checkInput(cardNumber);
  checkInput(expiryDate.month);
  const expiryFieldset = document.querySelector(expiryDate.year.customErrorClass);
  if ( ! expiryFieldset.classList.contains('show-error') ) checkInput(expiryDate.year);
  checkInput(cvc);
  const errorLabelCount = document.querySelectorAll('.show-error').length;
  (errorLabelCount > 0) ? event.preventDefault() : confirmCardDetails();
}

export function checkCardDigits(event) {
  {
    const regex = /^[0-9]$/;
    const { cardNumber } = cardFields;
    const fieldLength = cardNumber.field.value.length;
    if ( regex.test(event.key) && fieldLength <= 18 ) {
      if (fieldLength === 4 || fieldLength === 9 || fieldLength === 14) 
        cardNumber.field.value = cardNumber.field.value + " ";
    }
    else {
      event.preventDefault();
    }
  }
}

export function formatCardDigits(event) {
  const { cardNumber } = cardFields;
  const cardValue = cardNumber.field.value.replaceAll(" ", "");
  const firstGroup = cardValue.slice(0, 4);
  const secondGroup = cardValue.slice(4, 8);
  const thirdGroup = cardValue.slice(8, 12);  
  const fourthGroup = cardValue.slice(12, 16);
  cardNumber.field.value = firstGroup + " " + secondGroup + " " + thirdGroup + " " + fourthGroup;
  updateRealtimeCardDigits(event);
}

export function monthsDigitsOnly(event) {
  const { expiryDate } = cardFields;
  const expiryMonth = expiryDate.month.field;
  let regex;
  if (expiryMonth.value === '') {
    regex = /^[0-1]$/;
  } else {
    regex = (expiryMonth.value === '0') ? /^[1-9]$/ : /^[0-2]$/;
  }
  if ( ! regex.test(event.key)) {
    event.preventDefault();
  }
}

export function yearsDigitsOnly(event) {
  const { expiryDate } = cardFields;
  const expiryYear = expiryDate.year.field;
  let regex;
  if (expiryYear.value === '') {
    regex = /^[2-3]$/;
  } else {
    regex = (expiryYear.value === '2') ? /^[3-9]$/ : /^[0-9]$/;
  }
  if ( ! regex.test(event.key)) {
    event.preventDefault();
  }
}

export function allowedCvcCharacters(event) {
  const regex = /^[a-zA-Z0-9]$/;
  if( ! regex.test(event.key) ) {
    event.preventDefault();
  }
}

export function removeShowError(inputElement, targetClass = null) {
  const errorElement = (targetClass) ? document.querySelector(targetClass) : inputElement.parentElement;
  errorElement.classList.remove('show-error');
}

function checkInput(cardField) {
  const { field, regex, isEmptyOK, customErrorClass } = cardField;
  const elementGroup = (customErrorClass) ? document.querySelector(customErrorClass) : field.parentElement;
  if ( regex ) {
    ( ! regex.test(field.value) ) ? elementGroup.classList.add('show-error') : elementGroup.classList.remove('show-error');
  }
  if ( ! isEmptyOK ) {
    ( field.value === '' ) ? elementGroup.classList.add('show-error') : elementGroup.classList.remove('show-error');
  }
};