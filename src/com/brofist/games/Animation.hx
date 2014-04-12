package com.brofist.games;
import com.brofist.games.AnimationData.Frame;
import flash.display.BitmapData;

/**
 * ...
 * @author Cornell Daly
 */
class Animation extends SpriteSheet
{
    public var curAnimation(get, null):String;
    public var runAnimation:Bool;
    
    private var m_data:Map<String, AnimationData>;
    private var m_curData:AnimationData;
    private var m_animFrame:Int;
    private var m_animDone:Bool;
    
    private var m_timer:Float;
    
    public function new(p_file:String, p_frameWidth:Int, p_frameHeight:Int, ?p_frames:Array<AnimationData>) 
    {
        super(p_file, p_frameWidth, p_frameHeight);
        
        m_data = new Map<String, AnimationData>();
        m_curData = null;
        m_animFrame = 0;
        m_animDone = false;
        
        runAnimation = true;
        
        if (p_frames != null)
        {
            var l_frame:AnimationData;
            for (l_frame in p_frames)
            {
                m_data.set(l_frame.name, l_frame);
            }
        }
        
        m_timer = 0;
    }
    
    public function addAnimation(p_animation:AnimationData):Void
    {
        m_data.set(p_animation.name, p_animation);
    }
    
    public function removeAnimation(p_animation:AnimationData):Bool
    {
        return m_data.remove(p_animation.name);
    }
    
    public function play(p_name:String, p_force:Bool = false):Bool
    {
        if (m_data[p_name] == null)
        {
            return false;
        }
        else if (p_name == curAnimation && !p_force)
        {
            return true;
        }
        
        m_curData = m_data[p_name];
        m_animFrame = 0;
        m_animDone = false;
        
        m_timer = 0;
        
        var l_frame:Frame = m_curData.getFrame(m_animFrame);
                
        row = l_frame.row;
        column = l_frame.column;
        
        return true;
    }
    
    public function pause():Void
    {
        runAnimation = false;
    }
    
    public function resume():Void
    {
        runAnimation = true;
    }
    
    override public function update(p_dt:Float):Void
    {
        super.update(p_dt);
        
        animate(p_dt);
    }
    
    private function animate(p_dt:Float):Void
    {
        if (!runAnimation)
        {
            return;
        }
        
        if (m_curData != null && !m_animDone)
        {
           m_timer += p_dt;
            
            if (m_timer > m_curData.speed)
            {
                m_animFrame++;
                
                if (m_animFrame >= m_curData.totalFrames)
                {
                    if (m_curData.loop)
                    {
                        m_animFrame = 0;
                    }
                    else
                    {
                        m_animFrame--;
                        m_animDone = true;
                    }
                }
                
                var l_frame:Frame = m_curData.getFrame(m_animFrame);
                
                row = l_frame.row;
                column = l_frame.column;
                
                m_timer = 0;
            }
        }
    }
    
    private function get_curAnimation():String
    {
        return ((m_curData != null) ? m_curData.name : null);
    }
}