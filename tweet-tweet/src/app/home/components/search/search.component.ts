import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { HttpResponse } from '@angular/common/http';
import { User } from '../../../models/user.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.scss'],
    template: `
        <div class="row">
            <div class="input-group col-sm-10 col-sm-offset-1">
                <form class="search-form" action="#" method="#" role="search">
                    <input class="form-control" placeholder="Search Twitter" name="srch-term" id="ed-srch-term" type="text" #searchInput>
                    <a (click)="searchUser(searchInput.value)"><i class="fa fa-search"></i></a>   
                </form>
            </div>
        </div>
    `
})
export class SearchComponent implements OnInit{
    user: any = null;

    constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute){}

    ngOnInit(){
        this.route.params.pipe(switchMap((params) => this.searchService.searchUser(params.id))).subscribe((data) => this.user = data);
    }

    searchUser(searchInput: String){
        this.searchService.searchUser(searchInput).subscribe((response: HttpResponse<User>) => {
            const user = response.body;

            if(user){
                console.log(user);
                this.router.navigate(['/profile', user.userhandle] );
            }
        });
    }
}