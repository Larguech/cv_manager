// src/user/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';  // Assurez-vous que le chemin vers `Cv` est correct

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;   

  @Column()
  email: string;   

  @Column()
  password: string;

  // Relation avec les CVs
  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];  // Un utilisateur peut avoir plusieurs CVs
}
