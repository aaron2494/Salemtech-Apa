import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { MenuItemComponent } from '../nabvar/menu-item/menu-item.component';
import { NabvarComponent } from '../nabvar/nabvar.component';
import { NosotrosComponent } from "../nabvar/nosotros/nosotros.component";
import { NuestraManeraComponent } from "../nabvar/nuestra-manera/nuestra-manera.component";
import { ContactComponent } from "../contact/contact.component";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NabvarComponent,
    BannerComponent,
    MenuItemComponent, NosotrosComponent, NuestraManeraComponent, ContactComponent],
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
