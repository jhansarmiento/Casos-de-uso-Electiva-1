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
    nivelEnergia: "Alto"
  },
  {
    imagen: "./assets/dogs/perro2.webp",
    nombre: "Rocky",
    tipo: "perro",
    categoria: "adopcion",
    edad: "3 años",
    tamaño: "Pequeño",
    personalidad: "Amigable y cariñoso",
    nivelEnergia: "Alto"
  },
  {
    imagen: "./assets/dogs/perro3.webp",
    nombre: "Bella",
    tipo: "perro",
    categoria: "adopcion",
    edad: "5 meses",
    tamaño: "Mediano",
    personalidad: "Dulce y obediente",
    nivelEnergia: "Moderado"
  },
  {
    imagen: "./assets/dogs/perro4.webp",
    nombre: "Charlie",
    tipo: "perro",
    categoria: "adopcion",
    edad: "3 años",
    tamaño: "Pequeño",
    personalidad: "Tranquilo y cariñoso",
    nivelEnergia: "Bajo"
  },
  {
    imagen: "./assets/dogs/perro5.webp",
    nombre: "Daisy",
    tipo: "perro",
    categoria: "adopcion",
    edad: "2 años",
    tamaño: "Pequeño",
    personalidad: "Protectora y leal",
    nivelEnergia: "Moderado"
  },
  {
    imagen: "./assets/dogs/perro6.webp",
    nombre: "Finn",
    tipo: "perro",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Grande",
    personalidad: "Activo y juguetón",
    nivelEnergia: "Muy alto"
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
    nivelEnergia: "Muy alto"
  },
  {
    imagen: "./assets/cats/gato2.webp",
    nombre: "Milo",
    tipo: "gato",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Pequeño",
    personalidad: "Curioso y juguetón",
    nivelEnergia: "Muy alto"
  },
  {
    imagen: "./assets/cats/gato3.webp",
    nombre: "Nina",
    tipo: "gato",
    categoria: "adopcion",
    edad: "2 años",
    tamaño: "Pequeño",
    personalidad: "Territorial y protectora",
    nivelEnergia: "Moderado"
  },
  {
    imagen: "./assets/cats/gato4.webp",
    nombre: "Oreo",
    tipo: "gato",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Pequeño",
    personalidad: "Activo y juguetón",
    nivelEnergia: "Muy alto"
  },
  {
    imagen: "./assets/cats/gato5.webp",
    nombre: "Pumpkin",
    tipo: "gato",
    categoria: "adopcion",
    edad: "2 años",
    tamaño: "Pequeño",
    personalidad: "Tranquila y cariñosa",
    nivelEnergia: "Moderado"
  },
  {
    imagen: "./assets/cats/gato6.webp",
    nombre: "Riley",
    tipo: "gato",
    categoria: "adopcion",
    edad: "1 año",
    tamaño: "Pequeño",
    personalidad: "Curioso y juguetón",
    nivelEnergia: "Muy alto"
  },

  // Mascotas para apadrinar - Perros
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar1.jpg",
    nombre: "Maximo",
    edad: "5 años",
    tipo: "perro",
    categoria: "apadrinar",
    necesidad: "Tratamiento mensual para la piel y vitaminas especiales",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar2.jpg",
    nombre: "Moon",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "3 años",
    necesidad: "Alimento especial y medicamentos para las articulaciones",
    valorMensual: 45000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar3.jpg",
    nombre: "Coco",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "4 años",
    necesidad: "Recuperación de cirugía por accidente",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar4.jpg",
    nombre: "Simba",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "6 años",
    necesidad: "Tratamiento para problemas de piel",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar5.jpg",
    nombre: "Rex",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "9 años",
    necesidad: "Cuidados especiales por edad avanzada",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/dog/DogApadrinar6.jpg",
    nombre: "Bruno",
    tipo: "perro",
    categoria: "apadrinar",
    edad: "3 años",
    necesidad: "Rehabilitación física por lesión en pata",
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
    valorMensual: 40000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar2.jpg",
    nombre: "Felix",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "2 años",
    necesidad: "Recuperación de cirugía ocular",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar3.jpg",
    nombre: "Aslan",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "10 años",
    necesidad: "Cuidados especiales por edad avanzada",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar4.jpg",
    nombre: "Simón",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "5 años",
    necesidad: "Tratamiento para problemas respiratorios",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar5.jpg",
    nombre: "Lucy",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "4 años",
    necesidad: "Medicación para condición cardíaca",
    valorMensual: 50000
  },
  {
    imagen: "./assets/Apadrinar/cat/CatApadrinar6.jpg",
    nombre: "Oliver",
    tipo: "gato",
    categoria: "apadrinar",
    edad: "6 años",
    necesidad: "Tratamiento dental especializado",
    valorMensual: 50000
  }
];

export default animalesData;