package com.brofist.games;

import flash.display.BitmapData;
import flash.geom.Matrix;

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
    
    private function new() 
    {
        m_transform = new Matrix();
        
        m_x = m_y = 0;
        m_angle = 0;
    }
    
    public function update(p_dt:Float)
    {
        
    }
    
    public function render(p_target:BitmapData)
    {
        p_target.draw(m_bitmapData, m_transform);
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
        }
        
        return m_angle;
    }
}