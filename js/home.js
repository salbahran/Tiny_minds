const loginSection = document.getElementById('login');
const startButton = document.querySelector('.btn-start');

if (Auth.isLoggedIn()) {
  loginSection.hidden = true;          
} else {
  startButton.setAttribute('href', '#login');
}

if (sessionStorage.getItem('loginRequired')) {
  sessionStorage.removeItem('loginRequired');

  window.addEventListener('load', () => {
    setTimeout(() => {
      alert('Hello parent! please login to start learning!');
    }, 100);
  });
}

const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

const fields = {
  firstName: {
    input: document.getElementById('firstName'),
    error: document.getElementById('firstNameError'),
    check: (value) =>
      /^\p{L}[\p{L} '-]{2,}$/u.test(value) ||
      'Please enter at least 3 letters.',
  },
  lastName: {
    input: document.getElementById('lastName'),
    error: document.getElementById('lastNameError'),
    check: (value) =>
      /^\p{L}[\p{L} '-]{2,}$/u.test(value) ||
      'Please enter at least 3 letters.',
  },
  mobile: {
    input: document.getElementById('mobileNumber'),
    error: document.getElementById('mobileError'),
    check: (value) =>
      /^[0-9]{8}$/.test(value) ||
      'Mobile number must be exactly 8 digits.',
  },
  email: {
    input: document.getElementById('regEmail'),
    error: document.getElementById('emailError'),
    check: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
      'Please enter a valid email address.',
  },
};

function validateField(field) {
  const result = field.check(field.input.value.trim());

  if (result === true) {
    field.error.textContent = '';
    field.input.removeAttribute('aria-invalid');
    return true;
  }

  field.error.textContent = result;
  field.input.setAttribute('aria-invalid', 'true');
  return false;
}

for (const field of Object.values(fields)) {
  field.input.addEventListener('blur', () => validateField(field));
}

fields.mobile.input.addEventListener('input', () => {
  fields.mobile.input.value = fields.mobile.input.value.replace(/\D/g, '');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();       

  let allValid = true;
  for (const field of Object.values(fields)) {
    if (!validateField(field)) allValid = false;
  }

  if (!allValid) {
  formMessage.textContent = 'Please fix the highlighted fields.';
  formMessage.className = 'form-message error';
  return;
}
formMessage.className = 'form-message';

  Auth.signIn({
    firstName: fields.firstName.input.value.trim(),
    lastName: fields.lastName.input.value.trim(),
    mobile: fields.mobile.input.value.trim(),
    email: fields.email.input.value.trim(),
  });
  document.querySelector('site-header')?.render();

  loginSection.hidden = true;
  startButton.setAttribute('href', '#play');
  location.hash = 'play';
});
