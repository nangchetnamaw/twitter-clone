import { ITrend } from './../models/trend.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  isDropdownClicked: Boolean= false;
  isSecondList: Boolean= false;

  constructor() { }

  ngOnInit() {
    var modal = document.getElementById('modal');
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    
  }

  
  dropdownShow(){
    this.isDropdownClicked=true;
  }

  showMore(){
    this.isSecondList=true;
    console.log("showing MORE")
  }

  Trend: ITrend[]=[
    {trendingIn:'Trending in India' ,hashtag : 'coronapocalypse',tweets: '138K'},
    {trendingIn:'Trending in New Delhi' ,hashtag : 'NirbhayaCase',tweets: '20.1K'},
    {trendingIn:'Trending in India' ,hashtag : 'AnalogIAS',tweets: '6,053'},
    {trendingIn:'Politics . Trending' ,hashtag : 'Covid19Walkout',tweets: '15.4K'},
    {trendingIn:'Trending in India' ,hashtag : 'WhenHindus',tweets: '4908'},
    {trendingIn:'Trending in India' ,hashtag : 'QuarantineLife',tweets: '13.8K'},
    {trendingIn:'Trending in India' ,hashtag : 'RBIGovernor',tweets: '1073'},
    {trendingIn:'Trending in India' ,hashtag : 'TheReturnOfSid',tweets: '63K'},
    {trendingIn:'Politics . Trending' ,hashtag : 'MPFloorTest',tweets: '1073'},
    {trendingIn:'Politics . Trending' ,hashtag : 'Spain',tweets: '257K'},
  ];

  ModalDialog: any[]=[
    {message: "This trend is spam"},
    {message: "This trend is abusive or harmful"},
    {message: "This trend is a duplicate"},
    {message: "This trend is low quality"},
  ]
}
