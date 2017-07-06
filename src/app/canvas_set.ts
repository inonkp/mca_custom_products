import {Canvas} from './canvas';


export class CanvasSet{
	canvases : Canvas[];
	height: number;
	width: number;
	
	constructor(height : number, width: number, canvases: Canvas[]){
		this.height = height;
		this.width = width;
		this.canvases = canvases;
		this.computePositions();
	}
	
	computePositions(){
		for(var i = 0 ; i<this.canvases.length ; i++){
			if(this.canvases[i].rPositionX==-1){
				this.computeRPositionX(this.canvases[i]);
				this.computeRPositionY(this.canvases[i]);
			}
		}
		

	}
	
	computeRPositionX(canvas: Canvas){
		//console.log(canvas.id);
		if(canvas.toLeftOf == "start"){
			canvas.rPositionX = canvas.margin_left;
			return;
		}
		if(canvas.rPositionX != -1){
			return;
		}
		let canvasToLeft = this.getCanvasById(canvas.toLeftOf);
		this.computeRPositionX(canvasToLeft);
		canvas.rPositionX = canvasToLeft.rPositionX + canvasToLeft.width + canvasToLeft.margin_right + canvas.margin_left;
	}
	
	computeRPositionY(canvas: Canvas){
		if(canvas.bellow == "start"){
			canvas.rPositionY= canvas.margin_top;
			return;
		}
		let topCanvas = this.getCanvasById(canvas.bellow);
		this.computeRPositionY(topCanvas);
		canvas.rPositionY = topCanvas.rPositionY + topCanvas.height + topCanvas.margin_bottom + canvas.margin_top;
	}
	
	getCanvasById(id : string){
		for(var i = 0 ; i<this.canvases.length ; i++){
			if(this.canvases[i].id==id){
				return this.canvases[i];
			}
		}
		console.log("no such id " + id);
	}
	
}