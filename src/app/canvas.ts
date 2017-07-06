
// Angular 2
import {Component} from '@angular/core';


export class Canvas {
	width : number;
	height : number;
	margin_bottom : number;
	margin_top : number;
	margin_left : number;
	margin_right : number;
	rPositionX: number;
	rPositionY: number;
	id : string;
	toLeftOf: string;
	bellow: string;
	constructor(json) {
		this.width = json.width;
		this.height = json.height;
		this.margin_top = json.margin_top;
		this.margin_bottom = json.margin_bottom;
		this.margin_right = json.margin_right;
		this.margin_left = json.margin_left;
		this.toLeftOf = json.toLeftOf;
		this.bellow = json.bellow;
		this.id = json.id;
		this.rPositionX = -1;
		this.rPositionY = -1;
		
	}
}
