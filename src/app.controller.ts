import { Controller, Get, Res } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { ReportService } from './report.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly comprobanteService: ComprobanteService,
    private readonly reportService: ReportService,
  ) {}
  
  @Get('generate')
  async generatePdf(@Res() res: Response) {
    const buffer = await this.comprobanteService.generateComprobante();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=comprobante.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  @Get('report')
  async generateReport(@Res() res: Response) {
    const buffer = await this.reportService.generateReport();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=report.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}
