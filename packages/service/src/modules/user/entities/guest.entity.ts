import { Column, Entity, OneToMany } from 'typeorm';
import { GuestRole } from '../enums/role.enum';
import { UserProfile } from './user.base.entity';
import { ReceivingAddress } from './guest-address.entity';
@Entity()
export class Guest extends UserProfile {
  @Column({
    type: 'enum',
    enum: GuestRole,
    default: GuestRole.GUEST,
  })
  role: GuestRole;

  // 收货地址
  @OneToMany(() => ReceivingAddress, ReceivingAddress => ReceivingAddress.user)
  receiving_address: ReceivingAddress[];
}
