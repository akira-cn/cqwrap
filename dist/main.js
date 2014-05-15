/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var g_resources=[{src:"res/img/HelloWorld.png"},{src:"res/img/CloseNormal.png"}];define("src/resource",function(){}),define("src/view/hello_world",["require","exports","module","cqwrap/scenes","cqwrap/layers","cqwrap/buttons","cqwrap/sprites"],function(e,t,n){var r=e("cqwrap/scenes").BaseScene,i=e("cqwrap/layers").GameLayer,s=e("cqwrap/buttons").Button,u=e("cqwrap/sprites").BaseSprite,a=i.extend({init:function(){this._super();var e=director.getWinSize(),t=cc.createSprite("@Hello World",{anchor:[.5,.5],xy:[e.width/2,600],fontSize:64});this.addChild(t);var n=cc.createSprite({texture:"res/img/HelloWorld.png",anchor:[.5,.5],xy:[e.width/2,e.height/2]});this.addChild(n);var r=new s({texture:"res/img/CloseNormal.png",anchor:[.5,.5],xy:[e.width-50,50]},function(){cc.log("close button clicked")});this.addChild(r);var i=cc.DrawNode.create();o=180,w=20,h=50,star=[cc.p(o,o),cc.p(o+w,o-h),cc.p(o+w*2,o),cc.p(o+w*2+h,o+w),cc.p(o+w*2,o+w*2),cc.p(o+w,o+w*2+h),cc.p(o,o+w*2),cc.p(o-h,o+w)],i.drawPoly(star,cc.c4f(1,0,0,.5),1,cc.c4f(0,0,1,1)),this.addChild(i)}}),f=r.extend({init:function(){this._super();var e=new a;this.addChild(e)}});n.exports=f}),require.config({urlArgs:"bust="+(new Date).getTime()}),require(["cqwrap/index","src/resource","src/view/hello_world"],function(e,e,t){var n=cc.Application.extend({config:document.ccConfig,ctor:function(e){this._super(),this.startScene=e,cc.COCOS2D_DEBUG=this.config.COCOS2D_DEBUG,cc.initDebugSetting(),cc.setup(this.config.tag),cc.AppController.shareAppController().didFinishLaunchingWithOptions()},applicationDidFinishLaunching:function(){if(cc.RenderDoesnotSupport())return alert("Browser doesn't support WebGL"),!1;var e=cc.Director.getInstance();return cc.EGLView.getInstance().resizeWithBrowserSize(!0),cc.EGLView.getInstance().setDesignResolutionSize(1280,720,cc.RESOLUTION_POLICY.SHOW_ALL),e.setDisplayStats(this.config.showFPS),e.setAnimationInterval(1/this.config.frameRate),cc.LoaderScene.preload(g_resources,function(){e.replaceScene(new this.startScene)},this),!0}}),r=new n(t)}),define("main-src",function(){});