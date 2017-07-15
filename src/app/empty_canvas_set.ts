import {Canvas} from './canvas';
import {CanvasSet} from './canvas_set';

export class EmptyCanvasSet extends CanvasSet{
		
	constructor(){
		let width = 1000;
		let height = 700;
		let canvases = [
			
			];
			
		super(height,width,canvases);
	}
}