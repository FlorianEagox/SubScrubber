import express from 'express';
import { google } from 'googleapis';
import AuthController from './auth_controller';
import AuthMiddleware from '../middleware/auth_middleware';
import Api from '../api';
const router = express.Router();

router.use('/auth', AuthController);

router.get('/subscriptions', AuthMiddleware, async (req, res) => {
  try {
    const subscriptions = await Api.getSubscriptions(req.oauth2Client);
    return res.send({
      success: true,
      subscriptions: subscriptions
    });
  } catch(err) {
    return res.status(500).send({
      error: err
    });
  }
});

export default router;