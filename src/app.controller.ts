import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfService } from './pdf.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly pdfService: PdfService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generate')
  async generatePdf(@Res() res: Response) {
    const buffer = await this.pdfService.generatePdf();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=comprobante.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}
