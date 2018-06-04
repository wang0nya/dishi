import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../providers';
import { MainPage } from '../';

import { FormControl } from '@angular/forms';
export class EmailValidator {
  static isValid(control: FormControl) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ .test(
      control.value
    );
    if (re) { return null;
    }
    return { invalidEmail: true
    }; }
}

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, formBuilder: FormBuilder
  ) {
    this.signupForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid]) ],
      password: [ "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ] });

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup(): void {
    if (!this.signupForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.signupForm.value}`
      ); }else{
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;
      this.user.signupUser(email, password).then( user => {
          this.loading.dismiss().then(() => { this.navCtrl.setRoot(MainPage);
          }); },
        error => { this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({ message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }] });
          alert.present(); });
        } );
      this.loading = this.loadingCtrl.create();
      this.loading.present(); }
  }
}
