import express from 'express';
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought } from '../../controllers/thoughtController.js';


const router = express.Router();

router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
export default router;
