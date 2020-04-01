import { Component, OnInit } from '@angular/core';
import {JsonDecoderService} from '../services/json-decoder.service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  
  constructor(private sendRequest: JsonDecoderService) {}
  userHandle= this.sendRequest.jsonDecoder(localStorage.getItem("Authorization"))._id
  loadUserdata(){
    console.log(this.userHandle)
  }

  ngOnInit() {
  }

}
