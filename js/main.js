import { cardFields, formSubmit, checkCardDigits, formatCardDigits, 
  monthsDigitsOnly, yearsDigitsOnly, allowedCvcCharacters, removeShowError, validateForm } from './_validation.js';
import { continueThanks, updateRealtime, updateRealtimeCardDigits } from './_ui.js';

document.cardForm.addEventListener('submit', (e) => formSubmit(e));

const { cardholder, cardNumber, expiryDate, cvc, confirmButton } = cardFields;

cardNumber.field.addEventListener('input', (e) => {
  updateRealtimeCardDigits(e);
  removeShowError(cardNumber.field)
});
cardNumber.field.addEventListener('keypress', (e) => checkCardDigits(e));
cardNumber.field.addEventListener('blur', (e) => formatCardDigits(e) );

expiryDate.month.field.addEventListener('input', (e) => removeShowError(expiryDate.month.field, expiryDate.month.customErrorClass));
expiryDate.year.field.addEventListener('input', (e) => removeShowError(expiryDate.year.field, expiryDate.year.customErrorClass));
expiryDate.month.field.addEventListener('keypress', (e) => monthsDigitsOnly(e) );
expiryDate.year.field.addEventListener('keypress', (e) => yearsDigitsOnly(e) );

cvc.field.addEventListener('input', (e) => removeShowError(cvc.field) );

cvc.field.addEventListener('keypress', (e) => allowedCvcCharacters(e) )

confirmButton.field.addEventListener('click', (e) => validateForm(e));

const continueButton = document.querySelector('.thanks__continue-button');
continueButton.addEventListener('click', (e) => continueThanks());


// TODO: transfer to _validation.js
const cardholderDisplay = document.querySelector('.card-front__cardholder');
cardholder.field.addEventListener('input', () => updateRealtime(cardholder.field, cardholderDisplay));

const expiryDateMMDisplay = document.querySelector('.card-front__expiry-date-mm');
expiryDate.month.field.addEventListener('input', () => updateRealtime(expiryDate.month.field, expiryDateMMDisplay));

const expiryDateYYDisplay = document.querySelector('.card-front__expiry-date-yy');
expiryDate.year.field.addEventListener('input', () => updateRealtime(expiryDate.year.field, expiryDateYYDisplay));

const cvcDisplay = document.querySelector('.card-back__cvv');
cvc.field.addEventListener('input', () => updateRealtime(cvc.field, cvcDisplay));