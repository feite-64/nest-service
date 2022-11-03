import {
  MiddlewareConsumer,
  Module,
  NestModule
  // RequestMethod
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
// 中间件
// import { Logger } from '../mid/index'
@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 注册中间件 指定路由 可以拦截
    // consumer.apply(Logger).forRoutes('user')
    // 使用对象形式，可具体配置拦截
    // consumer
    //   .apply(Logger)
    //   .forRoutes({ path: 'user', method: RequestMethod.GET })
  }
}
