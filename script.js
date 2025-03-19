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
