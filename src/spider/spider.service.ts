import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import * as fs from 'fs'
import axios from 'axios'
import * as path from 'path'
import { CreateSpiderDto } from './dto/create-spider.dto'
import { UpdateSpiderDto } from './dto/update-spider.dto'

@Injectable()
export class SpiderService {
  async findAll() {
    const urlList: string[] = []
    const baseUrl = 'https://www.jpmn5.com'
    let index = 0

    const getCosPlay = async () => {
      console.log(index)
      const body = await axios
        .get(
          `https://www.jpmn5.com/Xiuren/Xiuren23811${
            index ? '_' + index : ''
          }.html`
        )
        .then(async (res) => res.data)
      // jquery用法
      const $ = cheerio.load(body)
      const page = $('.pagination').eq(0).find('a')
      const pageArray = page
        .map(function () {
          return $(this).text()
        })
        .toArray()

      if (pageArray.includes('下一页')) {
        $('.article-content p img').each(function () {
          // 存储图片src
          urlList.push(baseUrl + $(this).attr('src'))
        })
        index++
        await getCosPlay()
      }
    }
    await getCosPlay()
    // 遍历下载图片
    this.writeFile(urlList)
    return 'cos'
  }

  // 遍历下载图片 使用fs
  writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data)
      const ws = fs.createWriteStream(
        path.join(__dirname, '../cos' + new Date().getTime() + '.jpg')
      )
      ws.write(buffer)
    })
  }
}
