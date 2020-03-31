import { Component, OnInit,HostListener, ElementRef } from '@angular/core';
import { Feed } from './../models/feed.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  isDropdownClicked: Boolean[] = [false, false, false, false, false, false, false, false, false, false];


  constructor(private eRef: ElementRef) { }

  ngOnInit() {   
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {  

    if (this.eRef.nativeElement.contains(event.target)) {
      if(event.target.id!="angle-down"){
        for(let i=0;i<this.isDropdownClicked.length;i++){
        this.isDropdownClicked[i]=false;
      }
      
      }
    }
    
  }
  
  dropdownShow(id: number){
    this.isDropdownClicked[id] = true;    
  }

  

  Feed: Feed[]=[
    {photos: '../../assets/Images/image.jpeg',text:'.Just Now',title:'Anchal',name:'@anchal_hora',description:'A flower, sometimes known as a bloom or blossom. Every flower paint contrasting colors along the ground and bring joy.',newphoto:'../../assets/Images/myimage.jpg'},
    {photos: '../../assets/Images/myimage.jpg',text:'.38 minutes ago',title:'Chetna',name:'@chetna',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/unnamed.jpg'}
  ];
  ModalDialog: any[]=[
    {message: "This trend is spam"},
    {message: "This trend is abusive or harmful"},
    {message: "This trend is a duplicate"},
    {message: "This trend is low quality"},
  ]


  }
