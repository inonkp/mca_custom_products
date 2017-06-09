import {Canvas} from './canvas';

export interface CanvasSet{
	canvases : Canvas[],
	height: number,
	width: number
}
export class CanvasDB{
	
	
	static canvas_options : CanvasSet[];
	
	public static get_all(){
		return CanvasDB.canvas_options;
	}
	
	public static init(){
		CanvasDB.canvas_options = [];
		CanvasDB.canvas_options.push({
		width: 1000,
		height: 700,
		canvases : [
			new Canvas({width : .24,
				height : .5,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : .25,
				margin_top : .25}),
			new Canvas({width : .24,
				height : 1,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0,
				margin_top : 0}),
			new Canvas({width : .24,
				height : 1,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0,
				margin_top : 0}),
			new Canvas({width : .24,
				height : 1,
				margin_left: '0.5%',
				margin_right: '0.5%',
				margin_bottom : 0,
				margin_top : 0})
			]
		});
	}
	
	public static get_canvas_set(i : number){
		return CanvasDB.canvas_options[i];
	}
}