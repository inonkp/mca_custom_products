import {Canvas} from './canvas';
import {CanvasSet} from './canvas_set';

export class FourTuple extends CanvasSet{
		
	constructor(){
		let width = 1000;
		let height = 700;
		let canvases = [
			new Canvas({width : .24,
				height : .5,
				
				
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : .25,
				margin_top : .25,
				toLeftOf : 'start',
				bellow : 'start',
				id: '0'}),
			new Canvas({width : .24,
				height : .64,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : 0.20,
				margin_top : 0.16,
				toLeftOf : '0',
				bellow : 'start',
				id: '1'}),
			new Canvas({width : .24,
				height : .64,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : 0.16,
				margin_top : 0.20,
				toLeftOf : '1',
				bellow : 'start',
				id: '2'}),
			new Canvas({width : .24,
				height : .5,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : 0.25,
				margin_top : 0.25,
				toLeftOf : '2',
				bellow : 'start',
				id: '3'})
			];
			
		super(height,width,canvases);
	}
}