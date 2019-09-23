import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private alertController: AlertController) {}

  onNavGame() {
    this.router.navigate(['game']);
  }

  async onAbout() {
    const alert = await this.alertController.create({
      header: 'About',
      message: 'This application is made by Ivo Nikolov.' +
               ' It is made for to people to play tic-tac-toe on one phone. ' +
               'Why use up two batteries when you can use only one!? ',
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
  }

  async onExit() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to exit this awesome app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          // TODO: Exit app
          console.log('Ok');
        },
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await alert.present();
  }

}
