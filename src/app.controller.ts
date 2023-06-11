import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { AllowUnauthorized } from './auth/decorators/allow-unauthorized.decorator';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private http: HttpService,
  ) {}

  @AllowUnauthorized()
  @Get()
  root(@Res() res: Response) {
    // return 'hello world';
    return res.sendFile(join(__dirname, '../../', 'src/index.html'));
  }

  @AllowUnauthorized()
  @Get('/countries')
  async getCountry(@Res() res: Response): Promise<any> {
    const results = await this.http.get('https://restcountries.com/v3.1/all');
    results.subscribe({
      next: (resp) => {
        res.status(201).json(resp.data);
      },
      error: (err) => {
        res.send(err.message);
      },
    });
  }

  @AllowUnauthorized()
  @Get('/countries/city')
  async getCity(@Req() req: Request, @Res() res: Response) {
    const headers2 = {
      'Accept-Encoding': 'gzip,deflate,compress',
    };
    const results1 = await this.http.post(
      'https://countriesnow.space/api/v0.1/countries/state/cities',
      req.query,
      { headers: headers2 },
    );
    results1.subscribe({
      next: (resp) => {
        res.json(resp.data);
      },
      error: (err) => {
        res.send(err.message);
      },
    });
  }

  @AllowUnauthorized()
  @Get('/countries/state')
  async getState(@Req() req: Request, @Res() res: Response): Promise<any> {
    const results = await this.http.post(
      'https://countriesnow.space/api/v0.1/countries/states',
      req.query,
    );
    results.subscribe({
      next: (resp) => {
        return res.status(201).json(resp.data);
      },
      error: (err) => {
        return res.send(err.message);
      },
    });
  }
}
