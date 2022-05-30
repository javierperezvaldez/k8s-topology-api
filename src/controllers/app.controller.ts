import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestModel } from 'src/model/request.model';
import { AppService } from 'src/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async processRequest(@Body() body: RequestModel) {
    return await this.appService.processRequest(body);
  }
}
