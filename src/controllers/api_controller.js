import express from 'express';
import { google } from 'googleapis';
import AuthController from './auth_controller';
import AuthMiddleware from '../middleware/auth_middleware';
import Api from '../api';
const router = express.Router();

router.use('/auth', AuthController);

router.get('/subscriptions', AuthMiddleware, async (req, res) => {
  try {
    const subscriptions = await Api.YouTube.getSubscriptions(req.oauth2Client);
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

router.delete('/subscriptions', AuthMiddleware, async (req, res) => {
  try {
    const toDelete = req.query.delete.trim().split(' ').filter((el) => el != '');    
    const failed = [];
    const promises = toDelete.map(id => Api.YouTube.deleteSubscription(req.oauth2Client, id).catch(_ => failed.push(id)));
    if (promises.length > 0)
      await Promise.all(toDelete.map(id => Api.YouTube.deleteSubscription(req.oauth2Client, id))).catch(_ => {});
    return res.send({
      success: true,
      failed: failed
    });
  } catch(err) {
    return res.status(500).send({
      error: err
    });
  }
});

export default router;