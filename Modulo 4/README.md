Módulo 4: Node.js
Node.js
Es un entorno que permite ejecutar JavaScript fuera del navegador (en el servidor). Es rápido y eficiente para aplicaciones web.

API REST
Es una forma estandarizada de comunicarse entre aplicaciones usando HTTP. Usa verbos:

    GET: Obtener datos
    POST: Crear datos
    PUT/PATCH: Actualizar datos
    DELETE: Eliminar datos

Axios
Es una librería para hacer peticiones HTTP desde Node.js o el navegador.

App de Booking (Node.js)

Al correr codigo:
http://localhost:3000/habitaciones

[
  {
    "id": 1,
    "tipo": "Individual",
    "precio": 50,
    "disponible": true
  },
  {
    "id": 2,
    "tipo": "Doble",
    "precio": 80,
    "disponible": true
  },
  {
    "id": 3,
    "tipo": "Suite",
    "precio": 120,
    "disponible": true
  }
]

¿Por qué es correcto?
Estructura del JSON:

Cada habitación es un objeto con las propiedades id, tipo, precio y disponible.

El formato es claro y válido para una API REST.

Coherencia con tu código:
En tu archivo index4.js, definiste el array así:

javascript
let habitaciones = [
    { id: 1, tipo: "Individual", precio: 50, disponible: true },
    { id: 2, tipo: "Doble", precio: 80, disponible: true },
    { id: 3, tipo: "Suite", precio: 120, disponible: true }
];
La ruta GET /habitaciones simplemente devuelve este array tal cual:

javascript
app.get('/habitaciones', (req, res) => {
    res.json(habitaciones); // Devuelve el array completo
});
¿Podría mejorarse?
Sí, si quieres un formato más elaborado o con detalles adicionales. Por ejemplo:

Opción 1: Agregar metadatos (recomendado para APIs profesionales)
javascript
app.get('/habitaciones', (req, res) => {
    res.json({
        success: true,
        count: habitaciones.length,
        data: habitaciones
    });
});
Salida:

json
{
    "success": true,
    "count": 3,
    "data": [
        { "id": 1, "tipo": "Individual", "precio": 50, "disponible": true },
        { "id": 2, "tipo": "Doble", "precio": 80, "disponible": true },
        { "id": 3, "tipo": "Suite", "precio": 120, "disponible": true }
    ]
}
Opción 2: Filtrar datos sensibles
Si en el futuro agregas más campos (ej. imagen, descripción), puedes seleccionar qué propiedades mostrar:

javascript
app.get('/habitaciones', (req, res) => {
    const respuesta = habitaciones.map(hab => ({
        id: hab.id,
        tipo: hab.tipo,
        precio: hab.precio
    }));
    res.json(respuesta);
});
Salida:

json
[
    { "id": 1, "tipo": "Individual", "precio": 50 },
    { "id": 2, "tipo": "Doble", "precio": 80 },
    { "id": 3, "tipo": "Suite", "precio": 120 }
]
¿Qué formato elegir?
Para desarrollo/testeo: El formato actual está bien (simple y legible).

Para producción: Usa metadatos (como en la Opción 1) para facilitar el manejo de errores y paginación.

Si tu objetivo es aprender o hacer un proyecto pequeño, no necesitas cambiarlo. Pero si es una API para un cliente, considera estandarizar las respuestas (ej. siempre incluir success, data y error si aplica).

