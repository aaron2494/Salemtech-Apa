import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NabvarComponent } from '../nabvar/nabvar.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NabvarComponent,CommonModule,NgOptimizedImage],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {
  text = 'El socio tecnologico a su medida.';
  words: { text: string; delay: number }[] = [];

  ngOnInit(): void {
    const wordArray = this.text.split(' ');
    wordArray.forEach((word, index) => {
      this.words.push({ text: word, delay: index * 0.8 }); // 0.5s delay between words
    });
  }
  ngAfterViewInit(): void {
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    const totalAnimationTime = this.words.length * 0.8 +10 ; // Duración total de la animación (número de palabras * delay + duración de la última palabra)

    setInterval(() => {
      const spans = document.querySelectorAll('#animatedText span');
      spans.forEach((span, index) => {
        const htmlSpan = span as HTMLElement;
        htmlSpan.style.opacity = '0'; // Reinicia la opacidad
        htmlSpan.style.animation = 'none'; // Remueve la animación
        setTimeout(() => {
          htmlSpan.style.animation = `fadeIn 2s forwards`;
          htmlSpan.style.animationDelay = `${index * 0.8}s`; // Reaplica la animación con el delay original
        }, 10);
      });
    }, totalAnimationTime * 1000); // Repite después de la duración total
  }
}