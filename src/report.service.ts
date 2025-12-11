import { Injectable } from '@nestjs/common';
import { PdfPrinterService, PdfColors } from '@app/pdf-printer';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class ReportService {
  constructor(private readonly pdfPrinterService: PdfPrinterService) {}

  async generateReport(): Promise<Buffer> {
    const mockData = [
      { date: '2025-01-01', product: 'Product A', quantity: 10, total: 100 },
      { date: '2025-01-02', product: 'Product B', quantity: 5, total: 50 },
      { date: '2025-01-03', product: 'Product C', quantity: 20, total: 200 },
      { date: '2025-01-04', product: 'Product A', quantity: 8, total: 80 },
      { date: '2025-01-05', product: 'Product B', quantity: 12, total: 120 },
    ];

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      header: {
        text: 'Sales Report',
        alignment: 'center',
        margin: [0, 20, 0, 0],
        fontSize: 24,
        bold: true,
        color: PdfColors.primary,
      },
      content: [
        {
          text: 'Sales Summary',
          style: 'header',
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', 'auto', 'auto'],
            body: [
              [
                { text: 'Date', style: 'tableHeader' },
                { text: 'Product', style: 'tableHeader' },
                { text: 'Quantity', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' },
              ],
              ...mockData.map((item) => [
                item.date,
                item.product,
                item.quantity.toString(),
                `$${item.total}`,
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: PdfColors.foreground,
          fillColor: PdfColors.sidebarAccent,
        },
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
