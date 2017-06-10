import {Canvas} from './canvas';
import {CanvasSet} from './canvas_db';

export class Diamond implements CanvasSet{
		width = 1000;
		height = 700;
		canvases = [
			new Canvas({width : .19,
				height : .4,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : .3,
				margin_top : .3}),
			new Canvas({width : .19,
				height : .6,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0.2,
				margin_top : 0.2}),
			new Canvas({width : .19,
				height : .8,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0.1,
				margin_top : 0.1}),
			new Canvas({width : .19,
				height : .6,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0.2,
				margin_top : 0.2}),
			new Canvas({width : .19,
				height : .4,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0.3,
				margin_top : 0.3})
			];
}