// asset.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private baseUrl = 'http://localhost:8080/assets';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', file);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getObjectUrl(key: string): string {
    return `${this.baseUrl}/get-object?key=${key}`;
  }

  deleteObject(key: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-object?key=${key}`);
  }
}
