import { element } from 'protractor';
import { Component, OnInit, Renderer, ElementRef, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import{Router}from '@angular/router'
@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
   isClicked:boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router:Router,
    private render:Renderer,
    private ren:Renderer2,
    private el: ElementRef
   ) {}

  title: string = "Home"
  logout(){
    localStorage.removeItem('Authorization');
    this.router.navigate(["/login"])
   
  }
  toggle(event:any){
       this.isClicked=!this.isClicked;
      
      this.render.setElementClass(event.target,"selected",true);

  }
  ngOnInit():void{
    

  }
}
