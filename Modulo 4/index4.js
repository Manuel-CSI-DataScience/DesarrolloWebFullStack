/// app.js - Aplicación de reservas de hotel con Node.js

// 1. Requerimos las dependencias
const express = require('express'); // Framework para crear aplicaciones web y APIs
const bodyParser = require('body-parser'); // Middleware para parsear el cuerpo de las solicitudes
const axios = require('axios'); // Librería para realizar solicitudes HTTP

// 2. Creamos la aplicación Express
const app = express(); // Inicializamos la aplicación
const PORT = 3000; // Definimos el puerto en el que correrá el servidor

// 3. Middleware para parsear JSON
app.use(bodyParser.json()); // Configuramos el middleware para procesar datos en formato JSON

// 4. Base de datos "falsa" en memoria
let reservas = []; // Array para almacenar las reservas
let habitaciones = [ // Array para almacenar las habitaciones disponibles
    { id: 1, tipo: "Individual", precio: 50, disponible: true }, // Habitación individual
    { id: 2, tipo: "Doble", precio: 80, disponible: true }, // Habitación doble
    { id: 3, tipo: "Suite", precio: 120, disponible: true } // Habitación suite
];

// 5. Rutas de la API

// GET /habitaciones - Listar todas las habitaciones
app.get('/habitaciones', (req, res) => {
    res.json(habitaciones); // Devuelve todas las habitaciones en formato JSON
});

// GET /habitaciones/disponibles - Listar habitaciones disponibles
app.get('/habitaciones/disponibles', (req, res) => {
    const disponibles = habitaciones.filter(hab => hab.disponible); // Filtra las habitaciones disponibles
    res.json(disponibles); // Devuelve las habitaciones disponibles en formato JSON
});

// POST /reservas - Crear una nueva reserva
app.post('/reservas', (req, res) => {
    const { habitacionId, nombreCliente, fechaInicio, fechaFin } = req.body; // Extrae datos del cuerpo de la solicitud
    
    // Validar que la habitación existe y está disponible
    const habitacion = habitaciones.find(hab => hab.id === habitacionId); // Busca la habitación por ID
    
    if (!habitacion) { // Si no se encuentra la habitación
        return res.status(404).json({ error: "Habitación no encontrada" }); // Devuelve un error 404
    }
    
    if (!habitacion.disponible) { // Si la habitación no está disponible
        return res.status(400).json({ error: "Habitación no disponible" }); // Devuelve un error 400
    }
    
    // Crear la reserva
    const nuevaReserva = {
        id: reservas.length + 1, // Genera un ID único para la reserva
        habitacionId, // ID de la habitación reservada
        nombreCliente, // Nombre del cliente
        fechaInicio, // Fecha de inicio de la reserva
        fechaFin, // Fecha de fin de la reserva
        precioTotal: calcularPrecioTotal(habitacion, fechaInicio, fechaFin), // Calcula el precio total
        fechaReserva: new Date().toISOString() // Fecha en la que se realiza la reserva
    };
    
    // Marcar habitación como no disponible
    habitacion.disponible = false; // Cambia el estado de la habitación a no disponible
    
    // Guardar reserva
    reservas.push(nuevaReserva); // Agrega la nueva reserva al array de reservas
    
    res.status(201).json(nuevaReserva); // Devuelve la reserva creada con un código 201
});

// Función auxiliar para calcular el precio total
function calcularPrecioTotal(habitacion, fechaInicio, fechaFin) {
    const dias = (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24); // Calcula la cantidad de días entre las fechas
    return habitacion.precio * dias; // Multiplica el precio por noche por la cantidad de días
}

// GET /reservas - Listar todas las reservas
app.get('/reservas', (req, res) => {
    res.json(reservas); // Devuelve todas las reservas en formato JSON
});

// GET /reservas/:id - Obtener una reserva específica
app.get('/reservas/:id', (req, res) => {
    const reserva = reservas.find(r => r.id === parseInt(req.params.id)); // Busca la reserva por ID
    
    if (!reserva) { // Si no se encuentra la reserva
        return res.status(404).json({ error: "Reserva no encontrada" }); // Devuelve un error 404
    }
    
    res.json(reserva); // Devuelve la reserva encontrada
});

// DELETE /reservas/:id - Cancelar una reserva
app.delete('/reservas/:id', (req, res) => {
    const index = reservas.findIndex(r => r.id === parseInt(req.params.id)); // Busca el índice de la reserva por ID
    
    if (index === -1) { // Si no se encuentra la reserva
        return res.status(404).json({ error: "Reserva no encontrada" }); // Devuelve un error 404
    }
    
    // Marcar habitación como disponible nuevamente
    const habitacionId = reservas[index].habitacionId; // Obtiene el ID de la habitación de la reserva
    const habitacion = habitaciones.find(hab => hab.id === habitacionId); // Busca la habitación por ID
    if (habitacion) {
        habitacion.disponible = true; // Cambia el estado de la habitación a disponible
    }
    
    // Eliminar reserva
    reservas.splice(index, 1); // Elimina la reserva del array
    
    res.json({ message: "Reserva cancelada exitosamente" }); // Devuelve un mensaje de éxito
});

// 6. Consumir una API externa (ejemplo con API de clima)
app.get('/clima', async (req, res) => {
    try {
        // Nota: Necesitarías una API key real para un servicio de clima
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=tu_api_key&units=metric'); // Realiza una solicitud a la API de clima
        res.json({
            ciudad: response.data.name, // Nombre de la ciudad
            temperatura: response.data.main.temp, // Temperatura actual
            descripcion: response.data.weather[0].description // Descripción del clima
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos del clima" }); // Maneja errores en la solicitud
    }
});

// 7. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de reservas escuchando en http://localhost:${PORT}`); // Inicia el servidor y muestra un mensaje en la consola
});