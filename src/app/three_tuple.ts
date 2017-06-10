import {Canvas} from './canvas';
import {CanvasSet} from './canvas_db';

export class ThreeTuple implements CanvasSet{
		width = 750;
		height = 500;
		canvases = [
			new Canvas({width : .32,
				height : .7,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : .15,
				margin_top : .15}),
			new Canvas({width : .32,
				height : .7,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : .15,
				margin_top : .15}),
			new Canvas({width : .33,
				height : .7,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : .15,
				margin_top : .15})
			];
}