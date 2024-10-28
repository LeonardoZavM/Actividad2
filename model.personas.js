import Database from "better-sqlite3";

export function getAll(proyect) {
    const db = new Database(proyect);
    const query = "SELECT * FROM empleados;";
    const personas = db.prepare(query).all();
    db.close();
    return personas;
}

export function get(proyect, id) {
    const db = new Database(proyect);
    const query = "SELECT * FROM empleados WHERE id = ?;";
    const persona = db.prepare(query).get([id]);
    db.close();
    return persona;
}

export function create(proyect, datos) {
    const sql = `
    INSERT INTO empleados (Name, Sexo, Correo) 
    VALUES (@Name, @Sexo, @Correo);
    `;
    const db = new Database(proyect);
    const insertData = db.prepare(sql);
    const resp = insertData.run(datos);
    db.close();
    return resp;
}

export function update(proyect, id, datos) {
    const sql = `
    UPDATE empleados 
    SET Name = @Name, Sexo = @Sexo, Correo = @Correo 
    WHERE id = @id;
    `;
    const db = new Database(proyect);
    const updateData = db.prepare(sql);
    const resp = updateData.run({ ...datos, id });
    db.close();
    return resp;
}

export function remove(proyect, id) {
    const sql = "DELETE FROM empleados WHERE id = ?;";
    const db = new Database(proyect);
    const deleteData = db.prepare(sql);
    const resp = deleteData.run([id]);
    db.close();
    return resp;
}