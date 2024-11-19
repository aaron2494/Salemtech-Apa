import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
 
}