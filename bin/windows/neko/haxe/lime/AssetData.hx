package lime;


import lime.utils.Assets;


class AssetData {

	private static var initialized:Bool = false;
	
	public static var library = new #if haxe3 Map <String, #else Hash <#end LibraryType> ();
	public static var path = new #if haxe3 Map <String, #else Hash <#end String> ();
	public static var type = new #if haxe3 Map <String, #else Hash <#end AssetType> ();	
	
	public static function initialize():Void {
		
		if (!initialized) {
			
			path.set ("gfx/free_tileset_version_10.png", "gfx/free_tileset_version_10.png");
			type.set ("gfx/free_tileset_version_10.png", Reflect.field (AssetType, "image".toUpperCase ()));
			path.set ("gfx/Radiant_Historia_Cover_Art.jpg", "gfx/Radiant_Historia_Cover_Art.jpg");
			type.set ("gfx/Radiant_Historia_Cover_Art.jpg", Reflect.field (AssetType, "image".toUpperCase ()));
			
			
			initialized = true;
			
		} //!initialized
		
	} //initialize
	
	
} //AssetData
