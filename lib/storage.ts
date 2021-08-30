import * as fs from 'fs';

declare global {
    interface Window {
        Buffer: any;
    }
}

if (typeof (Buffer) === 'undefined') {
    let Buffer = require('buffer/').Buffer;
    window.Buffer = require('buffer/').Buffer;
}

export class StorageManager {
    isBrowser(): boolean {
        return typeof window !== 'undefined';
    }

    access(path: string): void {
        if (!this.isBrowser()) {
            fs.accessSync(path);
        }
    }

    readFile(path: string): string {
        if (this.isBrowser()) {
            return localStorage.getItem(path);
        } else {
            const data: Buffer = fs.readFileSync(path);
            return JSON.parse(data.toString());
        }
    }

    writeFile(path: string, data: string): void {
        if (this.isBrowser()) {
            localStorage.setItem(path, data);
        } else {
            fs.writeFileSync(
                path,
                data,
            ); 
        }
    }
}