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
  gameOnHold = true;
  playerOneAvatar = './../../assets/elements/avatar1.png';
  playerTwoAvatar = './../../assets/elements/avatar2.png';
  selectedRandomQuote: string;
  quotes = ['Strive for greatness. – Lebron James',
              'I have nothing to lose but something to gain. – Eminem ',
              'Never let your emotions overpower your intelligence. – Drake'];
  randNumber: number;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
   this.getQuote();
  }

  getQuote() {
    this.randNumber = Math.floor(Math.random() * 3);
    this.selectedRandomQuote = this.quotes[this.randNumber];
  }

  startGame() {
    this.gameOnHold = false;
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
    if (!this.gameOnHold) {
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
      (!this.gameArray[2].includes(0))) {
        this.presentAlert((this.playerOneTime < this.playerTwoTime) ? 'Game won by player2' : 'Game won by player1');
        this.subscription.unsubscribe();
  }
 }

 async presentAlert(message: string) {
  const alert = await this.alertController.create({
    message,
    backdropDismiss: false,
    buttons: [{
      text: 'Ok',
      handler: () => {
        this.resetBoard();
        this.getQuote();
      }
    }]
  });
  this.subscription.unsubscribe();
  await alert.present();
 }

 resetBoard() {
  for (let i = 0; i < 3; i++) {
    for (let z = 0; z < 3; z++) {
      this.gameArray[i][z] = 0;
    }
  }
  this.gameOnHold = true;
  this.playerOneTime = 60;
  this.playerTwoTime = 60;
 }
}
