import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );

    const result = insertUser.run(username, hashedPassword);

    // Insert one default diary for new user
    const defaultDiary = `Hi! Add your first Diary here!`;
    const insertDiary = db.prepare(
      `INSERT INTO diary (user_id, content) VALUES (?, ?)`
    );

    insertDiary.run(result.lastInsertRowid, defaultDiary);

    // Create a auth token using for handle other requests requiring authentication
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: 86400 }
    );

    res.json({
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);
    
    // User not found
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Wrong password" });
    }
    
    console.log(user);
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

export default router;
