import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import * as fs from 'fs'
import axios from 'axios'
import * as path from 'path'
import { CreateUploadDto } from './dto/create-upload.dto'
import { UpdateUploadDto } from './dto/update-upload.dto'

import { zip } from 'compressing'
import { Response } from 'express'
import { join } from 'path'
@Injectable()
export class UploadService {
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

  downLoadImg(res: Response) {
    // 资源所在地址 数据库
    const url = join(__dirname, '../images/1667112052300.png')
    //  下载
    res.download(url)
    // return '1667112052300.png'
  }
  async downLoadFile(res: Response) {
    const url = join(__dirname, '../images/1667112052300.png')
    //  创建压缩方法
    const fileStream = new zip.Stream()
    // 压缩
    await fileStream.addEntry(url)
    // 配置请求头 octet-stream
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', 'attachment;filename=1667112052300')
    // 管道 返回
    fileStream.pipe(res)
    // return '文件流发送成功'
  }
}
