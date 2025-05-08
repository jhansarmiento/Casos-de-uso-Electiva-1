document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("adoption-form");
  const formImage = document.querySelector(".form-image img");
  const defaultImage = "./assets/dogs_and_cats/Family3.webp";
  const formTypeButtons = document.querySelectorAll(".form-type-button");
  const adoptionFields = document.querySelector(".adoption-fields");
  const sponsorFields = document.querySelector(".sponsor-fields");
  let currentFormType = "adopcion";
  let animalesDataCache = null;
  let valorMascotaSeleccionada = 0;

  function actualizarMetodoPago() {
    const metodoSeleccionado = document.querySelector(
      'input[name="metodo-pago"]:checked'
    )?.value;
    const tarjetaGroup = document
      .getElementById("card-number")
      .closest(".form-group");
    const detallesGroup = document.querySelector(".card-details");
    const paypalGroup = document.querySelector(".paypal-email");

    if (metodoSeleccionado === "paypal") {
      tarjetaGroup.style.display = "none";
      detallesGroup.style.display = "none";
      paypalGroup.style.display = "block";
    } else {
      tarjetaGroup.style.display = "block";
      detallesGroup.style.display = "flex";
      paypalGroup.style.display = "none";
    }

    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
      submitButton.textContent =
        metodoSeleccionado === "paypal"
          ? "Donar con PayPal"
          : "Pagar con tarjeta";
    }
  }

  // Objeto con las funciones de validación
  const validaciones = {
    nombre: (value) => {
      if (!value.trim()) return "El nombre es requerido";
      if (value.trim().length < 3)
        return "El nombre debe tener al menos 3 caracteres";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
        return "El nombre solo debe contener letras";
      return "";
    },
    email: (value) => {
      if (!value.trim()) return "El correo electrónico es requerido";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Ingresa un correo electrónico válido";
      return "";
    },
    telefono: (value) => {
      if (!value.trim()) return "El teléfono es requerido";
      if (!/^\d{10}$/.test(value))
        return "Ingresa un número de teléfono válido (10 dígitos)";
      return "";
    },
    direccion: (value) => {
      if (!value.trim()) return "La dirección es requerida";
      if (value.trim().length < 10)
        return "La dirección debe ser más detallada";
      return "";
    },
    experiencia: (value) => {
      if (!value) return "Por favor, indica si tienes experiencia con mascotas";
      return "";
    },
    presupuesto: (value) => {
      if (!value)
        return "Por favor, indica si cuentas con el presupuesto necesario";
      return "";
    },
    tiempo: (value) => {
      if (!value) return "Por favor, indica si tienes disponibilidad de tiempo";
      return "";
    },
    espacio: (value) => {
      if (!value) return "Por favor, indica si cuentas con el espacio adecuado";
      return "";
    },
    "tipo-mascota": (value) => {
      if (!value) return "Por favor, selecciona un tipo de mascota";
      return "";
    },
    mascota: (value) => {
      if (!value) return "Por favor, selecciona una mascota";
      return "";
    },
    "card-number": (value) => {
      if (!value) return "El número de tarjeta es requerido";
      if (!/^\d{16}$/.test(value))
        return "El número de tarjeta debe tener 16 dígitos";
      return "";
    },
    "card-expiry-month": (value) => {
      if (!value) return "El mes es requerido";
      const month = parseInt(value);
      if (!/^\d{2}$/.test(value) || month < 1 || month > 12)
        return "Mes inválido";
      return "";
    },
    "card-expiry-year": (value) => {
      if (!value) return "El año es requerido";
      if (!/^\d{2}$/.test(value)) return "Año inválido";
      const currentYear = new Date().getFullYear() % 100;
      const year = parseInt(value);
      if (year < currentYear) return "La tarjeta está vencida";
      return "";
    },
    "card-cvv": (value) => {
      if (!value) return "El CVV es requerido";
      if (!/^\d{3}$/.test(value)) return "El CVV debe tener 3 dígitos";
      return "";
    },
    "paypal-email": (value) => {
      if (!value.trim()) return "El correo de PayPal es requerido";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Correo inválido";
      return "";
    },
  };

  // Función para mostrar errores
  function mostrarError(input, mensaje) {
    const formGroup = input.closest(".form-group"); // Obtener el grupo de formulario
    const errorMessage = formGroup.querySelector(".error-message"); // Obtener el mensaje de error
    formGroup.classList.add("error"); // Agregar la clase de error
    errorMessage.textContent = mensaje; // Mostrar el mensaje de error

    // Hacer scroll al primer error si existe
    if (!form.querySelector(".error")) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Función para limpiar errores
  function limpiarError(input) {
    const formGroup = input.closest(".form-group"); // Obtener el grupo de formulario
    const errorMessage = formGroup.querySelector(".error-message"); // Obtener el mensaje de error
    formGroup.classList.remove("error"); // Eliminar la clase de error
    errorMessage.textContent = ""; // Limpiar el mensaje de error
  }

  // Validación en tiempo real para cada campo
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    // Agregar un evento de escucha para cada campo
    ["input", "blur"].forEach((eventType) => {
      input.addEventListener(eventType, function () {
        const validacion = validaciones[this.name]; // Obtener la función de validación
        if (validacion) {
          const error = validacion(this.value); // Validar el valor del campo
          if (error) {
            mostrarError(this, error); // Mostrar el mensaje de error
          } else {
            limpiarError(this); // Limpiar el mensaje de error
          }
        }
      });
    });
  });

  // Función para cambiar el tipo de formulario
  async function changeFormType(category) {
    currentFormType = category; // Actualizar el tipo de formulario actual

    // Actualizar la UI de los botones
    formTypeButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.form === category) {
        btn.classList.add("active");
      }
    });

    // Mostrar/ocultar campos según el tipo
    if (category === "adopcion") {
      adoptionFields.style.display = "block";
      sponsorFields.style.display = "none";
    } else {
      adoptionFields.style.display = "none";
      sponsorFields.style.display = "block";
      actualizarMetodoPago();
    }

    // Resetear la imagen al cambiar de tipo de formulario
    formImage.src = defaultImage;

    // Actualizar las mascotas disponibles
    actualizarMascotasDisponibles();
  }

  // Event listeners para los botones de tipo de formulario
  formTypeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      changeFormType(this.dataset.form);
      if (this.dataset.form === "apadrinar") {
        actualizarMonto();
      }
    });
  });

  // Función para cargar los datos de animales
  async function loadAnimalesData() {
    if (!animalesDataCache) {
      const { default: data } = await import("./data.js");
      animalesDataCache = data;
    }
    return animalesDataCache;
  }

  // Función para seleccionar tipo de mascota y mascota específica
  async function selectPetAndType(petType, petName, category) {
    const tipoMascotaSelect = document.getElementById("tipo-mascota");
    const mascotaSelect = document.getElementById("mascota");

    // Cambiar la categoría y tipo
    await changeFormType(category);
    tipoMascotaSelect.value = petType;

    // Esperar a que se actualicen las mascotas disponibles
    await actualizarMascotasDisponibles();

    // Esperar que la mascota exista en el <select>
    const existeMascota = () =>
      [...mascotaSelect.options].some((opt) => opt.value === petName);

    const esperarMascota = async () => {
      while (!existeMascota()) {
        await new Promise((r) => setTimeout(r, 50));
      }
    };

    await esperarMascota();

    // Seleccionar la mascota
    mascotaSelect.value = petName;
    mascotaSelect.dispatchEvent(new Event("change"));
  }

  // Escuchar el evento de selección desde la galería
  document.addEventListener("updateFormSelection", async function (event) {
    const { category, petName, petType, valor } = event.detail;
    console.log("Datos recibidos:", { category, petName, petType, valor }); // Para debugging

    // Actualizar el valor de la mascota seleccionada
    valorMascotaSeleccionada = valor;

    // Cambiar el tipo de formulario
    changeFormType(category);

    // Esperar un momento para que se actualice la interfaz
    setTimeout(async () => {
      await selectPetAndType(petType, petName, category);
      if (category === "apadrinar") {
        // Seleccionar el pago mensual por defecto
        const pagoMensual = document.getElementById("pago-mensual");
        if (pagoMensual) {
          pagoMensual.checked = true;
        }
        actualizarMonto();
      }
    }, 100);
  });

  // Función para actualizar las mascotas disponibles
  async function actualizarMascotasDisponibles() {
    try {
      const animalesData = await loadAnimalesData();
      const tipoMascotaSelect = document.getElementById("tipo-mascota");
      const mascotaSelect = document.getElementById("mascota");
      const tipo = tipoMascotaSelect.value;

      if (!tipo) {
        mascotaSelect.disabled = true;
        mascotaSelect.innerHTML =
          '<option value="">Primero selecciona un tipo de mascota</option>';
        formImage.src = defaultImage;
        return;
      }

      const mascotasFiltradas = animalesData.filter(
        (animal) => animal.tipo === tipo && animal.categoria === currentFormType
      );

      mascotaSelect.innerHTML =
        '<option value="">Selecciona una mascota</option>';
      mascotasFiltradas.forEach((mascota) => {
        const option = document.createElement("option");
        option.value = mascota.nombre;
        option.textContent = mascota.nombre;
        mascotaSelect.appendChild(option);
      });

      mascotaSelect.disabled = false;
    } catch (error) {
      console.error("Error al cargar las mascotas:", error);
    }
  }

  // Función para actualizar la imagen según la mascota seleccionada
  async function actualizarImagenMascota() {
    const animalesData = await loadAnimalesData();
    const mascotaSelect = document.getElementById("mascota");
    const nombreMascota = mascotaSelect.value;

    if (!nombreMascota) {
      formImage.src = defaultImage;
      return;
    }

    const mascotaSeleccionada = animalesData.find(
      (animal) =>
        animal.nombre === nombreMascota && animal.categoria === currentFormType
    );

    if (mascotaSeleccionada) {
      // Aplicar transición suave
      formImage.style.opacity = "0";
      setTimeout(() => {
        formImage.src = mascotaSeleccionada.imagen;
        formImage.style.opacity = "1";
      }, 300);
    }
  }

  // Event listeners para los selectores
  document
    .getElementById("tipo-mascota")
    .addEventListener("change", actualizarMascotasDisponibles);
  document
    .getElementById("mascota")
    .addEventListener("change", actualizarImagenMascota);

  // Agregar estilos de transición a la imagen
  formImage.style.transition = "opacity 0.3s ease-in-out";

  // Función para formatear moneda
  function formatCurrency(value) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  // Función para actualizar el monto a pagar
  function actualizarMonto() {
    const tipoApadrinamiento = document.querySelector(
      'input[name="tipo-apadrinamiento"]:checked'
    )?.value;
    const montoSpan = document.querySelector(".monto-total span");

    if (!montoSpan) return;

    let montoFinal = 0;
    if (tipoApadrinamiento === "unico") {
      montoFinal = valorMascotaSeleccionada * 12;
    } else if (tipoApadrinamiento === "mensual") {
      montoFinal = valorMascotaSeleccionada;
    }

    montoSpan.textContent = formatCurrency(montoFinal);
    console.log("Monto actualizado:", montoFinal); // Para debugging
  }

  // Event listeners para el tipo de apadrinamiento
  document
    .querySelectorAll('input[name="tipo-apadrinamiento"]')
    .forEach((radio) => {
      radio.addEventListener("change", actualizarMonto);
    });

  // Actualizar la función de selección de mascota
  async function actualizarMascotaSeleccionada() {
    const mascotaSelect = document.getElementById("mascota");
    const nombreMascota = mascotaSelect.value;

    if (nombreMascota && currentFormType === "apadrinar") {
      const { default: animalesData } = await import("./data.js");
      const mascotaSeleccionada = animalesData.find(
        (animal) =>
          animal.nombre === nombreMascota && animal.categoria === "apadrinar"
      );

      if (mascotaSeleccionada) {
        console.log("Mascota seleccionada:", mascotaSeleccionada); // Para debugging
        valorMascotaSeleccionada = mascotaSeleccionada.valorMensual;
        actualizarMonto();
      }
    }
  }

  // Event listener para la selección de mascota
  document
    .getElementById("mascota")
    .addEventListener("change", actualizarMascotaSeleccionada);

  // Función para validar el formulario según la categoría
  function validateForm() {
    const commonFields = [
      "nombre",
      "email",
      "telefono",
      "tipo-mascota",
      "mascota",
    ];

    const adoptionFields = [
      "direccion",
      "experiencia",
      "presupuesto",
      "tiempo",
      "espacio",
    ];

    const sponsorFields = [
      "card-number",
      "card-expiry-month",
      "card-expiry-year",
      "card-cvv",
    ];

    // Validar campos comunes
    for (const fieldId of commonFields) {
      const field = document.getElementById(fieldId);
      if (!field.value) {
        field.reportValidity();
        return false;
      }
    }

    // Validar campos específicos según la categoría
    const fieldsToValidate =
      currentFormType === "adopcion" ? adoptionFields : sponsorFields;

    for (const fieldId of fieldsToValidate) {
      const field = document.getElementById(fieldId);
      if (!field.value) {
        field.reportValidity();
        return false;
      }
    }

    // Validaciones específicas según método de pago
    if (currentFormType === "apadrinar") {
      const metodoPago = document.querySelector(
        'input[name="metodo-pago"]:checked'
      )?.value;

      if (!metodoPago) {
        alert("Por favor selecciona un método de pago");
        return false;
      }

      if (metodoPago === "tarjeta") {
        const cardNumber = document.getElementById("card-number").value;
        const cardMonth = document.getElementById("card-expiry-month").value;
        const cardYear = document.getElementById("card-expiry-year").value;
        const cardCVV = document.getElementById("card-cvv").value;

        if (!/^\d{16}$/.test(cardNumber)) {
          alert("El número de tarjeta debe tener 16 dígitos");
          return false;
        }

        if (!/^(0[1-9]|1[0-2])$/.test(cardMonth)) {
          alert("El mes debe estar entre 01 y 12");
          return false;
        }

        if (!/^\d{2}$/.test(cardYear)) {
          alert("El año debe tener 2 dígitos");
          return false;
        }

        if (!/^\d{3}$/.test(cardCVV)) {
          alert("El CVV debe tener 3 dígitos");
          return false;
        }
      } else if (metodoPago === "paypal") {
        const paypalEmail = document.getElementById("paypal-email").value;
        if (!paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
          alert("Por favor ingresa un correo válido para PayPal");
          return false;
        }
      }

      if (
        !document.querySelector('input[name="tipo-apadrinamiento"]:checked')
      ) {
        alert("Por favor selecciona un tipo de apadrinamiento");
        return false;
      }
    }

    return true;
  }

  // Función para manejar el envío del formulario
  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        tipoFormulario: currentFormType,
        // ... otros campos ...
        tipoApadrinamiento:
          currentFormType === "apadrinar"
            ? document.querySelector(
                'input[name="tipo-apadrinamiento"]:checked'
              ).value
            : null,
        recibirActualizaciones: document.getElementById(
          "recibir-actualizaciones"
        )?.checked,
        montoAPagar:
          currentFormType === "apadrinar"
            ? document.querySelector(".monto-total span").textContent
            : null,
      };

      console.log("Datos del formulario:", formData);
      showSuccessModal();
      formImage.src = defaultImage;
      document.getElementById("mascota").disabled = true;
      document.querySelector(".monto-total span").textContent = "$0";
    }
  }

  // Función para mostrar el modal de éxito
  function showSuccessModal() {
    const modal = document.querySelector(".success-modal");
    const modalContent = modal?.querySelector(".success-modal-content");

    if (!modal || !modalContent) {
      console.warn("No se encontró el modal de éxito");
      return;
    }

    modal.style.display = "flex";
    modalContent.style.animation = "modalFadeIn 0.3s ease-out";

    // Esperar 5 segundos y luego ocultar el modal con animación
    setTimeout(() => {
      modalContent.style.animation = "modalFadeOut 0.3s ease-out";

      setTimeout(() => {
        modal.style.display = "none";
        modalContent.style.animation = "modalFadeIn 0.3s ease-out";

        // Limpiar el formulario después de cerrar el modal
        form.reset();
        formImage.src = defaultImage;
        document.getElementById("mascota").disabled = true;
        document.querySelector(".monto-total span").textContent = "$0";

        // Ocultar campos según método de pago actual
        actualizarMetodoPago();
      }, 300);
    }, 5000);
  }

  console.log("Formulario válido, mostrando modal de éxito...");

  // Agregar formato a los campos de tarjeta mientras se escriben
  if (document.getElementById("card-number")) {
    document
      .getElementById("card-number")
      .addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "").slice(0, 16);
      });

    document
      .getElementById("card-expiry-month")
      .addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "").slice(0, 2);
        if (this.value.length === 1 && this.value > 1) {
          this.value = "0" + this.value;
        }
        if (this.value > 12) {
          this.value = "12";
        }
      });

    document
      .getElementById("card-expiry-year")
      .addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "").slice(0, 2);
      });

    document.getElementById("card-cvv").addEventListener("input", function (e) {
      this.value = this.value.replace(/\D/g, "").slice(0, 3);
    });
  }

  // Agregar el event listener para el envío del formulario
  form.addEventListener("submit", handleFormSubmit);

  document.querySelectorAll('input[name="metodo-pago"]').forEach((radio) => {
    radio.addEventListener("change", actualizarMetodoPago);
  });
});
