import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  gameArray: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  isPlayerOne = true;

  constructor() { }

  ngOnInit() {
  }

  onChangeImg(i: number, z: number) {
    if (this.gameArray[i][z] === 0) {
      if (this.isPlayerOne) {
        this.gameArray[i][z] = 1;
      } else {
        this.gameArray[i][z] = 2;
      }
      this.isPlayerOne = !this.isPlayerOne;
      this.checkStatus(i, z);
    }
  }

  getImage(i: number, z: number) {

    if (this.gameArray[i][z] === 1) {
      return './../../assets/elements/x.png';
    } else if (this.gameArray[i][z] === 2) {
      return './../../assets/elements/o.png';
    }
    return null;
  }

 checkStatus(i: number, z: number) {
  if ((this.gameArray[i][0] === this.gameArray[i][1]) &&
      (this.gameArray[i][0] === this.gameArray[i][2])) {
        console.log('Game won by ' + this.gameArray[i][0]);
  }

  if ((this.gameArray[0][z] === this.gameArray[1][z]) &&
      (this.gameArray[0][z] === this.gameArray[2][z])) {
        console.log('Game won by ' + this.gameArray[0][z]);
  }

  if ((this.gameArray[0][0] === this.gameArray[1][1]) &&
      (this.gameArray[0][0] === this.gameArray[2][2]) &&
      (this.gameArray[0][0] !== 0)) {
        console.log('Game won by ' + this.gameArray[0][0]);
  }

  if ((this.gameArray[0][2] === this.gameArray[1][1]) &&
      (this.gameArray[0][2] === this.gameArray[2][0]) &&
      (this.gameArray[0][2] !== 0)) {
        console.log('Game won by ' + this.gameArray[0][2]);
  }
 }
}
