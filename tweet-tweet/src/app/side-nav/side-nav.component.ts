import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import{Router}from '@angular/router'
@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
   isClicked:boolean = false;
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {}

  title: string = "Home"
  logout(){
    localStorage.removeItem('Authorization');
    this.router.navigate(["/login"])
   
  }
  toggle(){
    this.isClicked=!this.isClicked;
    console.log(this.isClicked);
  }
}
