document.addEventListener("DOMContentLoaded", function () { // Espera a que el DOM este cargado

  // Menú de hamburguesa
  const menuToggle = document.getElementById("menu-toggle"); 
  const menu = document.getElementById("menu");
  const menuLinks = document.querySelectorAll(".menu a");

  // Abre y cierra el menú
  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("active"); // Agrega la clase "active" a la clase .menu para mostrar el menú
  });

  // Cierra el menú cuando se hace clic en un enlace
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
    });
  });

  // Botones para filtrar por categoría
  const categoryButtons = document.querySelectorAll(".category-button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Función para mostrar solo las imagenes de la categoría seleccionada
  function showCategory(category) {
      galleryItems.forEach(item => {
          item.style.display = item.classList.contains(category) ? "block" : "none";
      });
  }

  // Mostrar inicialmente solo los perros
  showCategory("cat");

  categoryButtons.forEach(button => { // Agrega un evento de clic a cada botón
      button.addEventListener("click", function () {
          let category;
          const text = this.textContent.toLowerCase(); // Obtiene el texto del botón
          if (text === "perros") {
              category = "dog";
          } else if (text === "gatos") {
              category = "cat";
          }
          showCategory(category); // Muestra solo las imagenes de la categoría seleccionada
      });
  });
});

// Función para abrir el modal y mostrar la imagen correspondiente
function openModal(type) {
  const modal = document.getElementById('myModal'); // Obtiene el modal
  const modalImage = document.getElementById('modalImage'); // Obtiene la imagen dentro del modal

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