import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers['auth-user'];
    console.log(token);
    const { jwtSecret } = require('./token')
    console.log(jwtSecret);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    // https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ
    try {
      var decoded: JwtPayload | string = verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1In0.wV4V-bwq1N57_LR7cAt4B7oGdl1Hx-CpCdm7wCR_qhE', 'newone');
      console.log('cc');
      if (decoded && decoded['userId']) {
        req['user'] = decoded['userId']; 
        next();
      } else {
        throw new UnauthorizedException('Invalid token or userId not found');
      }
    } catch (error) {
      console.log(error);
      
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
