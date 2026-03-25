import { URL } from 'url';
import { File } from 'fs';

interface ParserOptions {
  baseUrl?: string;
  baseDir?: string;
  ignore?: RegExp;
}

class Parser {
  private baseUrl: string;
  private baseDir: string;
  private ignore: RegExp;
  private fileSystem: any;

  constructor(options: ParserOptions) {
    this.baseUrl = options.baseUrl || '';
    this.baseDir = options.baseDir || '';
    this.ignore = options.ignore || /node_modules|dist|build/;
    this.fileSystem = require('fs');
  }

  public parse(file: File): string {
    const filePath = file.path;
    const relativePath = filePath.substring(this.baseDir.length);

    if (this.ignore.test(relativePath)) {
      return '';
    }

    const url = new URL(relativePath, this.baseUrl);
    const content = this.fileSystem.readFileSync(file.path, 'utf8');

    return content;
  }
}

export { Parser, ParserOptions };