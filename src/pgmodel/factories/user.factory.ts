import { setSeederFactory } from 'typeorm-extension';
import { User } from '../model/User';

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.name = faker.person.fullName();
    user.password = faker.word.words();
    user.email = faker.internet.email({
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
    });
    user.phone = faker.phone.number();

    return user;
});
