import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),

  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.feedbackForm.addEventListener('input', throttle(onFormInput, 500));
refs.feedbackForm.addEventListener('submit', onFormSubmit);

unsavedInfo();

function onFormInput(e) {
  if (e.target.value) {
    formData[e.target.name] = e.target.value;
  }
  formData[e.target.name] = e.target.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const formElements = e.target.elements;
  if (formElements.email.value === '' || formElements.message.value === '') {
    return alert('Please check all field!');
  }
  e.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formData = {};
}

function unsavedInfo() {
  let savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedData) {
    refs.input.value = !!savedData.email ? savedData.email : '';
    refs.textarea.value = !!savedData.message ? savedData.message : '';
    formData = savedData;
  }
}
