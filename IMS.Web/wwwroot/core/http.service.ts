import { Response, ResponseOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    extractData(res: Object) {
        let body = res;
        var option = new ResponseOptions();
        option.body = body;
        return new Response(option);
    }

    extractDataForFile(res: any) {
        let option = new ResponseOptions();
        option.body = res.body;
        option.headers = res.headers;
        return new Response(option);
    }

    get(url: string) {
        return this.http.get(url).pipe(map(this.extractData)).toPromise();
    }

    post(url: string, body: any) {
        const jsonBody = JSON.stringify(body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers };
        return this.http.post(url, jsonBody, options).pipe(map(this.extractData)).toPromise();
    }

    put(url: string, body: any) {
        const jsonBody = JSON.stringify(body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers };
        return this.http.put(url, jsonBody, options).pipe(map(this.extractData)).toPromise();
    }

    postForFormData(url: string, formData: FormData) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers };
        return this.http.post(url, formData).pipe(map(this.extractData)).toPromise();
    }

    postForDownloadFile(url: string, body: any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const options = { headers: headers, responseType: 'arraybuffer' as 'arraybuffer', observe: 'response' as 'response' };
        return this.http.post(url, body, options).pipe(map(this.extractDataForFile)).toPromise();
    }

    delete(url: string) {
        return this.http.delete(url).pipe(map(this.extractData)).toPromise();
    }
}
