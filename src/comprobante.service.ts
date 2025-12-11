import { Injectable } from '@nestjs/common';
import { PdfPrinterService } from '@app/pdf-printer';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class ComprobanteService {
  constructor(private readonly pdfPrinterService: PdfPrinterService) {}

  async generateComprobante(): Promise<Buffer> {
    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20],

      content: [
        // Header
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  fillColor: '#005AAA',
                  stack: [
                    {
                      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="40" fill="#E6F3FF" stroke="#005AAA" stroke-width="3"/>
                        <g transform="translate(24, 24) scale(2)" stroke="#005AAA" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M13 16H8"/>
                          <path d="M14 8H8"/>
                          <path d="M16 12H8"/>
                          <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>
                        </g>
                      </svg>`,
                      fit: [80, 80],
                      alignment: 'center',
                      margin: [0, 20, 0, 10],
                    },
                    {
                      text: 'Comprobante de pago',
                      style: 'headerTitle',
                      alignment: 'center',
                      margin: [0, 0, 0, 8],
                    },
                    {
                      text: 'N° de Factura: 1234566710',
                      style: 'headerSubtitle',
                      alignment: 'center',
                      margin: [0, 0, 0, 25],
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
          table: {
            widths: ['*'],
            body: [
              [
                {
                  fillColor: '#F3F5F7',
                  stack: [
                    { text: 'Empresa', style: 'label' },
                    { text: 'La Ibérica', style: 'value', margin: [0, 0, 0, 15] },

                    { text: 'Fecha de pago', style: 'label' },
                    { text: '16/09/2025', style: 'value', margin: [0, 0, 0, 15] },

                    { text: 'Descripción', style: 'label' },
                    {
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet tincidunt feugiat. Maecenas quis porta metus. Aenean porta, metus vel pharetra commodo, purus metus bibendum sapien, vitae faucibus.',
                      style: 'value',
                      alignment: 'justify',
                      margin: [0, 0, 0, 20],
                    },
                  ],
                  border: [false, false, false, false],
                  margin: [40, 30, 40, 30],
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
        // Footer
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  fillColor: '#E6F3FF',
                  stack: [
                    { text: 'Monto Total', style: 'totalLabel', margin: [40, 20, 0, 8] },
                    { text: 'S/. 1.400', style: 'totalValue', margin: [40, 0, 0, 20] },
                  ],
                  border: [false, false, false, false],
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
      ],

      styles: {
        headerTitle: { fontSize: 34, bold: true, color: 'white' },
        headerSubtitle: { fontSize: 22, bold: true, color: 'white' },
        label: { fontSize: 21, color: '#566676', margin: [0, 0, 0, 4] },
        value: { fontSize: 20, color: '#2B333B' },
        totalLabel: { fontSize: 21, color: '#005AAA' },
        totalValue: { fontSize: 34, bold: true, color: '#005AAA' },
      },

      defaultStyle: {
        font: 'Outfit',
      },
    };

    const pdfDoc = this.pdfPrinterService.createPdf(docDefinition);
    
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', (err) => reject(err));
      pdfDoc.end();
    });
  }
}
