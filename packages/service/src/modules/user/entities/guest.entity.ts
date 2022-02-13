import { Column, Entity } from 'typeorm';
import { GuestRole } from '../enums/role.enum';
import { UserProfile } from './user.base.entity';

@Entity()
export class Guest extends UserProfile {
  @Column({
    type: 'enum',
    enum: GuestRole,
    default: GuestRole.GUEST,
  })
  role: GuestRole;
}
