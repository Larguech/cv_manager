// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';  // Importez le module User
import { User } from './user/entities/user.entity';
import { Cv } from './cv/entities/cv.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Configurez votre mot de passe
      database: 'cv_manager',
      entities: [User, Cv],
      synchronize: true,
    }),
    CvModule,
    UserModule,  // Ajoutez UserModule ici
  ],
})
export class AppModule {}
