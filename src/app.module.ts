import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComprobanteService } from './comprobante.service';
import { PdfPrinterModule } from '@app/pdf-printer';

@Module({
  imports: [PdfPrinterModule],
  controllers: [AppController],
  providers: [AppService, ComprobanteService],
})
export class AppModule {}
