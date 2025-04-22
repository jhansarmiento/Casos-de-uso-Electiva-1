// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async function () {
  try {
      // Importar los datos de los animales
      const { default: animalesData } = await import('./data.js');
      initGallery(animalesData);
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
              ${animal.categoria === 'adopcion' 
                  ? `<p><span>Personalidad: </span>${animal.personalidad}</p>`
                  : `<p><span>Necesidad: </span>${animal.necesidad}</p>`}
          </div>
      </div>
  `;
}

// Función para mostrar las mascotas filtradas
function mostrarMascotas(animalesData, categoria, tipo) {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  const mascotasFiltradas = animalesData.filter(animal => 
      animal.categoria === categoria && animal.tipo === tipo
  );
  
  galleryContainer.innerHTML = mascotasFiltradas.map(crearTarjetaMascota).join('');

  // Volver a agregar los event listeners para el modal
  addModalEventListeners(animalesData);
}

// Función para inicializar la galería
function initGallery(animalesData) {
  let categoriaActual = 'adopcion';
  let tipoActual = 'perro';
  
  // Manejar botones de categoría principal (Adoptar/Apadrinar)
  const categoryButtons = document.querySelectorAll('.main-category .category-button');
  categoryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          categoriaActual = e.target.dataset.categoria;
          mostrarMascotas(animalesData, categoriaActual, tipoActual);
      });
  });

  // Manejar botones de tipo de mascota (Perros/Gatos)
  const typeButtons = document.querySelectorAll('.pet-type .category-button');
  typeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          typeButtons.forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          tipoActual = e.target.dataset.tipo;
          mostrarMascotas(animalesData, categoriaActual, tipoActual);
      });
  });

  // Mostrar mascotas iniciales (perros en adopción por defecto)
  mostrarMascotas(animalesData, categoriaActual, tipoActual);
}

function createModal(pet) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <!-- ... resto del código del modal ... -->
        ${pet.categoria === 'adopcion' 
            ? `<button class="modal-action-button adopt-button" data-category="adopcion" data-pet-name="${pet.nombre}" data-pet-type="${pet.tipo}">
                 Adoptar a ${pet.nombre}
               </button>`
            : `<button class="modal-action-button sponsor-button" data-category="apadrinar" data-pet-name="${pet.nombre}" data-pet-type="${pet.tipo}">
                 Apadrinar a ${pet.nombre}
               </button>`
        }
        <!-- ... resto del código del modal ... -->
    `;

    // Event listener para el botón de acción
    const actionButton = modalContent.querySelector('.modal-action-button');
    actionButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtener los datos de la mascota
        const category = pet.categoria; // Usar directamente la categoría de la mascota
        const petName = pet.nombre;
        const petType = pet.tipo;

        // Cerrar el modal
        document.querySelector('.modal').style.display = 'none';

        // Navegar al formulario
        const formSection = document.getElementById('form');
        formSection.scrollIntoView({ behavior: 'smooth' });

        // Disparar el evento con los datos actualizados
        const formUpdateEvent = new CustomEvent('updateFormSelection', {
            detail: {
                category: category,
                petName: petName,
                petType: petType
            }
        });
        document.dispatchEvent(formUpdateEvent);
    });
}

function showPetModal(pet) {
    const modal = document.getElementById('pet-modal');
    const modalImage = document.getElementById('modal-pet-image');
    const modalName = document.getElementById('modal-pet-name');
    const petInfoContainer = document.querySelector('.pet-info-container');

    // Actualizar imagen y nombre
    modalImage.src = pet.imagen;
    modalImage.alt = pet.nombre;
    modalName.textContent = pet.nombre;

    // Crear el contenido específico
    let infoContent = `
        <p><span>Edad:</span> <span>${pet.edad}</span></p>
    `;

    if (pet.categoria === 'adopcion') {
        infoContent += `
            <p><span>Tamaño:</span> <span>${pet.tamaño}</span></p>
            <p><span>Personalidad:</span> <span>${pet.personalidad}</span></p>
            <p><span>Nivel de Energía:</span> <span>${pet.nivelEnergia}</span></p>
            <button id="adopt-button" class="adopt-button">Adoptar a ${pet.nombre}</button>
        `;
    } else {
        infoContent += `
            <p><span>Necesidad:</span> <span>${pet.necesidad}</span></p>
            <button id="adopt-button" class="adopt-button">Apadrinar a ${pet.nombre}</button>
        `;
    }

    petInfoContainer.innerHTML = infoContent;

    // Agregar event listener al botón
    const actionButton = document.getElementById('adopt-button');
    if (actionButton) {
        actionButton.onclick = function() {
            modal.classList.remove('show');
            const formSection = document.getElementById('form');
            formSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                const tipoMascotaSelect = document.getElementById('tipo-mascota');
                const mascotaSelect = document.getElementById('mascota');
                
                tipoMascotaSelect.value = pet.tipo;
                tipoMascotaSelect.dispatchEvent(new Event('change'));
                
                setTimeout(() => {
                    mascotaSelect.value = pet.nombre;
                    mascotaSelect.dispatchEvent(new Event('change'));
                }, 100);
            }, 800);
        };
    }

    modal.classList.add('show');
}

function addModalEventListeners(animalesData) {
    // Event listeners para abrir el modal
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const petId = item.dataset.petId;
            const pet = animalesData.find(animal => animal.nombre === petId);
            if (pet) {
                showPetModal(pet);
            }
        });
    });

    // Event listeners para cerrar el modal
    const modal = document.getElementById('pet-modal');
    const closeBtn = document.querySelector('.close-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    // Cerrar al hacer clic fuera del modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

