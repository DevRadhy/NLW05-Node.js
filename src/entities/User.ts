import { v4 as uuidv4 } from 'uuid';

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;
  
  @Column()
  email: string;
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };