import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata
} from '@nestjs/common'
import { Request } from 'express'

export const Guard = (...args: string[]) => SetMetadata('guard', args)
export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>()
    // const res = ctx.switchToHttp().getResponse<Response>()
    console.log('自定义装饰器')
    return req.url
  }
)
