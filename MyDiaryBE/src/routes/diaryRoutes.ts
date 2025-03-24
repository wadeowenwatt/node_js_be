import express, { Request } from "express";
import prisma from "../prismaClient";

interface DiaryRequest extends Request {
  userId: number;
}

const router = express.Router();

router.get("/", async (req, res) => {
  const diaries = await prisma.diary.findMany({
    where: {
      user_id: (req as DiaryRequest).userId,
    },
  });

  for (let diary of diaries) {
    diary.created_at = new Date(diary.created_at);
    diary.updated_at = new Date(diary.updated_at);
  }

  res.json(diaries);
});

// Create a new diary
router.post("/", async (req, res) => {
  const { content } = req.body;

  const diary = await prisma.diary.create({
    data: {
      content,
      user_id: (req as DiaryRequest).userId,
      mood: 3,
    },
  });

  res.json(diary);
});

// Update diary
router.put("/:id", async (req, res) => {
  const userId = (req as unknown as DiaryRequest).userId;
  const { content, is_favorite } = req.body;
  const { id } = req.params;

  const updateDiary = await prisma.diary.update({
    where: {
      id: Number(id),
      user_id: userId,
    },
    data: {
      content,
      is_favorite,
    },
  });
  // TODO: update time,

  res.json(updateDiary);
});

// Delete diary
router.delete("/:id", async (req, res) => {
  const userId = (req as unknown as DiaryRequest).userId;
  const { id } = req.params;

  await prisma.diary.delete({
    where: {
      id: Number(id),
      user_id: userId,
    },
  });

  res.json({ message: "Deleted Compleled" });
});

export default router;
