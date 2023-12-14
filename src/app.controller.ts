import { Controller, Get, Render } from '@nestjs/common';

@Controller('')
export class AppController {

  @Get('')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('dpstPrcsn')
  @Render('index2')
  dpstPrcsn() {
    return { message: 'Hello world!' };
  }
}
