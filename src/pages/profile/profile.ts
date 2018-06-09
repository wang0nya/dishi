import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfileProvider } from "../../providers";
import { User } from '../../providers';
import { RecipeProvider } from "../../providers";
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
  public recipeList: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public user: User, public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
    this.profileProvider.getSavedRecipeList()
      .on("value", recipeListSnapshot => {
        this.recipeList = []; recipeListSnapshot.forEach(snap => {
          if(this.profileProvider.currentUser){
            this.recipeList.push({
              id: snap.key
            });
          }
          return false;
        });
      });
    console.log('ionViewDidLoad ProfilePage');
  }

  logOut(): void { this.user.logoutUser().then(() => {
    this.navCtrl.setRoot("WelcomePage"); });
  }

}
