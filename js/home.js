// ----- 1. Home page behaviour depending on login state -----
const loginSection = document.getElementById('login');
const startButton = document.querySelector('.btn-start');

if (Auth.isLoggedIn()) {
  loginSection.hidden = true;               // already logged in: hide the form
} else {
  startButton.setAttribute('href', '#login'); // not logged in: "Start playing" goes to the form
}
// Sent here from a learning page? Explain why, after the page is drawn
if (sessionStorage.getItem('loginRequired')) {
  sessionStorage.removeItem('loginRequired');   // so a refresh doesn't show it again

  window.addEventListener('load', () => {
    setTimeout(() => {
      alert('Hello parent! please login to start learning!');
    }, 100);
  });
}

// ----- 2. Registration form -----
const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

// Each check returns true when the value is fine, or an error message when it is not.
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

// Shows or clears the error for one field. Returns true if the field is valid.
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

// Check each field when the user leaves it
for (const field of Object.values(fields)) {
  field.input.addEventListener('blur', () => validateField(field));
}

// Mobile field: only allow digits while typing
fields.mobile.input.addEventListener('input', () => {
  fields.mobile.input.value = fields.mobile.input.value.replace(/\D/g, '');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();               // stop the page from reloading by itself

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

  location.hash = 'play';
  location.reload();                    // reload so the header changes to "Log out"
});