let form = document.forms.upload;
let inputs = form.elements;

inputs.brand.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(".create_msg-error-front.brand");
  let msg = null;

  if (!validator.isLength(value, { min: 2 })) {
    msg = "La marca debe tener como mínimo de 2 caracteres";
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

inputs.type.addEventListener("input", (e) => {
  let fieldset = e.target.parentElement.parentElement;
  let box = e.target.parentElement;
  let value = e.target.value;
  let feedback = fieldset.querySelector(".create_msg-error-front.type");
  let msg = null;

  if (!validator.isLength(value, { min: 4 })) {
    msg = "La variedad debe tener como mínimo de 4 caracteres";
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

  inputs.price.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.price");
    let msg = null;
  
    if (!validator.isLength(value, { min: 3 })) {
      msg = "El precio no puede ser menor a 3 cifras.";
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
  
  inputs.alcohol.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.alcohol");
    let msg = null;
  
    if (!validator.isLength(value, { min: 4 })) {
      msg = "Este campo requiere un mínimo de 4 caracteres";
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
  
  inputs.acidez.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.acidez");
    let msg = null;
  
    if (!validator.isLength(value, { min: 4 })) {
      msg = "Este campo requiere un mínimo de 4 caracteres";
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
  
  inputs.azucar.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.azucar");
    let msg = null;
  
    if (!validator.isLength(value, { min: 4 })) {
      msg = "Este campo requiere un mínimo de 4 caracteres";
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
  
  inputs.vista.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.vista");
    let msg = null;
  
    if (!validator.isLength(value, { min: 4 })) {
      msg = "Este campo requiere un mínimo de 4 caracteres";
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
  
  inputs.nariz.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.nariz");
    let msg = null;
  
    if (!validator.isLength(value, { min: 4 })) {
      msg = "Este campo requiere un mínimo de 4 caracteres";
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
  
  inputs.boca.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.boca");
    let msg = null;
  
    if (!validator.isLength(value, { min: 4 })) {
      msg = "Este campo requiere un mínimo de 4 caracteres";
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

  inputs.otros.addEventListener("input", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let box = e.target.parentElement;
    let value = e.target.value;
    let feedback = fieldset.querySelector(".create_msg-error-front.otros");
    let msg = null;

    if (value) { //En caso de que exista value
      if (!validator.isLength(value, { min: 20 })) {
        msg = "La descripcion debe tener como mínimo de 20 caracteres";
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

  inputs.image.addEventListener("change", (e) => {
    let fieldset = e.target.parentElement.parentElement;
    let files = e.target.files;
    let box = e.target.parentElement;
    let feedback = fieldset.querySelector(".create_msg-error-front.image");
    let msg = null;

    if (!files.length == 0) {
      if (!validator.isMimeType(files[0].type)) {
        msg = "La imagen no tiene un formato valido";
      } else if (
        !["jpg", "jpeg", "png", "gif"].includes(files[0].type.split("/")[1])
      ) {
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isCorrect = false;

    if (e.target.querySelectorAll(".create_linea-form.valid").length <= 3) {
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
});
