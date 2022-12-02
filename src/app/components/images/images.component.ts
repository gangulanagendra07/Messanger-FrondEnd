import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';

const URL = "http://localhost:4500/api/social/upload-image";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})

export class ImagesComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  })

  user: any;
  selectedFile: any;
  images: any = [];
  socket: any;
  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    // console.log(this.user);
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    })
  }

  GetUser() {
    this.usersService.GetUserById(this.user._id).subscribe((data) => {
      this.images = data.results.images;
      // console.log(this.images);
    }, err => {
      console.log(err);
    })
  }

  OnFileSelected(event: any) {
    const file: File = event[0];
    this.ReadAsBase64(file).then(result => {
      this.selectedFile = result;
    }).catch(err => {
      console.log(err)
    })
  }

  upload() {
    this.usersService.AddImage(this.selectedFile).subscribe(data => {
      console.log(data);
      const filePath = <HTMLInputElement>document.getElementById('filePath');
      filePath.value = '';
      this.socket.emit('refresh', {});
    }, err => console.log(err));
  }
  ReadAsBase64(file: any): Promise<any> {
    const reader = new FileReader();
    const finalValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      })
      reader.addEventListener('error', (event) => {
        reject(event);
      })
      reader.readAsDataURL(file);
    })
    return finalValue;
  }

  SetProfileImage(data: any) {
    this.usersService.SetDefaultImage(data.imgId, data.imgVersion).subscribe(() => {
      this.socket.emit('refresh', {});
    }, err => {
      console.log(err);
    })
  }


}
