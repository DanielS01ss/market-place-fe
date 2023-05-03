import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
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

      reader.onload = (e: any) => {
        const fileType = file.type;
        if (fileType === 'text/csv') {
          const csv: string = e.target.result;
          console.log(csv);
          this.parseCsv(csv);
        } else if (fileType === 'application/json') {
          const json: string = e.target.result;
          console.log(json);
          this.parseJson(json);
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
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      console.log(this.selectedFile.name);
    }
  }

  parseCsv(csv: string): void {
    const papa: Papa = new Papa();
    const parsedCsv = papa.parse(csv);
    this.columns = parsedCsv.data[0].slice(0, 10);
    console.log(this.columns);
    this.rows = parsedCsv.data.slice(1, 11).map((row: any[]) => row.slice(0, 10));
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
