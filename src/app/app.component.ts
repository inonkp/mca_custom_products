import { ChangeDetectorRef ,ViewEncapsulation,Component, Directive, EventEmitter, HostListener } from '@angular/core';
import {ElementRef} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/takeUntil";
import * as $ from 'jquery';
import {CanvasDB} from './canvas_db';
import {CanvasSet} from './canvas_db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
	  body, html {
	  height: 100%;
	}
    .canvas{
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      //background-image: url(https://cdn.rawgit.com/Reactive-Extensions/rx.angular.js/master/examples/draganddrop/logo.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
	  //position: absolute;
	  //margin-right: 7px;
	  //margin-left: 7px;
      color: #000000;


    }
	.canvases_container{
		border: 1px solid black;
		display: inline-block;
		
	}
  `]
})
export class AppComponent {
	static draggingFactor = 1.3;
	mousedrag;
	mouseup;
	mousemove;
	mousedown;
	scroll;
	img;
	curr_canvas_set: CanvasSet;
	canvases : any[];
	contexts : any[];
	imgX;
	imgY;
	scale;



	constructor(public element: ElementRef,private cdr: ChangeDetectorRef) {
		this.canvases = [];
		this.contexts = [];
		this.scale = 1;

  }
  
	updateCanvases(){
		//let totalWidth = 0;
		//let img_width = this.img.width*this.scale;
		//let img_height = this.img.height*this.scale;
		let drag = AppComponent.draggingFactor*this.scale;
		
		//this.imgHeightOnCanvas = Math.max(canvas.height,this.img.height);
		//let imgWidthOnCanvas =  this.img.width/(this.scale);

		
		
		for(var i = 0 ; i<this.curr_canvas_set.canvases.length ; i++){
			let canvas = this.curr_canvas_set.canvases[i];	
			let width = this.curr_canvas_set.canvases[i].real_time_width;

			let height = this.curr_canvas_set.canvases[i].real_time_height;
			let imgHeightOnCanvas = Math.max(height,this.img.height);			
			this.contexts[i].clearRect(0,0,width,height);	
			this.contexts[i].drawImage(this.img, width*this.scale*i - this.imgX*drag,0 , width*this.scale, imgHeightOnCanvas,     // source rectangle
                   0, this.imgY, width, imgHeightOnCanvas/this.scale);
		}
		
	}

  imageReady() {
  		this.imgX = 0;
		this.imgY = 0;
		
		this.updateCanvases();

		
   }
   
   initMouseEvents(){
		this.mouseup = Observable.fromEvent(document, 'mouseup');
		this.mousemove = Observable.fromEvent(document, 'mousemove');
		this.mousedown = Observable.fromEvent(document.getElementsByClassName("canvas"), 'mousedown');
		this.scroll =  Observable.fromEvent(document.getElementsByClassName("canvas"), 'mousewheel');
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
		this.imgX = pos.left;
		this.imgY = pos.top;
		this.updateCanvases();
        
		//this.ctx.drawImage(this.img, pos.left,pos.top);
		
      }
    });
	
	this.scroll.subscribe(e => {
		e.preventDefault();
		
		if(e.deltaY>0){
		 this.scale += .01;
		}else{
		 this.scale -= .01;
		}

		this.updateCanvases();
	});
   }
   
   ngAfterViewInit(){
		this.initElements();
		this.initMouseEvents();
		Observable.fromEvent(window, 'resize')
        .subscribe(_ => {
         let container = <HTMLElement>document.getElementById("my_canvases_container");
		
			for (let i =0; i<this.curr_canvas_set.canvases.length;i++){
				

				this.curr_canvas_set.canvases[i].real_time_width = this.curr_canvas_set.canvases[i].width*container.clientWidth;
				this.curr_canvas_set.canvases[i].real_time_height = this.curr_canvas_set.canvases[i].height*container.clientHeight;
			}
			this.updateCanvases();
        })
   }
	
	initElements(){
		this.contexts = [];
		this.canvases = [];
		let container = <HTMLElement>document.getElementById("my_canvases_container");
		
		for (let i =0; i<this.curr_canvas_set.canvases.length;i++){
			
			let canvas = <HTMLCanvasElement>document.getElementById("canvas"+i);
			this.canvases.push(canvas);
			this.curr_canvas_set.canvases[i].real_time_width = this.curr_canvas_set.canvases[i].width*container.clientWidth;
			this.curr_canvas_set.canvases[i].real_time_height = this.curr_canvas_set.canvases[i].height*container.clientHeight;
			this.contexts.push(canvas.getContext("2d"));
			//this.draggable.style.position = 'relative';
			canvas.style.cursor = 'pointer';
		}
		this.cdr.detectChanges();
	}
  ngOnInit() {

		this.img = new Image();
		CanvasDB.init();
		this.curr_canvas_set = CanvasDB.get_canvas_set(0);
		//console.log(this.curr_canvas_set);
		
		//this.img.src = "https://cdn.shopify.com/s/files/1/0072/7502/products/2016-4-12_2.jpg?v=1493764875"; // 1000 x 1000
		//this.img.src = "https://www.noao.edu/image_gallery/images/d2/NGC1365-500.jpg"; //500 * 5000
		//this.img.src = "http://www.crimsy.com/images/100x100.PNG"; //100 * 100
		//this.img.src = "http://www.shximai.com/data/out/96/68284658-high-resolution-wallpapers.jpg"; //100 * 100
		this.img.src = "https://upload.wikimedia.org/wikipedia/commons/f/f3/Mono_Crater_closeup-1000px.jpeg"; // 500 x 1000
		//this.img.src = "http://photos.toofab.com/gallery-images/2016/04/GettyImages-518772280_master_src.jpg"; // 500 x 1000
		this.img.onload = (() => this.imageReady());
		
  }
}
