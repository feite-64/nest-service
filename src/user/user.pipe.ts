import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common'
// 验证器
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
@Injectable()
// 对构造器请求数据进行拦截验证
export class UserPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // 创建验证器实例
    const DTO = plainToInstance(metadata.metatype, value)
    // 进行验证
    const errors = await validate(DTO)
    console.log(errors)
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST)
    }
    return value
  }
}
