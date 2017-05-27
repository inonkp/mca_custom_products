import {Canvas} from './canvas';

export interface CanvasSet{
	canvases : Canvas[]
}
export class CanvasDB{
	
	
	static canvas_options : CanvasSet[];
	
	public static get_all(){
		return CanvasDB.canvas_options;
	}
	
	public static init(){
		CanvasDB.canvas_options = [];
		CanvasDB.canvas_options.push({
		canvases : [
			new Canvas({width : 250,
				height : 700,
				margin_bottom : 0,
				margin_top : 0}),
			new Canvas({width : 250,
				height : 700,
				margin_bottom : 0,
				margin_top : 0}),
			new Canvas({width : 250,
				height : 700,
				margin_bottom : 0,
				margin_top : 0}),
			new Canvas({width : 250,
				height : 700,
				margin_bottom : 0,
				margin_top : 0})
			]
		});
	}
	
	public static get_canvas_set(i : number){
		return CanvasDB.canvas_options[i];
	}
}