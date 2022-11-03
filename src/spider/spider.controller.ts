import { Controller, Get } from '@nestjs/common'
import { SpiderService } from './spider.service'
import { CreateSpiderDto } from './dto/create-spider.dto'
import { UpdateSpiderDto } from './dto/update-spider.dto'

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}
  // 爬虫
  @Get()
  findAll() {
    return this.spiderService.findAll()
  }
}
