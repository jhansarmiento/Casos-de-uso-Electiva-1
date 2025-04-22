// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async function () {
  try {
      // Importar los datos de los animales
      const { default: animalesData } = await import('./data.js');
      initGallery(animalesData);
      initModal(animalesData);
  } catch (error) {
      console.error('Error al cargar los datos:', error);
  }
});

// Función para crear una tarjeta de mascota
function crearTarjetaMascota(animal) {
  return `
      <div class="gallery-item" data-pet-id="${animal.nombre}">
          <img src="${animal.imagen}" alt="${animal.nombre}">
          <div class="pet-description">
              <p class="name">${animal.nombre}</p>
              <p><span>Edad: </span>${animal.edad}</p>
              <p><span>Personalidad: </span>${animal.personalidad}</p>
          </div>
      </div>
  `;
}

// Función para mostrar las mascotas filtradas
function mostrarMascotas(animalesData, tipo) {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  const mascotasFiltradas = tipo === 'todos' 
      ? animalesData 
      : animalesData.filter(animal => animal.tipo === tipo);
  
  galleryContainer.innerHTML = mascotasFiltradas.map(crearTarjetaMascota).join('');
}

// Función para inicializar la galería
function initGallery(animalesData) {
  const categoryButtons = document.querySelectorAll('.category-button');
  
  // Configurar los event listeners para los botones
  categoryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          // Remover la clase active de todos los botones
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          // Agregar la clase active al botón clickeado
          e.target.classList.add('active');
          // Mostrar las mascotas del tipo seleccionado
          mostrarMascotas(animalesData, e.target.dataset.tipo);
      });
  });

  // Mostrar perros por defecto al cargar la página
  mostrarMascotas(animalesData, 'perro');
}

function initModal(animalesData) {
    const modal = document.getElementById('pet-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Cerrar modal con el botón X
    closeBtn.onclick = () => {
        modal.classList.remove('show');
    };
    
    // Cerrar modal haciendo clic fuera
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
    
    // Abrir modal al hacer clic en una tarjeta
    document.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const petId = galleryItem.dataset.petId;
            const pet = animalesData.find(animal => animal.nombre === petId);
            if (pet) {
                showPetModal(pet);
            }
        }
    });
}

function showPetModal(pet) {
    const modal = document.getElementById('pet-modal');
    const modalImage = document.getElementById('modal-pet-image');
    const modalName = document.getElementById('modal-pet-name');
    const modalAge = document.getElementById('modal-pet-age');
    const modalSize = document.getElementById('modal-pet-size');
    const modalPersonality = document.getElementById('modal-pet-personality');
    const modalEnergy = document.getElementById('modal-pet-energy');
    const petNameButton = document.getElementById('pet-name-button');
    const adoptButton = document.getElementById('adopt-button');
    
    modalImage.src = pet.imagen;
    modalImage.alt = pet.nombre;
    modalName.textContent = pet.nombre;
    modalAge.textContent = pet.edad;
    modalSize.textContent = pet.tamaño;
    modalPersonality.textContent = pet.personalidad;
    modalEnergy.textContent = pet.nivelEnergia;
    petNameButton.textContent = pet.nombre;
    
    // Manejar el clic en el botón de adoptar
    adoptButton.onclick = function() {
        // Cerrar el modal
        modal.classList.remove('show');
        
        // Scroll suave hasta el formulario
        const formSection = document.getElementById('form');
        formSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pequeño delay para asegurar que el scroll haya terminado
        setTimeout(() => {
            // Seleccionar automáticamente el tipo de mascota y la mascota específica
            const tipoMascotaSelect = document.getElementById('tipo-mascota');
            const mascotaSelect = document.getElementById('mascota');
            
            tipoMascotaSelect.value = pet.tipo;
            // Disparar el evento change para cargar las mascotas del tipo seleccionado
            tipoMascotaSelect.dispatchEvent(new Event('change'));
            
            // Pequeño delay para asegurar que las opciones se hayan cargado
            setTimeout(() => {
                mascotaSelect.value = pet.nombre;
                mascotaSelect.dispatchEvent(new Event('change'));
            }, 100);
        }, 800);
    };
    
    modal.classList.add('show');
}

