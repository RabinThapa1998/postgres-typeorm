import { setSeederFactory } from 'typeorm-extension';
import { RoleCode, RoleType } from '../model/RoleType';

export default setSeederFactory(RoleType, (faker) => {
    const roletype = new RoleType();
    roletype.code = RoleCode.TENANT;
    return roletype;
});
