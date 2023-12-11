import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';
import { OtherService } from '../service/other/other.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  form = {
    image: null,
    category_id: null,
    name: null,
    location: null,
    user_id: null,
    event_start_date: null,
    event_start_time: null,
    event_end_date: null,
    event_end_time: null,
    details: null,
  }
  notificationCount: any;
  constructor(private camera: Camera, private api: ApiService, private router: Router, private other: OtherService,private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async AddEvent() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.presentLoading(loading);
    this.form.user_id = JSON.parse(localStorage.getItem('userData'))?.id
    this.api.addEvent(this.form).subscribe(res => {
      loading.dismiss();
      this.other.presentToast('Event added successful !!','checkmark-circle-outline','success');
      history.back()
    },
    err=>{
      loading.dismiss();
      this.other.presentToast('Something went Wrong!!','information-circle-outline','danger');
    })
  }

  
  async chooseImage() {
    this.captureImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, async obj => {
      this.form.image = obj.imagedata;
    })
  }

  captureImage(stype: number, callback) {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: stype,
      allowEdit: false,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = `data:image/jpeg;base64,${imageData}`;
      let object;
      console.log(base64Image)
      if (stype == this.camera.PictureSourceType.CAMERA) {
        object = {
          "isCamera": true,
          "imagedata": base64Image
        }
        callback(object);
      }
      else {
        object = {
          "isCamera": false,
          "imagedata": base64Image
        }
        callback(object);

      }
    }, (err) => {
      // Handle error
    });
  }

}
