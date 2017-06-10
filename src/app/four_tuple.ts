import {Canvas} from './canvas';
import {CanvasSet} from './canvas_db';

export class FourTuple implements CanvasSet{
		width = 1000;
		height = 700;
		canvases = [
			new Canvas({width : .24,
				height : .5,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : .25,
				margin_top : .25}),
			new Canvas({width : .24,
				height : .64,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0.20,
				margin_top : 0.16}),
			new Canvas({width : .24,
				height : .64,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0.16,
				margin_top : 0.20}),
			new Canvas({width : .24,
				height : .5,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0.25,
				margin_top : 0.25})
			];
}