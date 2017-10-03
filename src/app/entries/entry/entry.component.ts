import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Entry } from '../shared/entry.model';


@Component({
    selector: 'app-entry',
    templateUrl: 'entry.component.html',
    styleUrls: ['entry.component.css'],
    animations: [
        trigger('showContent', [
            state('inactive', style({
                height: '0px'
            })),
            state('active', style({
                height: '*'
            })),
            transition('* <=> *', animate('500ms ease-in-out'))
        ]),
        trigger('expand', [
            state('inactive', style({
                maxWidth: '200px'
            })),
            state('active', style({
                maxWidth: '1200px'
            })),
            transition('* <=> *', animate('500ms ease-in-out'))
        ])      
    ]
})

export class EntryComponent {
    @Input() entry: Entry;
    contentShown: string;

    constructor(){
        this.contentShown = 'inactive';
    }

    changeState(){
        this.contentShown = (this.contentShown === 'inactive') ? 'active': 'inactive';
        console.log(this.contentShown);
    }
}
