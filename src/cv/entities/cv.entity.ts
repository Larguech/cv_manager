// src/cv/entities/cv.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';  // Assurez-vous que le chemin vers `User` est correct

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: string;

  @Column()
  job: string;

  // Ajout de la relation ManyToOne entre Cv et User
  @ManyToOne(() => User, (user) => user.cvs)
  user: User;  // Un CV appartient à un utilisateur
}
