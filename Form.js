document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adoption-form');
    const formImage = document.querySelector('.form-image img');
    const defaultImage = './assets/dogs_and_cats/Family3.webp';
    
    // Objeto con las funciones de validación
    const validaciones = {
        nombre: (value) => {
            if (!value.trim()) return 'El nombre es requerido';
            if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo debe contener letras';
            return '';
        },
        email: (value) => {
            if (!value.trim()) return 'El correo electrónico es requerido';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un correo electrónico válido';
            return '';
        },
        telefono: (value) => {
            if (!value.trim()) return 'El teléfono es requerido';
            if (!/^\d{10}$/.test(value)) return 'Ingresa un número de teléfono válido (10 dígitos)';
            return '';
        },
        direccion: (value) => {
            if (!value.trim()) return 'La dirección es requerida';
            if (value.trim().length < 10) return 'La dirección debe ser más detallada';
            return '';
        },
        experiencia: (value) => {
            if (!value) return 'Por favor, indica si tienes experiencia con mascotas';
            return '';
        },
        presupuesto: (value) => {
            if (!value) return 'Por favor, indica si cuentas con el presupuesto necesario';
            return '';
        },
        tiempo: (value) => {
            if (!value) return 'Por favor, indica si tienes disponibilidad de tiempo';
            return '';
        },
        espacio: (value) => {
            if (!value) return 'Por favor, indica si cuentas con el espacio adecuado';
            return '';
        },
        'tipo-mascota': (value) => {
            if (!value) return 'Por favor, selecciona un tipo de mascota';
            return '';
        },
        'mascota': (value) => {
            if (!value) return 'Por favor, selecciona una mascota';
            return '';
        }
    };

    // Función para mostrar errores
    function mostrarError(input, mensaje) {
        const formGroup = input.closest('.form-group'); // Obtener el grupo de formulario
        const errorMessage = formGroup.querySelector('.error-message'); // Obtener el mensaje de error
        formGroup.classList.add('error'); // Agregar la clase de error
        errorMessage.textContent = mensaje; // Mostrar el mensaje de error
        
        // Hacer scroll al primer error si existe
        if (!form.querySelector('.error')) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Función para limpiar errores
    function limpiarError(input) {
        const formGroup = input.closest('.form-group'); // Obtener el grupo de formulario
        const errorMessage = formGroup.querySelector('.error-message'); // Obtener el mensaje de error
        formGroup.classList.remove('error'); // Eliminar la clase de error
        errorMessage.textContent = ''; // Limpiar el mensaje de error
    }

    // Validación en tiempo real para cada campo
    form.querySelectorAll('input, select, textarea').forEach(input => {
        // Agregar un evento de escucha para cada campo
        ['input', 'blur'].forEach(eventType => {
            input.addEventListener(eventType, function() {
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

    // Función para cargar las mascotas según el tipo
    async function cargarMascotas(tipo) {
        try {
            const { default: animalesData } = await import('./data.js');
            const mascotasSelect = document.getElementById('mascota');
            const mascotasFiltradas = animalesData.filter(animal => animal.tipo === tipo);

            // Limpiar el select de mascotas
            mascotasSelect.innerHTML = '<option value="">Selecciona una mascota</option>';
            
            // Agregar las mascotas filtradas
            mascotasFiltradas.forEach(mascota => {
                const option = document.createElement('option');
                option.value = mascota.nombre;
                option.textContent = mascota.nombre;
                // Guardar la imagen en el dataset del option
                option.dataset.imagen = mascota.imagen;
                mascotasSelect.appendChild(option);
            });

            // Habilitar el select de mascotas
            mascotasSelect.disabled = false;

            // Restaurar imagen por defecto cuando se cambia el tipo
            formImage.src = defaultImage;
            animateImageChange(formImage);
        } catch (error) {
            console.error('Error al cargar las mascotas:', error);
        }
    }

    // Función para animar el cambio de imagen
    function animateImageChange(imgElement) {
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.style.opacity = '1';
        }, 300);
    }

    // Manejar el cambio en el tipo de mascota
    const tipoMascotaSelect = document.getElementById('tipo-mascota');
    const mascotaSelect = document.getElementById('mascota');

    tipoMascotaSelect.addEventListener('change', function() {
        if (this.value) {
            cargarMascotas(this.value);
        } else {
            mascotaSelect.innerHTML = '<option value="">Primero selecciona un tipo de mascota</option>';
            mascotaSelect.disabled = true;
            // Restaurar imagen por defecto
            formImage.src = defaultImage;
            animateImageChange(formImage);
        }
    });

    // Manejar el cambio de mascota seleccionada
    mascotaSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption && selectedOption.dataset.imagen) {
            formImage.src = selectedOption.dataset.imagen;
            animateImageChange(formImage);
        } else {
            formImage.src = defaultImage;
            animateImageChange(formImage);
        }
    });

    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let hayErrores = false;

        // Validar todos los campos
        form.querySelectorAll('input, select, textarea').forEach(input => {
            const validacion = validaciones[input.name];
            if (validacion) {
                const error = validacion(input.value);
                if (error) {
                    mostrarError(input, error);
                    hayErrores = true;
                } else {
                    limpiarError(input);
                }
            }
        });

        if (!hayErrores) {
            // Mostrar el popup
            const successPopup = document.getElementById('success-popup');
            successPopup.classList.add('show');
            
            // Limpiar el formulario
            form.reset();
            
            // Cerrar el popup después de 3 segundos
            setTimeout(() => {
                successPopup.classList.remove('show');
            }, 4000);
        }
    });

    // Cerrar el popup al hacer clic fuera de él
    document.getElementById('success-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
});
