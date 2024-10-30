import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ContactComponent } from "../nabvar/contact/contact.component";


interface MiembroEquipo {
  id:number;
  nombre: string;
  cargo: string;
  imagen: string;
  descripcion: string;
}

@Component({
  selector: 'app-seccion2',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './seccion2.component.html',
  styleUrls: ['./seccion2.component.scss']
})
export class Seccion2Component {

}


