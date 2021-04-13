'use strict';

(function() {
  const b = document.body;

  const form = b.querySelector('form.form');
  const formFront = b.querySelector('div.form__front');
  const switcherFront = b.querySelector('button.form__switcher--front');
  const switcherBack = b.querySelector('button.form__switcher--back');
  const button = b.querySelector('button.button');
  const fields = b.querySelectorAll('input.label__field');
  const cellsValues = b.querySelectorAll('td.table__cell--value');

  addEventListeners();

  function addEventListeners() {
    window.addEventListener('load', () => {
      showForm();
    });

    switcherFront.addEventListener('click', () => {
      flipForm();
    });

    switcherBack.addEventListener('click', () => {
      unflipForm();
    });

    button.addEventListener('click', () => {
      if (isEmptyField()) {
        highlightEmptyFields();
        shakeForm();
        return;
      }

      paintFormFront();
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
    for (const field of fields) {
      if (!field.value) {
        return true;
      }
    }
  }

  function highlightEmptyFields() {
    for (const field of fields) {
      if (!field.value) {
        highlightField(field);
      }
    }
  }

  function highlightField(field) {
    const fcl = field.classList;

    if (fcl.contains('label__field--highlighted')) {
      return;
    }

    fcl.add('label__field--highlighted');

    setTimeout(() => {
      fcl.remove('label__field--highlighted');
    }, 650);
  }

  function shakeForm() {
    const fcl = form.classList;

    if (fcl.contains('form--shaked')) {
      return;
    }

    fcl.add('form--shaked');

    setTimeout(() => {
      fcl.remove('form--shaked');
    }, 650);
  }

  function paintFormFront() {
    const ffcl = formFront.classList;
    const sfcl = switcherFront.classList;
    const bcl = button.classList;

    if (ffcl.contains('form__front--green')) {
      return;
    }

    ffcl.add('form__front--green');
    sfcl.add('form__switcher--green');
    bcl.add('button--green');

    setTimeout(() => {
      ffcl.remove('form__front--green');
      sfcl.remove('form__switcher--green');
      bcl.remove('button--green');
    }, 400);
  }

  function calculateSalary() {
    const r = num => +(num).toFixed(2);

    const rate = +fields[0].value;
    const hours = +fields[1].value;
    const plan = +fields[2].value;

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

    cellsValues[0].textContent = `${s70.toFixed(2)} руб.`;
    cellsValues[1].textContent = `${s30.toFixed(2)} руб.`;
    cellsValues[2].textContent = s100
      ? `${s100.toFixed(2)} руб.`
      : '¯\\_(ツ)_/¯';
  }
})();
