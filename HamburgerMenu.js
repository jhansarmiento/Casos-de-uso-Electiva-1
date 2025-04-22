 // Menú de hamburguesa
 const menuToggle = document.getElementById("menu-toggle");
 const menu = document.getElementById("menu");
 const menuLinks = document.querySelectorAll(".menu a");

 if (menuToggle) {
   menuToggle.addEventListener("click", () => {
     menu.classList.toggle("active");
   });
 }

 if (menuLinks) {
   menuLinks.forEach(link => {
     link.addEventListener("click", () => {
       menu.classList.remove("active");
     });
   });
 }