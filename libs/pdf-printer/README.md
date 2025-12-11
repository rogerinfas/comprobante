# PDF Printer Library

This library provides a wrapper around `pdfmake` to simplify PDF generation in NestJS applications. It comes pre-configured with custom fonts and handles the `PdfPrinter` instantiation.

## Features

-   **Generic PDF Generation**: Create any PDF layout using standard `pdfmake` document definitions.
-   **Custom Fonts**: Pre-configured support for **Roboto** and **Outfit** fonts.
-   **NestJS Integration**: Easily injectable service (`PdfPrinterService`).

## Installation

Since this is a local library, ensure it is imported correctly in your `tsconfig.json` paths:

```json
"paths": {
  "@app/pdf-printer": ["libs/pdf-printer/src"],
  "@app/pdf-printer/*": ["libs/pdf-printer/src/*"]
}
```

## Usage

1.  **Import the Module**:

    Add `PdfPrinterModule` to your application module imports:

    ```typescript
    import { Module } from '@nestjs/common';
    import { PdfPrinterModule } from '@app/pdf-printer';

    @Module({
      imports: [PdfPrinterModule],
      // ...
    })
    export class AppModule {}
    ```

2.  **Inject the Service**:

    Inject `PdfPrinterService` into your service or controller:

    ```typescript
    import { Injectable } from '@nestjs/common';
    import { PdfPrinterService } from '@app/pdf-printer';
    import { TDocumentDefinitions } from 'pdfmake/interfaces';

    @Injectable()
    export class MyReportService {
      constructor(private readonly pdfPrinterService: PdfPrinterService) {}

      async generate(): Promise<Buffer> {
        const docDefinition: TDocumentDefinitions = {
          content: ['Hello World!'],
          defaultStyle: {
            font: 'Outfit',
          },
        };

        const pdfDoc = this.pdfPrinterService.createPdf(docDefinition);
        
        // Convert stream to buffer
        return new Promise((resolve, reject) => {
          const chunks: Buffer[] = [];
          pdfDoc.on('data', (chunk) => chunks.push(chunk));
          pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
          pdfDoc.on('error', (err) => reject(err));
          pdfDoc.end();
        });
      }
    }
    ```

## Configuration

The library expects fonts to be located in `libs/pdf-printer/src/config/fonts`. You can override the base path using the `PDF_LIBRARY_PATH` environment variable if needed.

### Available Fonts

-   **Outfit** (Regular, Bold)
