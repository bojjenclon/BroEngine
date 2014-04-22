package com.brofist.games;
import flash.events.MouseEvent;

/**
 * ...
 * @author Cornell Daly
 */
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
        l_entity.y = 64;
        l_entity.angle = 45;
        l_entity.row = 4;
        l_entity.column = 2;
        l_engine.addEntity(l_entity);
        
        var l_img:Image = new Image("gfx/Radiant_Historia_Cover_Art.jpg");
        l_img.x = 200;
        l_img.y = 200;
        l_img.angle = 111;
        l_engine.addEntity(l_img);
        
        l_entity.setClickAction(function() { trace("yo yo yo"); } );
        l_img.setClickAction(function() { trace("test"); } );
    }
}
