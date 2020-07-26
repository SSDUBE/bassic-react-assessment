import {BaseModel} from './base';
import Role from './role';
import UserRole from './userRole';

export default class User extends BaseModel {
  public readonly id!: number;
  public username!: string;
  public password!: string;
  public active?: boolean;
  public roleId!: number;
  public roles!: Partial<UserRole>[];

  public static get tableName() {
    return 'users';
  }

  static relationMappings = {
    roles: {
      relation: BaseModel.HasOneRelation,
      modelClass: UserRole,
      join: {
        from: 'users.id',
        to: 'userRole.userId',
      },
    },
  };
}
