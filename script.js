document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const menuLinks = document.querySelectorAll(".menu a");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

  // Cierra el menú cuando se hace clic en un enlace
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
    });
  });

  const categoryButtons = document.querySelectorAll(".category-button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function showCategory(category) {
      galleryItems.forEach(item => {
          item.style.display = item.classList.contains(category) ? "block" : "none";
      });
  }

  // Mostrar inicialmente solo los perros
  showCategory("cat");

  categoryButtons.forEach(button => {
      button.addEventListener("click", function () {
          let category;
          const text = this.textContent.toLowerCase();
          if (text === "perros") {
              category = "dog";
          } else if (text === "gatos") {
              category = "cat";
          }
          showCategory(category);
      });
  });
});

// Función para abrir el modal y mostrar la imagen correspondiente
function openModal(type) {
  const modal = document.getElementById('myModal');
  const modalImage = document.getElementById('modalImage');

  // Cambia la imagen según el botón presionado
  if (type === 'nequi') {
      modalImage.src = 'https://tecnotiendas.com.co/wp-content/uploads/2021/05/Paga-con-Neki.jpg'; // Ruta de la imagen de Nequi
  } else if (type === 'paypal') {
      modalImage.src = 'https://www.paypalobjects.com/marketing/web23/es/consumer/pay-with-qr-code/spanish/graphic-split-section-01-ui_size-all.png'; // Ruta de la imagen de PayPal
  } else if (type === 'bancolombia') {
      modalImage.src = 'https://febimbo.com/imagenes/comunicaciones/qrall.jpg'; // Ruta de la imagen de Bancolombia
  }

  modal.style.display = 'block'; // Muestra el modal
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none'; // Oculta el modal
}

// Cierra el modal si se hace clic fuera de la imagen
window.onclick = function(event) {
  const modal = document.getElementById('myModal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
}