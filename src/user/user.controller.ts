import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  // Version,
  Request,
  Response,
  // Query,
  Session,
  Param,
  ParseUUIDPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto';
// 管道验证  对数据进行拦截
// import { UserPipe } from './user.pipe'
import * as uuid from 'uuid'
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger'
console.log(uuid.v4())

@ApiTags('用户接口')
@Controller({
  path: 'user'
  // version:'1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 注册
  @Post('register')
  // 接口注释
  @ApiOperation({
    summary: '用户注册',
    description: '用户名，密码，验证码，确认密码'
  })
  // 携带用户token
  @ApiBearerAuth()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.userService.createUser(createUserDto)
  }

  // 验证码
  @Get('code')
  createCode(@Request() req, @Response() res, @Session() session) {
    return this.userService.createCode(req, res, session)
  }
  // 登陆
  @Post('login')
  findOne(@Body() body: CreateUserDto, @Session() session) {
    return this.userService.findOne(body, session)
  }
  @Get(':id')
  @ApiQuery({ name: '分页', description: '分页信息' })
  getRouter(@Param('id', ParseUUIDPipe) param) {
    return this.userService.getRouter(param)
  }
}
