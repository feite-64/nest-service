import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({
    message: '不能为空'
  })
  @IsString({
    message: '只能是字符串'
  })
  @Length(5, 11, {
    message: '5-11个字符'
  })
  user: string

  @IsNotEmpty({
    message: '不能为空'
  })
  @IsString({
    message: '只能是字符串'
  })
  @Length(5, 11, {
    message: '5-11个字符'
  })
  pass: string

  @IsNotEmpty({
    message: '不能为空'
  })
  @IsString({
    message: '只能是字符串'
  })
  @Length(4, 4, {
    message: '长度为4'
  })
  code: string
}
