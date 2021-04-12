const form = document.getElementById('form');
const buttonFlip = document.getElementById('buttonFlip');
const buttonUnflip = document.getElementById('buttonUnflip');
const buttonCalculate = document.getElementById('buttonCalculate');
const inputRate = document.getElementById('inputRate');
const inputHours = document.getElementById('inputHours');
const inputPlan = document.getElementById('inputPlan');
const cell70 = document.getElementById('cell70');
const cell30 = document.getElementById('cell30');
const cell100 = document.getElementById('cell100');

addEventListeners();

function addEventListeners() {
  window.addEventListener('load', () => {
    showForm();
  });

  buttonFlip.addEventListener('click', () => {
    flipForm();
  });

  buttonUnflip.addEventListener('click', () => {
    unflipForm();
  });

  buttonCalculate.addEventListener('click', () => {
    if (isEmptyField()) {
      shakeForm();
      highlightEmptyFields();
      return;
    }

    paintButton();
    writeSalary(calculateSalary());
  });
}

function showForm() {
  setTimeout(() => {
    form.classList.remove('form--hidden');
  }, 100);
}

function flipForm() {
  form.classList.add('form--flipped');
}

function unflipForm() {
  form.classList.remove('form--flipped');
}

function isEmptyField() {
  return !inputRate.value || !inputHours.value || !inputPlan.value;
}

function shakeForm() {
  if (form.classList.contains('form--shaked')) {
    return;
  }

  form.classList.add('form--shaked');

  setTimeout(() => {
    form.classList.remove('form--shaked');
  }, 650);
}

function highlightEmptyFields() {
  if (!inputRate.value) {
    highlightField(inputRate);
  }

  if (!inputHours.value) {
    highlightField(inputHours);
  }

  if (!inputPlan.value) {
    highlightField(inputPlan);
  }
}

function highlightField(field) {
  const fcl = field.classList;

  if (fcl.contains('field--highlighted')) {
    return;
  }

  fcl.add('field--highlighted');

  setTimeout(() => {
    fcl.remove('field--highlighted');
  }, 650);
}

function paintButton() {
  const bcl = buttonCalculate.classList;

  if (bcl.contains('button--green')) {
    return;
  }

  bcl.add('button--green');

  setTimeout(() => {
    bcl.remove('button--green');
  }, 400);
}

function calculateSalary() {
  const r = num => +(num).toFixed(2);

  const rate = +inputRate.value;
  const hours = +inputHours.value;
  const plan = +inputPlan.value;

  const rateTax = r(rate * 0.87);
  const coeffHours = r(hours / 168);
  const coeffPlan = plan / 100;

  const s70 = r(rateTax * 0.7 * coeffHours);
  const s30 = r(rateTax * 0.3 * coeffHours * coeffPlan);
  const s100 = r(s70 + s30);

  return { s70, s30, s100 };
}

function writeSalary(salary) {
  const { s30, s70, s100 } = salary;

  cell70.textContent = `${s70.toFixed(2)} руб.`;
  cell30.textContent = `${s30.toFixed(2)} руб.`;
  cell100.textContent = s100
    ? `${s100.toFixed(2)} руб.`
    : '¯\\_(ツ)_/¯';
}
