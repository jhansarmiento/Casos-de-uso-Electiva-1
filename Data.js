const animalesData = [
  // Mascotas para adopción - Perros
  {
    imagen: "./assets/dogs/perro1.webp",
    nombre: "Max",
    tipo: "perro",
    categoria: "adopcion",
    edad: "6 meses",
    tamaño: "Mediano",
    personalidad: "Juguetón y amigable",
    nivelEnergia: "Alto",
    requisitos: "Tener espacio para jugar y disponibilidad para paseos diarios",
    ubicacion: "Bogotá"
  },
  {
    imagen: "./assets/dogs/perro2.webp",
    nombre: "Rocky",
    tipo: "perro",
    categoria: "adopcion",
    edad: "4 años",
    tamaño: "Pequeño",
    personalidad: "Amigable y cariñoso",
    nivelEnergia: "Bajo",
    requisitos: "Ambiente tranquilo y visitas veterinarias regulares",
    ubicacion: "Medellín"
  },
  {
    imagen: "./assets/dogs/perro3.webp",
    nombre: "Bella",
    tipo: "perro",
    categoria: "adopcion",
    edad: "5 meses",
    tamaño: "Mediano",
    personalidad: "Dulce y obediente",
    nivelEnergia: "Moderado",
    requisitos: "Familia con tiempo para entrenarla y cuidarla",
    ubicacion: "Cali"
  },
  {
    imagen: "./assets/dogs/perro4.webp",
    nombre: "Charlie",
    tipo: "perro",
    categoria: "adopcion",
    edad: "3 años",
    tamaño: "Pequeño",
    personalidad: "Tranquilo y cariñoso",
    nivelEnergia: "Bajo",
    requisitos: "Preferiblemente compañía constante en casa",
    ubicacion: "Barranquilla"
  },
  {
    imagen: "./assets/dogs/perro5.webp",
    nombre: "Daisy",
    tipo: "perro",
    categoria: "adopcion",
    edad: "2 años",
    tamaño: "Grande",
    personalidad: "Protectora y leal",
    nivelEnergia: "Moderado",
    requisitos: "Espacio amplio y dueño con experiencia",
    ubicacion: "Bucaramanga"
  },
  {
    imagen: "./assets/dogs/perro6.webp",
    nombre: "Finn",
    tipo: "perro",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Grande",
    personalidad: "Activo y juguetón",
    nivelEnergia: "Muy alto",
    requisitos: "Rutina diaria de ejercicio y socialización",
    ubicacion: "Pereira"
  },

  // Mascotas para adopción - Gatos
  {
    imagen: "./assets/cats/gato1.webp",
    nombre: "Luna",
    tipo: "gato",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Mediano",
    personalidad: "Energética y juguetona",
    nivelEnergia: "Muy alto",
    requisitos: "Ambiente enriquecido y tiempo de juego diario",
    ubicacion: "Manizales"
  },
  {
    imagen: "./assets/cats/gato2.webp",
    nombre: "Milo",
    tipo: "gato",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Pequeño",
    personalidad: "Curioso y juguetón",
    nivelEnergia: "Muy alto",
    requisitos: "Hogar seguro sin acceso al exterior",
    ubicacion: "Armenia"
  },
  {
    imagen: "./assets/cats/gato3.webp",
    nombre: "Nina",
    tipo: "gato",
    categoria: "adopcion",
    edad: "2 años",
    tamaño: "Pequeño",
    personalidad: "Territorial y protectora",
    nivelEnergia: "Moderado",
    requisitos: "Ser el único gato del hogar",
    ubicacion: "Ibagué"
  },
  {
    imagen: "./assets/cats/gato4.webp",
    nombre: "Oreo",
    tipo: "gato",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Pequeño",
    personalidad: "Activo y juguetón",
    nivelEnergia: "Muy alto",
    requisitos: "Hogar con juguetes y rascadores",
    ubicacion: "Cúcuta"
  },
  {
    imagen: "./assets/cats/gato5.webp",
    nombre: "Pumpkin",
    tipo: "gato",
    categoria: "adopcion",
    edad: "2 años",
    tamaño: "Pequeño",
    personalidad: "Tranquila y cariñosa",
    nivelEnergia: "Bajo",
    requisitos: "Ambiente tranquilo, sin niños pequeños",
    ubicacion: "Villavicencio"
  },
  {
    imagen: "./assets/cats/gato6.webp",
    nombre: "Riley",
    tipo: "gato",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Pequeño",
    personalidad: "Curioso y juguetón",
    nivelEnergia: "Alto",
    requisitos: "Ventanas seguras y tiempo de juego diario",
    ubicacion: "Neiva"
  },

  // Mascotas para apadrinar - Perros
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar1.jpg",
    nombre: "Maximo",
    edad: "5 años",
    tipo: "perro",
    categoria: "apadrinar",
    necesidad: "Tratamiento mensual para la piel y vitaminas especiales",
    nivelEnergia: "Alto",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar2.jpg",
    nombre: "Moon",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "3 años",
    necesidad: "Alimento especial y medicamentos para las articulaciones",
    nivelEnergia: "Moderado",
    valorMensual: 45000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar3.jpg",
    nombre: "Coco",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "4 años",
    necesidad: "Recuperación de cirugía por accidente",
    nivelEnergia: "Bajo",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar4.jpg",
    nombre: "Simba",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "6 años",
    necesidad: "Tratamiento para problemas de piel",
    nivelEnergia: "Muy alto",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar5.jpg",
    nombre: "Rex",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "9 años",
    necesidad: "Cuidados especiales por edad avanzada",
    nivelEnergia: "Alto",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar6.jpg",
    nombre: "Bruno",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "3 años",
    necesidad: "Rehabilitación física por lesión en pata",
    nivelEnergia: "Moderado",
    valorMensual: 50000
  },

  // Mascotas para apadrinar - Gatos
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar1.jpg",
    nombre: "Millow",
    edad: "2 años",
    tipo: "gato",
    categoria: "apadrinar",
    necesidad: "Dieta especial y suplementos vitamínicos",
    nivelEnergia: "Moderado",
    valorMensual: 40000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar2.jpg",
    nombre: "Felix",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "2 años",
    necesidad: "Recuperación de cirugía ocular",
    nivelEnergia: "Alto",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar3.jpg",
    nombre: "Aslan",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "10 años",
    necesidad: "Cuidados especiales por edad avanzada",
    nivelEnergia: "Bajo",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar4.jpg",
    nombre: "Simón",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "5 años",
    necesidad: "Tratamiento para problemas respiratorios",
    nivelEnergia: "Muy alto",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar5.jpg",
    nombre: "Lucy",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "4 años",
    necesidad: "Medicación para condición cardíaca",
    nivelEnergia: "Alto",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar6.jpg",
    nombre: "Oliver",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "6 años",
    necesidad: "Tratamiento dental especializado",
    nivelEnergia: "Moderado",
    valorMensual: 50000
  }
];

export default animalesData;