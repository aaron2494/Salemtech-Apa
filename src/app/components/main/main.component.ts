import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { MenuItemComponent } from '../nabvar/menu-item/menu-item.component';
import { NabvarComponent } from '../nabvar/nabvar.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NabvarComponent,
    BannerComponent,
    MenuItemComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
