import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RoleCode, RoleType } from '../model/RoleType';

export default class RoleTypeSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(RoleType);
        await repository.insert([
            {
                code: RoleCode.SUPER_ADMIN,
            },
        ]);
        await repository.insert([
            {
                code: RoleCode.TENANT,
            },
        ]);
        await repository.insert([
            {
                code: RoleCode.SUB_TENANT,
            },
        ]);

        // ---------------------------------------------------

        const rtFactory = await factoryManager.get(RoleType);
        // save 1 factory generated entity, to the database
        await rtFactory.save();

        // save 5 factory generated entities, to the database
        // await rtFactory.saveMany(5);
    }
}
