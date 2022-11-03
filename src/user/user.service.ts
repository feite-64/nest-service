import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'
@Injectable()
export class UserService {
  // @HttpCode(201)
  createUser(createUserDto: CreateUserDto) {
    return {
      code: 201,
      message: createUserDto
    }
  }
  // 创建验证码
  createCode(req, res, session) {
    // 创建验证码实体
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966'
    })
    // 验证码密钥保存在session缓存上
    session.code = captcha.text
    // 转成图片返回
    res.type('image/svg+xml')
    res.send(captcha.data)
  }

  findOne(message: CreateUserDto, session) {
    // console.log(session.code)
    // console.log(message.code)
    // 转小写toLocaleLowerCase
    // 验证码
    /*     if (
      message?.code?.toLocaleLowerCase() !== session?.code?.toLocaleLowerCase()
    ) {
      return {
        code: 400,
        message: '验证码错误'
      }
    }
    // 用户名
    if (message.user !== 'admin') {
      return {
        code: 400,
        message: '用户名错误'
      }
    }
    // 密码
    if (message.pass !== '123456') {
      return {
        code: 400,
        message: '密码错误'
      }
    } */
    return {
      code: 200,
      message
    }
  }
  getRouter(param) {
    return {
      code: 200,
      param
    }
  }
}
