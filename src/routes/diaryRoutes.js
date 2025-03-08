import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all diarys for logged-in user
router.get("/", (req, res) => {
  
  const getDiaries = db.prepare(
    `SELECT * FROM diary WHERE user_id = ? ORDER BY id DESC`
  );

  const diaries = getDiaries.all(req.userId);

  for (let diary of diaries) {
    diary.createdAt = new Date(diary.createdAt).toISOString();
    diary.updatedAt = new Date(diary.updatedAt).toISOString();
  }

  res.json(diaries);
});

// Create a new diary
router.post("/", (req, res) => {
  const { content } = req.body;

  const insertDiary = db.prepare(
    `INSERT INTO diary (user_id, content) VALUES (?, ?)`
  );

  insertDiary.run(req.userId, content);
  res.json({id: insertDiary.lastInsertRowid, content: content, liked: false});
});

// Update a diary
router.put("/:id", (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  const updateDiary = db.prepare(
    `UPDATE diary SET content = ? WHERE id = ? AND user_id = ?`
  );

  const info = updateDiary.run(content, id, req.userId);

  if (info.changes) {
    res.json({ id: id, content: content });
  } else {
    res.sendStatus(404);
  }
});

// Delete a diary
router.delete("/:id", (req, res) => {});

export default router;
