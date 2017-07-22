import {Canvas} from './canvas';
import {CanvasSet} from './canvas_set';

export class Diamond extends CanvasSet{
		
	constructor(){
		let width = 1000;
		let height = 700;
		let name = 'diamond';
		let canvases = [
			new Canvas({width : .19,
				height : .4,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : .3,
				margin_top : .3,
				toLeftOf : 'start',
				bellow : 'start',
				id : '0'}),
			new Canvas({width : .19,
				height : .6,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : 0.2,
				margin_top : 0.2,
				toLeftOf : '0',
				bellow : 'start',
				id : '1'}),
			new Canvas({width : .19,
				height : .8,	
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : 0.1,
				margin_top : 0.1,
				toLeftOf : '1',
				bellow : 'start',
				id : '2'}),
			new Canvas({width : .19,
				height : .6,
				margin_left: 0.005,
				margin_right: 0.005,
				margin_bottom : 0.2,
				margin_top : 0.2,
				toLeftOf : '2',
				bellow : 'start',
				id : '3'}),
			new Canvas({width : .19,
				height : .4,
				margin_left: 0.005,
				margin_right: 0,
				margin_bottom : 0.3,
				margin_top : 0.3,
				toLeftOf : '3',
				bellow : 'start',
				id : '4'})
			];
			
		super(height,width,canvases,name);
	}
}