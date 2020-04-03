import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IContent } from '../models/tweet.interface';

const URL = 'http://localhost:3000/tweet';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  // img:string = "..\postsDb\1584941952605-abhi-maza-ayega-na-bhidu.jpg";

  textArea:string;
  isVisible: Boolean = false;
  searchedUsers = [
                    {name: "Shubham", userhandle: "@shubham"}, 
                    {name: "Ankit", userhandle: "@ankit"}, 
                    {name: "Suraj", userhandle: "@suraj"}, 
                    {name: "Faizan", userhandle: "@faizan"}, 
                    {name: "Deepak", userhandle: "@deepak"}
                  ];

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  ngOnInit() {
    
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log("=========================", item, status);
    };
  }

  check(event: any){
    console.log(event.key);
    if(event.key == "@"){
      this.isVisible = true;
    }
    else if(event.key == " "){
      this.isVisible = false;
    }
    // if(this.textArea.substring(this.textArea.length-3, this.textArea.length-1) == " @"){
    //   this.isVisible = true;
    // }
    // else{
    //   this.isVisible = false;
    // }
  }

  OnSubmit(){
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("text", this.textArea);
      item.formData = [this.textArea];
    };
    this.uploader.uploadAll();
    console.log(this.textArea);
  }

}
