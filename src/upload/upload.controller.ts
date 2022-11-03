import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res
} from '@nestjs/common'
import { UploadService } from './upload.service'
import { CreateUploadDto } from './dto/create-upload.dto'
import { UpdateUploadDto } from './dto/update-upload.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('上传下载接口')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 爬虫
  @Get('/spider')
  findAll() {
    return this.uploadService.findAll()
  }
  // 上传
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file)
    return '上传成功'
  }

  // 下载
  @Get('download')
  @UseInterceptors(FileInterceptor('file'))
  download(@Res() res: Response) {
    return this.uploadService.downLoadImg(res)
  }
  // 文件流
  @Get('stream')
  async down(@Res() res: Response) {
    return this.uploadService.downLoadFile(res)
  }
}
