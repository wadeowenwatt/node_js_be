import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE,
        password TEXT
    )    
`);

db.exec(`
    CREATE TABLE diary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER
        task TEXT,
        liked BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)

export default db