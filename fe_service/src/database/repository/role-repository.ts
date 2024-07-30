import { SysRoles } from "../entity/role";

export class RoleRepository {
  async createRole(data: any) {
    return SysRoles.save(data);
  }
  async findRole(ROLE_ID: any) {
    return SysRoles.findOne({ where: ROLE_ID });
  }
}
