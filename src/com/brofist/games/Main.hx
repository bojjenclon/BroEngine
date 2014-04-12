package com.brofist.games;

/*import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;*/

/**
 * ...
 * @author Cornell Daly
 */

/*class Main extends Sprite 
{
	var inited:Bool;

	function resize(e) 
	{
		if (!inited) init();
		// else (resize or orientation change)
	}
	
	function init() 
	{
		if (inited) return;
		inited = true;

		// (your code here)
		
		// Stage:
		// stage.stageWidth x stage.stageHeight @ stage.dpiScale
		
		// Assets:
		// nme.Assets.getBitmapData("img/assetname.jpg");
	}

	public function new() 
	{
		super();	
		addEventListener(Event.ADDED_TO_STAGE, added);
	}

	function added(e) 
	{
		removeEventListener(Event.ADDED_TO_STAGE, added);
		stage.addEventListener(Event.RESIZE, resize);
		#if ios
		haxe.Timer.delay(init, 100); // iOS 6
		#else
		init();
		#end
	}
	
	public static function main() 
	{
		// static entry point
		Lib.current.stage.align = flash.display.StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
		Lib.current.addChild(new Main());
	}
}*/

class Main
{
    public function new() 
	{
	}
    
    public static function main()
    {
        var l_engine:Engine = new Engine(800, 600);
        
        var l_entity:SpriteSheet = new SpriteSheet("gfx/free_tileset_version_10.png", 32, 32);
        l_entity.x = 32;
        l_entity.angle = 45;
        l_entity.row = 4;
        l_entity.column = 2;
        l_engine.addEntity(l_entity);
        
        var l_img:Image = new Image("gfx/Radiant_Historia_Cover_Art.jpg");
        l_img.x = 200;
        l_img.y = 200;
        l_engine.addEntity(l_img);
    }
}
