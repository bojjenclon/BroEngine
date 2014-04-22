package com.brofist.games;

import flash.display.BitmapData;
import flash.geom.Point;
import flash.geom.Rectangle;
import openfl.Assets;

/**
 * ...
 * @author Cornell Daly
 */
class SpriteSheet extends Entity
{
    public var row(get, set):Int;
    public var column(get, set):Int;
    
    private var m_row:Int;
    private var m_column:Int;
    
    private var m_fullImage:BitmapData;
    
    private var m_frameWidth:Int;
    private var m_frameHeight:Int;
    private var m_frameRect:Rectangle;
    
    private var m_numRows:Int;
    private var m_numColumns:Int;
    
    public function new(p_file:String, p_frameWidth:Int, p_frameHeight:Int)
    {
        super();
        
        m_fullImage = Assets.getBitmapData(p_file);
        
        m_frameWidth = p_frameWidth;
        m_frameHeight = p_frameHeight;
        m_frameRect = new Rectangle(0, 0, m_frameWidth, m_frameHeight);
        
        m_numRows = Math.floor(m_fullImage.height / m_frameHeight);
        m_numColumns = Math.floor(m_fullImage.width / m_frameWidth);
        
        m_bitmapData = new BitmapData(m_frameWidth, m_frameHeight);
        m_bitmapData.copyPixels(m_fullImage, m_frameRect, new Point(0, 0));
        
        updateCollision();
    }
    
    private function get_row():Int
    {
        return m_row;
    }
    
    
    private function set_row(p_row:Int):Int
    {
        if (m_row != p_row)
        {
            m_row = p_row;
            
            m_frameRect.y = (m_row * m_frameHeight);
            
            m_bitmapData.fillRect(new Rectangle(0, 0, m_frameWidth, m_frameHeight), 0x00000000);
            m_bitmapData.copyPixels(m_fullImage, m_frameRect, new Point(0, 0));
        }
        
        return m_row;
    }
    
    private function get_column():Int
    {
        return m_column;
    }
    
    
    private function set_column(p_column:Int):Int
    {
        if (m_column != p_column)
        {
            m_column = p_column;
            
            m_frameRect.x = (m_column * m_frameWidth);
            
            m_bitmapData.fillRect(new Rectangle(0, 0, m_frameWidth, m_frameHeight), 0x00000000);
            m_bitmapData.copyPixels(m_fullImage, m_frameRect, new Point(0, 0));
        }
        
        return m_column;
    }
}