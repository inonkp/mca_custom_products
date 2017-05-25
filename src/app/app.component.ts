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
      background-image: url(https://cdn.rawgit.com/Reactive-Extensions/rx.angular.js/master/examples/draganddrop/logo.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
	  position: absolute;
	  left: 20px;
      height: 200px;
      width: 200px;
      color: #000000;
      border: 1px solid #666666;
      padding: 10px;
    }
  `]
})
export class AppComponent {
  mousedrag;
  mouseup;
  mousemove;
  mousedown;
  draggable;



	constructor(public element: ElementRef) {
		
		

  }


  ngOnInit() {
		
		this.mouseup = Observable.fromEvent(document, 'mouseup');
		this.mousemove = Observable.fromEvent(document, 'mousemove');
		this.draggable = document.getElementById("draggable");
		this.mousedown = Observable.fromEvent(this.draggable, 'mousedown');
		this.draggable.style.position = 'relative';
		this.draggable.style.cursor = 'pointer';
		console.log(this.draggable.getBoundingClientRect());
		$(this.draggable).css({'left' : 20, 'top':20});
		this.mousedrag = this.mousedown.map((event: any) => {
		
		event.preventDefault();
			console.log( parseFloat(this.draggable.style.left));
			return {
			  left: event.clientX - parseFloat(this.draggable.style.left),
			  top:  event.clientY - parseFloat(this.draggable.style.top)
			};
		})
		.flatMap(imageOffset => this.mousemove.map((pos: any) => ({
			top:  pos.clientY - imageOffset.top,
			left: pos.clientX - imageOffset.left
		}))
		.takeUntil(this.mouseup));
    this.mousedrag.subscribe({
      next: pos => {
        // Update position
		
        this.draggable.style.top  = pos.top  + 'px';
        this.draggable.style.left = pos.left + 'px';
      }
    });
  }
}
