import {BaseModel} from './base';

export type RoleType = 'user' | 'admin'

export default class Role extends BaseModel {
  public readonly id!: number;
  public name!: RoleType;
}
