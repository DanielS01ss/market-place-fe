import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'market-place-fe';
  
  constructor (
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    //aici se adauga icon-urile ca de ex:
    //this.matIconRegistry.addSvgIcon(
      //'nume',
      //this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg_icons/nume.svg')
    //)
  }
  // add(){
  //   let num = 20;
  // }
  
}

