// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const { default: animalesData } = await import("./data.js");
    initGallery(animalesData);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
});

function crearTarjetaMascota(animal) {
  return `
      <div class="gallery-item" data-pet-id="${animal.nombre}">
        <img src="${animal.imagen}" alt="${animal.nombre}">
        <div class="pet-description">
          <p class="name">${animal.nombre}</p>
          <p><span>Edad: </span>${animal.edad}</p>
          ${
            animal.categoria === "adopcion"
              ? `<p><span>Personalidad: </span>${animal.personalidad}</p>`
              : `<p><span>Necesidad: </span>${animal.necesidad}</p>`
          }
        </div>
      </div>
    `;
}

function mostrarMascotas(animalesData, categoria) {
  const galleryContainer = document.getElementById("gallery-container");
  if (!galleryContainer) return;

  const mascotasFiltradas = animalesData.filter(
    (animal) => animal.categoria === categoria
  );

  galleryContainer.innerHTML = mascotasFiltradas
    .map(crearTarjetaMascota)
    .join("");
  addModalEventListeners(animalesData);
}

function aplicarFiltros(animalesData, categoria) {
  const tamaño = document.getElementById("filtro-tamaño").value;
  const energia = document.getElementById("filtro-energia").value;
  const edadFiltro = document.getElementById("filtro-edad").value;
  const tipo = document.getElementById("filtro-tipo").value;

  let filtrados = animalesData.filter((a) => a.categoria === categoria);

  if (tipo) filtrados = filtrados.filter((a) => a.tipo === tipo);
  if (tamaño) filtrados = filtrados.filter((a) => a.tamaño === tamaño);
  if (energia) filtrados = filtrados.filter((a) => a.nivelEnergia === energia);

  if (edadFiltro) {
    filtrados = filtrados.filter((a) => {
      const edadTexto = a.edad.toLowerCase();
      const años = edadTexto.includes("mes") ? 0 : parseInt(edadTexto);
      if (edadFiltro === "menor-1")
        return edadTexto.includes("mes") || años < 1;
      if (edadFiltro === "1-3") return años >= 1 && años <= 3;
      if (edadFiltro === "mayor-3") return años > 3;
    });
  }

  const galleryContainer = document.getElementById("gallery-container");
  galleryContainer.innerHTML = filtrados.map(crearTarjetaMascota).join("");
  addModalEventListeners(animalesData);
}

function initGallery(animalesData) {
  let categoriaActual = "adopcion";

  const categoryButtons = document.querySelectorAll(
    ".main-category .category-button"
  );
  categoryButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      categoriaActual = e.target.dataset.categoria;
      aplicarFiltros(animalesData, categoriaActual);
    });
  });

  ["filtro-tamaño", "filtro-energia", "filtro-edad", "filtro-tipo"].forEach(
    (id) => {
      document.getElementById(id).addEventListener("change", () => {
        aplicarFiltros(animalesData, categoriaActual);
      });
    }
  );

  aplicarFiltros(animalesData, categoriaActual);
}

function showPetModal(pet) {
  const modal = document.getElementById("pet-modal");
  const modalImage = document.getElementById("modal-pet-image");
  const modalName = document.getElementById("modal-pet-name");
  const petInfoContainer = document.querySelector(".pet-info-container");

  modalImage.src = pet.imagen;
  modalImage.alt = pet.nombre;
  modalName.textContent = pet.nombre;

  const costoFormateado = pet.costoMensual
    ? new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(pet.costoMensual)
    : null;

  let infoContent = `<p><span>Edad:</span> <span>${pet.edad}</span></p>`;

  if (pet.categoria === "adopcion") {
    infoContent += `
        <p><span>Tamaño:</span> <span>${pet.tamaño}</span></p>
        <p><span>Personalidad:</span> <span>${pet.personalidad}</span></p>
        <p><span>Nivel de Energía:</span> <span>${pet.nivelEnergia}</span></p>
        <p><span>Ubicación:</span> <span>${pet.ubicacion}</span></p>
        <p><span>Requisitos:</span> <span>${pet.requisitos}</span></p>
        ${
          costoFormateado
            ? `<p><span>Costo mensual estimado:</span> <span>${costoFormateado}</span></p>`
            : ""
        }
        <button id="adopt-button" class="adopt-button">Adoptar a ${
          pet.nombre
        }</button>
      `;
  } else {
    infoContent += `
        <p><span>Necesidad:</span> <span>${pet.necesidad}</span></p>
        <button id="adopt-button" class="adopt-button">Apadrinar a ${pet.nombre}</button>
      `;
  }

  petInfoContainer.innerHTML = infoContent;

  const actionButton = document.getElementById("adopt-button");
  if (actionButton) {
    actionButton.onclick = function () {
      modal.classList.remove("show");
      const formSection = document.getElementById("form");
      formSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const tipoMascotaSelect = document.getElementById("tipo-mascota");
        const mascotaSelect = document.getElementById("mascota");

        tipoMascotaSelect.value = pet.tipo;
        tipoMascotaSelect.dispatchEvent(new Event("change"));

        setTimeout(() => {
          mascotaSelect.value = pet.nombre;
          mascotaSelect.dispatchEvent(new Event("change"));
        }, 100);
      }, 800);
    };
  }

  modal.classList.add("show");
}

function addModalEventListeners(animalesData) {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const petId = item.dataset.petId;
      const pet = animalesData.find((animal) => animal.nombre === petId);
      if (pet) {
        showPetModal(pet);
      }
    });
  });

  const modal = document.getElementById("pet-modal");
  const closeBtn = document.querySelector(".close-modal");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
}
