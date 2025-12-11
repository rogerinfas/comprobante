import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ComprobanteService } from './comprobante.service';
import { ReportService } from './report.service';
import { PdfPrinterModule } from '@app/pdf-printer';

@Module({
  imports: [PdfPrinterModule],
  controllers: [AppController],
  providers: [ComprobanteService, ReportService],
})
export class AppModule {}
