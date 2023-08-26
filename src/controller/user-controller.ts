import { Body, Controller, Get,  Param, Post } from 'routing-controllers';
import 'reflect-metadata';

@Controller()
export class UserController {
  @Get('/users/:id')
  getOne (@Param('id') id: number) {
    return 'This action returns user #' + id;
  }
  @Post('/users/:id')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postOne (@Param('id') id: number, @Body() info: any) {
    console.log(JSON.stringify(info));
    return 'This action returns user #' + info?.a;
  }
}