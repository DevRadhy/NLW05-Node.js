import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('settings')
class Setting {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @Column()
  updated_at: Date;

  @Column()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Setting };