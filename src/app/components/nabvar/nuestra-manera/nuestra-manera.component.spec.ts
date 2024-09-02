import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestraManeraComponent } from './nuestra-manera.component';

describe('NuestraManeraComponent', () => {
  let component: NuestraManeraComponent;
  let fixture: ComponentFixture<NuestraManeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestraManeraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuestraManeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
