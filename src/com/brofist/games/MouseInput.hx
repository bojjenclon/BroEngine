package com.brofist.games;

import flash.events.Event;
import flash.events.MouseEvent;
import flash.geom.Point;
import flash.Lib;
import haxe.Timer;

/**
 * ...
 * @author Cornell Daly
 */
class MouseInput
{
    public var x:Float;
    public var y:Float;
    
    public function new()
    {
        Lib.current.stage.addEventListener(MouseEvent.MOUSE_MOVE, onMove);
    }
    
    private function onMove(p_event:MouseEvent):Void
    {
        x = p_event.stageX;
        y = p_event.stageY;
    }
}