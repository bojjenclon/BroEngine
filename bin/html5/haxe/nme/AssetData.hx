package nme;


import openfl.Assets;


class AssetData {
	//
	public static var className:Map<String, Dynamic> = new Map<String, Dynamic>();
	public static var library:Map<String, LibraryType> = new Map<String, LibraryType>();
	public static var path:Map<String, String> = new Map<String, String>();
	public static var type:Map<String, AssetType> = new Map<String, AssetType>();
	//
	private static var initialized:Bool = false;
	
	public static function initialize ():Void {
		if (!initialized) {
			path.set("gfx/free_tileset_version_10.png", "gfx/free_tileset_version_10.png");
			type.set("gfx/free_tileset_version_10.png", "image".toUpperCase());
			
			
			initialized = true;
		}
	}
}


