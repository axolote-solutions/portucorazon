import { Component, OnInit, Input } from '@angular/core';
import { Logo } from '../../model/logo.model';


@Component({
  selector: 'app-logo-tiles',
  templateUrl: './logo-tiles.component.html',
  styleUrls: ['./logo-tiles.component.scss']
})
export class LogoTilesComponent implements OnInit {

  @Input() logoList: Logo[];
  tiles = []

  constructor() { }

  ngOnInit(): void {

    for(var i = 0; i < this.logoList.length; i++) {
      let fileName: string = null;
      if(this.logoList[i].fileName != "") {
        fileName = "/assets/img/" + this.logoList[i].fileName + ".png"
      }
      this.tiles[i] = {
        fileName: fileName, 
        cols: this.logoList[i].columns, 
        rows: this.logoList[i].rows
      }
    }
  }

}
