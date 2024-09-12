import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { MenuItemComponent } from '../nabvar/menu-item/menu-item.component';

import { NosotrosComponent } from "../nabvar/nosotros/nosotros.component";
import { NuestraManeraComponent } from "../nabvar/nuestra-manera/nuestra-manera.component";
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    BannerComponent,
    MenuItemComponent, NosotrosComponent, NuestraManeraComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
