import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RecipeProvider } from "../../providers";

/**
 * Generated class for the AnalyzePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analyze',
  templateUrl: 'analyze.html',
})
export class AnalyzePage {
  public currentRecipe: any = {};
  constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams
    , public recipeProvider: RecipeProvider) {
  }

  ionViewDidLoad() {
    this.recipeProvider
      .getRecipeDetail(this.navParams.get("recipeId")) .on("value", recipeSnapshot => {
      this.currentRecipe = recipeSnapshot.val();
      this.currentRecipe.id = recipeSnapshot.key;
    });
    console.log('ionViewDidLoad AnalyzePage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
