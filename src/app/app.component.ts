import { Component, Directive, EventEmitter, HostListener } from '@angular/core';
import {ElementRef} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/takeUntil";
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    #draggable {
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      //background-image: url(https://cdn.rawgit.com/Reactive-Extensions/rx.angular.js/master/examples/draganddrop/logo.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
	  position: absolute;
	  left: 20px;
      height: 3000;
      width: 3000;
      color: #000000;
      border: 1px solid #666666;


    }
  `]
})
export class AppComponent {
  mousedrag;
  mouseup;
  mousemove;
  mousedown;
  draggable;
  img;
  canvas;
  ctx;
  imgX;
  imgY;
  



	constructor(public element: ElementRef) {
		
		

  }
  
  imageReady() {
		
		this.ctx.drawImage(this.img, 0, 0, this.img.width,    this.img.height,     // source rectangle
                   0, 0,this.draggable.width, this.draggable.height); // destination rectangle
//		this.img.width = '700';
//		this.img.width = '1000';
		console.log(this.img.width);
		
		this.imgX = 0;
		this.imgY = 0;
   }



  ngOnInit() {
		this.img = new Image();
		
		
		this.img.src = "https://cdn.shopify.com/s/files/1/0072/7502/products/2016-4-12_2.jpg?v=1493764875";
		this.img.onload = (() => this.imageReady());
		

		
		

		this.mouseup = Observable.fromEvent(document, 'mouseup');
		this.mousemove = Observable.fromEvent(document, 'mousemove');
		this.draggable = document.getElementById("draggable");
		this.ctx = this.draggable.getContext("2d");
		this.mousedown = Observable.fromEvent(this.draggable, 'mousedown');
		this.draggable.style.position = 'relative';
		this.draggable.style.cursor = 'pointer';
		
		
		this.mousedrag = this.mousedown.map((event: any) => {
		
		event.preventDefault();
			//console.log( this.img);
			return {
			  left: event.clientX - parseFloat(this.imgX),
			  top:  event.clientY - parseFloat(this.imgY)
			};
		})
		.flatMap(imageOffset => this.mousemove.map((pos: any) => {
				
			return {
				top:  pos.clientY - imageOffset.top,
				left: pos.clientX - imageOffset.left
			}
		})
		.takeUntil(this.mouseup));
    this.mousedrag.subscribe({
      next: pos => {
        // Update position
		this.ctx.clearRect(0,0,this.draggable.width,this.draggable.height);
		this.ctx.drawImage(this.img, 0, 0, this.img.width,    this.img.height,     // source rectangle
                   pos.left, pos.top,this.draggable.width, this.draggable.height);
        
		//this.ctx.drawImage(this.img, pos.left,pos.top);
		this.imgX = pos.left;
		this.imgY = pos.top;
      }
    });
  }
}
