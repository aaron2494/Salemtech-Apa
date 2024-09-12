import { Injectable } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private ngbModal: NgbModal) {}
  
  open(component: any, options?: any) {
    return this.ngbModal.open(component, options);
  }

  close(): void {
    this.ngbModal.dismissAll();
  }
}
