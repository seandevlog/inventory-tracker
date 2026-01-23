import express from 'express';
import controllers from './dashboard.controllers.js';

const router = express.Router();

router.get('/', controllers.get);

export default router;

