package com.brofist.games;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Sprite;
import flash.display.StageScaleMode;
import flash.events.Event;
import flash.geom.Matrix;
import flash.geom.Point;
import flash.Lib;
import hxcollision.OpenFLDrawer;

/**
 * ...
 * @author Cornell Daly
 */
class Engine
{
    public static var mainEngine(get, null):Engine;
    
    public var scale(get, null):Point;
    
    private static var s_globalEngine:Engine;
    
    private var m_origWidth:Int;
    private var m_origHeight:Int;
    
    private var m_scaleX:Float;
    private var m_scaleY:Float;
    
    private var m_buffer:Bitmap;
    private var m_entities:Array<Entity>;
    
    private var m_lastFrame:Float;
    
    private var m_shapeTarget:Sprite;
    private var m_shapeDrawer:OpenFLDrawer;

    public function new(p_width:Int = 800, p_height:Int = 600) 
    {
        if (s_globalEngine != null)
        {
            throw "The engine has already been created, get it with Engine.mainEngine";
        }
        
        // Init Inputs
        Input.init();
        
        // Init Variables
        m_origWidth = p_width;
        m_origHeight = p_height;
        
        m_scaleX = m_scaleY = 1;
        
        m_buffer = new Bitmap(new BitmapData(m_origWidth, m_origHeight, true, 0xffff00ff));
        
        m_entities = new Array<Entity>();
        
        m_lastFrame = Lib.getTimer();
        
        Lib.current.addChild(m_buffer);
        
        Lib.current.stage.addEventListener(Event.ENTER_FRAME, onEnter);
        // fix resize code
        /*Lib.current.stage.addEventListener(Event.RESIZE, resize);

        resize(null);*/
        Lib.current.stage.scaleMode = StageScaleMode.EXACT_FIT;
        
        s_globalEngine = this;
        
        m_shapeTarget = new Sprite();
        m_shapeDrawer = new OpenFLDrawer(m_shapeTarget.graphics);
        Lib.current.addChild(m_shapeTarget);
    }
    
    public function addEntity(p_entity:Entity):Void
    {
        m_entities.push(p_entity);
    }
    
    private function onEnter(p_event:Event):Void
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
        
        m_shapeTarget.graphics.clear();
        m_shapeTarget.graphics.lineStyle(2, 0xff0000ff);
        
        var l_entity:Entity;
        for (l_entity in m_entities)
        {
            l_entity.render(l_bufferBitmapData);
            #if COLLISION
            l_entity.drawCollision(m_shapeDrawer);
            #end
        }
    }
    
    private function resize(p_event:Event):Void
    {
        m_scaleX = (Lib.current.stage.stageWidth / m_origWidth);
        m_scaleY = (Lib.current.stage.stageHeight / m_origHeight);
        
        m_buffer.bitmapData = new BitmapData(Math.floor(m_origWidth * m_scaleX), Math.floor(m_origHeight * m_scaleY), true, 0xffff00ff);
        
        var l_entity:Entity;
        for (l_entity in m_entities)
        {
            l_entity.resize();
        }
    }
    
    private function get_scale():Point
    {
        var l_scalePoint:Point = new Point(m_scaleX, m_scaleY);
        
        return l_scalePoint;
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
