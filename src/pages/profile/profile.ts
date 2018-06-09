import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ProfileProvider } from "../../providers";
import { User } from '../../providers';
import firebase from 'firebase';
import { Reference } from '@firebase/database-types';
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
  public ref: Reference;
  constructor(public navCtrl: NavController, public navParams: NavParams,
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
            // this.recipeList.push({
            //   id: snap.key
            // });
            this.ref = firebase
              .database().ref(`/recipes/${snap.key}`);
            this.ref.once("value", (data) => {
              this.recipeList.push({
                id: data.key,
                name: data.val().name,
                img: data.val().imgurl
              });
            })
          }
          return false;
        });
      });
    console.log('ionViewDidLoad ProfilePage');
  }
  goToRecipeDetails(recipeId):void{
    this.navCtrl.push('RecipeDetailsPage', {recipeId: recipeId});
  }
  logOut(): void { this.user.logoutUser().then(() => {
    this.navCtrl.setRoot("WelcomePage"); });
  }

}
