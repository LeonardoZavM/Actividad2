import express from "express";
import dotenv from "dotenv";
import { getAll, create, get, update, remove } from "./model.personas.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const proyect = process.env.SQLITE_DB || 'proyect.sqlite3';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Página principal con el menú
app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>API de gestión de personas</title>
            </head>
            <body>
                <h1>Menú de la API</h1>
                <ul>
                    <li><a href="/getAll">Ver todas las personas</a></li>
                    <li><a href="/get/1">Ver una persona por ID (Ejemplo con ID=1)</a></li>
                    <li><a href="/insert">Crear una nueva persona (usa POST)</a></li>
                    <li><a href="/update/1">Actualizar una persona (usa PUT, Ejemplo con ID=1)</a></li>
                    <li><a href="/delete/1">Eliminar una persona (usa DELETE, Ejemplo con ID=1)</a></li>
                </ul>
            </body>
        </html>
    `);
});

// Ruta para ver todas las personas con enlace de regreso al menú
app.get("/getAll", (req, res) => {
    const resp = getAll(proyect);
    res.send(`
        <html>
            <head>
                <title>Ver todas las personas</title>
            </head>
            <body>
                <h1>Todas las personas</h1>
                <pre>${JSON.stringify(resp, null, 2)}</pre>
                <p><a href="/">Volver al menú principal</a></p>
            </body>
        </html>
    `);
});

// Ruta para ver una persona por ID con enlace de regreso al menú
app.get("/get/:id", (req, res) => {
    const persona = get(proyect, req.params.id);
    res.send(`
        <html>
            <head>
                <title>Ver persona</title>
            </head>
            <body>
                <h1>Persona ID: ${req.params.id}</h1>
                <pre>${JSON.stringify(persona, null, 2)}</pre>
                <p><a href="/">Volver al menú principal</a></p>
            </body>
        </html>
    `);
});

// Las rutas POST, PUT y DELETE pueden continuar regresando JSON, ya que se usan típicamente con clientes como Postman
app.post("/insert", (req, res) => {
    const datos = req.body;
    const resp = create(proyect, datos);
    res.json({ message: "Persona creada", id: resp.lastInsertRowid });
});

app.put("/update/:id", (req, res) => {
    const datos = req.body;
    const resp = update(proyect, req.params.id, datos);
    res.json({ message: "Persona actualizada" });
});

app.delete("/delete/:id", (req, res) => {
    const resp = remove(proyect, req.params.id);
    res.json({ message: "Persona eliminada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
