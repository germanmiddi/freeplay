
import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express'; // Asegúrate de que esto coincide con el entorno HTTP que estás utilizando
import * as fs from 'fs';
import * as path from 'path';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('check')
  receiveEvent(@Req() request: Request): string {
    // Convertir el request a una cadena JSON para su registro
    const logEntry = `Time: ${new Date().toISOString()}, Method: ${request.method}, Path: ${request.path}, Body: ${JSON.stringify(request.body)}\n`;

    // Especifica la ruta y el nombre del archivo de log
    const logFilePath = path.join(__dirname, 'request.log');

    // Escribir de forma asíncrona en el archivo de log
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file', err);
      }
    });

    return `Success` ;
  }
}