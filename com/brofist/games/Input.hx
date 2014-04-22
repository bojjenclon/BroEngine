package com.brofist.games;

/**
 * ...
 * @author Cornell Daly
 */
class Input
{
    public static var mouse(get, null):MouseInput;
    
    private static var s_globalMouseInput:MouseInput;

    private function new() 
    {
        
    }
    
    public static function init():Void
    {
        s_globalMouseInput = new MouseInput();
    }
    
    private static function get_mouse():MouseInput
    {
        if (s_globalMouseInput == null)
        {
            s_globalMouseInput = new MouseInput();
        }
        
        return s_globalMouseInput;
    }
}