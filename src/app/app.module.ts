import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home/home.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';


const firebaseConfig = {
  apiKey: "AIzaSyCkWHoCjPHMovw77vcPKDYlFLmr2GRRqcU",
  authDomain: "listotodoapp.firebaseapp.com",
  projectId: "listotodoapp",
  storageBucket:  "listotodoapp.firebasestorage.app",
  messagingSenderId: "147132231076",
  appId: "1:147132231076:web:84d6cbbf20a5d1d0fca531"
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HomePageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig();
      remoteConfig.settings.minimumFetchIntervalMillis = 0;
      return remoteConfig;
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
