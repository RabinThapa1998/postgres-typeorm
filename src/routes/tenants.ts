import { Router, Request, Response } from 'express';
import { setTenant } from '../middlewares/set-tenant';
import { AppDataSource } from '../pgmodel';
import { Tenant } from '../pgmodel/model2/Tenant';
import { Post } from '../pgmodel/model2/Post';

const router = Router();

router.get('/', setTenant, async (req: Request, res: Response) => {
    const tenantName = req.tenant;
    await AppDataSource.query(`SET search_path TO ${tenantName};`);
    const tenant = await AppDataSource.getRepository(Tenant).findOne({
        where: {
            name: tenantName,
        },
    });

    if (!tenant) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tenant not found!',
        });
    }

    res.status(200).json({
        status: 'success',
        data: tenant,
    });
});

const syncTenantSchema = async (tenantName: string) => {
    await AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS ${tenantName};`);
    await AppDataSource.synchronize();
};

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        console.log('🚀 ~ file: tenants.ts:39 ~ router.post ~ name:', name);
        await AppDataSource.query(`SET search_path TO default_db;`);

        const tenantAlreadyExists = await AppDataSource.createQueryBuilder()
            .select()
            .from(Tenant, 'tenant')
            .addFrom(Post, 'post')
            .andWhere('post.tenantId = tenant.id' && 'tenant.name = :name', {
                name,
            })
            .getOne();

        console.log(
            '🚀 ~ file: tenants.ts:47 ~ router.post ~ tenantAlreadyExists:',
            tenantAlreadyExists
        );

        if (tenantAlreadyExists) {
            return res.status(400).json({
                status: 'fail',
                message: 'Tenant already exists!',
            });
        }

        const tenant = AppDataSource.getRepository(Tenant).create({
            name,
        });
        const results = await AppDataSource.getRepository(Tenant).save(tenant);

        await syncTenantSchema(name);

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
