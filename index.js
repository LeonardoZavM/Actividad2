import express from "express";
import dotenv from "dotenv";
import { getAll, create, get, update, remove } from "./model.personas.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const proyect = process.env.SQLITE_DB || 'proyect.sqlite3';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API de gestión de personas");
});

app.get("/getAll", (req, res) => {
    const resp = getAll(proyect);
    res.json(resp);
});

app.get("/get/:id", (req, res) => {
    const persona = get(proyect, req.params.id);
    res.json(persona);
});

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});