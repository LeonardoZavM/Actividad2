import Database from "better-sqlite3";
const db = new Database('proyect.sqlite3')

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS clientes (
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL UNIQUE,
    Precio VARCHAR (30) 
);

CREATE TABLE IF NOT EXISTS empleados (
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Sexo TEXT NOT NULL,
    Correo VARCHAR (30)
);
`;

db.exec(createTablesQuery);
console.log("Tablas creada exitosamente");
db.close()