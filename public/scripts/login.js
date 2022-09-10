let form = document.forms[1]; //Por el nombre que tiene el id del formulario, fue la única forma de capturarlo y poder trabajar
let inputs = form.elements;

inputs.email.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(".login_msg-error-front.email");
  let msg = null;

  console.log(value);

  if (!validator.isLength(value, { min: 4 })) {
    msg = "El email debe tener como mínimo de 4 caracteres";
  } else if (!validator.isEmail(value)) {
    msg = "El email debe tener formato de email";
  }

  if (msg) {
    box.classList.remove("valid");
    box.classList.add("invalid");
    feedback.innerText = msg;
  } else {
    box.classList.remove("invalid");
    box.classList.add("valid");
    feedback.innerText = "";
  }
});

inputs.password.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(".login_msg-error-front.password");
  let msg = null;

  console.log(value);

  if (!validator.isLength(value, { min: 8 })) {
    msg = "La contraseña debe tener como mínimo 8 caracteres";
  } else if (
    !validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
  ) {
    msg =
      "La contraseña debe contener al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial";
  }

  if (msg) {
    box.classList.remove("valid");
    box.classList.add("invalid");
    feedback.innerText = msg;
  } else {
    box.classList.remove("invalid");
    box.classList.add("valid");
    feedback.innerText = "";
  }
});
