import {Component} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entry-list-modal',
  templateUrl: './entry-list-modal.component.html',
  animations: [
    trigger('isCollapsed', [
      state('inactive', style({transform: 'translateY(0)'})),
      transition('active => inactive', [
        style({transform: 'translateY(-100%)'}),
        animate(100)
      ]),
      transition('inactive => active', [
        animate(100, style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})

export class EntryListModal {
  isCollapsed: string = 'inactive';
  
  constructor(private modalService: NgbModal) {}

  toggleState() {
    this.isCollapsed = (this.isCollapsed === "inactive") ? "active" : "inactive";
    console.log(this.isCollapsed);
  }

  open(content) {
    this.modalService.open(content);
    this.toggleState();
    // .result.then((result) => {
    //   this.toggleState();
    //   console.log("result", result);
    // }, (reason) => {
    //   this.toggleState();
    //   console.log("reason", reason);
    // });
  }

  // d(reason){
  //   this.activeModal.dismiss();
  //   this.toggleState();
  // }

}
