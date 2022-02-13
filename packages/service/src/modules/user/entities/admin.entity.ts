import { Column, Entity } from 'typeorm';
import { AdminRole } from '../enums/role.enum';
import { UserProfile } from './user.base.entity';

@Entity()
export class Admin extends UserProfile {
  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.ADMIN,
  })
  role: AdminRole;
}
