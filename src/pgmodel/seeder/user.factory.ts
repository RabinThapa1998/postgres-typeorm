import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../model/User';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(User);
        // await repository.insert([
        //     {
        //         name: 'rabin',
        //         email: 'rabin.ingrails.com',
        //         phone: '909009009',
        //         password: 'sfsdfs',
        //     },
        // ]);

        // ---------------------------------------------------

        const rtFactory = await factoryManager.get(User);
        // save 1 factory generated entity, to the database
        // await rtFactory.save();

        // save 5 factory generated entities, to the database
        await rtFactory.saveMany(5);
    }
}
