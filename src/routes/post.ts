import { Router, Request, Response } from 'express';
import { setTenant } from '../middlewares/set-tenant';
import { AppDataSource } from '../pgmodel';
import { Post } from '../pgmodel/model2/Post';

const router = Router();

router.get('/', setTenant, async (req: Request, res: Response) => {
    try {
        const results = await AppDataSource.getRepository(Post).find();
        res.status(200).json({
            status: 'success',
            data: results,
        });
    } catch (error: any) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
});

router.post('/', setTenant, async (req: Request, res: Response) => {
    try {
        const { title, body } = req.body;

        const post = AppDataSource.getRepository(Post).create({
            title,
            body,
        });
        const results = await AppDataSource.getRepository(Post).save(post);

        res.status(200).json({
            status: 'success',
            data: results,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        });
    }
});

export default router;
