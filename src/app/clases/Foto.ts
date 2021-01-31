


import { Injectable, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Helper } from './Helper';
import { File } from '@ionic-native/file/ngx';



@Injectable()
export class Foto {

    private options: CameraOptions = {
        quality: 100,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        //   saveToPhotoAlbum: true,
        // allowEdit: true,   no va en android??
    };

    public base64Image: string;
    public imageData: any;


    constructor(
        private camera: Camera,
        private helper: Helper
    ) {
    }

    ngInit() {

    }

    async takeFoto() {
        try {
            this.camera.getPicture(this.options).then(async (imageData) => {
                this.imageData = imageData;
                this.base64Image = 'data:image/jpeg;base64,' + this.imageData;
                const nombre = this.helper.getFotoName();
                await this.helper.saveFile(Helper.FOTO_DIRECTORY, nombre, this.imageData);
            }, (err) => {
                this.helper.showError(err);
            });
        } catch (err) {
            this.helper.showError(err);
        }

    }







}
