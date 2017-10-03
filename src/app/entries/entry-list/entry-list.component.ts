import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
    selector: 'app-entry-list',
    templateUrl: 'entry-list.component.html',
    styleUrls: ['entry-list.component.css']
})

export class EntryListComponent implements OnInit {
    entries: any;
    keys: any[];

    constructor(private entryService: EntryService){
        console.log(this.entries);
    }   

    ngOnInit(){
        this.entryService
            .getEntries()
            .then(entries => {
                this.entries = entries.reduce((a, b) => {
                    return a;
                }, {});
            })

    }
}
