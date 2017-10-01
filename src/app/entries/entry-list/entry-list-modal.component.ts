import {Component} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entry-list-modal',
  templateUrl: './entry-list-modal.component.html',
  styleUrls: ['entry-list-modal.component.css'],
  animations: [
    trigger('showModal', [
      state('inactive', style({
        display: 'none',
        position: 'fixed',
        'z-index': 1,
        //transform: 'translateY(100%)'
        top: '-300px'
      })),
      state('active', style({
        display: 'block',
        position: 'fixed',
        'z-index': 1,
        //transform: 'translateY(-100%)',
        top: 0,
        //'overflow-y': 'scroll'
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


