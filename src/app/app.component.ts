import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  csvData: any;
  xmlData: any;
  jsonData: any;
  rows: any[] = [];
  columns: string[] = [];
  title = 'market-place-fe';
  selectedFile: File | null = null;
  table: HTMLTableElement | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;

    if (files) {
      const allowedTypes = ['text/csv', 'text/xml', 'application/json'];
      const allowedSize = 2000000000;
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);

      if (file.size > allowedSize) {
        alert('File size is too large. Maximal size is 2GB');
        return;
      }
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
      } else {
        alert('Supported data types: JSON, CSV, XML');
      }
      const reader: FileReader = new FileReader();
      const headers = new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZWFkZnR3MjAwMUBnbWFpbC5jb20iLCJpYXQiOjE2ODMzMDQ1NzEsImV4cCI6MTY4MzMwNTQ3MX0.uDkqI9Rx1noJxSCP9ms4m3_ZKRwmkScsR_HLkj8MavHuU_SCdLOH197KIo5bEPNUMjaS_TjSJB4o8C6jziZD3w'
        });

      reader.onload = (e: any) => {
        const fileType = file.type;
        const formData = new FormData();
        formData.append('file', file);
        if (fileType === 'text/csv') {
          const csv: string = e.target.result;
          this.http.post('/evaluate_data', formData, {headers: headers}).subscribe((response:any) => {
            localStorage.setItem('file_tokens', JSON.stringify(response['tokens']))
            this.columns = response['headers'];
            this.rows = response['data'];
          });
          
        } else if (fileType === 'application/json') {
          const json: string = e.target.result;
          this.http.post('/evaluate_data', formData, {headers: headers}).subscribe((response:any) => {
            localStorage.setItem('file_tokens', JSON.stringify(response['tokens']))
            this.columns = response['headers'];
            this.rows = response['data'];
          });
        } else if (fileType === 'text/xml') {
          const xml: string = e.target.result;
          console.log(xml);
          // this.parseXml(xml);
        }
      };
      reader.readAsText(file);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

    }
  }

  parseCsv(csv: string): void {
    const papa: Papa = new Papa();
    const parsedCsv = papa.parse(csv);
    this.columns = parsedCsv.data[0].slice(0, 20);
    console.log(this.columns);
    this.rows = parsedCsv.data.slice(1, 11).map((row: any[]) => row.slice(0, 20));
    console.log(this.rows);
  }  

  parseJson(json: string): void {
    if (!json || json === '') {
      console.log('No data to parse')
      return;
    }

    const data: any = Object.values(JSON.parse(json))[0];
    var fields = Object.keys(data[0]).map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1));
    const valuesArray = [];

    for (let i = 0; i < data.length; i++) {
      const dict = data[i];
      const values = Object.values(dict);
      valuesArray.push(values);
    }
    console.log(valuesArray)

    this.columns = fields;
    this.rows = valuesArray.slice(0, 10);
  }
} 
