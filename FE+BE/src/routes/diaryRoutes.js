import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// Get all diarys for logged-in user
router.get("/", async (req, res) => {
  const diaries = await prisma.diary.findMany({
    where: {
      userId: req.userId,
    },
  });

  for (let diary of diaries) {
    diary.createdAt = new Date(diary.createdAt).toString();
    diary.updatedAt = new Date(diary.updatedAt).toString();
  }

  res.json(diaries);
});

// Create a new diary
router.post("/", async (req, res) => {
  const { content } = req.body;

  const diary = await prisma.diary.create({
    data: {
      content,
      userId: req.userId,
    },
  });

  res.json(diary);
});

// Update a diary and update UpdateAt
router.put("/:id", async (req, res) => {
  const { content, liked } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  const updateDiary = await prisma.diary.update(
    {
      where: {
        id: parseInt(id),
        userId
      },
      data: {
        liked: liked,
        content,
      }
    }
  );

  res.json(updateDiary);
});

// Delete a diary
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  await prisma.diary.delete({
    where: {
      id: parseInt(id),
      userId
    }
  })

  res.json({ message: "Diary deleted" });
});

export default router;
