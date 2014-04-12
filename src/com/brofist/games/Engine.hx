package com.brofist.games;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Matrix;
import flash.Lib;

/**
 * ...
 * @author Cornell Daly
 */
class Engine
{
    public static var mainEngine(get, null):Engine;
    
    private static var s_globalEngine:Engine;
    
    private var m_origWidth:Int;
    private var m_origHeight:Int;
    
    private var m_buffer:Bitmap;
    private var m_entities:Array<Entity>;
    
    private var m_lastFrame:Float;

    public function new(p_width:Int = 800, p_height:Int = 600) 
    {
        if (s_globalEngine != null)
        {
            throw "The engine has already been created, get it with Engine.mainEngine";
        }
        
        m_origWidth = p_width;
        m_origHeight = p_height;
        
        m_buffer = new Bitmap(new BitmapData(800, 600, true, 0xffff00ff));
        
        m_entities = new Array<Entity>();
        
        m_lastFrame = Lib.getTimer();
        
        Lib.current.addChild(m_buffer);
        
        Lib.current.stage.addEventListener(Event.ENTER_FRAME, onEnter);
        Lib.current.stage.addEventListener(Event.RESIZE, resize);

        resize(null);
    }
    
    public function addEntity(p_entity:Entity):Void
    {
        m_entities.push(p_entity);
    }
    
    private function onEnter(p_event:Event -> Void):Void
    {
        update();
        render();
    }
    
    private function update():Void
    {
        var l_curTime:Int = Lib.getTimer();
        var l_dt:Float = ((l_curTime - m_lastFrame) / 1000);
        
        var l_entity:Entity;
        for (l_entity in m_entities)
        {
            l_entity.update(l_dt);
        }
        
        m_lastFrame = l_curTime;
    }
    
    private function render():Void
    {
        var l_bufferBitmapData:BitmapData = m_buffer.bitmapData;
        
        var l_entity:Entity;
        for (l_entity in m_entities)
        {
            l_entity.render(l_bufferBitmapData);
        }
    }
    
    private function resize(p_event:Event -> Void):Void
    {
        var l_xScale:Float = (Lib.current.stage.stageWidth / m_origWidth);
        var l_yScale:Float = (Lib.current.stage.stageHeight / m_origHeight);
        
        var l_matrix:Matrix = new Matrix();
        l_matrix.scale(l_xScale, l_yScale);
        
        m_buffer.transform.matrix = l_matrix;
    }
    
    private static function get_mainEngine():Engine
    {
        if (s_globalEngine == null)
        {
            s_globalEngine = new Engine();
        }
        
        return s_globalEngine;
    }
}
