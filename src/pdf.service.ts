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
      Roboto: {
        normal: path.join(process.cwd(), 'fonts/Roboto-Regular.ttf'),
        bold: path.join(process.cwd(), 'fonts/Roboto-Medium.ttf'),
        italics: path.join(process.cwd(), 'fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(process.cwd(), 'fonts/Roboto-MediumItalic.ttf'),
      },
    };
    this.printer = new PdfPrinter(fonts);
  }

  generatePdf(): Promise<Buffer> {
    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A6',
      content: [
        // Header
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  fillColor: '#005AAA', // Primary Blue
                  stack: [
                    {
                      // Icon with white stroke
                      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 16H8"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/></svg>`,
                      fit: [20, 20],
                      alignment: 'center',
                      margin: [0, 15, 0, 8],
                    },
                    {
                      text: 'Comprobante de pago',
                      style: 'headerTitle',
                      alignment: 'center',
                      margin: [0, 0, 0, 3],
                    },
                    {
                      text: 'N° de Factura: 1234566710',
                      style: 'headerSubtitle',
                      alignment: 'center',
                      margin: [0, 0, 0, 15],
                    },
                  ],
                  border: [false, false, false, false],
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
        // Body
        {
          margin: [20, 15, 20, 0],
          stack: [
            { text: 'Empresa', style: 'label' },
            { text: 'La Ibérica', style: 'value', margin: [0, 0, 0, 10] },
            
            { text: 'Fecha de pago:', style: 'label' },
            { text: '16/09/2025', style: 'value', margin: [0, 0, 0, 10] },
            
            { text: 'Descripción', style: 'label' },
            { text: 'Colortex. , F064-64581 ND061-15727, DRILL NARANJA, WWI/IMC, PAGO 09/01/2026', style: 'value', margin: [0, 0, 0, 15] },
          ],
        },
      ],
      footer: {
        table: {
          widths: ['*'],
          body: [
            [
              {
                fillColor: '#F3F5F7', // Background Color
                stack: [
                  { text: 'Monto Total', style: 'totalLabel', margin: [20, 10, 0, 3] },
                  { text: 'S/. 1.400', style: 'totalValue', margin: [20, 0, 0, 10] },
                ],
                border: [false, false, false, false],
              },
            ],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 0],
      },
      styles: {
        headerTitle: { fontSize: 14, bold: true, color: 'white' },
        headerSubtitle: { fontSize: 12, color: 'white' },
        label: { fontSize: 12, color: '#566676', margin: [0, 0, 0, 3] }, // Muted
        value: { fontSize: 12, color: '#2B333B' }, // Foreground
        totalLabel: { fontSize: 12, color: '#566676' },
        totalValue: { fontSize: 15, bold: true, color: '#2B333B' },
      },
      defaultStyle: {
        font: 'Roboto',
      },
      pageMargins: [0, 0, 0, 0],
    };

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
