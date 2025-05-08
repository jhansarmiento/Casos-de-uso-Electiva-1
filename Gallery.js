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
function mostrarMascotas(animalesData, categoria) {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  const mascotasFiltradas = animalesData.filter(animal => 
      animal.categoria === categoria
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
    
    // Formatear el valor mensual si existe
    const valorFormateado = pet.categoria === 'apadrinar' ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(pet.valorMensual) : '';

    modalContent.innerHTML = `
        <span class="close-button">&times;</span>
        <div class="modal-image">
            <img src="${pet.imagen}" alt="${pet.nombre}">
        </div>
        <div class="modal-info">
            <h2>${pet.nombre}</h2>
            <div class="pet-details">
                <p><strong>Edad:</strong> ${pet.edad}</p>
                <p><strong>Tamaño:</strong> ${pet.tamaño}</p>
                <p><strong>Personalidad:</strong> ${pet.personalidad}</p>
                <p><strong>Nivel de Energía:</strong> ${pet.energia}</p>
                ${pet.categoria === 'apadrinar' ? `
                    <p><strong>Necesidades:</strong> ${pet.necesidades}</p>
                    <p class="valor-mensual"><strong>Valor del Apadrinamiento:</strong> ${valorFormateado} mensuales</p>
                ` : ''}
            </div>
            ${pet.categoria === 'adopcion' 
                ? `<button class="modal-action-button adopt-button" data-category="adopcion" data-pet-name="${pet.nombre}" data-pet-type="${pet.tipo}">
                     Adoptar a ${pet.nombre}
                   </button>`
                : `<button class="modal-action-button sponsor-button" data-category="apadrinar" data-pet-name="${pet.nombre}" data-pet-type="${pet.tipo}" data-valor="${pet.valorMensual}">
                     Apadrinar a ${pet.nombre}
                   </button>`
            }
        </div>
    `;

    // Agregar los event listeners del modal
    const closeButton = modalContent.querySelector('.close-button');
    const actionButton = modalContent.querySelector('.modal-action-button');
    
    closeButton.onclick = function() {
        document.querySelector('.modal').style.display = 'none';
    };

    actionButton.addEventListener('click', function() {
        const category = this.dataset.category;
        const petName = this.dataset.petName;
        const petType = this.dataset.petType;
        const valor = this.dataset.valor;

        document.querySelector('.modal').style.display = 'none';
        const formSection = document.getElementById('form');
        formSection.scrollIntoView({ behavior: 'smooth' });

        // Disparar evento con todos los datos necesarios
        const formUpdateEvent = new CustomEvent('updateFormSelection', {
            detail: {
                category,
                petName,
                petType,
                valor: Number(valor)
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

