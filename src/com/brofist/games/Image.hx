package com.brofist.games;

import openfl.Assets;

/**
 * ...
 * @author Cornell Daly
 */
class Image extends Entity
{
    public function new(p_file:String) 
    {
        super();
        
        m_bitmapData = Assets.getBitmapData(p_file);
    }
}