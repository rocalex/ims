import {HttpService} from "../../../core/http.service";
import {Injectable} from "@angular/core";

@Injectable()
export class PayrollGenerateService {
    constructor(private http: HttpService) {
    }
    
    getAcademicYearList() {
        return this.http.get('/api/instituteacademicyearmanagement');
    }
}