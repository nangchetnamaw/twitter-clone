import { ITrend } from './../models/trend.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  isDropdownClicked: Boolean[] = [false, false, false, false, false, false, false, false, false, false];
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

  
  dropdownShow(id: number){
    this.isDropdownClicked[id] = true;
  }

  showMore(){
    this.isSecondList=true;
    console.log("showing MORE")
  }

  Trend: ITrend[]=[
    {trendingIn: 'Trending in India', hashtag: 'coronapocalypse', tweets: '138K', _id: 1},
    {trendingIn:'Trending in New Delhi' ,hashtag : 'NirbhayaCase',tweets: '20.1K', _id: 2},
    {trendingIn:'Trending in India' ,hashtag : 'AnalogIAS',tweets: '6,053', _id: 3},
    {trendingIn:'Politics . Trending' ,hashtag : 'Covid19Walkout',tweets: '15.4K', _id: 4},
    {trendingIn:'Trending in India' ,hashtag : 'WhenHindus',tweets: '4908', _id: 5},
    {trendingIn:'Trending in India' ,hashtag : 'QuarantineLife',tweets: '13.8K', _id: 6},
    {trendingIn:'Trending in India' ,hashtag : 'RBIGovernor',tweets: '1073', _id: 7},
    {trendingIn:'Trending in India' ,hashtag : 'TheReturnOfSid',tweets: '63K', _id: 8},
    {trendingIn:'Politics . Trending' ,hashtag : 'MPFloorTest',tweets: '1073', _id: 9},
    {trendingIn:'Politics . Trending' ,hashtag : 'Spain',tweets: '257K', _id: 10},
  ];

  ModalDialog: any[]=[
    {message: "This trend is spam"},
    {message: "This trend is abusive or harmful"},
    {message: "This trend is a duplicate"},
    {message: "This trend is low quality"},
  ]
}
