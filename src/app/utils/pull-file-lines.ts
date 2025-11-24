import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  async getFileLines(path: string): Promise<string[]> {
    const text = await firstValueFrom(this.http.get(path, { responseType: 'text' }));
    return text.split(/\r?\n/);
  }
}
