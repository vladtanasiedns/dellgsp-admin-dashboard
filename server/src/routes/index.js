import express from 'express';
import { dispatches } from '../data/data';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  });
  res.json(dispatches);
});

export default router;
