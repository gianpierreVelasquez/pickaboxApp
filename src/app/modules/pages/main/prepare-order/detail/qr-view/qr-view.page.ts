import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { GeneralService } from 'src/app/core/services/general.service';
import { IOrder } from 'src/app/shared/models/order.interface';

@Component({
  selector: 'app-qr-view',
  templateUrl: './qr-view.page.html',
  styleUrls: ['./qr-view.page.scss'],
})
export class QrViewPage implements OnInit {

  @Input() dataModal: any;
  @Input() data: any;
  @Input() order: IOrder;
  @Input() totalPackages: number = 0;

  qrTitle = GeneralLang.Title.QR;
  modalId: string;
  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  qrList: any;
  packagelbl = GeneralLang.Labels.Packages;
  lang = GeneralLang;

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  sanatizeUrl(generatedImageUrl): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
  }

  getBase64ImageFromURL(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement): string {
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL: string = canvas.toDataURL("image/png");
    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  getImage(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.base64TrimmedURL = base64Data;
      this.createBlobImageFileAndShow();
    });
  }

  createBlobImageFileAndShow(): void {
    this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
      const imageBlob: Blob = blob;
      const imageName: string = this.generateName();
      const imageFile: File = new File([imageBlob], imageName, {
        type: "image/jpeg"
      });
      this.generatedImage = window.URL.createObjectURL(imageFile);
    });
  }

  generateName(): string {
    const date: number = new Date().valueOf();
    let text: string = "";
    const possibleText: string =
      "QRCODE-";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    return date + "." + text + ".jpeg";
  }

  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: "image/jpeg" });
      observer.next(blob);
      observer.complete();
    });
  }

  async saveQrImage() {
    this._generalServ.writeFile(`QR-${new Date().getTime()}`,this.base64TrimmedURL);
  }

  close() {
    this._generalServ.closeModal(this.modalId);
    this._generalServ.route('/main/prepare-order');
  }

  _initValues(): void {
    this.getImage(this.data.qrCode);
    this.modalId = this.dataModal.modalId;
    this.qrList = Array(this.totalPackages).fill(0).map((x,i)=>i);
  }

}
