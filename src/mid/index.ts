/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('中间件')
    // 进行拦截  可以做白名单
    // res.send('拦截');
    next()
  }
}
