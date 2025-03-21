import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      }
    });


    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)

  } catch (error) {

  }
});