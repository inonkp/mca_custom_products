
// Angular 2
import {Component} from '@angular/core';


export class Canvas {
	width : number;
	height : number;
	margin_bottom : number;
	margin_top : number;
	constructor(json) {
		this.width = json.width;
		this.height = json.height;
		this.margin_top = json.margin_top;
		this.margin_bottom = json.margin_bottom;
	}
}
