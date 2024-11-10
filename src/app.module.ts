import { MiddlewareConsumer, Module, RequestMethod, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Cv } from './cv/entities/cv.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cv_manager',
      synchronize: true, // i turned off
      entities: [Cv, User], // Liste des entités ici
      logging: true,
    }),
    CvModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'cv', method: RequestMethod.ALL });
      // .forRoutes('**');
  }
}


