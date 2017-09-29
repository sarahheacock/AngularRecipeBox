import { Entry } from './entry.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {

    constructor(private http: Http){ }

    private url = "http://localhost:3000";

    // addComment(entryId: number, comment: { name: string; comment: string; }) {
    //     return this.http.post(`/app/entries/${entryId}/comments`, comment)
    //         .toPromise();
    // }

    getEntries(): Promise<Entry[]> {
        return this.http.get(`${this.url}/api/recipes`)
            .toPromise()
            .then(response => response.json().data as Entry[]);
    }
}
