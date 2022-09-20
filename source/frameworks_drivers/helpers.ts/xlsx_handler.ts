import XLSX from 'xlsx';

export class XlsxWorkbookHandler {
    wb: XLSX.WorkBook;

    constructor() {
        this.wb = XLSX.utils.book_new();
    }

    getSheet(sheetName: string) {
        return this.wb.Sheets[sheetName];
    }

    getSheetNames() {
        return this.wb.SheetNames;
    }

    addSheet(sheetName: string, sheet: any) {
        const ws = XLSX.utils.json_to_sheet(sheet);
        XLSX.utils.book_append_sheet(this.wb, ws, sheetName);
    }

    addSheetWithHeaders(sheetName: string, jsonData: any) {
        const ws = XLSX.utils.aoa_to_sheet(jsonData);
        XLSX.utils.book_append_sheet(this.wb, ws, sheetName);
    }

    setProps(props: any) {
        this.wb.Props = props;
    }

    convertSheetInJSON(sheet: any) {
        return XLSX.utils.sheet_to_json(sheet);
    }

    readBuffer(buffer: any) {
        this.wb = XLSX.read(buffer, {
            type: 'buffer',
        });
    }

    autoFitColumns = (jsonData: any) => {
        const objectMaxLength: number[] = [];

        jsonData.map((data: any) => {
            Object.entries(data).map(([, v], idx) => {
                if (v) {
                    const columnValue = v as string;
                    objectMaxLength[idx] =
                        objectMaxLength[idx] >= columnValue.length
                            ? objectMaxLength[idx]
                            : columnValue.length;
                }
            });
        });

        const wscols = objectMaxLength.map((w: number) => ({ width: w }));
        this.wb.Sheets['!cols'] = wscols;
    };

    /**
     * @returns {Buffer} NodeJS buffer
     */
    writeWorkbookToBuffer(bookType: any): Buffer {
        return XLSX.write(this.wb, {
            bookType: bookType,
            type: 'buffer',
        });
    }
}
