import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all todos for logged-in user
router.get("/", (req, res) => {
  
  const getDiaries = db.prepare(
    `SELECT * FROM diary WHERE user_id = ? ORDER BY id DESC`
  );

  const diaries = getDiaries.all(req.userId);
  res.json(diaries);
});

// Create a new todo
router.post("/", (req, res) => {});

// Update a todo
router.put("/:id", (req, res) => {});

// Delete a todo
router.delete("/:id", (req, res) => {});

export default router;
