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
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // Our translated text strings
  private loginErrorString: string;
  public loading: Loading;
  public loginForm: FormGroup;
  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public translateService: TranslateService, formBuilder: FormBuilder){
    this.loginForm = formBuilder.group({
      email: [ '',
        Validators.compose([Validators.required, EmailValidator.isValid]) ],
      password: [ '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ] });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin(): void {
    if (!this.loginForm.valid) { console.log(
      `Form is not valid yet, current value: ${this.loginForm.value}` );
    }else{
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.user.loginUser(email, password).then( authData => {
          this.loading.dismiss().then(() => { this.navCtrl.setRoot(MainPage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present(); });
        } );
      this.loading = this.loadingCtrl.create();
      this.loading.present(); }
  }
}
