import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NabvarComponent } from '../nabvar/nabvar.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NabvarComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

}
