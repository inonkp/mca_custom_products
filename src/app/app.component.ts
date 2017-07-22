import { ChangeDetectorRef ,ViewEncapsulation,Component,QueryList, ViewChildren,ViewChild} from '@angular/core';
import {ElementRef} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/takeUntil";
import * as loadImageLib from '../scripts/load-image';
import {CanvasDB} from './canvas_db';
import {Thumbnail} from './canvas_db';
import {CanvasSet} from './canvas_set';
import { NouisliderComponent } from 'ng2-nouislider';
import canvasToImage from 'canvas-to-image';

declare function finish(orig_img,canvas,x,y,scale,name);
declare function initX();
declare function initY();
declare function initScale();
declare function initImg();
declare function initCanvasSet();
declare function getImageFromServer(name);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css','./nouislider.css']
  
})



export class AppComponent  {
	
	static draggingFactor = 1.3;
	maxZoom = 1.7;
	minZoom = 0.3;
	zoomInProgress = false;
	mousedrag;
	mouseup;
	mousemove;
	mousedown;
	scroll;
	img;
	canvases : any[];
	contexts : any[];
	imgX;
	imgY;
	scale;
	thumbnails : Thumbnail[];
	zoomBarValue = 1;
	curr_canvas_set: CanvasSet;
	@ViewChildren('canvasSet') things: QueryList<any>;
	@ViewChild('mainContainer') containerView: ElementRef;
    containerWidth: number;
    containerHeight: number;
	windowScale : number;
	

	constructor(public element: ElementRef,private cdr: ChangeDetectorRef) {
		this.canvases = [];
		this.contexts = [];
		this.scale = 1;
		this.windowScale = 1;

  }
  
	updateCanvases(){
		
		let totalWidth = 0;
		let drag = AppComponent.draggingFactor;	
		let locationX = 0; 		
		for(var i = 0 ; i<this.curr_canvas_set.canvases.length ; i++){
			
			let canvas = this.canvases[i];	
			let width = this.canvases[i].width;
			
			let height = this.canvases[i].height;
				
			this.contexts[i].clearRect(0,0,width,height);
			

			this.contexts[i].drawImage(this.img,0 ,0 ,this.img.width, this.img.height,     // source rectangle
                   -totalWidth + this.imgX*drag , this.imgY*drag - this.curr_canvas_set.canvases[i].margin_top*this.getContainerHeight(), 
						this.img.width*this.scale*this.windowScale, this.img.height*this.scale*this.windowScale);
	
			
			totalWidth = totalWidth+ width;
			
		}
		
	}

  imageReady() {
  		this.imgX = initX();
		this.imgY =  initY();
		this.scale = initScale();

		 setTimeout(() => { 
						this.curr_canvas_set = CanvasDB.get_canvas_set(initCanvasSet());
						this.updateContainerSizes();
						this.updateScale();
						}, 250);

		
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
		if(this.zoomInProgress) return;
		
		if(e.deltaY>0){
			if(this.scale<this.maxZoom){
				this.scale += .01;
				this.zoomBarValue+=0.01;
			}
		}else{
			if(this.scale>this.minZoom){
				this.scale -= .01;
				this.zoomBarValue-=0.01;
			}

		}

		this.updateCanvases();
	});
   }
   
   
   getAppImg(name: string){
		return getImageFromServer(name);
   }
   ngAfterViewInit(){
		this.initAll();
		this.things.changes.subscribe(e => {
			//console.log("things");
			this.initAll();
			
			this.updateCanvases();
		});
		
		/* setTimeout(() => { 
						this.curr_canvas_set = CanvasDB.get_canvas_set(initCanvasSet());
						this.updateContainerSizes();
						this.updateScale();
						}, 500);*/
		
		
		document.getElementById('file-input').onchange = (e:any) => {
			loadImageLib(
				e.target.files[0],
				(image:any) =>{
					this.switchImage(image);
				},
				{} // Options 
			);
		};
		this.img.src = initImg();
		this.img.onload = (() => this.imageReady());
		
		
   }
   
   ngAfterViewChecked(){
		
   }
   
    initAll(){
		this.initElements();
		this.initMouseEvents();
		
		
   }
   
   switchImage(image: any){
		this.img = image;
		this.updateCanvases();
   }

	initElements(){
		this.contexts = [];
		this.canvases = [];
		//let container = <HTMLElement>document.getElementById("my_canvases_container");
		
		for (let i =0; i<this.curr_canvas_set.canvases.length;i++){
			
			let canvas = <HTMLCanvasElement>document.getElementById("canvas"+i);
			//canvas.width = this.getContainerWidth();
			//canvas.height = 100;
			this.canvases.push(canvas);
			this.contexts.push(canvas.getContext("2d"));
			//this.draggable.style.position = 'relative';
			canvas.style.cursor = 'pointer';
		}
		
	}
	
	onZoomStart(){
		this.zoomInProgress = true;
	}
	
	onZoomEnd(){
		this.zoomInProgress = false
	}
	
	onZoomBarSlide(e){
		
		this.scale = e;
		this.updateCanvases();
	}
  ngOnInit() {
		this.containerWidth=0;
		this.containerHeight=0;

		this.img = new Image();
		this.img.setAttribute('crossOrigin', 'Anonymous');
		CanvasDB.init();
		this.thumbnails = CanvasDB.thumbnails;
		this.curr_canvas_set = CanvasDB.get_canvas_set('empty_canvas_set');
		//console.log(this.curr_canvas_set);
		//this.img.src = "https://cdn.shopify.com/s/files/1/0072/7502/products/2016-4-12_2.jpg?v=1493764875"; // 1000 x 1000
		//this.img.src = "https://www.noao.edu/image_gallery/images/d2/NGC1365-500.jpg"; //500 * 5000
		//this.img.src = "http://www.crimsy.com/images/100x100.PNG"; //100 * 100
		//this.img.src = "http://www.shximai.com/data/out/96/68284658-high-resolution-wallpapers.jpg"; //100 * 100
		//console.log('va');
		
		
  }
  
  getCurrCanvasSet(){
	return this.curr_canvas_set.canvases;
  }
  
  changeCanvasSet(name: string){
	this.curr_canvas_set = CanvasDB.get_canvas_set(name);
	//this.initElements();
	//this.initMouseEvents();
	//this.updateCanvases();
  }
  
  getContainerWidth(){
	return this.containerWidth;
	//return document.getElementById("my_canvases_container").offsetWidth;
	//return Math.min(this.curr_canvas_set.width,screen.width*0.6);
	//console.log(window.innerWidth);
	//console.log(screen.availWidth);
	//return screen.width*0.6;

  }
  
  getContainerMinWidth(){
	return screen.width*0.55;
  }
  
  getContainerMinHeight(){
	return document.getElementById("my_canvases_container").offsetWidth * (this.curr_canvas_set.height/this.curr_canvas_set.width);
	//return screen.height*0.65;
  }
  
  getContainerHeight(){
	return this.containerHeight;
	//return document.getElementById("my_canvases_container").offsetWidth * (this.curr_canvas_set.height/this.curr_canvas_set.width);
	//return Math.min(this.curr_canvas_set.height,screen.height*0.6);
	//return screen.width*0.6;
	

  }
  
  updateContainerSizes(){
	this.containerWidth = document.getElementById("my_canvases_container").offsetWidth;
	this.containerHeight = document.getElementById("my_canvases_container").offsetWidth * (this.curr_canvas_set.height/this.curr_canvas_set.width);
  }
  
  updateScale(){
	//console.log(this.getContainerHeight());
	this.windowScale = ( this.getContainerHeight() / this.img.height);
	
  }
  
  onResize(event){
	
	let xRatio = this.imgX/this.getContainerWidth();
	let yRatio = this.imgY/this.getContainerHeight();
	this.updateContainerSizes();
	this.updateScale();
	this.imgX = xRatio*this.getContainerWidth();
	this.imgY = yRatio*this.getContainerHeight();
	
	setTimeout(() => { 
						this.updateCanvases();
						}, 0);
	
  }
  
  renderCanvases(){
	var transition_canvases = [];
	let totalWidth = 0;
	let drag = AppComponent.draggingFactor;	
	for(var i = 0 ; i<this.curr_canvas_set.canvases.length ; i++){
		let transition_canvas = document.createElement('canvas');
		transition_canvas.width = this.curr_canvas_set.canvases[i].width * this.curr_canvas_set.width;
		transition_canvas.height = this.curr_canvas_set.canvases[i].height * this.curr_canvas_set.height;
		let xRatio = this.imgX/this.getContainerWidth();
		let yRatio = this.imgY/this.getContainerHeight();
		let x = xRatio*this.curr_canvas_set.width;
		let y = yRatio*this.curr_canvas_set.height;
		let wScale = ( this.curr_canvas_set.height / this.img.height);
		let ctx = transition_canvas.getContext("2d");
		ctx.drawImage(this.img,0 ,0 ,this.img.width, this.img.height,     // source rectangle
                   -totalWidth + x*drag , y*drag - this.curr_canvas_set.canvases[i].margin_top*this.curr_canvas_set.height, 
						this.img.width*this.scale*wScale, this.img.height*this.scale*wScale);
		transition_canvases[i] = transition_canvas;
		totalWidth = totalWidth+ transition_canvas.width;
	}
	
	
	var canvas = document.createElement('canvas');
	canvas.width = this.curr_canvas_set.width;
	canvas.height = this.curr_canvas_set.height;
	let context = canvas.getContext('2d');
	for(var i = 0 ; i<this.curr_canvas_set.canvases.length ; i++){
		let positonX = this.curr_canvas_set.canvases[i].rPositionX*this.curr_canvas_set.width;
		let positonY = this.curr_canvas_set.canvases[i].rPositionY*this.curr_canvas_set.height;
		let width = transition_canvases[i].width;
		let height = transition_canvases[i].height;
		
		context.drawImage(transition_canvases[i],0,0,transition_canvases[i].width,transition_canvases[i].height,positonX,positonY,width,height);
	}
	
	let orig_img_canvas = document.createElement('canvas');
	orig_img_canvas.width = this.img.width;
	orig_img_canvas.height = this.img.height;
	let orig_ctx = orig_img_canvas.getContext('2d');
	orig_ctx.drawImage(this.img,0,0);
	//var url= canvas.toDataURL("image/jpeg");
	//window.open(url);
	/*var link = document.createElement("a");
    link.download = "a";
    link.href = canvas.toDataURL("image/jpeg");
	document.body.appendChild(link);
    link.click();*/
	let x = this.imgX;
	
	finish(orig_img_canvas,canvas,x,this.imgY,this.scale,this.curr_canvas_set.name);
  }
}
