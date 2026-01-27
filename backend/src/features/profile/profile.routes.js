import express from 'express';
import controllers from './profile.controllers.js'; 

const router = express.Router();

router.get('/', controllers.get)

export default router;