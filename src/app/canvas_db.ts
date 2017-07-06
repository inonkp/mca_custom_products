import {Canvas} from './canvas';
import {Diamond} from './diamond';
import {FourTuple} from './four_tuple';
import {ThreeTuple} from './three_tuple';
import {CanvasSet} from './canvas_set';


export interface Thumbnail{
	url: string;
	name : string;
}

export class CanvasDB{
	
	static thumbnails : Thumbnail[];
	static canvas_options : Map<string, CanvasSet>;
	
	
	public static get_all(){
		return CanvasDB.canvas_options;
	}
	
	public static init(){
		CanvasDB.thumbnails = [];
		CanvasDB.canvas_options = new Map<string, CanvasSet>();
		CanvasDB.canvas_options.set('diamond',new Diamond());
		CanvasDB.canvas_options.set('four_tuple',new FourTuple());
		CanvasDB.canvas_options.set('three_tuple',new ThreeTuple());
		CanvasDB.thumbnails.push({url:'assets/images/diamond.png',name:'diamond'});
		CanvasDB.thumbnails.push({url:'assets/images/four_tuple.png',name:'four_tuple'});
		CanvasDB.thumbnails.push({url:'assets/images/three_tuple.png',name:'three_tuple'});
	}
	
	public static get_canvas_set(name : string){
		return CanvasDB.canvas_options.get(name);
	}
}