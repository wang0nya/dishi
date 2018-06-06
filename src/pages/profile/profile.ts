import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ProfileProvider } from "../../providers";
import { User } from '../../providers';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public user: User, public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
    console.log('ionViewDidLoad ProfilePage');
  }

  logOut(): void { this.user.logoutUser().then(() => {
    this.navCtrl.setRoot("WelcomePage"); });
  }

}
