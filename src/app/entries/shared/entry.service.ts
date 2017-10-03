import { Entry } from './entry.model';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
    @Output() onStateChange: EventEmitter<any> = new EventEmitter();
    modalShown: string = 'inactive';

    constructor(private http: Http){ }
    private url = "http://localhost:3000";


    getEntries(): Promise<Entry[]> {
        return this.http.get(`${this.url}/api/recipes`)
            .toPromise()
            .then(response => response.json().data as Entry[]);
    }

    toggleState() {
        this.modalShown = (this.modalShown === 'inactive') ? 'active': 'inactive';
        console.log(this.modalShown);
        this.onStateChange.emit(this.modalShown);
    }

    getState() {
        return this.onStateChange;
    }
}
