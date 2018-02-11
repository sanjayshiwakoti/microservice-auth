import { Router } from 'express';
import * as authService from '../services/authService';

const router = Router();

/**
 * Login using username and password
 */
router.post('/login', async (req, res, next) => {
  try {
    let data = await authService.validateLogin(req.body.username, req.body.password);
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

/**
 * Validate access token.
 */
router.post('/authenticate', (req, res, next) => {
  res.json({ data: authService.verifyAccessToken(req.body.accessToken) });
});

/**
 * Regenerate new pair of access and refresh token.
 */
router.post('/refresh-token', (req, res, next) => {
  try {
    let data = authService.getNewAccessAndRefreshToken(req.body.refreshToken);
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

export default router;
