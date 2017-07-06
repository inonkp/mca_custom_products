import {Canvas} from './canvas';
import {CanvasSet} from './canvas_set';

export class ThreeTuple extends CanvasSet{
		
			
	constructor(){
		let width = 750;
		let height = 500;
		let canvases = [
			new Canvas({width : .32,
				height : .7,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : .15,
				margin_top : .15,
				toLeftOf : 'start',
				bellow : 'start',
				id : '0'}),
			new Canvas({width : .32,
				height : .7,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : .15,
				margin_top : .15,
				toLeftOf : '0',
				bellow : 'start',
				id : '1'}),
			new Canvas({width : .33,
				height : .7,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : .15,
				margin_top : .15,
				toLeftOf : '1',
				bellow : 'start',
				id : '2'})
			];
			
		super(height,width,canvases);
	}
}