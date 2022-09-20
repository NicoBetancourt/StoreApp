export class FileResponse {
    contentType: string;
    buffer: Buffer;
    filename: string;

    constructor(contentType: string, buffer: Buffer, filename: string) {
        this.contentType = contentType;
        this.buffer = buffer;
        this.filename = filename;
    }
}
