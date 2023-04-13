import { Router } from 'express';
import { handleSigninUser } from '../controller/auth.mjs';

const UserRouter = Router();
UserRouter.post('/signup', handleSigninUser)



export default UserRouter;

