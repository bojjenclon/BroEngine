(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe.ds.StringMap();
	ApplicationMain.urlLoaders = new haxe.ds.StringMap();
	ApplicationMain.total = 0;
	flash.Lib.get_current().loaderInfo = flash.display.LoaderInfo.create(null);
	flash.Lib.get_stage().frameRate = 60;
	flash.Lib.get_current().addChild(ApplicationMain.preloader = new NMEPreloader());
	ApplicationMain.preloader.onInit();
	ApplicationMain.loadFile("gfx/free_tileset_version_10.png");
	var resourcePrefix = "NME_:bitmap_";
	var _g = 0;
	var _g1 = haxe.Resource.listNames();
	while(_g < _g1.length) {
		var resourceName = _g1[_g];
		++_g;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total != 0) {
		ApplicationMain.loaderStack = [];
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			ApplicationMain.loaderStack.push(p);
		}
		ApplicationMain.urlLoaderStack = [];
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var p1 = $it1.next();
			ApplicationMain.urlLoaderStack.push(p1);
		}
		var _g2 = 0;
		while(_g2 < 8) {
			var i = _g2++;
			ApplicationMain.nextLoader();
		}
	} else ApplicationMain.begin();
};
ApplicationMain.nextLoader = function() {
	if(ApplicationMain.loaderStack.length != 0) {
		var p = ApplicationMain.loaderStack.shift();
		var o = ApplicationMain.loaders.get(p);
		o.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
		o.load(new flash.net.URLRequest(p));
	} else if(ApplicationMain.urlLoaderStack.length != 0) {
		var p1 = ApplicationMain.urlLoaderStack.shift();
		var o1 = ApplicationMain.urlLoaders.get(p1);
		o1.addEventListener("complete",ApplicationMain.loader_onComplete);
		o1.load(new flash.net.URLRequest(p1));
	}
};
ApplicationMain.loadFile = function(p) {
	var value = new flash.display.Loader();
	ApplicationMain.loaders.set(p,value);
	ApplicationMain.total++;
};
ApplicationMain.loadBinary = function(p) {
	var o = new flash.net.URLLoader();
	o.set_dataFormat(flash.net.URLLoaderDataFormat.BINARY);
	ApplicationMain.urlLoaders.set(p,o);
	ApplicationMain.total++;
};
ApplicationMain.loadSound = function(p) {
	return;
	var i = p.lastIndexOf(".");
	var c = flash.media.Sound;
	var s;
	var o;
	var m = flash.Lib.mobile;
	var f = null;
	var q = "canplaythrough";
	if(i == -1) return;
	if(!c.canPlayType || !c.canPlayType(HxOverrides.substr(p,i + 1,null))) return;
	s = HxOverrides.substr(p,0,i) + ".mp3";
	if(c.library.exists(s)) return;
	ApplicationMain.total++;
	c.library.set(s,o = new Audio(p));
	f = function(_) {
		if(!m) o.removeEventListener(q,f);
		ApplicationMain.preloader.onUpdate(++ApplicationMain.completed,ApplicationMain.total);
		if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
	};
	if(m) f(null); else o.addEventListener(q,f);
};
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener("complete",ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
};
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType = Type.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
};
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin(); else ApplicationMain.nextLoader();
};
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener("complete",ApplicationMain.preloader_onComplete);
	flash.Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(com.brofist.games.Main,"main") == null) {
		var mainDisplayObj = Type.createInstance(DocumentClass,[]);
		if(js.Boot.__instanceof(mainDisplayObj,flash.display.DisplayObject)) flash.Lib.get_current().addChild(mainDisplayObj);
	} else Reflect.callMethod(com.brofist.games.Main,Reflect.field(com.brofist.games.Main,"main"),[]);
};
var com = {};
com.brofist = {};
com.brofist.games = {};
com.brofist.games.Main = function() {
};
$hxClasses["com.brofist.games.Main"] = com.brofist.games.Main;
com.brofist.games.Main.__name__ = ["com","brofist","games","Main"];
com.brofist.games.Main.main = function() {
	var l_engine = new com.brofist.games.Engine(800,600);
	var l_entity = new com.brofist.games.SpriteSheet("gfx/free_tileset_version_10.png",32,32);
	l_entity.set_x(32);
	l_entity.set_angle(45);
	l_entity.set_row(4);
	l_entity.set_column(2);
	l_engine.addEntity(l_entity);
};
com.brofist.games.Main.prototype = {
	__class__: com.brofist.games.Main
};
var DocumentClass = function() {
	com.brofist.games.Main.call(this);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = com.brofist.games.Main;
DocumentClass.prototype = $extend(com.brofist.games.Main.prototype,{
	__class__: DocumentClass
});
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var flash = {};
flash.events = {};
flash.events.IEventDispatcher = function() { };
$hxClasses["flash.events.IEventDispatcher"] = flash.events.IEventDispatcher;
flash.events.IEventDispatcher.__name__ = ["flash","events","IEventDispatcher"];
flash.events.IEventDispatcher.prototype = {
	__class__: flash.events.IEventDispatcher
};
flash.events.EventDispatcher = function() {
	this.eventList = new haxe.ds.StringMap();
};
$hxClasses["flash.events.EventDispatcher"] = flash.events.EventDispatcher;
flash.events.EventDispatcher.__name__ = ["flash","events","EventDispatcher"];
flash.events.EventDispatcher.__interfaces__ = [flash.events.IEventDispatcher];
flash.events.EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o;
		if(!this.eventList.exists(type)) {
			var value = o = [];
			this.eventList.set(type,value);
		} else o = this.eventList.get(type);
		o.push(listener);
	}
	,removeEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.eventList.exists(type)) {
			var r = this.eventList.get(type);
			var _g = 0;
			while(_g < r.length) {
				var o = r[_g];
				++_g;
				if(Reflect.compareMethods(o,listener)) {
					HxOverrides.remove(r,o);
					break;
				}
			}
			if(r.length == 0) this.eventList.remove(type);
		}
	}
	,hasEventListener: function(type) {
		return this.eventList.exists(type);
	}
	,dispatchEvent: function(event) {
		if(event.get_target() == null) event.set_target(this);
		var t = event.type;
		if(this.eventList.exists(t)) {
			var _g = 0;
			var _g1 = this.eventList.get(t);
			while(_g < _g1.length) {
				var o = _g1[_g];
				++_g;
				o(event);
			}
		}
		return true;
	}
	,__class__: flash.events.EventDispatcher
};
flash.events.EventWrapper = function() {
	flash.events.EventDispatcher.call(this);
	this.eventMap = new haxe.ds.ObjectMap();
};
$hxClasses["flash.events.EventWrapper"] = flash.events.EventWrapper;
flash.events.EventWrapper.__name__ = ["flash","events","EventWrapper"];
flash.events.EventWrapper.__super__ = flash.events.EventDispatcher;
flash.events.EventWrapper.prototype = $extend(flash.events.EventDispatcher.prototype,{
	addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var _g = this;
		flash.events.EventDispatcher.prototype.addEventListener.call(this,type,listener,useCapture,priority,weak);
		var f;
		var wrapper = function(e) {
			if(e.get_target() == _g.component) e.set_target(_g);
			e.set_currentTarget(_g);
			listener(e);
		};
		f = wrapper;
		if(!(this.eventMap.h.__keys__[listener.__id__] != null)) this.eventMap.set(listener,f);
		this.component.addEventListener(type,f,useCapture);
	}
	,removeEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		flash.events.EventDispatcher.prototype.removeEventListener.call(this,type,listener,useCapture,priority,weak);
		if(this.eventMap.h.__keys__[listener.__id__] != null) {
			this.component.removeEventListener(type,this.eventMap.h[listener.__id__],useCapture);
			this.eventMap.remove(listener);
		}
	}
	,__class__: flash.events.EventWrapper
});
flash.display = {};
flash.display.DisplayObject = function() {
	this.y = 0;
	this.x = 0;
	this.rotation = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.alpha = 1;
	this.visible = true;
	flash.events.EventWrapper.call(this);
	this.eventRemap = new haxe.ds.StringMap();
	if(this.component == null) this.component = flash.Lib.jsDiv();
	this.component.node = this;
	this.transform = new flash.geom.Transform(this);
};
$hxClasses["flash.display.DisplayObject"] = flash.display.DisplayObject;
flash.display.DisplayObject.__name__ = ["flash","display","DisplayObject"];
flash.display.DisplayObject.__super__ = flash.events.EventWrapper;
flash.display.DisplayObject.prototype = $extend(flash.events.EventWrapper.prototype,{
	broadcastEvent: function(e) {
		this.dispatchEvent(e);
	}
	,invalidate: function() {
	}
	,syncMtx: function() {
		var s = this.component.style;
		var v;
		var n;
		if(this._syncMtx_set != true) {
			this._syncMtx_set = true;
			v = "0% 0%";
			n = "syncMtx-origin";
			s.setProperty(n,v,null);
			s.setProperty("-o-" + n,v,null);
			s.setProperty("-ms-" + n,v,null);
			s.setProperty("-moz-" + n,v,null);
			s.setProperty("-webkit-" + n,v,null);
		}
		v = "";
		if(this.x != 0 || this.y != 0) v += "translate(" + this.x + "px, " + this.y + "px) ";
		if(this.scaleX != 1 || this.scaleY != 1) v += "scale(" + this.scaleX + ", " + this.scaleY + ") ";
		if(this.rotation != 0) v += "rotate(" + this.rotation + "deg) ";
		if(this.transform != null) {
			var m = this.transform.get_matrix();
			if(m != null && !m.isIdentity()) v += "matrix(" + m.a + ", " + m.b + ", " + m.c + ", " + m.d + ", " + m.tx + ", " + m.ty + ")" + " ";
		}
		n = "transform";
		s.setProperty(n,v,null);
		s.setProperty("-o-" + n,v,null);
		s.setProperty("-ms-" + n,v,null);
		s.setProperty("-moz-" + n,v,null);
		s.setProperty("-webkit-" + n,v,null);
	}
	,set_x: function(v) {
		if(this.x != v) {
			this.x = v;
			this.syncMtx();
		}
		return v;
	}
	,set_y: function(v) {
		if(this.y != v) {
			this.y = v;
			this.syncMtx();
		}
		return v;
	}
	,set_rotation: function(v) {
		if(this.rotation != v) {
			this.rotation = v;
			this.syncMtx();
		}
		return v;
	}
	,set_scaleX: function(v) {
		if(this.scaleX != v) {
			this.scaleX = v;
			this.syncMtx();
		}
		return v;
	}
	,set_scaleY: function(v) {
		if(this.scaleY != v) {
			this.scaleY = v;
			this.syncMtx();
		}
		return v;
	}
	,get_width: function() {
		return this.qWidth || 0;
	}
	,get_height: function() {
		return this.qHeight || 0;
	}
	,set_width: function(v) {
		return v;
	}
	,set_height: function(v) {
		return v;
	}
	,set_alpha: function(v) {
		if(v != this.alpha) this.component.style.opacity = (this.alpha = v).toFixed(4);
		return v;
	}
	,set_visible: function(v) {
		if(this.visible = v) this.component.style.display = null; else this.component.style.display = "none";
		return v;
	}
	,set_scrollRect: function(v) {
		var v1 = Std.string(this) + ".scrollRect = " + Std.string(v);
		null;
		return v;
	}
	,get_stage: function() {
		return this._stage;
	}
	,set_stage: function(v) {
		if(this._stage != v) {
			var z = this._stage != null != (v != null);
			this._stage = v;
			if(z) this.dispatchEvent(new flash.events.Event(v != null?"addedToStage":"removedFromStage"));
		}
		return v;
	}
	,getBounds: function(o) {
		var m = this.getGlobalMatrix();
		var r = new flash.geom.Rectangle(0,0,this.get_width(),this.get_height());
		if(o == null) o = this;
		if(o != this) {
			r.transform(m);
			if(o != null) {
				m = o.getGlobalMatrix();
				m.invert();
				r.transform(m);
			}
		}
		return r;
	}
	,getRect: function(o) {
		return this.getBounds(o);
	}
	,getGlobalMatrix: function(m) {
		if(m == null) m = new flash.geom.Matrix();
		var o = this;
		while(o != null) {
			if(o.x != 0 || o.y != 0) m.translate(o.x,o.y);
			if(o.scaleX != 1 || o.scaleY != 1) m.scale(o.scaleX,o.scaleY);
			if(o.rotation != 0) m.rotate(o.rotation);
			m.concat(o.transform.get_matrix());
			o = o.parent;
		}
		return m;
	}
	,globalToLocal: function(q,r) {
		if(r == null) r = new flash.geom.Point();
		var m = flash.display.DisplayObject.convMatrix;
		var u = q.x;
		var v = q.y;
		if(m == null) m = flash.display.DisplayObject.convMatrix = new flash.geom.Matrix();
		m.identity();
		m = this.getGlobalMatrix(m);
		m.invert();
		r.x = u * m.a + v * m.c + m.tx;
		r.y = u * m.b + v * m.d + m.ty;
		return r;
	}
	,localToGlobal: function(q,r) {
		if(r == null) r = new flash.geom.Point();
		var m = flash.display.DisplayObject.convMatrix;
		var u = q.x;
		var v = q.y;
		if(m == null) m = flash.display.DisplayObject.convMatrix = new flash.geom.Matrix();
		m.identity();
		m = this.getGlobalMatrix(m);
		r.x = u * m.a + v * m.c + m.tx;
		r.y = u * m.b + v * m.d + m.ty;
		return r;
	}
	,get_mouseX: function() {
		return (flash.display.DisplayObject.convPoint = this.globalToLocal(flash.Lib.get_current().get_stage().mousePos,flash.display.DisplayObject.convPoint)).x;
	}
	,get_mouseY: function() {
		return (flash.display.DisplayObject.convPoint = this.globalToLocal(flash.Lib.get_current().get_stage().mousePos,flash.display.DisplayObject.convPoint)).y;
	}
	,addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var _g = this;
		flash.events.EventWrapper.prototype.addEventListener.call(this,type,listener,useCapture,priority,weak);
		if(flash.display.DisplayObject.remapTouch.exists(type)) {
			var f = function(e) {
				var n = new flash.events.MouseEvent(type,e.bubbles,e.cancelable,0,0,_g,e.ctrlKey,e.altKey,e.shiftKey,false);
				var l = e.targetTouches;
				if(l.length > 0) {
					n.pageX = l[0].pageX;
					n.pageY = l[0].pageY;
				} else {
					n.pageX = _g.get_stage().mousePos.x;
					n.pageY = _g.get_stage().mousePos.y;
				}
				_g.dispatchEvent(n);
			};
			flash.events.EventWrapper.prototype.addEventListener.call(this,flash.display.DisplayObject.remapTouch.get(type),f,useCapture,priority,weak);
		}
	}
	,toString: function() {
		return Type.getClassName(Type.getClass(this));
	}
	,__class__: flash.display.DisplayObject
});
flash.display.InteractiveObject = function() {
	flash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.tabIndex = 0;
	this.mouseEnabled = this.doubleClickEnabled = true;
};
$hxClasses["flash.display.InteractiveObject"] = flash.display.InteractiveObject;
flash.display.InteractiveObject.__name__ = ["flash","display","InteractiveObject"];
flash.display.InteractiveObject.__super__ = flash.display.DisplayObject;
flash.display.InteractiveObject.prototype = $extend(flash.display.DisplayObject.prototype,{
	giveFocus: function() {
		this.component.focus();
	}
	,__class__: flash.display.InteractiveObject
});
flash.display.DisplayObjectContainer = function() {
	flash.display.InteractiveObject.call(this);
	this.children = [];
};
$hxClasses["flash.display.DisplayObjectContainer"] = flash.display.DisplayObjectContainer;
flash.display.DisplayObjectContainer.__name__ = ["flash","display","DisplayObjectContainer"];
flash.display.DisplayObjectContainer.__super__ = flash.display.InteractiveObject;
flash.display.DisplayObjectContainer.prototype = $extend(flash.display.InteractiveObject.prototype,{
	get_numChildren: function() {
		return this.children.length;
	}
	,addChild: function(o) {
		if(o.parent != null) o.parent.removeChild(o);
		o.parent = this;
		o.set_stage(this.get_stage());
		this.children.push(o);
		this.component.appendChild(o.component);
		var e = new flash.events.Event("added");
		o.dispatchEvent(e);
		this.dispatchEvent(e);
		return o;
	}
	,removeChild: function(o) {
		o.parent = null;
		o.set_stage(null);
		HxOverrides.remove(this.children,o);
		this.component.removeChild(o.component);
		var e = new flash.events.Event("removed");
		o.dispatchEvent(e);
		this.dispatchEvent(e);
		return o;
	}
	,addChildAt: function(o,v) {
		if(v < this.children.length) {
			if(o.parent != null) o.parent.removeChild(o);
			o.parent = this;
			o.set_stage(this.get_stage());
			this.component.insertBefore(o.component,this.children[v].component);
			this.children.splice(v,0,o);
			return o;
		} else return this.addChild(o);
	}
	,removeChildAt: function(v) {
		return this.removeChild(this.children[v]);
	}
	,getChildAt: function(v) {
		return this.children[v];
	}
	,getChildIndex: function(v) {
		var i = -1;
		var l = this.children.length;
		while(++i < l) if(this.children[i] == v) return i;
		return -1;
	}
	,contains: function(v) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(o == v) return true;
		}
		return false;
	}
	,broadcastEvent: function(e) {
		this.dispatchEvent(e);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.broadcastEvent(e);
		}
	}
	,set_stage: function(v) {
		flash.display.InteractiveObject.prototype.set_stage.call(this,v);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.set_stage(v);
		}
		return v;
	}
	,__class__: flash.display.DisplayObjectContainer
});
flash.display.IBitmapDrawable = function() { };
$hxClasses["flash.display.IBitmapDrawable"] = flash.display.IBitmapDrawable;
flash.display.IBitmapDrawable.__name__ = ["flash","display","IBitmapDrawable"];
flash.display.IBitmapDrawable.prototype = {
	__class__: flash.display.IBitmapDrawable
};
flash.display.Sprite = function() {
	flash.display.DisplayObjectContainer.call(this);
};
$hxClasses["flash.display.Sprite"] = flash.display.Sprite;
flash.display.Sprite.__name__ = ["flash","display","Sprite"];
flash.display.Sprite.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.Sprite.__super__ = flash.display.DisplayObjectContainer;
flash.display.Sprite.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	get_graphics: function() {
		if(this._graphics == null) {
			var o = new flash.display.Graphics();
			var q = o.component;
			o.set_displayObject(this);
			if(this.children.length == 0) this.component.appendChild(q); else this.component.insertBefore(q,this.children[0].component);
			this._graphics = o;
		}
		return this._graphics;
	}
	,set_stage: function(v) {
		var z = this.get_stage() == null && v != null;
		var r = flash.display.DisplayObjectContainer.prototype.set_stage.call(this,v);
		if(z && this._graphics != null) this._graphics.invalidate();
		return r;
	}
	,set_useHandCursor: function(o) {
		if(o) this.component.style.cursor = "pointer"; else this.component.style.cursor = null;
		return this.useHandCursor = o;
	}
	,drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		this.get_graphics().drawToSurface(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing);
	}
	,__class__: flash.display.Sprite
});
var NMEPreloader = function() {
	flash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new flash.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new flash.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = flash.display.Sprite;
NMEPreloader.prototype = $extend(flash.display.Sprite.prototype,{
	getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		var height = 600;
		if(height > 0) return height; else return flash.Lib.get_current().get_stage().get_stageHeight();
	}
	,getWidth: function() {
		var width = 800;
		if(width > 0) return width; else return flash.Lib.get_current().get_stage().get_stageWidth();
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new flash.events.Event("complete"));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
com.brofist.games.Engine = function(p_width,p_height) {
	if(p_height == null) p_height = 600;
	if(p_width == null) p_width = 800;
	if(com.brofist.games.Engine.s_globalEngine != null) throw "The engine has already been created, get it with Engine.mainEngine";
	this.m_origWidth = p_width;
	this.m_origHeight = p_height;
	this.m_buffer = new flash.display.Bitmap(new flash.display.BitmapData(800,600,true,-65281));
	this.m_entities = new Array();
	flash.Lib.get_current().addChild(this.m_buffer);
	flash.Lib.get_current().get_stage().addEventListener("enterFrame",$bind(this,this.render));
	flash.Lib.get_current().get_stage().addEventListener("resize",$bind(this,this.resize));
	this.resize(null);
};
$hxClasses["com.brofist.games.Engine"] = com.brofist.games.Engine;
com.brofist.games.Engine.__name__ = ["com","brofist","games","Engine"];
com.brofist.games.Engine.get_mainEngine = function() {
	if(com.brofist.games.Engine.s_globalEngine == null) com.brofist.games.Engine.s_globalEngine = new com.brofist.games.Engine();
	return com.brofist.games.Engine.s_globalEngine;
};
com.brofist.games.Engine.prototype = {
	addEntity: function(p_entity) {
		this.m_entities.push(p_entity);
	}
	,render: function(p_event) {
		var l_bufferBitmapData = this.m_buffer.bitmapData;
		var l_entity;
		var _g = 0;
		var _g1 = this.m_entities;
		while(_g < _g1.length) {
			var l_entity1 = _g1[_g];
			++_g;
			l_entity1.render(l_bufferBitmapData);
		}
	}
	,resize: function(p_event) {
		var l_xScale = flash.Lib.get_current().get_stage().get_stageWidth() / this.m_origWidth;
		var l_yScale = flash.Lib.get_current().get_stage().get_stageHeight() / this.m_origHeight;
		var l_matrix = new flash.geom.Matrix();
		l_matrix.scale(l_xScale,l_yScale);
		this.m_buffer.transform.set_matrix(l_matrix);
	}
	,__class__: com.brofist.games.Engine
};
com.brofist.games.Entity = function() {
	this.m_transform = new flash.geom.Matrix();
	this.m_x = this.m_y = 0;
	this.m_angle = 0;
};
$hxClasses["com.brofist.games.Entity"] = com.brofist.games.Entity;
com.brofist.games.Entity.__name__ = ["com","brofist","games","Entity"];
com.brofist.games.Entity.prototype = {
	render: function(p_target) {
		p_target.draw(this.m_bitmapData,this.m_transform);
	}
	,get_x: function() {
		return this.m_x;
	}
	,set_x: function(p_x) {
		if(this.m_x != p_x) {
			this.m_x = p_x;
			this.m_transform.tx = this.m_x;
		}
		return this.m_x;
	}
	,get_y: function() {
		return this.m_y;
	}
	,set_y: function(p_y) {
		if(this.m_y != p_y) {
			this.m_y = p_y;
			this.m_transform.ty = this.m_y;
		}
		return this.m_y;
	}
	,get_angle: function() {
		return this.m_angle;
	}
	,set_angle: function(p_angle) {
		if(this.m_angle != p_angle) {
			this.m_angle = p_angle;
			if(this.m_bitmapData != null) {
				var l_halfWidth = this.m_bitmapData.component.width / 2;
				var l_halfHeight = this.m_bitmapData.component.height / 2;
				this.m_transform = new flash.geom.Matrix();
				this.m_transform.translate(-l_halfWidth,-l_halfHeight);
				this.m_transform.rotate(Math.PI / 180 * this.m_angle);
				this.m_transform.translate(this.get_x() + l_halfWidth,this.get_y() + l_halfHeight);
			}
		}
		return this.m_angle;
	}
	,__class__: com.brofist.games.Entity
};
com.brofist.games.SpriteSheet = function(p_file,p_frameWidth,p_frameHeight) {
	com.brofist.games.Entity.call(this);
	this.m_fullImage = openfl.Assets.getBitmapData(p_file);
	this.m_frameWidth = p_frameWidth;
	this.m_frameHeight = p_frameHeight;
	this.m_frameRect = new flash.geom.Rectangle(0,0,this.m_frameWidth,this.m_frameHeight);
	this.m_numRows = Math.floor(this.m_fullImage.component.height / this.m_frameHeight);
	this.m_numColumns = Math.floor(this.m_fullImage.component.width / this.m_frameWidth);
	this.m_bitmapData = new flash.display.BitmapData(this.m_frameWidth,this.m_frameHeight);
	this.m_bitmapData.copyPixels(this.m_fullImage,this.m_frameRect,new flash.geom.Point(0,0));
};
$hxClasses["com.brofist.games.SpriteSheet"] = com.brofist.games.SpriteSheet;
com.brofist.games.SpriteSheet.__name__ = ["com","brofist","games","SpriteSheet"];
com.brofist.games.SpriteSheet.__super__ = com.brofist.games.Entity;
com.brofist.games.SpriteSheet.prototype = $extend(com.brofist.games.Entity.prototype,{
	get_row: function() {
		return this.m_row;
	}
	,set_row: function(p_row) {
		if(this.m_row != p_row) {
			this.m_row = p_row;
			this.m_frameRect.y = this.m_row * this.m_frameHeight;
			this.m_bitmapData.fillRect(new flash.geom.Rectangle(0,0,this.m_frameWidth,this.m_frameHeight),0);
			this.m_bitmapData.copyPixels(this.m_fullImage,this.m_frameRect,new flash.geom.Point(0,0));
		}
		return this.m_row;
	}
	,get_column: function() {
		return this.m_column;
	}
	,set_column: function(p_column) {
		if(this.m_column != p_column) {
			this.m_column = p_column;
			this.m_frameRect.x = this.m_column * this.m_frameWidth;
			this.m_bitmapData.fillRect(new flash.geom.Rectangle(0,0,this.m_frameWidth,this.m_frameHeight),0);
			this.m_bitmapData.copyPixels(this.m_fullImage,this.m_frameRect,new flash.geom.Point(0,0));
		}
		return this.m_column;
	}
	,__class__: com.brofist.games.SpriteSheet
});
flash.Lib = function() { };
$hxClasses["flash.Lib"] = flash.Lib;
flash.Lib.__name__ = ["flash","Lib"];
flash.Lib.__init = function() {
	var o;
	flash.Lib.schList = [];
	flash.Lib.schLength = 0;
	window.reqAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(o1) {
		window.setTimeout(o1,700 / flash.Lib.frameRate,null);
	};
	o = navigator.userAgent || navigator.vendor || window.opera;
	flash.Lib.mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(o) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4));
};
flash.Lib.getTimer = function() {
	return ~(~(Date.now() - flash.Lib.qTimeStamp));
};
flash.Lib.getURL = function(url,target) {
	window.open(url.url,target);
};
flash.Lib.jsNode = function(o) {
	var r = window.document.createElement(o);
	r.style.position = "absolute";
	return r;
};
flash.Lib.jsDiv = function() {
	return flash.Lib.jsNode("div");
};
flash.Lib.jsCanvas = function() {
	return flash.Lib.jsNode("canvas");
};
flash.Lib.jsHelper = function() {
	if(flash.Lib.qHelper == null) {
		var o = flash.Lib.jsDiv();
		flash.Lib.get_stage().component.appendChild(o);
		o.style.visibility = "hidden";
		o.appendChild(flash.Lib.qHelper = flash.Lib.jsDiv());
	}
	return flash.Lib.qHelper;
};
flash.Lib.get_current = function() {
	if(flash.Lib.qCurrent == null) flash.Lib.get_stage().addChild(flash.Lib.qCurrent = new flash.display.MovieClip());
	return flash.Lib.qCurrent;
};
flash.Lib.get_stage = function() {
	if(flash.Lib.qStage == null) window.document.body.appendChild((flash.Lib.qStage = new flash.display.Stage()).component);
	return flash.Lib.qStage;
};
flash.Lib.requestAnimationFrame = function(handler) {
	window.reqAnimFrame(handler);
};
flash.Lib.schedule = function(m) {
	flash.Lib.schList[flash.Lib.schLength++] = m;
};
flash.Lib.rgba = function(color) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + ((color >> 24 & 255) / 255).toFixed(4) + ")";
};
flash.Lib.rgbf = function(color,alpha) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + alpha.toFixed(4) + ")";
};
flash.display.Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) smoothing = false;
	this.smoothing = false;
	flash.display.DisplayObject.call(this);
	this.set_bitmapData(bitmapData);
};
$hxClasses["flash.display.Bitmap"] = flash.display.Bitmap;
flash.display.Bitmap.__name__ = ["flash","display","Bitmap"];
flash.display.Bitmap.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.Bitmap.__super__ = flash.display.DisplayObject;
flash.display.Bitmap.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_bitmapData: function(v) {
		if(this.bitmapData != null) this.component.removeChild(this.bitmapData.component);
		if(v != null) this.component.appendChild(v.handle());
		return this.bitmapData = v;
	}
	,set_smoothing: function(v) {
		var o = this.bitmapData.qContext;
		var v1;
		v1 = Std.string(this) + ".smoothing = " + (v == null?"null":"" + v);
		null;
		o.imageSmoothingEnabled = o.oImageSmoothingEnabled = o.msImageSmoothingEnabled = o.webkitImageSmoothingEnabled = o.mozImageSmoothingEnabled = v;
		return v;
	}
	,get_width: function() {
		if(this.qWidth != null) return this.qWidth; else if(this.bitmapData != null) return this.bitmapData.component.width; else return 0;
	}
	,get_height: function() {
		if(this.qHeight != null) return this.qHeight; else if(this.bitmapData != null) return this.bitmapData.component.height; else return 0;
	}
	,drawToSurface: function(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing) {
		this.bitmapData.drawToSurface(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing);
	}
	,__class__: flash.display.Bitmap
});
flash.display.ImageDataLease = function() {
};
$hxClasses["flash.display.ImageDataLease"] = flash.display.ImageDataLease;
flash.display.ImageDataLease.__name__ = ["flash","display","ImageDataLease"];
flash.display.ImageDataLease.prototype = {
	set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,clone: function() {
		var leaseClone = new flash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,__class__: flash.display.ImageDataLease
};
flash.display.BitmapData = function(inWidth,inHeight,inTransparent,inFillColor) {
	if(inTransparent == null) inTransparent = true;
	this.qSync = 1;
	this.qTransparent = inTransparent;
	this.qTick = 0;
	this.qTime = new Date().getTime();
	this.rect = new flash.geom.Rectangle(0,0,inWidth,inHeight);
	this.component = flash.Lib.jsCanvas();
	this.component.width = inWidth;
	this.component.height = inHeight;
	this.qContext = this.component.getContext("2d");
	flash.display.BitmapData.setSmoothing(this.qContext,true);
	this.qPixel = this.qContext.createImageData(1,1);
	if(inFillColor == null) inFillColor = -1;
	if(!inTransparent) inFillColor |= -16777216;
	if((inFillColor & -16777216) != 0) this.fillRect(this.rect,inFillColor);
};
$hxClasses["flash.display.BitmapData"] = flash.display.BitmapData;
flash.display.BitmapData.__name__ = ["flash","display","BitmapData"];
flash.display.BitmapData.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.BitmapData.setSmoothing = function(o,v) {
	o.imageSmoothingEnabled = o.oImageSmoothingEnabled = o.msImageSmoothingEnabled = o.webkitImageSmoothingEnabled = o.mozImageSmoothingEnabled = v;
};
flash.display.BitmapData.makeColor = function(color) {
	return "rgba(" + Std.string((function($this) {
		var $r;
		var $int = color >> 16 & 255;
		$r = $int < 0?4294967296.0 + $int:$int + 0.0;
		return $r;
	}(this))) + "," + Std.string((function($this) {
		var $r;
		var int1 = color >> 8 & 255;
		$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
		return $r;
	}(this))) + "," + Std.string((function($this) {
		var $r;
		var int2 = color & 255;
		$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
		return $r;
	}(this))) + "," + ((function($this) {
		var $r;
		var int3 = color >> 24 & 255;
		$r = int3 < 0?4294967296.0 + int3:int3 + 0.0;
		return $r;
	}(this)) / (function($this) {
		var $r;
		var int4 = 255;
		$r = int4 < 0?4294967296.0 + int4:int4 + 0.0;
		return $r;
	}(this))).toFixed(4) + ")";
};
flash.display.BitmapData.loadFromBytes = function(bytes,inRawAlpha,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	bitmapData.nmeLoadFromBytes(bytes,inRawAlpha,onload);
	return bitmapData;
};
flash.display.BitmapData.nmeIsPNG = function(bytes) {
	bytes.position = 0;
	return bytes.data.getUint8(bytes.position++) == 137 && bytes.data.getUint8(bytes.position++) == 80 && bytes.data.getUint8(bytes.position++) == 78 && bytes.data.getUint8(bytes.position++) == 71 && bytes.data.getUint8(bytes.position++) == 13 && bytes.data.getUint8(bytes.position++) == 10 && bytes.data.getUint8(bytes.position++) == 26 && bytes.data.getUint8(bytes.position++) == 10;
};
flash.display.BitmapData.nmeIsJPG = function(bytes) {
	bytes.position = 0;
	return bytes.data.getUint8(bytes.position++) == 255 && bytes.data.getUint8(bytes.position++) == 216;
};
flash.display.BitmapData.prototype = {
	fillRect: function(area,color) {
		if(area == null || area.width <= 0 || area.height <= 0) return;
		if(area.equals(this.rect) && this.qTransparent && (function($this) {
			var $r;
			var $int = color & -16777216;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) == 0) {
			this.component.width = this.component.width;
			return;
		}
		if(!this.qTransparent) color = color | -16777216; else if((function($this) {
			var $r;
			var int1 = color & -16777216;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this)) != -16777216) this.qContext.clearRect(area.x,area.y,area.width,area.height);
		if((function($this) {
			var $r;
			var int2 = color & -16777216;
			$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
			return $r;
		}(this)) != 0) {
			this.qContext.fillStyle = flash.display.BitmapData.makeColor(color);
			this.qContext.fillRect(area.x,area.y,area.width,area.height);
		}
		this.qSync |= 5;
	}
	,clone: function() {
		this.syncCanvas();
		var r = new flash.display.BitmapData(this.component.width,this.component.height,this.qTransparent,0);
		r.qContext.drawImage(this.component,0,0);
		r.qSync |= 5;
		return r;
	}
	,dispose: function() {
		this.component.width = this.component.height = 1;
		this.qImageData = null;
		this.qSync = 5;
	}
	,handle: function() {
		this.syncCanvas();
		if((this.qSync & 4) != 0) {
			this.qTick++;
			this.qTime = new Date().getTime();
			this.qSync &= -5;
		}
		return this.component;
	}
	,getTime: function() {
		return this.qTime;
	}
	,getTick: function() {
		return this.qTick;
	}
	,drawToSurface: function(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing) {
		ctx.save();
		if(smoothing != null && ctx.imageSmoothingEnabled != smoothing) flash.display.BitmapData.setSmoothing(ctx,smoothing);
		if(matrix != null) {
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
		}
		ctx.drawImage(this.handle(),0,0);
		ctx.restore();
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		this.syncCanvas();
		if(alphaBitmapData != null) throw "alphaBitmapData is not supported yet.";
		var bit = sourceBitmapData.handle();
		var bw;
		var bh;
		var tw = this.component.width;
		var th = this.component.height;
		if(bit == null || (bw = bit.width) <= 0 || (bh = bit.height) <= 0) return;
		var dx = ~(~destPoint.x);
		var dy = ~(~destPoint.y);
		var sx;
		var sy;
		var sw;
		var sh;
		if(sourceRect != null) {
			sx = sourceRect.x;
			sy = sourceRect.y;
			sw = sourceRect.width;
			sh = sourceRect.height;
			if(sx < 0) {
				sw += sx;
				sx = 0;
			}
			if(sy < 0) {
				sh += sy;
				sy = 0;
			}
			if(sx + sw > bw) sw = bw - sx;
			if(sy + sh > bh) sh = bh - sy;
		} else {
			sx = sy = 0;
			sw = bw;
			sh = bh;
		}
		if(dx < 0) {
			sw += dx;
			sx -= dx;
			dx = 0;
		}
		if(dy < 0) {
			sh += dy;
			sy -= dy;
			dy = 0;
		}
		if(dx + sw > tw) sw = tw - dx;
		if(dy + sh > th) sh = th - dy;
		if(sw <= 0 || sh <= 0) return;
		if(this.qTransparent && !mergeAlpha) this.qContext.clearRect(dx,dy,sw,sh);
		this.qContext.drawImage(bit,sx,sy,sw,sh,dx,dy,sw,sh);
		this.qSync |= 5;
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		this.syncCanvas();
		var a = 0;
		this.qContext.save();
		if(colorTransform != null) {
			a = colorTransform.alphaMultiplier;
			colorTransform.alphaMultiplier = 1;
			this.qContext.globalAlpha *= a;
		}
		if(clipRect != null) {
			this.qContext.beginPath();
			this.qContext.rect(clipRect.x,clipRect.y,clipRect.width,clipRect.height);
			this.qContext.clip();
			this.qContext.beginPath();
		}
		if(smoothing != null) flash.display.BitmapData.setSmoothing(this.qContext,smoothing);
		source.drawToSurface(this.handle(),this.qContext,matrix,colorTransform,blendMode,clipRect,null);
		this.qContext.restore();
		if(colorTransform != null) colorTransform.alphaMultiplier = a;
		this.qSync |= 5;
	}
	,lock: function() {
		this.syncData();
	}
	,unlock: function() {
		this.syncCanvas();
	}
	,getPixel: function(x,y) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return 0;
		if((this.qSync & 3) == 1) {
			var d = this.qContext.getImageData(x,y,1,1).data;
			return d[0] << 16 | d[1] << 8 | d[2];
		} else {
			var o = y * this.component.width + x << 2;
			return this.qImageData.data[o] << 16 | this.qImageData.data[o + 1] << 8 | this.qImageData.data[o + 2];
		}
	}
	,getPixel32: function(x,y) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return 0;
		if((this.qSync & 3) == 1) {
			var d = this.qContext.getImageData(x,y,1,1).data;
			return (this.qTransparent?d[3] << 24:-16777216) | d[0] << 16 | d[1] << 8 | d[2];
		} else {
			var o = y * this.component.width + x << 2;
			return (this.qTransparent?this.qImageData.data[o + 3] << 24:-16777216) | this.qImageData.data[o] << 16 | this.qImageData.data[o + 1] << 8 | this.qImageData.data[o + 2];
		}
	}
	,setPixel: function(x,y,color) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return;
		if((this.qSync & 3) != 2) {
			this.qPixel.data[0] = color >>> 16 & 255;
			this.qPixel.data[1] = color >>> 8 & 255;
			this.qPixel.data[2] = color & 255;
			this.qPixel.data[3] = 255;
			this.qContext.putImageData(this.qPixel,x,y);
			this.qSync |= 5;
		} else {
			var o = y * this.component.width + x << 2;
			this.qImageData.data[o] = color >>> 16 & 255;
			this.qImageData.data[o + 1] = color >>> 8 & 255;
			this.qImageData.data[o + 2] = color & 255;
			this.qImageData.data[o + 3] = 255;
			this.qSync |= 6;
		}
	}
	,setPixel32: function(x,y,color) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return;
		if((this.qSync & 3) != 2) {
			this.qPixel.data[0] = color >>> 16 & 255;
			this.qPixel.data[1] = color >>> 8 & 255;
			this.qPixel.data[2] = color & 255;
			this.qPixel.data[3] = color >>> 24 & 255;
			this.qContext.putImageData(this.qPixel,x,y);
			this.qSync |= 5;
		} else {
			var o = y * this.component.width + x << 2;
			this.qImageData.data[o] = color >>> 16 & 255;
			this.qImageData.data[o + 1] = color >>> 8 & 255;
			this.qImageData.data[o + 2] = color & 255;
			this.qImageData.data[o + 3] = color >>> 24 & 255;
			this.qSync |= 6;
		}
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		this.syncData();
		var data = this.qImageData.data;
		var minX = this.component.width;
		var minY = this.component.height;
		var maxX = 0;
		var maxY = 0;
		var len = data.length;
		var i;
		var px;
		var x;
		var y;
		i = 0;
		while(i < len) {
			px = (this.qTransparent?data[i + 3] << 24:-16777216) | (data[i] & 255) << 16 | (data[i + 1] & 255) << 8 | data[i + 2] & 255;
			if(px == color == findColor) {
				x = Math.floor((i >> 2) % this.component.width);
				y = Math.floor((i >> 2) / this.component.width);
				if(x < minX) minX = x;
				if(x > maxX) maxX = x;
				if(y < minY) minY = y;
				if(y > maxY) maxY = y;
			}
			i += 4;
		}
		if(minX <= maxX && minY <= maxY) return new flash.geom.Rectangle(minX,minY,maxX - minX + 1,maxY - minY + 1);
		if(!findColor) return new flash.geom.Rectangle(0,0,this.component.width,this.component.height);
		return new flash.geom.Rectangle(0,0,0,0);
	}
	,floodFill: function(fx,fy,fc) {
		var wasCanvas = (this.qSync & 3) == 1;
		this.lock();
		var q = [fx | fy << 16];
		var c = 1;
		var d = this.qImageData.data;
		var zr;
		var zg;
		var zb;
		var za;
		var fr;
		var fg;
		var fb;
		var fa;
		var x;
		var y;
		var p;
		var o = [];
		var r;
		var w = this.component.width;
		var h = this.component.height;
		p = fy * this.component.width + fx << 4;
		zr = d[p];
		zg = d[p + 1];
		zb = d[p + 2];
		za = d[p + 3];
		fa = fc >>> 24;
		fr = fc >> 16 & 255;
		fg = fc >> 8 & 255;
		fb = fc & 255;
		y = -1;
		while(++y < h) {
			o.push(r = []);
			x = 0;
			while(x < w) {
				r.push(0);
				x += 32;
			}
		}
		while(c > 0) {
			p = q[--c];
			x = p & 65535;
			y = p >>> 16;
			if(x < 0 || y < 0 || x >= w || y >= h) continue;
			if((o[y][x >> 5] >> (x & 31) & 1) != 0) continue;
			o[y][x >> 5] |= 1 << (x & 31);
			p = y * this.component.width + x << 2;
			if(d[p] == zr && d[p + 1] == zg && d[p + 2] == zb && d[p + 3] == za) {
				d[p] = fr;
				d[p + 1] = fg;
				d[p + 2] = fb;
				d[p + 3] = fa;
				if((p = x + 1) < w && (o[y][p >> 5] >> (p & 31) & 1) == 0) q[c++] = y << 16 | p;
				if(x > 0 && (o[y][(p = x - 1) >> 5] >> (p & 31) & 1) == 0) q[c++] = y << 16 | p;
				if((p = y + 1) < h && (o[p][x >> 5] >> (x & 31) & 1) == 0) q[c++] = p << 16 | x;
				if(y > 0 && (o[p = y - 1][x >> 5] >> (x & 31) & 1) == 0) q[c++] = p << 16 | x;
			}
		}
		this.qSync |= 6;
		if(wasCanvas) this.unlock();
	}
	,colorTransform: function(q,o) {
		var x = ~(~q.x);
		var y = ~(~q.y);
		var w = ~(~q.width);
		var h = ~(~q.height);
		var tw = this.component.width;
		var th = this.component.height;
		var f = this.qContext.globalCompositeOperation;
		var a = this.qContext.globalAlpha;
		if(x < 0) {
			w += x;
			x = 0;
		}
		if(y < 0) {
			h += y;
			y = 0;
		}
		if(x + w > tw) w = tw - x;
		if(y + h > th) h = th - y;
		if(w <= 0 || h <= 0) return;
		if(o.isAlphaMultiplier()) {
			this.syncCanvas();
			this.qContext.globalCompositeOperation = "copy";
			this.qContext.globalAlpha *= o.alphaMultiplier;
			this.qContext.drawImage(this.component,x,y,w,h,x,y,w,h);
			this.qSync |= 5;
		} else if(o.isColorSetter()) {
			var s = this.qContext.fillStyle;
			if(o.alphaMultiplier != 0) {
				this.qContext.globalCompositeOperation = "source-in";
				this.qContext.fillStyle = "rgb(" + ~(~o.redOffset) + "," + ~(~o.greenOffset) + "," + ~(~o.blueOffset) + ")";
				this.qContext.fillRect(x,y,w,h);
				this.qContext.globalCompositeOperation = "copy";
				this.qContext.globalAlpha = o.alphaMultiplier;
				this.qContext.drawImage(this.component,x,y,w,h,x,y,w,h);
			} else {
				this.qContext.globalCompositeOperation = "copy";
				this.qContext.fillStyle = "rgba(" + ~(~o.redOffset) + "," + ~(~o.greenOffset) + "," + ~(~o.blueOffset) + "," + ~(~o.alphaOffset) + ")";
				this.qContext.fillRect(x,y,w,h);
			}
			this.qContext.fillStyle = s;
		} else {
			var wasCanvas = (this.qSync & 3) != 2;
			this.lock();
			var d = this.qImageData.data;
			var c = tw * th * 4;
			var i = c;
			var v;
			var rm = o.redMultiplier;
			var gm = o.greenMultiplier;
			var bm = o.blueMultiplier;
			var am = o.alphaMultiplier;
			var ro = o.redOffset;
			var go = o.greenOffset;
			var bo = o.blueOffset;
			var ao = o.alphaOffset;
			if(x == 0 && y == 0 && w == tw && h == th) while((i -= 4) >= 0) {
				if((v = d[i + 3]) > 0) if((v = v * am + ao) < 0) d[i + 3] = 0; else if(v > 255) d[i + 3] = 255; else d[i + 3] = ~(~v);
				if((v = d[i + 2] * bm + bo) < 0) d[i + 2] = 0; else if(v > 255) d[i + 2] = 255; else d[i + 2] = ~(~v);
				if((v = d[i + 1] * gm + go) < 0) d[i + 1] = 0; else if(v > 255) d[i + 1] = 255; else d[i + 1] = ~(~v);
				if((v = d[i] * rm + ro) < 0) d[i] = 0; else if(v > 255) d[i] = 255; else d[i] = ~(~v);
			} else {
				var px;
				var py = y - 1;
				var pb = y + h;
				var pr;
				while(++py < pb) {
					i = tw * py + x - 1 << 2;
					pr = i + w * 4;
					while((i += 4) < pr) {
						if((v = d[i + 3]) > 0) if((v = v * am + ao) < 0) d[i + 3] = 0; else if(v > 255) d[i + 3] = 255; else d[i + 3] = ~(~v);
						if((v = d[i + 2] * bm + bo) < 0) d[i + 2] = 0; else if(v > 255) d[i + 2] = 255; else d[i + 2] = ~(~v);
						if((v = d[i + 1] * gm + go) < 0) d[i + 1] = 0; else if(v > 255) d[i + 1] = 255; else d[i + 1] = ~(~v);
						if((v = d[i] * rm + ro) < 0) d[i] = 0; else if(v > 255) d[i] = 255; else d[i] = ~(~v);
					}
				}
			}
			this.qSync |= 6;
			if(wasCanvas) this.unlock();
		}
		this.qContext.globalCompositeOperation = f;
		this.qContext.globalAlpha = a;
	}
	,copyChannel: function(o,q,p,sourceChannel,destChannel) {
		var x = ~(~o.x);
		var px = ~(~p.x);
		var y = ~(~o.y);
		var py = ~(~p.y);
		var w = ~(~q.width);
		var h = ~(~q.height);
		var sw = o.component.width;
		var sh = o.component.height;
		var tw = this.component.width;
		var th = this.component.height;
		var i;
		var j;
		var u;
		var v;
		var c;
		var sc = sourceChannel;
		var dc = destChannel;
		if(px < 0) {
			w += px;
			px = 0;
		}
		if(py < 0) {
			h += py;
			py = 0;
		}
		if(x < 0) {
			w += x;
			x = 0;
		}
		if(y < 0) {
			h += y;
			y = 0;
		}
		if(x + w > sw) w = sw - x;
		if(y + h > sh) h = sh - y;
		if(px + w > tw) w = tw - px;
		if(py + h > th) h = th - py;
		if(w <= 0 || h <= 0) return;
		if(sc == 8 && dc == 8) {
			var f = this.qContext.globalCompositeOperation;
			var s = this.qContext.fillStyle;
			this.qContext.globalCompositeOperation = "darker";
			i = 0;
			while(i++ < 8) this.qContext.drawImage(this.component,px,py,w,h,px,py,w,h);
			this.qContext.globalCompositeOperation = "destination-over";
			this.qContext.fillStyle = "black";
			this.qContext.fillRect(x,y,w,h);
			this.qContext.globalCompositeOperation = "destination-atop";
			this.qContext.drawImage(o.handle(),x,y,w,h,px,py,w,h);
			this.qContext.globalCompositeOperation = f;
			this.qContext.fillStyle = s;
		} else {
			var wasCanvas = (this.qSync & 3) != 2;
			var ds;
			var dd;
			this.lock();
			dd = this.qImageData.data;
			o.lock();
			ds = o.qImageData.data;
			if(sc == 8) sc = 3; else if(sc == 4) sc = 2; else if(sc == 2) sc = 1; else if(sc == 1) sc = 0; else sc = -1;
			if(dc == 8) dc = 3; else if(dc == 4) dc = 2; else if(dc == 2) dc = 1; else if(dc == 1) dc = 0; else dc = -1;
			if(sc < 0 || dc < 0) return;
			j = py + h;
			v = y + h;
			while(--v >= y) {
				--j;
				c = w;
				i = (px + tw * j) * 4 + dc;
				u = (x + sw * v) * 4 + sc;
				while(c-- > 0) {
					dd[u] = ds[i];
					i += 4;
					u += 4;
				}
			}
			this.qSync |= 6;
			if(wasCanvas) this.unlock();
		}
	}
	,noise: function(q,l,h,c,m) {
		if(m == null) m = false;
		if(c == null) c = 7;
		if(h == null) h = 255;
		if(l == null) l = 0;
		var wasCanvas = (this.qSync & 3) != 2;
		var i = 0;
		var n;
		var p;
		var d = h - l + 1;
		var z = q;
		var r = (c & 1) > 0;
		var g = (c & 2) > 0;
		var b = (c & 4) > 0;
		var a = (c & 8) > 0;
		this.lock();
		p = this.qImageData.data;
		n = p.length;
		while(i < n) {
			if(m) {
				p[i] = p[i + 1] = p[i + 2] = l + (z = z * 16807 % 2147483647) % d;
				i += 3;
			} else {
				if(r) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 0;
				if(g) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 0;
				if(b) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 0;
			}
			if(a) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 255;
		}
		this.qSync |= 6;
		if(wasCanvas) this.unlock();
	}
	,applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
	}
	,jeashOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new flash.geom.Rectangle(0,0,width,height);
		if(data.inLoader != null) {
			var e1 = new flash.events.Event("complete");
			e1.set_target(data.inLoader);
			data.inLoader.dispatchEvent(e1);
		}
	}
	,nmeLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = window.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this.component, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					return f(a1,e);
				};
			})($bind(this,this.jeashOnLoad),data),false);
			image.addEventListener("error",function(e1) {
				if(!image.complete) _g.jeashOnLoad(data,e1);
			},false);
		}
		image.src = inFilename;
	}
	,syncCanvas: function() {
		if(!((this.qSync & 3) != 2)) {
			this.qContext.putImageData(this.qImageData,0,0);
			this.qSync = this.qSync & -4;
		}
	}
	,syncData: function() {
		if(!((this.qSync & 3) != 1)) {
			this.qImageData = this.qContext.getImageData(0,0,this.component.width,this.component.height);
			this.qSync = this.qSync & -4;
		}
	}
	,nmeLoadFromBytes: function(c,a,h) {
		var _g = this;
		var t;
		var o = document.createElement("img");
		var n = this.component;
		var q;
		var f = null;
		var i;
		var l;
		var p;
		if(!(function($this) {
			var $r;
			var v;
			v = flash.display.BitmapData.nmeIsPNG(c)?t = "png":flash.display.BitmapData.nmeIsJPG(c)?t = "jpeg":t = "";
			$r = v;
			return $r;
		}(this))) throw new flash.errors.IOError("BitmapData can only load from ByteArrays with PNG/JPEG data.");
		f = function(_) {
			o.removeEventListener("load",f);
			_g.rect.width = n.width = o.width;
			_g.rect.height = n.height = o.height;
			q = _g.qContext = n.getContext("2d");
			q.drawImage(o,0,0);
			if(a != null) {
				i = -1;
				l = a.length;
				p = q.getImageData(0,0,o.width,o.height);
				while(++i < l) p.data[(i << 2) + 3] = a.data.getUint8(a.position++);
				q.putImageData(p,0,0);
			}
			if(h != null) h(_g);
		};
		o.addEventListener("load",f);
		o.src = "data:image/" + t + ";base64," + c.toBase64();
	}
	,__class__: flash.display.BitmapData
};
flash.display.BitmapDataChannel = function() { };
$hxClasses["flash.display.BitmapDataChannel"] = flash.display.BitmapDataChannel;
flash.display.BitmapDataChannel.__name__ = ["flash","display","BitmapDataChannel"];
flash.display.BlendMode = $hxClasses["flash.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] };
flash.display.BlendMode.ADD = ["ADD",0];
flash.display.BlendMode.ADD.toString = $estr;
flash.display.BlendMode.ADD.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ALPHA = ["ALPHA",1];
flash.display.BlendMode.ALPHA.toString = $estr;
flash.display.BlendMode.ALPHA.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DARKEN = ["DARKEN",2];
flash.display.BlendMode.DARKEN.toString = $estr;
flash.display.BlendMode.DARKEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
flash.display.BlendMode.DIFFERENCE.toString = $estr;
flash.display.BlendMode.DIFFERENCE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ERASE = ["ERASE",4];
flash.display.BlendMode.ERASE.toString = $estr;
flash.display.BlendMode.ERASE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
flash.display.BlendMode.HARDLIGHT.toString = $estr;
flash.display.BlendMode.HARDLIGHT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.INVERT = ["INVERT",6];
flash.display.BlendMode.INVERT.toString = $estr;
flash.display.BlendMode.INVERT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LAYER = ["LAYER",7];
flash.display.BlendMode.LAYER.toString = $estr;
flash.display.BlendMode.LAYER.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
flash.display.BlendMode.LIGHTEN.toString = $estr;
flash.display.BlendMode.LIGHTEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
flash.display.BlendMode.MULTIPLY.toString = $estr;
flash.display.BlendMode.MULTIPLY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.NORMAL = ["NORMAL",10];
flash.display.BlendMode.NORMAL.toString = $estr;
flash.display.BlendMode.NORMAL.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.OVERLAY = ["OVERLAY",11];
flash.display.BlendMode.OVERLAY.toString = $estr;
flash.display.BlendMode.OVERLAY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SCREEN = ["SCREEN",12];
flash.display.BlendMode.SCREEN.toString = $estr;
flash.display.BlendMode.SCREEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
flash.display.BlendMode.SUBTRACT.toString = $estr;
flash.display.BlendMode.SUBTRACT.__enum__ = flash.display.BlendMode;
flash.display._CapsStyle = {};
flash.display._CapsStyle.CapsStyle_Impl_ = function() { };
$hxClasses["flash.display._CapsStyle.CapsStyle_Impl_"] = flash.display._CapsStyle.CapsStyle_Impl_;
flash.display._CapsStyle.CapsStyle_Impl_.__name__ = ["flash","display","_CapsStyle","CapsStyle_Impl_"];
flash.display._CapsStyle.CapsStyle_Impl_._new = function(s) {
	return s;
};
flash.display._CapsStyle.CapsStyle_Impl_.toString = function(this1) {
	return this1;
};
flash.display._CapsStyle.CapsStyle_Impl_.fromString = function(s) {
	return s;
};
flash.display.Graphics = function() {
	this.rgPending = false;
	this.synced = true;
	this.component = flash.Lib.jsCanvas();
	this.context = this.component.getContext("2d");
	this.context.save();
	this.bounds = new flash.geom.Rectangle();
	this.resetBounds();
	this.rec = [];
	this.lineWidth = this.len = 0;
};
$hxClasses["flash.display.Graphics"] = flash.display.Graphics;
flash.display.Graphics.__name__ = ["flash","display","Graphics"];
flash.display.Graphics.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.Graphics.prototype = {
	regenerate: function() {
		var o = this.component;
		var s = this.component.style;
		var q = this.context;
		var b = this.bounds;
		var bx = ~(~(b.x - 2));
		var by = ~(~(b.y - 2));
		var bw = Math.ceil(b.width + 4);
		var bh = Math.ceil(b.height + 4);
		this.synced = true;
		this.rgPending = false;
		if(b.width <= 0 || b.height <= 0) {
			o.width = o.height = 1;
			s.top = s.left = "0";
			return;
		}
		if(this.compX != bx || this.compY != by) {
			s.left = bx + "px";
			s.top = by + "px";
		}
		if(bw != o.width || bh != o.height) {
			o.width = bw;
			o.height = bh;
		} else q.clearRect(0,0,o.width,o.height);
		q.save();
		q.translate(-bx,-by);
		this.render(o,q);
		q.restore();
	}
	,set_displayObject: function(v) {
		if(this.displayObject != v) {
			this.displayObject = v;
			if(!this.synced) flash.Lib.schedule($bind(this,this.regenerate));
		}
		return v;
	}
	,resetBounds: function() {
		this.bounds.setVoid();
		this.invalidate();
	}
	,grab: function(x,y,r,b) {
		var i;
		if(x < (i = this.bounds.x)) {
			i = i - x;
			this.bounds.x -= i;
			this.bounds.width += i;
		}
		if(y < (i = this.bounds.y)) {
			i = i - y;
			this.bounds.y -= i;
			this.bounds.height += i;
		}
		if(r > (i = this.bounds.get_right())) this.bounds.width += r - i;
		if(b > (i = this.bounds.get_bottom())) this.bounds.height += b - i;
		this.invalidate();
	}
	,invalidate: function() {
		if(this.synced) {
			this.synced = false;
			if(!this.rgPending && this.displayObject != null && this.displayObject.get_stage() != null) {
				flash.Lib.schedule($bind(this,this.regenerate));
				this.rgPending = true;
			}
		}
	}
	,clear: function() {
		var i = 0;
		while(i < this.len) this.rec[i++] = 0;
		this.lineWidth = this.len = 0;
		this.resetBounds();
		this.invalidate();
	}
	,lineStyle: function(w,c,a,ph,sm,cs,js,ml) {
		this.rec[this.len++] = 1;
		this.rec[this.len++] = w > 0?this.lineWidth = w:this.lineWidth = 0;
		if(w > 0) {
			this.rec[this.len++] = flash.Lib.rgbf(c != null?c:0,a != null?a:1);
			if(cs == "none") this.rec[this.len++] = 2; else if(cs == "square") this.rec[this.len++] = 1; else this.rec[this.len++] = 0;
			if(js == "bevel") this.rec[this.len++] = 2; else if(js == "miter") this.rec[this.len++] = 1; else this.rec[this.len++] = 0;
		}
	}
	,beginFill: function(c,a) {
		if(a == null) a = 1;
		if(c == null) c = 0;
		this.rec[this.len++] = 2;
		this.rec[this.len++] = flash.Lib.rgbf(c,a);
	}
	,beginBitmapFill: function(bitmap,m,repeat,smooth) {
		this.rec[this.len++] = 3;
		this.rec[this.len++] = bitmap;
		if(repeat != null) this.rec[this.len++] = repeat; else this.rec[this.len++] = true;
		if((function($this) {
			var $r;
			var v = $this.rec[$this.len++] = m != null;
			$r = v;
			return $r;
		}(this))) {
			this.rec[this.len++] = m.a;
			this.rec[this.len++] = m.b;
			this.rec[this.len++] = m.c;
			this.rec[this.len++] = m.d;
			this.rec[this.len++] = m.tx;
			this.rec[this.len++] = m.ty;
		}
	}
	,endFill: function() {
		this.rec[this.len++] = 9;
		this.invalidate();
	}
	,moveTo: function(x,y) {
		this.rec[this.len++] = 10;
		this.rec[this.len++] = x;
		this.rec[this.len++] = y;
		var r = this.lineWidth / 2;
		this.grab(x - r,y - r,x + r,y + r);
	}
	,lineTo: function(x,y) {
		this.rec[this.len++] = 11;
		this.rec[this.len++] = x;
		this.rec[this.len++] = y;
		var r = this.lineWidth / 2;
		this.grab(x - r,y - r,x + r,y + r);
	}
	,curveTo: function(u,v,x,y) {
		this.rec[this.len++] = 12;
		this.rec[this.len++] = u;
		this.rec[this.len++] = v;
		this.rec[this.len++] = x;
		this.rec[this.len++] = y;
		var r = this.lineWidth / 2;
		this.grab(x - r,y - r,x + r,y + r);
	}
	,drawRect: function(x,y,w,h) {
		this.rec[this.len++] = 13;
		this.rec[this.len++] = x;
		this.rec[this.len++] = y;
		this.rec[this.len++] = w;
		this.rec[this.len++] = h;
		var r = this.lineWidth / 2;
		this.grab(x - r,y - r,x + w + r,y + h + r);
	}
	,drawRoundRect: function(x,y,w,h,r,q) {
		this.rec[this.len++] = 15;
		this.rec[this.len++] = x;
		this.rec[this.len++] = y;
		this.rec[this.len++] = w;
		this.rec[this.len++] = h;
		this.rec[this.len++] = r;
		this.rec[this.len++] = q;
		var r1 = this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + w + r1,y + h + r1);
	}
	,drawCircle: function(x,y,r) {
		this.rec[this.len++] = 14;
		this.rec[this.len++] = x;
		this.rec[this.len++] = y;
		this.rec[this.len++] = r;
		var r1 = r;
		r1 += this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + r1,y + r1);
	}
	,drawEllipse: function(x,y,w,h) {
		this.rec[this.len++] = 17;
		this.rec[this.len++] = x;
		this.rec[this.len++] = y;
		this.rec[this.len++] = w;
		this.rec[this.len++] = h;
		this.grab(x,y,x + w,y + h);
	}
	,rgba: function(c,a) {
		return "rgba(" + (c >> 16 & 255) + ", " + (c >> 8 & 255) + ", " + (c & 255) + ", " + a.toFixed(4) + ")";
	}
	,drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		ctx.save();
		if(mtx != null) ctx.transform(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty);
		this.render(cnv,ctx);
		ctx.restore();
	}
	,_closePath: function(cnv,ctx,f,m,texture) {
		if(f & 1) {
			ctx.closePath();
			if(f & 4) {
				ctx.save();
				ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
				ctx.fillStyle = ctx.createPattern(texture,f & 8?"repeat":"no-repeat");
				ctx.fill();
				ctx.restore();
			} else ctx.fill();
		}
		if(f & 2) ctx.stroke();
		ctx.beginPath();
		return f;
	}
	,render: function(cnv,ctx) {
		var f = 0;
		var p = -1;
		var v;
		var m = this._drawMatrix;
		var n = 0;
		var tex = null;
		if(m == null) this._drawMatrix = m = new flash.geom.Matrix();
		try {
			while(++p < this.len) {
				var _g = v = this.rec[p];
				switch(_g) {
				case 0:
					throw "__break__";
					break;
				case 1:
					if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
					ctx.lineWidth = v = this.rec[++p];
					if(v > 0) {
						f |= 2;
						ctx.strokeStyle = this.rec[++p];
						if((v = this.rec[++p]) == 2) ctx.lineCap = "butt"; else if(v == 1) ctx.lineCap = "square"; else ctx.lineCap = "round";
						if((v = this.rec[++p]) == 2) ctx.lineJoin = "bevel"; else if(v == 1) ctx.lineJoin = "miter"; else ctx.lineJoin = "round";
					} else {
						f &= -3;
						ctx.strokeStyle = null;
					}
					break;
				case 2:case 3:
					if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
					f |= 1;
					if(v == 3) {
						tex = this.rec[++p].handle();
						var r = this.rec[++p];
						if(this.rec[++p]) {
							if(r) f |= 8; else f &= -9;
							m.a = this.rec[++p];
							m.b = this.rec[++p];
							m.c = this.rec[++p];
							m.d = this.rec[++p];
							m.tx = this.rec[++p];
							m.ty = this.rec[++p];
							f |= 4;
						} else {
							ctx.fillStyle = ctx.createPattern(tex,r?"repeat":"no-repeat");
							f &= -5;
						}
					} else {
						ctx.fillStyle = this.rec[++p];
						f &= -5;
					}
					n = 0;
					break;
				case 9:
					if(n > 0) {
						f = this._closePath(cnv,ctx,f,m,tex);
						n = 0;
					}
					break;
				case 10:
					ctx.moveTo(this.rec[++p],this.rec[++p]);
					n++;
					break;
				case 11:
					ctx.lineTo(this.rec[++p],this.rec[++p]);
					n++;
					break;
				case 12:
					ctx.quadraticCurveTo(this.rec[++p],this.rec[++p],this.rec[++p],this.rec[++p]);
					n++;
					break;
				case 13:
					var x = this.rec[++p];
					var y = this.rec[++p];
					var w = this.rec[++p];
					var h = this.rec[++p];
					ctx.rect(x,y,w,h);
					n++;
					break;
				case 14:
					var x1 = this.rec[++p];
					var y1 = this.rec[++p];
					var r1 = this.rec[++p];
					if(r1 < 0) r1 = -r1;
					if(r1 != 0) ctx.arc(x1,y1,r1,0,Math.PI * 2,true);
					n++;
					break;
				case 17:
					var x2 = this.rec[++p];
					var y2 = this.rec[++p];
					var w1 = this.rec[++p];
					var h1 = this.rec[++p];
					var x11 = x2 + w1 / 2;
					var y11 = y2 + h1 / 2;
					var x21 = x2 + w1;
					var y21 = y2 + h1;
					var m1 = 0.275892;
					var xm = w1 * m1;
					var ym = h1 * m1;
					ctx.moveTo(x11,y2);
					ctx.bezierCurveTo(x11 + xm,y2,x21,y11 - ym,x21,y11);
					ctx.bezierCurveTo(x21,y11 + ym,x11 + xm,y21,x11,y21);
					ctx.bezierCurveTo(x11 - xm,y21,x2,y11 + ym,x2,y11);
					ctx.bezierCurveTo(x2,y11 - ym,x11 - xm,y2,x11,y2);
					n++;
					break;
				case 15:
					var x3 = this.rec[++p];
					var y3 = this.rec[++p];
					var w2 = this.rec[++p];
					var h2 = this.rec[++p];
					var u = this.rec[++p];
					var q = this.rec[++p];
					if(q == null || $bind(ctx,ctx.quadraticCurveTo) == null) {
						ctx.moveTo(x3 + u,y3 + h2);
						ctx.arcTo(x3 + w2 - u,y3 + h2 - u,x3 + w2,y3 + h2 - u,u);
						ctx.arcTo(x3 + w2,y3 + u,x3 + w2 - u,y3,u);
						ctx.arcTo(x3 + u,y3,x3,y3 + u,u);
						ctx.arcTo(x3 + u,y3 + h2 - u,x3 + u,y3 + h2,u);
					} else {
						ctx.moveTo(x3 + u,y3 + h2);
						ctx.lineTo(x3 + w2 - u,y3 + h2);
						ctx.quadraticCurveTo(x3 + w2,y3 + h2,x3 + w2,y3 + h2 - q);
						ctx.lineTo(x3 + w2,y3 + q);
						ctx.quadraticCurveTo(x3 + w2,y3,x3 + w2 - u,y3);
						ctx.lineTo(x3 + u,y3);
						ctx.quadraticCurveTo(x3,y3,x3,y3 + q);
						ctx.lineTo(x3,y3 + h2 - q);
						ctx.quadraticCurveTo(x3,y3 + h2,x3 + u,y3 + h2);
					}
					n++;
					break;
				case 16:
					var tex1 = this.rec[++p];
					var d = tex1.handle();
					var fx = this.rec[++p];
					var fs = (fx & 1) != 0;
					var fr = (fx & 2) != 0;
					var fc = (fx & 4) != 0;
					var fa = (fx & 8) != 0;
					var fm = (fx & 16) != 0;
					var c = this.rec[++p] - 1;
					var tx;
					var ty;
					var ox;
					var oy;
					var rx;
					var ry;
					var rw;
					var rh;
					ctx.save();
					if((fx & 65536) != 0) ctx.globalCompositeOperation = "lighter"; else ctx.globalCompositeOperation = "source-over";
					while(p < c) {
						tx = this.rec[++p];
						ty = this.rec[++p];
						ox = this.rec[++p];
						oy = this.rec[++p];
						rx = this.rec[++p];
						ry = this.rec[++p];
						rw = this.rec[++p];
						rh = this.rec[++p];
						ctx.save();
						if(fm) ctx.transform(this.rec[++p],this.rec[++p],this.rec[++p],this.rec[++p],tx,ty); else {
							ctx.translate(tx,ty);
							if(fs) ctx.scale(v = this.rec[++p],v);
							if(fr) ctx.rotate(this.rec[++p]);
						}
						if(fc) p += 3;
						if(fa) ctx.globalAlpha = this.rec[++p];
						ctx.drawImage(d,rx,ry,rw,rh,-ox,-oy,rw,rh);
						ctx.restore();
					}
					ctx.restore();
					break;
				default:
					var v1 = "Unknown operation: " + Std.string(v);
					null;
					throw "__break__";
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
	}
	,__class__: flash.display.Graphics
};
flash.display._JointStyle = {};
flash.display._JointStyle.JointStyle_Impl_ = function() { };
$hxClasses["flash.display._JointStyle.JointStyle_Impl_"] = flash.display._JointStyle.JointStyle_Impl_;
flash.display._JointStyle.JointStyle_Impl_.__name__ = ["flash","display","_JointStyle","JointStyle_Impl_"];
flash.display._JointStyle.JointStyle_Impl_._new = function(s) {
	return s;
};
flash.display._JointStyle.JointStyle_Impl_.toString = function(this1) {
	return this1;
};
flash.display._JointStyle.JointStyle_Impl_.fromString = function(s) {
	return s;
};
flash.display.Loader = function() {
	flash.display.Sprite.call(this);
	this.contentLoaderInfo = flash.display.LoaderInfo.create(this);
};
$hxClasses["flash.display.Loader"] = flash.display.Loader;
flash.display.Loader.__name__ = ["flash","display","Loader"];
flash.display.Loader.__super__ = flash.display.Sprite;
flash.display.Loader.prototype = $extend(flash.display.Sprite.prototype,{
	load: function(request,context) {
		var extension = "";
		var i;
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		switch(extension) {
		case "swf":
			this.contentLoaderInfo.contentType = "application/x-shockwave-flash";
			break;
		case "jpg":case "jpeg":
			transparent = false;
			this.contentLoaderInfo.contentType = "image/jpeg";
			break;
		case "png":
			this.contentLoaderInfo.contentType = "image/png";
			break;
		case "gif":
			this.contentLoaderInfo.contentType = "image/gif";
			break;
		default:
			throw "Unrecognized file " + request.url;
		}
		this.mImage = new flash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener("complete",$bind(this,this.handleLoad),false);
			this.mImage.nmeLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new flash.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new flash.events.IOErrorEvent("ioError");
			evt.set_currentTarget(this);
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new flash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,loadBytes: function(buffer) {
		var _g = this;
		try {
			this.contentLoaderInfo.addEventListener("complete",$bind(this,this.handleLoad),false);
			flash.display.BitmapData.loadFromBytes(buffer,null,function(bmd) {
				_g.content = new flash.display.Bitmap(bmd);
				_g.contentLoaderInfo.content = _g.content;
				_g.addChild(_g.content);
				var evt = new flash.events.Event("complete");
				evt.set_currentTarget(_g);
				_g.contentLoaderInfo.dispatchEvent(evt);
			});
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt1 = new flash.events.IOErrorEvent("ioError");
			evt1.set_currentTarget(this);
			this.contentLoaderInfo.dispatchEvent(evt1);
		}
	}
	,handleLoad: function(e) {
		e.set_currentTarget(this);
		this.contentLoaderInfo.removeEventListener("complete",$bind(this,this.handleLoad));
	}
	,__class__: flash.display.Loader
});
flash.display.LoaderInfo = function() {
	flash.events.EventDispatcher.call(this);
	this.bytesLoaded = this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["flash.display.LoaderInfo"] = flash.display.LoaderInfo;
flash.display.LoaderInfo.__name__ = ["flash","display","LoaderInfo"];
flash.display.LoaderInfo.create = function(o) {
	var r = new flash.display.LoaderInfo();
	if(o != null) r.loader = o; else r.url = "";
	return r;
};
flash.display.LoaderInfo.__super__ = flash.events.EventDispatcher;
flash.display.LoaderInfo.prototype = $extend(flash.events.EventDispatcher.prototype,{
	__class__: flash.display.LoaderInfo
});
flash.display.MovieClip = function() {
	flash.display.Sprite.call(this);
	this.enabled = true;
	this.qIndex = this.qTotal = 0;
	this.loaderInfo = flash.display.LoaderInfo.create();
};
$hxClasses["flash.display.MovieClip"] = flash.display.MovieClip;
flash.display.MovieClip.__name__ = ["flash","display","MovieClip"];
flash.display.MovieClip.__super__ = flash.display.Sprite;
flash.display.MovieClip.prototype = $extend(flash.display.Sprite.prototype,{
	gotoAndPlay: function(v,o) {
	}
	,gotoAndStop: function(v,o) {
	}
	,nextFrame: function() {
	}
	,play: function() {
	}
	,prevFrame: function() {
	}
	,stop: function() {
	}
	,get_currentFrame: function() {
		return this.qIndex;
	}
	,get_framesLoaded: function() {
		return this.qTotal;
	}
	,get_totalFrames: function() {
		return this.qTotal;
	}
	,__class__: flash.display.MovieClip
});
flash.display.Shape = function() {
	(this.graphics = new flash.display.Graphics()).set_displayObject(this);
	this.component = this.graphics.component;
	flash.display.DisplayObject.call(this);
};
$hxClasses["flash.display.Shape"] = flash.display.Shape;
flash.display.Shape.__name__ = ["flash","display","Shape"];
flash.display.Shape.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.Shape.__super__ = flash.display.DisplayObject;
flash.display.Shape.prototype = $extend(flash.display.DisplayObject.prototype,{
	drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		this.graphics.drawToSurface(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing);
	}
	,set_stage: function(v) {
		var z = this.get_stage() == null && v != null;
		var r = flash.display.DisplayObject.prototype.set_stage.call(this,v);
		if(z) this.graphics.invalidate();
		return r;
	}
	,__class__: flash.display.Shape
});
flash.display.Stage = function() {
	this.isTouchScreen = false;
	this.frameRate = 0;
	flash.display.DisplayObjectContainer.call(this);
	var s = this.component.style;
	s.position = "absolute";
	s.overflow = "hidden";
	s.width = s.height = "100%";
	this.qTimeStamp = flash.Lib.getTimer();
	flash.Lib.requestAnimationFrame($bind(this,this.onAnimationFrame));
	this.mousePos = new flash.geom.Point();
	var o = window;
	o.addEventListener("mousemove",$bind(this,this.onMouseMove));
	o.addEventListener("touchstart",$bind(this,this.onTouch));
	o.addEventListener("touchend",$bind(this,this.onTouch));
	o.addEventListener("touchmove",$bind(this,this.onTouch));
};
$hxClasses["flash.display.Stage"] = flash.display.Stage;
flash.display.Stage.__name__ = ["flash","display","Stage"];
flash.display.Stage.__super__ = flash.display.DisplayObjectContainer;
flash.display.Stage.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	onTouch: function(e) {
		this.isTouchScreen = true;
		if(e.targetTouches.length > 0) {
			this.mousePos.x = e.targetTouches[0].pageX;
			this.mousePos.y = e.targetTouches[0].pageY;
		}
		e.preventDefault();
	}
	,onMouseMove: function(e) {
		if(!this.isTouchScreen) {
			this.mousePos.x = e.pageX;
			this.mousePos.y = e.pageY;
		}
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o = this.component;
		this.component = window;
		flash.display.DisplayObjectContainer.prototype.addEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		this.component = o;
	}
	,removeEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o = this.component;
		this.component = window;
		flash.display.DisplayObjectContainer.prototype.removeEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		this.component = o;
	}
	,get_focus: function() {
		var o = document.activeElement;
		if(o != null && Std["is"](o = o.node,flash.display.InteractiveObject)) return o; else return null;
	}
	,set_focus: function(v) {
		if(v != null) v.giveFocus(); else this.component.blur();
		return v;
	}
	,get_stageWidth: function() {
		return window.innerWidth;
	}
	,get_stageHeight: function() {
		return window.innerHeight;
	}
	,get_stage: function() {
		return this;
	}
	,onAnimationFrame: function() {
		var t = flash.Lib.getTimer();
		var i = -1;
		while(++i < flash.Lib.schLength) {
			flash.Lib.schList[i]();
			flash.Lib.schList[i] = null;
		}
		flash.Lib.schLength = 0;
		if(this.frameRate <= 0 || t - this.qTimeStamp >= 1000 / this.frameRate) {
			this.qTimeStamp = t;
			var e = new flash.events.Event("enterFrame");
			this.broadcastEvent(e);
		}
		flash.Lib.requestAnimationFrame($bind(this,this.onAnimationFrame));
	}
	,__class__: flash.display.Stage
});
flash.display.StageAlign = $hxClasses["flash.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] };
flash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
flash.display.StageAlign.TOP_RIGHT.toString = $estr;
flash.display.StageAlign.TOP_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
flash.display.StageAlign.TOP_LEFT.toString = $estr;
flash.display.StageAlign.TOP_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP = ["TOP",2];
flash.display.StageAlign.TOP.toString = $estr;
flash.display.StageAlign.TOP.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.RIGHT = ["RIGHT",3];
flash.display.StageAlign.RIGHT.toString = $estr;
flash.display.StageAlign.RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.LEFT = ["LEFT",4];
flash.display.StageAlign.LEFT.toString = $estr;
flash.display.StageAlign.LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
flash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
flash.display.StageAlign.BOTTOM_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
flash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
flash.display.StageAlign.BOTTOM_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM = ["BOTTOM",7];
flash.display.StageAlign.BOTTOM.toString = $estr;
flash.display.StageAlign.BOTTOM.__enum__ = flash.display.StageAlign;
flash.display.StageDisplayState = $hxClasses["flash.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["FULL_SCREEN","FULL_SCREEN_INTERACTIVE","NORMAL"] };
flash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",0];
flash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",1];
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.NORMAL = ["NORMAL",2];
flash.display.StageDisplayState.NORMAL.toString = $estr;
flash.display.StageDisplayState.NORMAL.__enum__ = flash.display.StageDisplayState;
flash.display.StageScaleMode = $hxClasses["flash.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] };
flash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
flash.display.StageScaleMode.SHOW_ALL.toString = $estr;
flash.display.StageScaleMode.SHOW_ALL.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
flash.display.StageScaleMode.NO_SCALE.toString = $estr;
flash.display.StageScaleMode.NO_SCALE.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
flash.display.StageScaleMode.NO_BORDER.toString = $estr;
flash.display.StageScaleMode.NO_BORDER.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
flash.display.StageScaleMode.EXACT_FIT.toString = $estr;
flash.display.StageScaleMode.EXACT_FIT.__enum__ = flash.display.StageScaleMode;
flash.errors = {};
flash.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["flash.errors.Error"] = flash.errors.Error;
flash.errors.Error.__name__ = ["flash","errors","Error"];
flash.errors.Error.prototype = {
	getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: flash.errors.Error
};
flash.errors.IOError = function(message) {
	if(message == null) message = "";
	flash.errors.Error.call(this,message);
};
$hxClasses["flash.errors.IOError"] = flash.errors.IOError;
flash.errors.IOError.__name__ = ["flash","errors","IOError"];
flash.errors.IOError.__super__ = flash.errors.Error;
flash.errors.IOError.prototype = $extend(flash.errors.Error.prototype,{
	__class__: flash.errors.IOError
});
flash.events.Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
};
$hxClasses["flash.events.Event"] = flash.events.Event;
flash.events.Event.__name__ = ["flash","events","Event"];
flash.events.Event.prototype = {
	get_target: function() {
		return this._target || this.target;
	}
	,set_target: function(v) {
		return this._target = v;
	}
	,get_currentTarget: function() {
		return this._current || this.currentTarget;
	}
	,set_currentTarget: function(v) {
		return this._current = v;
	}
	,isDefaultPrevented: function() {
		return this.defaultPrevented;
	}
	,clone: function() {
		return new flash.events.Event(this.type,this.bubbles,this.cancelable);
	}
	,__class__: flash.events.Event
};
flash.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.TextEvent"] = flash.events.TextEvent;
flash.events.TextEvent.__name__ = ["flash","events","TextEvent"];
flash.events.TextEvent.__super__ = flash.events.Event;
flash.events.TextEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.TextEvent
});
flash.events.ErrorEvent = function(type,bubbles,cancelable,text) {
	flash.events.TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.ErrorEvent"] = flash.events.ErrorEvent;
flash.events.ErrorEvent.__name__ = ["flash","events","ErrorEvent"];
flash.events.ErrorEvent.__super__ = flash.events.TextEvent;
flash.events.ErrorEvent.prototype = $extend(flash.events.TextEvent.prototype,{
	__class__: flash.events.ErrorEvent
});
flash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	flash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["flash.events.HTTPStatusEvent"] = flash.events.HTTPStatusEvent;
flash.events.HTTPStatusEvent.__name__ = ["flash","events","HTTPStatusEvent"];
flash.events.HTTPStatusEvent.__super__ = flash.events.Event;
flash.events.HTTPStatusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.HTTPStatusEvent
});
flash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["flash.events.IOErrorEvent"] = flash.events.IOErrorEvent;
flash.events.IOErrorEvent.__name__ = ["flash","events","IOErrorEvent"];
flash.events.IOErrorEvent.__super__ = flash.events.Event;
flash.events.IOErrorEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.IOErrorEvent
});
flash.events.MouseEvent = function(type,bubbles,cancelable,lx,ly,obj,ctrlKey,altKey,shiftKey,buttonDown,delta) {
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.ctrlKey = ctrlKey;
	this.altKey = altKey;
	this.shiftKey = shiftKey;
	this.relatedObject = obj;
	if(buttonDown) this.button = 0; else this.button = 1;
	this.wheelDelta = delta;
};
$hxClasses["flash.events.MouseEvent"] = flash.events.MouseEvent;
flash.events.MouseEvent.__name__ = ["flash","events","MouseEvent"];
flash.events.MouseEvent.__super__ = flash.events.Event;
flash.events.MouseEvent.prototype = $extend(flash.events.Event.prototype,{
	get_buttonDown: function() {
		return this.button == 0;
	}
	,get_delta: function() {
		return this.wheelDelta;
	}
	,get_stageX: function() {
		return this.pageX;
	}
	,get_stageY: function() {
		return this.pageY;
	}
	,get_localPoint: function() {
		var p = flash.events.MouseEvent.convPoint;
		if(p == null) flash.events.MouseEvent.convPoint = p = new flash.geom.Point();
		p.x = this.pageX;
		p.y = this.pageY;
		if(this.relatedObject != null) return this.relatedObject.globalToLocal(p,p); else return p;
	}
	,get_localX: function() {
		return this.get_localPoint().x;
	}
	,get_localY: function() {
		return this.get_localPoint().y;
	}
	,updateAfterEvent: function() {
	}
	,__class__: flash.events.MouseEvent
});
flash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["flash.events.ProgressEvent"] = flash.events.ProgressEvent;
flash.events.ProgressEvent.__name__ = ["flash","events","ProgressEvent"];
flash.events.ProgressEvent.__super__ = flash.events.Event;
flash.events.ProgressEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.ProgressEvent
});
flash.events.SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.SecurityErrorEvent"] = flash.events.SecurityErrorEvent;
flash.events.SecurityErrorEvent.__name__ = ["flash","events","SecurityErrorEvent"];
flash.events.SecurityErrorEvent.__super__ = flash.events.ErrorEvent;
flash.events.SecurityErrorEvent.prototype = $extend(flash.events.ErrorEvent.prototype,{
	__class__: flash.events.SecurityErrorEvent
});
flash.filters = {};
flash.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["flash.filters.BitmapFilter"] = flash.filters.BitmapFilter;
flash.filters.BitmapFilter.__name__ = ["flash","filters","BitmapFilter"];
flash.filters.BitmapFilter.prototype = {
	clone: function() {
		throw "Implement in subclass. BitmapFilter::clone";
		return null;
	}
	,nmePreFilter: function(surface) {
	}
	,nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
	}
	,__class__: flash.filters.BitmapFilter
};
flash.geom = {};
flash.geom.ColorTransform = function(r,g,b,a,ro,go,bo,ao) {
	if(ao == null) ao = 0;
	if(bo == null) bo = 0;
	if(go == null) go = 0;
	if(ro == null) ro = 0;
	if(a == null) a = 1;
	if(b == null) b = 1;
	if(g == null) g = 1;
	if(r == null) r = 1;
	this.redMultiplier = r;
	this.greenMultiplier = g;
	this.blueMultiplier = b;
	this.alphaMultiplier = a;
	this.redOffset = ro;
	this.greenOffset = go;
	this.blueOffset = bo;
	this.alphaOffset = ao;
};
$hxClasses["flash.geom.ColorTransform"] = flash.geom.ColorTransform;
flash.geom.ColorTransform.__name__ = ["flash","geom","ColorTransform"];
flash.geom.ColorTransform.prototype = {
	concat: function(o) {
		this.redMultiplier += o.redMultiplier;
		this.greenMultiplier += o.greenMultiplier;
		this.blueMultiplier += o.blueMultiplier;
		this.alphaMultiplier += o.alphaMultiplier;
	}
	,isColorSetter: function() {
		return this.redMultiplier == 0 && this.greenMultiplier == 0 && this.blueMultiplier == 0 && (this.alphaMultiplier == 0 || this.alphaOffset == 0);
	}
	,isAlphaMultiplier: function() {
		return this.redMultiplier == 1 && this.greenMultiplier == 1 && this.blueMultiplier == 1 && this.redOffset == 0 && this.greenOffset == 0 && this.blueOffset == 0 && this.alphaOffset == 0;
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 0;
		return this.get_color();
	}
	,__class__: flash.geom.ColorTransform
};
flash.geom.Matrix = function(a,b,c,d,tx,ty) {
	if(a == null) this.a = 1; else this.a = a;
	if(b == null) this.b = 0; else this.b = b;
	if(c == null) this.c = 0; else this.c = c;
	if(d == null) this.d = 1; else this.d = d;
	if(tx == null) this.tx = 0; else this.tx = tx;
	if(ty == null) this.ty = 0; else this.ty = ty;
};
$hxClasses["flash.geom.Matrix"] = flash.geom.Matrix;
flash.geom.Matrix.__name__ = ["flash","geom","Matrix"];
flash.geom.Matrix.prototype = {
	clone: function() {
		return new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,identity: function() {
		this.a = this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;
	}
	,isIdentity: function() {
		return this.a == 1 && this.d == 1 && this.tx == 0 && this.ty == 0 && this.b == 0 && this.c == 0;
	}
	,copy: function(s) {
		this.a = s.a;
		this.b = s.b;
		this.c = s.c;
		this.d = s.d;
		this.tx = s.tx;
		this.ty = s.ty;
	}
	,invert: function() {
		var t;
		var n = this.a * this.d - this.b * this.c;
		if(n == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			n = 1 / n;
			t = this.d * n;
			this.d = this.a * n;
			this.a = t;
			this.b *= -n;
			this.c *= -n;
			t = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = t;
		}
	}
	,translate: function(x,y) {
		this.tx += x;
		this.ty += y;
	}
	,rotate: function(o) {
		var ox = Math.cos(o);
		var oy = Math.sin(o);
		var t;
		t = this.a * ox - this.b * oy;
		this.b = this.a * oy + this.b * ox;
		this.a = t;
		t = this.c * ox - this.d * oy;
		this.d = this.c * oy + this.d * ox;
		this.c = t;
		t = this.tx * ox - this.ty * oy;
		this.ty = this.tx * oy + this.ty * ox;
		this.tx = t;
	}
	,scale: function(x,y) {
		this.a *= x;
		this.b *= y;
		this.c *= x;
		this.d *= y;
		this.tx *= x;
		this.ty *= y;
	}
	,concat: function(o) {
		var t;
		t = this.a * o.a + this.b * o.c;
		this.b = this.a * o.b + this.b * o.d;
		this.a = t;
		t = this.c * o.a + this.d * o.c;
		this.d = this.c * o.b + this.d * o.d;
		this.c = t;
		t = this.tx * o.a + this.ty * o.c + o.tx;
		this.ty = this.tx * o.b + this.ty * o.d + o.ty;
		this.tx = t;
	}
	,transformPoint: function(o) {
		return new flash.geom.Point(o.x * this.a + o.y * this.c + this.tx,o.x * this.b + o.y * this.d + this.ty);
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,to3dString: function() {
		return "matrix3d(" + this.a + ", " + this.b + ", 0, 0, " + this.c + ", " + this.d + ", 0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,__class__: flash.geom.Matrix
};
flash.geom.Point = function(_x,_y) {
	if(_x == null) this.x = 0; else this.x = _x;
	if(_y == null) this.y = 0; else this.y = _y;
};
$hxClasses["flash.geom.Point"] = flash.geom.Point;
flash.geom.Point.__name__ = ["flash","geom","Point"];
flash.geom.Point.interpolate = function(a,b,f) {
	return new flash.geom.Point(a.x + f * (b.x - a.x),a.y + f * (b.y - a.y));
};
flash.geom.Point.polar = function(l,d) {
	return new flash.geom.Point(Math.cos(d) * l,Math.sin(d) * l);
};
flash.geom.Point.prototype = {
	clone: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,equals: function(o) {
		return this.x == o.x && this.y == o.y;
	}
	,setTo: function(u,v) {
		this.x = u;
		this.y = v;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,toString: function() {
		return "point(" + this.x + ", " + this.y + ")";
	}
	,normalize: function(l) {
		if(this.y == 0) if(this.x < 0) this.x = -l; else this.x = l; else if(this.x == 0) if(this.y < 0) this.y = -l; else this.y = l; else {
			var m = l / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= m;
			this.y *= m;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,add: function(o) {
		return new flash.geom.Point(this.x + o.x,this.y + o.y);
	}
	,subtract: function(o) {
		return new flash.geom.Point(this.x - o.x,this.y - o.y);
	}
	,__class__: flash.geom.Point
};
flash.geom.Rectangle = function(a,b,c,d) {
	if(d == null) d = 0;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 0;
	this.x = a;
	this.y = b;
	this.width = c;
	this.height = d;
};
$hxClasses["flash.geom.Rectangle"] = flash.geom.Rectangle;
flash.geom.Rectangle.__name__ = ["flash","geom","Rectangle"];
flash.geom.Rectangle.prototype = {
	clone: function() {
		return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,equals: function(o) {
		return this.x == o.x && this.y == o.y && this.width == o.width && this.height == o.height;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,copyFrom: function(o) {
		this.x = o.x;
		this.y = o.y;
		this.width = o.width;
		this.height = o.height;
	}
	,setTo: function(a,b,c,d) {
		this.x = a;
		this.y = b;
		this.width = c;
		this.height = d;
	}
	,setVoid: function() {
		this.width -= 2147483647 - this.x;
		this.x = 2147483647;
		this.width = -2147483648 - this.x;
		-2147483648;
		this.height -= 2147483647 - this.y;
		this.y = 2147483647;
		this.height = -2147483648 - this.y;
		-2147483648;
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(v) {
		this.width -= v - this.x;
		return this.x = v;
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(v) {
		this.height -= v - this.y;
		return this.y = v;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(v) {
		this.width = v - this.x;
		return v;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(v) {
		this.height = v - this.y;
		return v;
	}
	,get_size: function() {
		return new flash.geom.Point(this.width,this.height);
	}
	,set_size: function(v) {
		this.width = v.x;
		this.height = v.y;
		return v.clone();
	}
	,get_topLeft: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,set_topLeft: function(v) {
		this.width = v.x;
		this.height = v.y;
		return v.clone();
	}
	,get_bottomRight: function() {
		return new flash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(v) {
		this.width = v.x - this.x;
		this.height = v.y - this.y;
		return v.clone();
	}
	,contains: function(u,v) {
		return (u -= this.x) >= 0 && (v -= this.y) >= 0 && u < this.width && v < this.height;
	}
	,containsPoint: function(o) {
		return this.contains(o.x,o.y);
	}
	,containsRect: function(o) {
		if(o.width <= 0 || o.height <= 0) return o.x > this.x && o.y > this.y && o.x + o.width < this.x + this.width && o.y + o.height < this.y + this.height; else return o.x >= this.x && o.y >= this.y && o.x + o.width <= this.x + this.width && o.y + o.height <= this.y + this.height;
	}
	,intersection: function(o) {
		var x0;
		var x1;
		var y0;
		var y1;
		var a;
		var b;
		if(((a = this.x) < (b = o.x)?x0 = b:x0 = a) <= ((a += this.width) > (b += o.width)?x1 = b:x1 = a) && ((a = this.y) < (b = o.y)?y0 = b:y0 = a) <= ((a += this.height) > (b += o.height)?y1 = b:y1 = a)) return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0); else return new flash.geom.Rectangle();
	}
	,intersects: function(o) {
		var x0;
		var x1;
		var y0;
		var y1;
		if((this.x < (x0 = o.x)?x0 = x0:x0 = this.x) <= (this.x + this.width > (x1 = o.x + o.width)?x1 = x1:x1 = this.x + this.width)) return false; else return (this.y < (y0 = o.y)?y0 = y0:y0 = this.y) <= (this.y + this.height > (y1 = o.y + o.height)?y1 = y1:y1 = this.y);
	}
	,join: function(o) {
		var v;
		if((v = o.x - this.x) < 0) {
			this.x += v;
			this.width -= v;
		}
		if((v = o.y - this.y) < 0) {
			this.y += v;
			this.height -= v;
		}
		if((v = o.x + o.width - (this.x + this.width)) > 0) this.width += v;
		if((v = o.y + o.height - (this.y + this.height)) > 0) this.height += v;
	}
	,union: function(o) {
		var a;
		var b;
		var c;
		var d;
		return new flash.geom.Rectangle((a = this.x) < (c = o.x)?a:c,(b = this.y) < (d = o.y)?b:d,(a += this.width) > (c += o.width)?a:c,(b += this.height) > (d += o.height)?b:d);
	}
	,inflate: function(u,v) {
		this.x -= u;
		this.y -= v;
		this.width += u * 2;
		this.height += v * 2;
	}
	,inflatePoint: function(v) {
		this.inflate(v.x,v.y);
	}
	,offset: function(u,v) {
		this.x += u;
		this.y += v;
	}
	,offsetPoint: function(o) {
		this.x += o.x;
		this.y += o.y;
	}
	,transform: function(m) {
		var v;
		var l;
		var t;
		var r;
		var b;
		r = l = m.a * this.x + m.c * this.y;
		b = t = m.b * this.x + m.d * this.y;
		v = m.a * (this.x + this.width) + m.c * this.y;
		if(v < l) l = v;
		if(v > r) r = v;
		v = m.b * (this.x + this.width) + m.d * this.y;
		if(v < t) t = v;
		if(v > b) b = v;
		v = m.a * this.x + m.c * (this.y + this.height);
		if(v < l) l = v;
		if(v > r) r = v;
		v = m.b * this.x + m.d * (this.y + this.height);
		if(v < t) t = v;
		if(v > b) b = v;
		v = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		if(v < l) l = v;
		if(v > r) r = v;
		v = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(v < t) t = v;
		if(v > b) b = v;
		this.x = l + m.tx;
		this.width = r - l;
		this.y = t + m.ty;
		this.height = b - t;
	}
	,toString: function() {
		return "Rectangle(" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + ")";
	}
	,__class__: flash.geom.Rectangle
};
flash.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new flash.geom.Matrix();
	this._fullMatrix = new flash.geom.Matrix();
	this.set_colorTransform(new flash.geom.ColorTransform());
};
$hxClasses["flash.geom.Transform"] = flash.geom.Transform;
flash.geom.Transform.__name__ = ["flash","geom","Transform"];
flash.geom.Transform.prototype = {
	nmeGetFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) (m = new flash.geom.Matrix(localMatrix.a,localMatrix.b,localMatrix.c,localMatrix.d,localMatrix.tx,localMatrix.ty)).concat(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,nmeSetFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,nmeSetMatrix: function(inValue) {
		this._matrix.copy(inValue);
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,get_concatenatedMatrix: function() {
		return this.nmeGetFullMatrix(this._matrix);
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.syncMtx();
		return this._matrix;
	}
	,get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,__class__: flash.geom.Transform
};
flash.media = {};
flash.media.Sound = function(stream,ctx) {
	flash.events.EventDispatcher.call(this);
	if(stream != null) this.load(stream,ctx);
};
$hxClasses["flash.media.Sound"] = flash.media.Sound;
flash.media.Sound.__name__ = ["flash","media","Sound"];
flash.media.Sound.canPlayType = function(o) {
	var f;
	var v;
	o = o.toLowerCase();
	if(flash.media.Sound.canPlayMap != null) {
		if(flash.media.Sound.canPlayMap.exists(o)) return flash.media.Sound.canPlayMap.get(o);
	} else flash.media.Sound.canPlayMap = new haxe.ds.StringMap();
	f = flash.media.Sound.getFormatType(o);
	v = new Audio().canPlayType(f) != "no";
	flash.media.Sound.canPlayMap.set(o,v);
	return v;
};
flash.media.Sound.getFormatType = function(o) {
	if(o == "mp3") return "audio/mpeg;"; else if(o == "ogg") return "audio/ogg; codecs=\"vorbis\""; else return null;
};
flash.media.Sound.__super__ = flash.events.EventDispatcher;
flash.media.Sound.prototype = $extend(flash.events.EventDispatcher.prototype,{
	close: function() {
		if(this.component != null) this.component = null; else throw new flash.errors.IOError("Attempt to close unexisting stream.");
	}
	,load: function(stream,ctx) {
		var s = stream.url;
		var m = flash.media.Sound.library;
		if(m != null && m.exists(s)) {
			this.component = m.get(s);
			var value = this.component.cloneNode(true);
			flash.media.Sound.library.set(s,value);
		} else this.component = new Audio(s);
		this.qCache = [];
	}
	,play: function(ofs,loops,stf) {
		if(loops == null) loops = 0;
		if(ofs == null) ofs = 0;
		var o;
		var i;
		if(this.qCache.length == 0) {
			(o = new flash.media.SoundChannel()).init(this,this.component,loops);
			this.component = this.component.cloneNode(true);
		} else {
			o = this.qCache[0];
			var _g = 0;
			var _g1 = this.qCache;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				if(v.component.currentTime * 1000 == ofs) {
					o = v;
					break;
				}
			}
			HxOverrides.remove(this.qCache,o);
		}
		o.set_soundTransform(stf);
		try {
			o._loops = loops;
			o.play(ofs);
		} catch( e ) {
			null;
		}
		return o;
	}
	,get_length: function() {
		if(this.component != null) return this.component.duration * 1000; else return 0;
	}
	,__class__: flash.media.Sound
});
flash.media.SoundChannel = function() {
	this._loops = 1;
	this.active = false;
	this.rightPeak = 1;
	this.leftPeak = 1;
	flash.events.EventDispatcher.call(this);
};
$hxClasses["flash.media.SoundChannel"] = flash.media.SoundChannel;
flash.media.SoundChannel.__name__ = ["flash","media","SoundChannel"];
flash.media.SoundChannel.__super__ = flash.events.EventDispatcher;
flash.media.SoundChannel.prototype = $extend(flash.events.EventDispatcher.prototype,{
	init: function(q,v,loops) {
		if(loops == null) loops = 1;
		this.qSound = q;
		this.component = v;
		this._loops = loops;
		this.component.addEventListener("ended",$bind(this,this.onEnded));
	}
	,play: function(p) {
		var o = this.component;
		var l;
		if(!this.active) {
			l = this.get_duration();
			if(p == 0 || p / 1000 <= l) {
				this._position = this.set_position(p);
				o.load();
				o.play();
				this.active = true;
			} else {
				this.set_position(0);
				o.load();
				o.play();
				o.pause();
				this.qSound.qCache.push(this);
			}
		}
	}
	,stop: function() {
		if(this.active) {
			this.active = false;
			this.component.pause();
			this.qSound.qCache.push(this);
		}
	}
	,set_soundTransform: function(v) {
		this.soundTransform = v;
		if(v != null) this.component.volume = v.volume; else this.component.volume = 1;
		return v;
	}
	,get_duration: function() {
		var o = this.component;
		var f;
		try {
			if(o.buffered != null) f = o.buffered.end(0); else f = o.duration;
		} catch( _ ) {
			f = o.duration;
			if(Math.isNaN(f)) f = 0;
		}
		return f;
	}
	,get_position: function() {
		return this.component.currentTime * 1000;
	}
	,set_position: function(v) {
		if(this.component.currentTime != v / 1000) {
			var p = !this.component.paused;
			if(p) this.component.pause();
			this.component.currentTime = v / 1000;
			if(p) this.component.play();
		}
		return v;
	}
	,onEnded: function(e) {
		if(this.active) {
			if(--this._loops > 0) {
				this.set_position(this._position);
				if(this.component.paused) this.component.play();
			} else {
				this.stop();
				this.component.currentTime = 0;
				this.dispatchEvent(new flash.events.Event("soundComplete"));
			}
		}
	}
	,__class__: flash.media.SoundChannel
});
flash.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["flash.media.SoundLoaderContext"] = flash.media.SoundLoaderContext;
flash.media.SoundLoaderContext.__name__ = ["flash","media","SoundLoaderContext"];
flash.media.SoundLoaderContext.prototype = {
	__class__: flash.media.SoundLoaderContext
};
flash.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
};
$hxClasses["flash.media.SoundTransform"] = flash.media.SoundTransform;
flash.media.SoundTransform.__name__ = ["flash","media","SoundTransform"];
flash.media.SoundTransform.prototype = {
	__class__: flash.media.SoundTransform
};
flash.net = {};
flash.net.URLLoader = function(request) {
	flash.events.EventDispatcher.call(this);
	this.bytesLoaded = this.bytesTotal = 0;
	this.set_dataFormat(flash.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["flash.net.URLLoader"] = flash.net.URLLoader;
flash.net.URLLoader.__name__ = ["flash","net","URLLoader"];
flash.net.URLLoader.__super__ = flash.events.EventDispatcher;
flash.net.URLLoader.prototype = $extend(flash.events.EventDispatcher.prototype,{
	set_dataFormat: function(v) {
		if(v == flash.net.URLLoaderDataFormat.BINARY && ArrayBuffer == null) this.dataFormat = flash.net.URLLoaderDataFormat.TEXT; else this.dataFormat = v;
		return this.dataFormat;
	}
	,close: function() {
	}
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState == 4) {
				var s;
				try {
					s = subject.status;
				} catch( _ ) {
					s = null;
				}
				if(s != null) self.onStatus(s);
				if(s == null) self.onError("Failed to connect or resolve host"); else if(s >= 200 && s < 400) self.onData(subject.response); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
					self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
					self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
				} else self.onError("Http Error #" + subject.status);
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,flash.utils.ByteArray)) {
			var data1 = data;
			if(this.dataFormat == flash.net.URLLoaderDataFormat.BINARY) uri = data1.data.buffer; else uri = data1.readUTFBytes(data1.length);
		} else if(js.Boot.__instanceof(data,flash.net.URLVariables)) {
			var data2 = data;
			var _g = 0;
			var _g1 = Reflect.fields(data2);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.dataFormat == flash.net.URLLoaderDataFormat.BINARY) xmlHttpRequest.responseType = "arraybuffer";
		var _g2 = 0;
		while(_g2 < requestHeaders.length) {
			var header = requestHeaders[_g2];
			++_g2;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
	}
	,onData: function(_) {
		var v;
		if(_) v = _; else v = this.getData();
		var e;
		if(this.dataFormat == flash.net.URLLoaderDataFormat.BINARY) this.data = flash.utils.ByteArray.nmeOfBuffer(v); else this.data = Std.string(v);
		e = new flash.events.Event("complete");
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,onError: function(msg) {
		var e = new flash.events.IOErrorEvent("ioError");
		e.text = msg;
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,onOpen: function() {
		var e = new flash.events.Event("open");
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,onProgress: function(event) {
		var e = new flash.events.ProgressEvent("progress");
		e.set_currentTarget(this);
		e.bytesLoaded = event.loaded;
		e.bytesTotal = event.total;
		this.dispatchEvent(e);
	}
	,onSecurityError: function(msg) {
		var evt = new flash.events.SecurityErrorEvent("securityError");
		evt.text = msg;
		evt.set_currentTarget(this);
		this.dispatchEvent(evt);
	}
	,onStatus: function(status) {
		var e = new flash.events.HTTPStatusEvent("httpStatus",false,false,status);
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,__class__: flash.net.URLLoader
});
flash.net.URLLoaderDataFormat = $hxClasses["flash.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
flash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
flash.net.URLLoaderDataFormat.BINARY.toString = $estr;
flash.net.URLLoaderDataFormat.BINARY.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
flash.net.URLLoaderDataFormat.TEXT.toString = $estr;
flash.net.URLLoaderDataFormat.TEXT.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
flash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
flash.net.URLLoaderDataFormat.VARIABLES.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["flash.net.URLRequest"] = flash.net.URLRequest;
flash.net.URLRequest.__name__ = ["flash","net","URLRequest"];
flash.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js.Boot.__instanceof(this.data,flash.utils.ByteArray)) (res = res.slice()).push(new flash.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		return res;
	}
	,__class__: flash.net.URLRequest
};
flash.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["flash.net.URLRequestHeader"] = flash.net.URLRequestHeader;
flash.net.URLRequestHeader.__name__ = ["flash","net","URLRequestHeader"];
flash.net.URLRequestHeader.prototype = {
	__class__: flash.net.URLRequestHeader
};
flash.net._URLRequestMethod = {};
flash.net._URLRequestMethod.URLRequestMethod_Impl_ = function() { };
$hxClasses["flash.net._URLRequestMethod.URLRequestMethod_Impl_"] = flash.net._URLRequestMethod.URLRequestMethod_Impl_;
flash.net._URLRequestMethod.URLRequestMethod_Impl_.__name__ = ["flash","net","_URLRequestMethod","URLRequestMethod_Impl_"];
flash.net._URLRequestMethod.URLRequestMethod_Impl_._new = function(o) {
	return o;
};
flash.net._URLRequestMethod.URLRequestMethod_Impl_.toString = function(this1) {
	return this1;
};
flash.net._URLRequestMethod.URLRequestMethod_Impl_.fromString = function(s) {
	return s;
};
flash.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["flash.net.URLVariables"] = flash.net.URLVariables;
flash.net.URLVariables.__name__ = ["flash","net","URLVariables"];
flash.net.URLVariables.prototype = {
	decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g1 = 0;
		while(_g1 < fields1.length) {
			var f1 = fields1[_g1];
			++_g1;
			var eq = f1.indexOf("=");
			if(eq > 0) Reflect.setField(this,StringTools.urlDecode(HxOverrides.substr(f1,0,eq)),StringTools.urlDecode(HxOverrides.substr(f1,eq + 1,null))); else if(eq != 0) Reflect.setField(this,decodeURIComponent(f1.split("+").join(" ")),"");
		}
	}
	,toString: function() {
		var r = "";
		var o = Reflect.fields(this);
		var i = 0;
		var _g = 0;
		while(_g < o.length) {
			var f = o[_g];
			++_g;
			r += (i++ != 0?"&":"") + encodeURIComponent(f) + "=" + StringTools.urlEncode(Reflect.field(this,f));
		}
		return r;
	}
	,__class__: flash.net.URLVariables
};
flash.text = {};
flash.text.Font = function() {
};
$hxClasses["flash.text.Font"] = flash.text.Font;
flash.text.Font.__name__ = ["flash","text","Font"];
flash.text.Font.enumerateFonts = function(z) {
	if(z == null) z = false;
	return [];
};
flash.text.Font.registerFont = function(v) {
};
flash.text.Font.prototype = {
	hasGlyphs: function(v) {
		return false;
	}
	,__class__: flash.text.Font
};
flash.text.FontStyle = $hxClasses["flash.text.FontStyle"] = { __ename__ : true, __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] };
flash.text.FontStyle.REGULAR = ["REGULAR",0];
flash.text.FontStyle.REGULAR.toString = $estr;
flash.text.FontStyle.REGULAR.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.ITALIC = ["ITALIC",1];
flash.text.FontStyle.ITALIC.toString = $estr;
flash.text.FontStyle.ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
flash.text.FontStyle.BOLD_ITALIC.toString = $estr;
flash.text.FontStyle.BOLD_ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD = ["BOLD",3];
flash.text.FontStyle.BOLD.toString = $estr;
flash.text.FontStyle.BOLD.__enum__ = flash.text.FontStyle;
flash.text.FontType = $hxClasses["flash.text.FontType"] = { __ename__ : true, __constructs__ : ["EMBEDDED","DEVICE"] };
flash.text.FontType.EMBEDDED = ["EMBEDDED",0];
flash.text.FontType.EMBEDDED.toString = $estr;
flash.text.FontType.EMBEDDED.__enum__ = flash.text.FontType;
flash.text.FontType.DEVICE = ["DEVICE",1];
flash.text.FontType.DEVICE.toString = $estr;
flash.text.FontType.DEVICE.__enum__ = flash.text.FontType;
flash.utils = {};
flash.utils.ByteArray = function() {
	this.littleEndian = false;
	this.length = 0;
	this._nmeResizeBuffer(this.allocated = this.position = 0);
};
$hxClasses["flash.utils.ByteArray"] = flash.utils.ByteArray;
flash.utils.ByteArray.__name__ = ["flash","utils","ByteArray"];
flash.utils.ByteArray.fromBytes = function(inBytes) {
	var r = new flash.utils.ByteArray();
	r.byteView = new Uint8Array(inBytes.b);
	r.set_length(r.byteView.length);
	r.allocated = r.length;
	return r;
};
flash.utils.ByteArray.nmeOfBuffer = function(buffer) {
	var r = new flash.utils.ByteArray();
	r.set_length(r.allocated = buffer.byteLength);
	r.data = new DataView(buffer);
	r.byteView = new Uint8Array(buffer);
	return r;
};
flash.utils.ByteArray.prototype = {
	__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,_getUTFBytesCount: function(value) {
		var r = 0;
		var i = -1;
		var l = value.length;
		var c;
		var count = 0;
		while(++i < l) {
			c = value.charCodeAt(i);
			if(c <= 127) r += 1; else if(c <= 2047) r += 2; else if(c <= 65535) r += 3; else r += 4;
		}
		return r;
	}
	,_nmeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,clear: function() {
		this.set_length(this.position = 0);
	}
	,nmeFromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,nmeGet: function(pos) {
		return this.data.getUint8(pos);
	}
	,nmeGetBuffer: function() {
		return this.data.buffer;
	}
	,nmeSet: function(p,v) {
		this.data.setUint8(p,v);
	}
	,readBoolean: function() {
		return this.data.getUint8(this.position++) != 0;
	}
	,readByte: function() {
		return this.data.getUint8(this.position++);
	}
	,readBytes: function(bytes,offset,length) {
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Read error - Out of bounds");
		var l = offset + length;
		if(bytes.length < l) bytes.set_length(l);
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readDouble: function() {
		var r = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return r;
	}
	,readFloat: function() {
		var r = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return r;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) this.set_length(len);
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readInt: function() {
		var r = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return r;
	}
	,readShort: function() {
		var r = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return r;
	}
	,readUnsignedByte: function() {
		return this.data.getUint8(this.position++);
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var r = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return r;
	}
	,readUTF: function() {
		return this.readUTFBytes(this.readUnsignedShort());
	}
	,readUTFBytes: function(len) {
		var r = "";
		var max = this.position + len;
		while(this.position < max) {
			var c = this.data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				r += String.fromCharCode(c);
			} else if(c < 224) r += String.fromCharCode((c & 63) << 6 | this.data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = this.data.getUint8(this.position++);
				r += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | this.data.getUint8(this.position++) & 127);
			} else {
				var c21 = this.data.getUint8(this.position++);
				var c3 = this.data.getUint8(this.position++);
				r += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | this.data.getUint8(this.position++) & 127);
			}
		}
		return r;
	}
	,toString: function() {
		var o = this.position;
		var r;
		this.position = 0;
		r = this.readUTFBytes(this.length);
		this.position = o;
		return r;
	}
	,toBase64: function() {
		var o = this;
		var q = o.position;
		var l = o.length;
		var p = -1;
		var v = o.data;
		var r = "";
		var m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var a;
		var b;
		var c;
		while(++p < l) {
			a = v.getUint8(p);
			if(++p < l) b = v.getUint8(p); else b = 0;
			if(++p < l) c = v.getUint8(p); else c = 0;
			r += m.charAt(a >> 2) + m.charAt((a & 3) << 4 | b >> 4) + (p - 1 < l?m.charAt((b & 15) << 2 | c >> 6):"=") + (p < l?m.charAt(c & 63):"=");
		}
		return r;
	}
	,writeBoolean: function(v) {
		this.writeByte(v?1:0);
	}
	,writeByte: function(v) {
		var l = this.position + 1;
		if(this.length < l) this.set_length(l);
		var data = this.data;
		data.setInt8(this.position,v);
		this.position += 1;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Write error - Out of bounds");
		var l = this.position + length;
		if(this.length < l) this.set_length(l);
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeDouble: function(x) {
		var l = this.position + 8;
		if(this.length < l) this.set_length(l);
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeFloat: function(x) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var l = this.position + 2;
		if(this.length < l) this.set_length(l);
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUnsignedShort: function(value) {
		var l = this.position + 2;
		if(this.length < l) this.set_length(l);
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUTFBytes: function(value) {
		var i = -1;
		var l = value.length;
		var c;
		while(++i < l) {
			c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_endian: function() {
		if(this.littleEndian) return "littleEndian"; else return "bigEndian";
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,set_length: function(value) {
		if(this.allocated < value) this._nmeResizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this._nmeResizeBuffer(this.allocated = value);
		return this.length = value;
	}
	,__class__: flash.utils.ByteArray
};
flash.utils.Endian = function() { };
$hxClasses["flash.utils.Endian"] = flash.utils.Endian;
flash.utils.Endian.__name__ = ["flash","utils","Endian"];
var haxe = {};
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.Resource = function() { };
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
};
haxe.io = {};
haxe.io.Bytes = function() { };
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.prototype = {
	__class__: haxe.io.Bytes
};
haxe.ds = {};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var nme = {};
nme.AssetData = function() { };
$hxClasses["nme.AssetData"] = nme.AssetData;
nme.AssetData.__name__ = ["nme","AssetData"];
nme.AssetData.initialize = function() {
	if(!nme.AssetData.initialized) {
		nme.AssetData.path.set("gfx/free_tileset_version_10.png","gfx/free_tileset_version_10.png");
		var value;
		var s = "image".toUpperCase();
		value = s;
		nme.AssetData.type.set("gfx/free_tileset_version_10.png",value);
		nme.AssetData.initialized = true;
	}
};
var openfl = {};
openfl.Assets = function() { };
$hxClasses["openfl.Assets"] = openfl.Assets;
openfl.Assets.__name__ = ["openfl","Assets"];
openfl.Assets.initialize = function() {
	if(!openfl.Assets.initialized) {
		nme.AssetData.initialize();
		openfl.Assets.initialized = true;
	}
};
openfl.Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	var t = nme.AssetData.type;
	var c = openfl.Assets.cachedBitmapData;
	var r;
	var b;
	if(t.exists(id) && t.get(id) == "IMAGE") {
		if(!c.exists(id)) {
			b = ((function($this) {
				var $r;
				var key = nme.AssetData.path.get(id);
				$r = ApplicationMain.loaders.get(key);
				return $r;
			}(this))).contentLoaderInfo.content;
			r = b.bitmapData.clone();
			if(useCache) openfl.Assets.cachedBitmapData.set(id,r);
			return r;
		} else return openfl.Assets.cachedBitmapData.get(id).clone();
	} else null;
	return null;
};
openfl.Assets.getBytes = function(id) {
	openfl.Assets.initialize();
	if(nme.AssetData.type.exists(id)) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = nme.AssetData.path.get(id);
			$r = ApplicationMain.urlLoaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") {
			var bytes1 = new flash.utils.ByteArray();
			bytes1.writeUTFBytes(data);
		} else if(js.Boot.__instanceof(data,flash.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	} else console.log("[openfl.Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"");
	return null;
};
openfl.Assets.getFont = function(id) {
	openfl.Assets.initialize();
	if(nme.AssetData.type.exists(id) && nme.AssetData.type.get(id) == "FONT") return js.Boot.__cast(Type.createInstance(nme.AssetData.className.get(id),[]) , flash.text.Font); else console.log("[openfl.Assets] There is no Font asset with an ID of \"" + id + "\"");
	return null;
};
openfl.Assets.getSound = function(id) {
	openfl.Assets.initialize();
	if(nme.AssetData.type.exists(id)) {
		var type = nme.AssetData.type.get(id);
		if(type == "SOUND" || type == "MUSIC") return new flash.media.Sound(new flash.net.URLRequest(nme.AssetData.path.get(id)));
	}
	console.log("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"");
	return null;
};
openfl.Assets.getText = function(id) {
	var bytes = openfl.Assets.getBytes(id);
	if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
};
openfl.Assets.resolveClass = function(name) {
	name = StringTools.replace(name,"native.","flash.");
	name = StringTools.replace(name,"browser.","flash.");
	return Type.resolveClass(name);
};
openfl.Assets.resolveEnum = function(name) {
	name = StringTools.replace(name,"native.","flash.");
	name = StringTools.replace(name,"browser.","flash.");
	return Type.resolveEnum(name);
};
openfl.Assets.get_id = function() {
	openfl.Assets.initialize();
	var ids = [];
	var $it0 = nme.AssetData.type.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		ids.push(key);
	}
	return ids;
};
openfl.Assets.get_library = function() {
	openfl.Assets.initialize();
	return nme.AssetData.library;
};
openfl.Assets.get_path = function() {
	openfl.Assets.initialize();
	return nme.AssetData.path;
};
openfl.Assets.get_type = function() {
	openfl.Assets.initialize();
	return nme.AssetData.type;
};
openfl._Assets = {};
openfl._Assets.AssetType_Impl_ = function() { };
$hxClasses["openfl._Assets.AssetType_Impl_"] = openfl._Assets.AssetType_Impl_;
openfl._Assets.AssetType_Impl_.__name__ = ["openfl","_Assets","AssetType_Impl_"];
openfl._Assets.AssetType_Impl_._new = function(s) {
	return s;
};
openfl._Assets.AssetType_Impl_.toString = function(this1) {
	return this1;
};
openfl._Assets.AssetType_Impl_.fromString = function(s) {
	return s;
};
openfl._Assets.LibraryType_Impl_ = function() { };
$hxClasses["openfl._Assets.LibraryType_Impl_"] = openfl._Assets.LibraryType_Impl_;
openfl._Assets.LibraryType_Impl_.__name__ = ["openfl","_Assets","LibraryType_Impl_"];
openfl._Assets.LibraryType_Impl_._new = function(s) {
	return s;
};
openfl._Assets.LibraryType_Impl_.toString = function(this1) {
	return this1;
};
openfl._Assets.LibraryType_Impl_.fromString = function(s) {
	return s;
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
flash.display.DisplayObject.remapTouch = new haxe.ds.StringMap();
flash.display.DisplayObject.remapTouch.set("mousedown","touchstart");
flash.display.DisplayObject.remapTouch.set("mousemove","touchmove");
flash.display.DisplayObject.remapTouch.set("mouseup","touchend");
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
flash.Lib.__init();
(function() {
	var a = Event.prototype;
	var b = flash.events.Event.prototype;
	a.clone = b.clone;
	a.isDefaultPrevented = b.isDefaultPrevented;
	a.get_target = b.get_target;
	a.set_target = b.set_target;
	a.get_currentTarget = b.get_currentTarget;
	a.set_currentTarget = b.set_currentTarget;
})();
(function() {
	var o = MouseEvent.prototype;
	var q = flash.events.MouseEvent.prototype;
	o.get_buttonDown = q.get_buttonDown;
	o.get_delta = q.get_delta;
	o.get_stageX = q.get_stageX;
	o.get_stageY = q.get_stageY;
	o.get_localX = q.get_localX;
	o.get_localY = q.get_localY;
	o.get_localPoint = q.get_localPoint;
})();
haxe.Resource.content = [];
flash.Lib.qTimeStamp = Date.now() + 0;
flash.Lib.mouseX = 0;
flash.Lib.mouseY = 0;
flash.geom.Transform.DEG_TO_RAD = Math.PI / 180.0;
flash.media.Sound.library = new haxe.ds.StringMap();
haxe.ds.ObjectMap.count = 0;
nme.AssetData.className = new haxe.ds.StringMap();
nme.AssetData.library = new haxe.ds.StringMap();
nme.AssetData.path = new haxe.ds.StringMap();
nme.AssetData.type = new haxe.ds.StringMap();
nme.AssetData.initialized = false;
openfl.Assets.cachedBitmapData = new haxe.ds.StringMap();
openfl.Assets.initialized = false;
ApplicationMain.main();
})();
