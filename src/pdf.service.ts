import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PdfPrinter = require('pdfmake');
import * as path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class PdfService {
  private printer: any;

  constructor() {
    const fonts = {
      Outfit: {
        normal: path.join(process.cwd(), 'fonts/Outfit-Regular.ttf'),
        bold: path.join(process.cwd(), 'fonts/Outfit-Bold.ttf'),
        italics: path.join(process.cwd(), 'fonts/Outfit-Regular.ttf'),
        bolditalics: path.join(process.cwd(), 'fonts/Outfit-Bold.ttf'),
      },
    };
    this.printer = new PdfPrinter(fonts);
  }

  createPdf(docDefinition: TDocumentDefinitions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
      const chunks: Buffer[] = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', (err) => reject(err));
      pdfDoc.end();
    });
  }
}
