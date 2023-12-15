import 'dotenv/config';
import express from 'express';
import { User } from '../pgmodel/model/User';
import { AppDataSource } from '../pgmodel';
import { Role, RoleCode } from '../pgmodel/model/Role';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, verified, status } = req.body;

    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (user) return res.status(400).send('User already exists');

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    newUser.verified = verified;
    newUser.status = status;

    const role = new Role();
    role.code = RoleCode['TENANT'];
    role.user = newUser;

    const u = await AppDataSource.getRepository(User).save(newUser);
    const r = await AppDataSource.getRepository(Role).save(role);

    return res.status(200).json({
        user: u,
        role: r,
    });
});

router.get('/users', async (req, res) => {
    const user = await AppDataSource.getRepository(User).find({
        relations: { roleData: true },
    });
    return res.status(200).json({
        user: user,
    });
});
router.get('/roles', async (req, res) => {
    const role = await AppDataSource.getRepository(Role).find({
        relations: { user: true },
    });
    return res.status(200).json({
        role,
    });
});

export default router;
