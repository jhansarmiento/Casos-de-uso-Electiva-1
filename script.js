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
});
