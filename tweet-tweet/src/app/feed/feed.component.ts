import { Component, OnInit } from '@angular/core';
import { Feed } from './../models/feed.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  ngOnInit() {
  }
  Feed: Feed[]=[
    {photos: 'http://localhost:8080/1584941952605-abhi-maza-ayega-na-bhidu.jpg',text:'Just Now',title:'Anchal Hora',name:'@anchal hora',description:'A flower, sometimes known as a bloom or blossom. Every flower paint contrasting colors along the ground and bring joy.',newphoto:'../../assets/Images/unnamed.jpg'},
    {photos: '../../assets/Images/myimage.jpg',text:'38 minutes ago',title:'Chetna Mongmaw',name:'@chetna',description:'Mama was my greatest teacher, a teacher of compassion, love and fearlessness. If love is sweet as a flower, then my mother is that sweet flower of love.',newphoto:'../../assets/Images/unnamed.jpg'}
  ];

 constructor() {}
  }
