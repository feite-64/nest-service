import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
interface Data<T> {
  data: T
}
// 依赖注入 Injectable
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(content, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          success: true,
          message: '',
          status: 0
        }
      })
    )
  }
}
