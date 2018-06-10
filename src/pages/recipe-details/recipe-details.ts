import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { RecipeProvider } from "../../providers";
import { User } from "../../providers";
import marked from 'marked';
import firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the RecipeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  segment: "recipe-detail/:recipeId"
})
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {
  @ViewChild(Content) content: Content;
  public currentRecipe: any = {};
  public markdownText: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public recipeProvider: RecipeProvider,
  public user: User, private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    this.recipeProvider
      .getRecipeDetail(this.navParams.get("recipeId")) .on("value", recipeSnapshot => {
      this.currentRecipe = recipeSnapshot.val();
      this.currentRecipe.id = recipeSnapshot.key;
      this.markdownText = marked(recipeSnapshot.val().method.toString());
      this.content = this.markdownText
      });
    console.log('ionViewDidLoad RecipeDetailsPage');
  }

  tapEvent(recipeId) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.recipeProvider.recipeListRef.child(`${recipeId}/likes/${user.uid}`)
          .once("value",snapshot => {
            const userData = snapshot.val();
            if (userData){
              console.log("exists!");
            }
            else {
              console.log("liked!");
              this.recipeProvider.recipeListRef.child(`${recipeId}/likes/${user.uid}`)
                .set({
                  liked:true
                })
            }
          });
      }
    });
  }

  save(recipeId) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user.userListRef.child(`${user.uid}/saves/${recipeId}`)
          .once("value",snapshot => {
            const userData = snapshot.val();
            if (userData){
              console.log("exists!");
            }
            else {
              console.log("saved!");
              this.user.userListRef.child(`${user.uid}/saves/${recipeId}`)
                .set({
                  saved:true
                })
            }
          });
      }
    });
  }

//  social sharing
  whatsappShare(index){
    const msg  = 'shared by recipes app';
    this.socialSharing.shareViaWhatsApp(msg, null, null);
  }
  twitterShare(index){
    const msg  = 'shared by recipes app';
    this.socialSharing.shareViaTwitter(msg, null, null);
  }
  facebookShare(index){
    const msg  = 'shared by recipes app';
    this.socialSharing.shareViaFacebook(msg, null, null);
  }
}
