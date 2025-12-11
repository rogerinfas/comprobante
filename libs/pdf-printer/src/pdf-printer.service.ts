import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PdfPrinter = require('pdfmake');
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import * as path from 'path';

const PDF_LIBRARY_PATH = process.env.PDF_LIBRARY_PATH ?? 'libs/pdf-printer/src/config/fonts';

const fonts = {
    Roboto: {
        normal: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Roboto/static/Roboto-Regular.ttf`),
        bold: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Roboto/static/Roboto-Medium.ttf`),
        italics: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Roboto/static/Roboto-Italic.ttf`),
        bolditalics: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Roboto/static/Roboto-MediumItalic.ttf`),
    },
    Outfit: {
        normal: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Outfit/Outfit-Regular.ttf`),
        bold: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Outfit/Outfit-Bold.ttf`),
        italics: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Outfit/Outfit-Regular.ttf`),
        bolditalics: path.join(process.cwd(), `${PDF_LIBRARY_PATH}/Outfit/Outfit-Bold.ttf`),
    },
};

@Injectable()
export class PdfPrinterService {
    private printer: any = new PdfPrinter(fonts);
    private bufferConfig: BufferOptions = {}; //Table, layouts, font layout, etc

    createPdf(docDefinition: TDocumentDefinitions) {
        return this.printer.createPdfKitDocument(docDefinition, this.bufferConfig);
    }
}
