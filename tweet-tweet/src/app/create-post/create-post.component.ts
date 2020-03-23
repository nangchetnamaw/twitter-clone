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

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  ngOnInit() {
    console.log(this.textArea);
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log("Uploaded File details", item, status);
    };
  }

  OnSubmit(){
    this.uploader.uploadAll();
    console.log(this.textArea);
  }

}
