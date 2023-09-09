import { Action, Body, Controller, Get,  OnUndefined,  Param, Post, UseInterceptor } from 'routing-controllers';
import 'reflect-metadata';
import { User } from '../models/User';
// import { loggingAfter, loggingBefore } from '../middleware/middleware';

@Controller()
// @UseBefore(loggingBefore)
// @UseAfter(loggingAfter)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
@UseInterceptor(function (action: Action, content: any) {
  return content;
})
export class UserController {
  @Get('/users/:id')
  getOne (@Param('id') id: number) {
    return 'This action returns user #' + id;
  }
  @Post('/users/:id')
  @OnUndefined(204)
  postOne (
    @Param('id') 
      id: number, 
    @Body() 
      user: User
  ) {
    console.log(JSON.stringify(user));
    return 'User name: ' + user?.name;
  }
}