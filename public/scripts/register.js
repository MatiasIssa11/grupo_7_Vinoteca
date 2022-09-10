let form = document.forms.register;
let inputs = form.elements;

inputs.nombre.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(".register_msg-error-front.nombre");
  let msg = null;

  if (!validator.isLength(value, { min: 2 })) {
    msg = "El nombre debe contener como mínimo dos caracteres.";
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

inputs.apellido.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(".register_msg-error-front.apellido");
  let msg = null;

  if (!validator.isLength(value, { min: 2 })) {
    msg = "El apellido debe contener mínimo dos caracteres.";
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

inputs.avatar.addEventListener("change", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let files = e.target.files;
  let box = e.target.parentElement;
  let feedback = fieldset.querySelector(".register_msg-error-front.avatar");
  let msg = null;

  if (!files.length == 0) {
    if (!validator.isMimeType(files[0].type)) {
      msg = "La imagen no tiene un formato valido";
    } else if (!["jpg", "svg", "png"].includes(files[0].type.split("/")[1])) {
      msg = "La imagen no tiene una extension valida";
    }
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

inputs.email.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(".register_msg-error-front.email");
  let msg = null;

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

inputs.fechaNacimiento.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(
    ".register_msg-error-front.fechaNacimiento"
  );
  let msg = null;
  if (!validator.isDate(value)) {
    msg = "La fecha de nacimiento debe tener formato de fecha.";
  } else {
    let diferenciaFecha = new Date() - new Date(value).getTime();
    let diferenciaAnos = new Date(diferenciaFecha).getUTCFullYear() - 1970;
    if (diferenciaAnos < 18) {
      msg = "El usuario debe ser mayor de 18 años.";
    }
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
  let feedback = fieldset.querySelector(".register_msg-error-front.password");
  let msg = null;

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

inputs.passwordConfirmada.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(
    ".register_msg-error-front.passwordConfirmada"
  );
  let msg = null;
  let password = inputs.password.value;

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
  } else if (!validator.equals(value, password)) {
    msg = "Las constraseñas deben ser identicas";
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isCorrect = false;
  let msg = null;

  let feedback = document.querySelector(
    ".register_msg-error-front.fechaNacimiento"
  );
  let box = document.querySelector("#fecha-nacimiento").parentElement;

  if (inputs.fechaNacimiento.valueAsDate === null) {
    msg = "Este campo es obligatorio";
    box.classList.remove("valid");
    box.classList.add("invalid");
    feedback.innerText = msg;
  }

  if (
    e.target.querySelectorAll(".register_caja-linea-form.valid").length >= 6
  ) {
    isCorrect = true;
  }

  if (isCorrect) {
    e.target.submit();
  } else {
    window.alert(
      "Algunos datos no son correctos, por favor verificar los errores en los campos"
    );
  }
});
