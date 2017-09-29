import {Component} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entry-list-modal',
  templateUrl: './entry-list-modal.component.html',
  animations: [
    trigger('showModal', [
      state('inactive', style({
        display: 'block',
        'z-index': 2,
        color: 'blue',
        // height: 0, 
        // opacity: 0,
        transform: 'translateY(100%)'
      })),
      state('active', style({
        display: 'block',
        'z-index': 2,
        color: 'red',
        // height: '100%', 
        opacity: 1,
        transform: 'translateY(-100%)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})

export class EntryListModal {
  // isCollapsed: string = 'inactive';
  modalShown: string = 'inactive';
  
  //constructor(private modalService: NgbModal) {}

  toggleState() {
    this.modalShown = (this.modalShown === 'inactive') ? 'active': 'inactive';
    console.log(this.modalShown);
  }

  // open(content) {
  //   this.modalService.open(content);
  //   this.toggleState();
  // }

  // d(reason){
  //   this.modalService.dismiss(content);
  //   this.toggleState();
  // }

}


