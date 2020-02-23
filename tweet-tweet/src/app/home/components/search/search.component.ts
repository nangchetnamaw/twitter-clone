import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { HttpResponse } from '@angular/common/http';
import { IUser } from '../../../models/user.interface';
import { Router } from '@angular/router';

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
export class SearchComponent{
    constructor(private searchService: SearchService, private router: Router){}

    searchUser(searchInput: string){
        this.searchService.searchUser(searchInput).subscribe((response: HttpResponse<IUser>) => {
            const user = response.body;

            if(user){
                console.log(user);
                this.router.navigate(['/profile', user.userhandle] );
            }
        });
    }
}