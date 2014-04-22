package com.brofist.games;

/**
 * ...
 * @author Cornell Daly
 */
class AnimationData
{
    public var name:String;
    public var speed:Float;
    public var loop:Bool;
    
    public var totalFrames(get, null):Int;
   
    private var m_frames:Array<Frame>;

    public function new(p_name:String, p_frames:Array<Frame>, ?p_speed:Float, ?p_loop:Bool)
    {
        name = p_name;
        speed = ((p_speed == null) ? 1.0 : p_speed);
        loop = ((p_loop == null) ? true : p_loop);
        
        m_frames = p_frames;
    }
    
    public function getFrame(p_index:Int):Frame
    {
        return m_frames[p_index];
    }
    
    private function get_totalFrames():Int
    {
        return m_frames.length;
    }
}

class Frame
{
    public var row:Int;
    public var column:Int;
    
    public function new(p_row:Int, p_column:Int)
    {
        row = p_row;
        column = p_column;
    }
}