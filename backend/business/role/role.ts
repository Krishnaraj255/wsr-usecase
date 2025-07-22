import { Role } from "../../data/role/role";

const get = async () => {
    const roleObject = await Role.get();
    const roleList = roleObject.flatMap(name => name.roleName);
    return roleList
}

 
export const role = {
    get 
} 