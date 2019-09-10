import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  gameArray: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  isPlayerOne = true;
  playerOneTime = 60;
  playerTwoTime = 60;
  subscription: Subscription;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    const source = interval(1000);
    this.subscription = source.subscribe(val => {
      if (this.isPlayerOne) {
        this.playerOneTime--;
      } else {
        this.playerTwoTime--;
      }

      if (this.playerOneTime < 1 || this.playerTwoTime < 1) {
        this.subscription.unsubscribe();
        this.presentAlert((this.playerOneTime < this.playerTwoTime) ? 'Game won by player2' : 'Game won by player1');
      }
    });
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
        this.presentAlert('Game won by ' + this.gameArray[i][0]);
        console.log('Game won by ' + this.gameArray[i][0]);
  }

  if ((this.gameArray[0][z] === this.gameArray[1][z]) &&
      (this.gameArray[0][z] === this.gameArray[2][z])) {
        this.presentAlert('Game won by ' + this.gameArray[0][z]);
        console.log('Game won by ' + this.gameArray[0][z]);
  }

  if ((this.gameArray[0][0] === this.gameArray[1][1]) &&
      (this.gameArray[0][0] === this.gameArray[2][2]) &&
      (this.gameArray[0][0] !== 0)) {
        this.presentAlert('Game won by ' + this.gameArray[0][0]);
        console.log('Game won by ' + this.gameArray[0][0]);
  }

  if ((this.gameArray[0][2] === this.gameArray[1][1]) &&
      (this.gameArray[0][2] === this.gameArray[2][0]) &&
      (this.gameArray[0][2] !== 0)) {
        this.presentAlert('Game won by ' + this.gameArray[0][2]);
        console.log('Game won by ' + this.gameArray[0][2]);
  }

  if ((!this.gameArray[0].includes(0)) &&
      (!this.gameArray[1].includes(0)) &&
      (!this.gameArray[2].includes(0)) ) {
        this.presentAlert((this.playerOneTime < this.playerTwoTime) ? 'Game won by player2' : 'Game won by player1');
        this.subscription.unsubscribe();
  }
 }

 async presentAlert(message: string) {
  const alert = await this.alertController.create({
    // header: 'Alert',
    // subHeader: 'Subtitle',
    message,
    buttons: ['OK']
  });
  this.subscription.unsubscribe();
  await alert.present();
 }
}
