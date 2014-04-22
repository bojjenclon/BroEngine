package com.brofist.games;

import flash.display.BitmapData;
import flash.events.EventDispatcher;
import flash.events.MouseEvent;
import flash.geom.Matrix;
import flash.geom.Point;
import flash.Lib;
import haxe.Constraints.Function;
import hxcollision.Collision;
import hxcollision.math.Vector2D;
import hxcollision.OpenFLDrawer;
import hxcollision.shapes.BaseShape;
import hxcollision.shapes.Polygon;

/**
 * ...
 * @author Cornell Daly
 */
class Entity
{
    public var x(get, set):Float;
    public var y(get, set):Float;
    public var angle(get, set):Float;
    
    private var m_bitmapData:BitmapData;
    private var m_transform:Matrix;
    
    private var m_x:Float;
    private var m_y:Float;
    private var m_angle:Float;
    
    private var m_collision:Polygon;
    
    private var m_onClick:Void -> Void;
    
    private function new() 
    {
        m_transform = new Matrix();
        
        m_x = m_y = 0;
        m_angle = 0;
        
        m_onClick = null;
    }
    
    public function setClickAction(p_action:Void -> Void):Void
    {
        if (m_onClick == null)
        {
            Lib.current.stage.addEventListener(MouseEvent.CLICK, clicked);
        }
        else if (p_action == null)
        {
            Lib.current.stage.removeEventListener(MouseEvent.CLICK, clicked);
        }
        
        m_onClick = p_action;
    }
    
    public function overlapsPoint(p_x:Float, p_y:Float):Bool
    {
        /*var l_left:Float = m_x;
        var l_right:Float = (m_x + m_bitmapData.width);
        var l_top:Float = m_y;
        var l_bottom:Float = (m_y + m_bitmapData.height);
        
        var l_scale:Point = Engine.mainEngine.scale;
        
        l_left *= l_scale.x;
        l_right *= l_scale.x;
        l_top *= l_scale.y;
        l_bottom *= l_scale.y;
        
        return (p_x >= l_left && p_x <= l_right && p_y >= l_top && p_y <= l_bottom);*/
        
        var l_point:Vector2D = new Vector2D(p_x, p_y);
        
        return Collision.pointInPoly(l_point, m_collision);
    }
    
    public function updateCollision():Void
    {
        var l_scale:Point = Engine.mainEngine.scale;
        
        /*var l_x:Float = (m_x * l_scale.x);
        var l_y:Float = (m_y * l_scale.y);
        var l_width:Float = (m_bitmapData.width * l_scale.x);
        var l_height :Float = (m_bitmapData.height * l_scale.y);
        
        l_x += (l_width / 2);
        l_y += (l_height / 2);
        
        m_collision = Polygon.rectangle(0, 0, l_width, l_height);
        m_collision.rotation = m_angle;
        m_collision.scaleX = l_scale.x;
        m_collision.scaleY = l_scale.y;
        m_collision.x = l_x;
        m_collision.y = l_y;*/
        
        var l_halfWidth:Float = (m_bitmapData.width / 2);
        var l_halfHeight:Float = (m_bitmapData.height / 2);
        
        m_collision = Polygon.rectangle(0, 0, m_bitmapData.width, m_bitmapData.height);
        m_collision.scaleX = l_scale.x; //(1 + ((l_scale.x % 1) / 2));
        m_collision.scaleY = l_scale.y;
        m_collision.rotation = m_angle;
        m_collision.x = (m_x + l_halfWidth);
        m_collision.y = (m_y + l_halfHeight);
    }
    
    public function update(p_dt:Float)
    {
    }
    
    public function render(p_target:BitmapData)
    {
        p_target.draw(m_bitmapData, m_transform);
    }
    
    public function drawCollision(p_target:OpenFLDrawer):Void
    {
        p_target.drawPolygon(m_collision);
    }
    
    public function resize():Void
    {
        var l_scale:Point = Engine.mainEngine.scale;
        
        var l_halfWidth:Float = (m_bitmapData.width / 2);
        var l_halfHeight:Float = (m_bitmapData.height / 2);
        
        m_transform = new Matrix();
        m_transform.translate(-l_halfWidth, -l_halfHeight);
        m_transform.scale(l_scale.x, l_scale.y);
        m_transform.rotate(m_angle * Math.PI / 180);
        m_transform.translate(x + l_halfWidth, y + l_halfHeight);
        
        updateCollision();
    }
    
    private function clicked(p_event:MouseEvent):Void
    {
        if (m_onClick != null && overlapsPoint(Input.mouse.x, Input.mouse.y))
        {
            m_onClick();
        }
    }
    
    private function get_x():Float
    {
        return m_x;
    }
    
    private function set_x(p_x:Float):Float
    {
        if (m_x != p_x)
        {
            m_x = p_x;
            
            m_transform.tx = m_x;
            
            updateCollision();
        }
        
        return m_x;
    }
    
    private function get_y():Float
    {
        return m_y;
    }
    
    private function set_y(p_y:Float):Float
    {
        if (m_y != p_y)
        {
            m_y = p_y;
            
            m_transform.ty = m_y;
            
            updateCollision();
        }
        
        return m_y;
    }
    
    private function get_angle():Float
    {
        return m_angle;
    }
    
    private function set_angle(p_angle:Float):Float
    {
        if (m_angle != p_angle)
        {
            m_angle = p_angle;
            
            if (m_bitmapData != null)
            {
                var l_halfWidth:Float = (m_bitmapData.width / 2);
                var l_halfHeight:Float = (m_bitmapData.height / 2);
                
                m_transform = new Matrix();
                m_transform.translate( -l_halfWidth, -l_halfHeight );
                m_transform.rotate( Math.PI / 180 * m_angle );
                m_transform.translate( x + l_halfWidth, y + l_halfHeight );
            }
            
            if (m_collision != null)
            {
                updateCollision();
            }
        }
        
        return m_angle;
    }
}