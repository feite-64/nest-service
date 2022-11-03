import { Module } from '@nestjs/common'
import { MysqlService } from './mysql.service'
import { MysqlController } from './mysql.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Mysql } from './entities/mysql.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Mysql])],
  controllers: [MysqlController],
  providers: [MysqlService]
})
export class MysqlModule {}
