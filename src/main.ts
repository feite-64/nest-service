import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VersioningType } from '@nestjs/common'
// nestjs验证器
import { ValidationPipe } from '@nestjs/common'
// 引入会话存放验证码数据
import * as session from 'express-session'
// 文件提示
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
// 跨域 cors
import * as cors from 'cors'
// 响应拦截 Response
import { Response } from './common/response'
// 异常拦截 Filter
import { HttpFilter } from './common/filter'
//守卫Guard
import { GuardGuard } from './guard/guard.guard'
// swagger接口文档
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// 全局中间件
// function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
//   if (req.originalUrl.includes('/user')) {
//     next()
//   } else {
//     res.send(`接口${req.originalUrl},不属于user`)
//   }
// }
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableVersioning({
    type: VersioningType.URI
  })
  // sw接口文档  可视化  给前端看
  const options = new DocumentBuilder()
    .setTitle('sxj')
    .addBearerAuth()
    .setDescription('接口一览')
    .setVersion('1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-help', app, document)
  // 存放cookie
  app.use(
    session({
      secret: 'sxj',
      rolling: true,
      name: 'sxj.sid',
      cookie: { maxAge: 99999 }
    })
  )

  // 静态资源
  app.useStaticAssets(join(__dirname, 'images'), {
    // 配置路径别名
    prefix: '/static'
  })
  // 跨域
  app.enableCors()
  app.use(cors())
  // 中间件
  // app.use(MiddleWareAll)

  // 全局验证器
  app.useGlobalPipes(new ValidationPipe())
  // 全局挂载拦截器
  app.useGlobalInterceptors(new Response())
  // 全局挂载异常拦截器
  app.useGlobalFilters(new HttpFilter())
  // 全局挂载守卫
  app.useGlobalGuards(new GuardGuard())
  // 建立连接
  await app.listen(3000)
}
bootstrap()
