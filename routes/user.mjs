import { Router } from 'express';
import { handleSigninUser, handleLoginUser } from '../controller/auth.mjs';

const UserRouter = Router();
UserRouter.post('/signup', handleSigninUser)
UserRouter.post('/login', handleLoginUser)


export default UserRouter;

