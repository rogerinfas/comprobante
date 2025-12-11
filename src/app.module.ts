import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfService } from './pdf.service';
import { ComprobanteService } from './comprobante.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PdfService, ComprobanteService],
})
export class AppModule {}
