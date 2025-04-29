import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class OnboardingPage {
  pasoActual = 0;

  pasos = [
    {
      titulo: '👋 ¡Bienvenido!',
      descripcion: 'Esta app te ayuda a organizar tus tareas fácilmente.'
    },
    {
      titulo: '⚙️Crea categorías',
      descripcion: 'Antes de agregar tareas, organiza tus categorías.'
    },
    {
      titulo: '📝 Agrega tareas',
      descripcion: 'Luego, asigna tareas a las categorías creadas.'
    }
  ];

  constructor(private modalCtrl: ModalController, private storage: Storage) {}

  avanzar() {
    if (this.pasoActual < this.pasos.length - 1) {
      this.pasoActual++;
    } else {
      this.finalizar();
    }
  }

  async finalizar() {
    await this.storage.set('onboardingVisto', true);
    this.modalCtrl.dismiss();
  }
}