(function(){var timesliceJS,initJQuery;
if(window.amznJQ){timesliceJS=amznJQ._timesliceJS;
initJQuery=amznJQ.initJQuery;
delete amznJQ._timesliceJS;
delete amznJQ.initJQuery;
}var isRunning=false,cbsWaiting=[];
var doDeferred=function(){;
isRunning=true;
var stopTime=(new Date()).getTime()+40;
var callingCB;
try{while(cbsWaiting.length&&(new Date()).getTime()<=stopTime){var cb=cbsWaiting.shift();
callingCB=true;
cb();
callingCB=false;
}}finally{if(callingCB){;
}if(cbsWaiting.length){;
setTimeout(doDeferred,0);
}else{;
isRunning=false;
}}};
var callInTimeslice=function(cbOrArray){if(typeof cbOrArray==="function"){cbsWaiting.push(cbOrArray);
}else{cbsWaiting=cbsWaiting.concat(cbOrArray);
}if(!isRunning){isRunning=true;
setTimeout(doDeferred,0);
}};
var initAmznJQ=function(){var $=window.jQuery,jQuery=$;
if(!jQuery){return;
}var bootstrapAmznJQ=window.amznJQ;
if(!window.goN2Debug){window.goN2Debug=new function(){this.info=function(){};
return this;
};
}window.amznJQ=new function(){;
var me=this;
me.jQuery=jQuery;
jQuery.noConflict(true);
if(window.jQuery){;
}else{window.jQuery=jQuery;
}var _logicalToPhysical={JQuery:{functionality:"JQuery",urls:null},popover:{functionality:"popover",urls:null}};
var _func_loaded={};
var _url_loaded={};
var _loading={};
function _loadFunctionality(functionality){var urls=_logicalToPhysical[functionality].urls;
if(urls){;
$.each(urls,function(){if(!_url_loaded[this]){_loadURL(this,functionality);
}});
}else{;
}}function _loadURL(url,functionality){;
$.ajax({type:"GET",url:url,success:_onUrlLoadedFcn(url,functionality),dataType:"script",cache:true});
}function _onUrlLoadedFcn(url,functionality){return function(){;
_url_loaded[url]=true;
var all_loaded=true;
$.each(_logicalToPhysical[functionality].urls,function(){all_loaded=all_loaded&&!!_url_loaded[this];
});
if(all_loaded){}};
}me.addLogical=function(functionality,urls){var ul=urls?urls.length:"no";
;
_logicalToPhysical[functionality]={functionality:functionality,urls:urls};
if(!urls){me.declareAvailable(functionality);
return;
}if(_loading[functionality]){_loadFunctionality(functionality);
}};
me.declareAvailable=function(functionality){;
if(typeof _logicalToPhysical[functionality]=="undefined"){_logicalToPhysical[functionality]={functionality:functionality,urls:null};
}_func_loaded[functionality]=true;
triggerEventCallbacks(functionality+".loaded");
};
me.addStyle=function(css_url){var dcss=document.styleSheets[0];
if(dcss&&dcss.addImport){while(dcss.imports.length>=31){dcss=dcss.imports[0];
}dcss.addImport(css_url);
}else{$("style[type='text/css']:first").append('@import url("'+css_url+'");');
}};
me.addStyles=function(args){var urls=args.urls||[];
var styles=args.styles||[];
var dcss=document.styleSheets;
if(dcss&&!dcss.length&&document.createStyleSheet){document.createStyleSheet();
}dcss=dcss[0];
if(dcss&&dcss.addImport){$.each(urls,function(){while(dcss.imports.length>=31){dcss=dcss.imports[0];
}dcss.addImport(this);
});
}else{$.each(urls,function(){var attrs={type:"text/css",rel:"stylesheet",href:this};
$("head").append($("<link/>").attr(attrs));
});
}var css="";
$.each(styles,function(){css+=this;
});
if(css){if(document.createStyleSheet){try{var sheet=document.createStyleSheet();
sheet.cssText=css;
}catch(e){}}else{$("head").append($("<style/>").attr({type:"text/css"}).append(css));
}}};
var eventCBQueue={};
var enqueueEventCallback=function(eventName,cb){if(!timesliceJS){$(document).one(eventName,cb);
return;
}var queue=eventCBQueue[eventName]||[];
queue.push(function(){cb(jQuery.event.fix({type:eventName}));
});
eventCBQueue[eventName]=queue;
};
var triggerEventCallbacks=function(eventName){if(!timesliceJS){$(document).trigger(eventName);
return;
}var queue=eventCBQueue[eventName];
if(queue){callInTimeslice(queue);
delete eventCBQueue[eventName];
}};
var doEventCallbackNow=function(eventName,cb){if(!timesliceJS){$(document).one(eventName,cb);
$(document).trigger(eventName);
}else{if(eventCBQueue[eventName]){enqueueEventCallback(eventName,cb);
triggerEventCallbacks(eventName);
}else{callInTimeslice(function(){cb(jQuery.event.fix({type:eventName}));
});
}}};
me.available=function(functionality,eventCallbackFunction){if(_func_loaded[functionality]){;
doEventCallbackNow(functionality+".loaded",eventCallbackFunction);
}else{if(_loading[functionality]){;
enqueueEventCallback(functionality+".loaded",eventCallbackFunction);
}else{if(_logicalToPhysical[functionality]){;
_loading[functionality]=true;
enqueueEventCallback(functionality+".loaded",eventCallbackFunction);
_loadFunctionality(functionality);
}else{;
_loading[functionality]=true;
enqueueEventCallback(functionality+".loaded",eventCallbackFunction);
}}}};
me.onReady=function(functionality,eventCallbackFunction){var ajq=this;
$(function(){ajq.available(functionality,eventCallbackFunction);
});
};
var _stage_completed={};
var _fail_safe_stages=["amznJQ.theFold","amznJQ.criticalFeature"];
me.onCompletion=function(stage,callbackFn){if(_stage_completed[stage]){;
doEventCallbackNow(stage,callbackFn);
}else{;
enqueueEventCallback(stage,callbackFn);
}};
me.completedStage=function(stage){if(!_stage_completed[stage]){;
_stage_completed[stage]=true;
triggerEventCallbacks(stage);
}};
me.windowOnLoad=function(){;
$.each(_fail_safe_stages,function(){if(!_stage_completed[this]){;
_stage_completed[this]=true;
triggerEventCallbacks(this);
}});
};
(function(){var plUrls=[],lowPriUrls=[],hiPriUrls=[],isLowPriEligibleYet=false,ST=setTimeout,doc=document,docElem=doc.documentElement,styleObj=docElem.style,nav=navigator,isGecko=("MozAppearance" in styleObj),isWebkit=!isGecko&&("webkitAppearance" in styleObj),isSafari=(isWebkit&&nav.vendor.indexOf("Apple")===0),isIE=!isGecko&&!isWebkit&&nav.appName.indexOf("Microsoft")===0,isMobile=(nav.userAgent.indexOf("Mobile")!=-1),allowedLoaders=window.plCount!==undefined?window.plCount():(((!isMobile&&(isWebkit||isGecko))||(isIE&&typeof XDomainRequest==="object"))?5:2),currentLoaders=0,timeout=2500;
function setLoadState(){if(hiPriUrls.length>0){plUrls=hiPriUrls;
}else{plUrls=lowPriUrls;
if(plUrls.length===0||!isLowPriEligibleYet){return false;
}}if(currentLoaders>=allowedLoaders){return false;
}currentLoaders++;
return true;
}function loaderDone(loader,timer){clearTimeout(timer);
currentLoaders=currentLoaders<1?0:currentLoaders-1;
destroyLoader(loader);
if(!isIE){load();
}else{ST(load,0);
}}function destroyElement(el){if(el){var p=el.parentElement;
if(p){p.removeChild(el);
}el=null;
}}var destroyLoader=function(loader){if(isGecko){setTimeout(function(){destroyElement(loader);
},5);
}else{destroyElement(loader);
}};
var load=!(isIE||isGecko||isWebkit)?function(){;
}:function(){if(!setLoadState()){return;
}var url=plUrls.pop(),loader,hL=plUrls===hiPriUrls?"H":"L",timer;
;
if(isGecko){loader=doc.createElement("object");
}else{if(isSafari){var end=url.indexOf("?");
end=end>0?end:url.length;
var posDot=url.lastIndexOf(".",end);
if(posDot){switch(url.substring(posDot+1,end).toLowerCase()){case"js":loader=doc.createElement("script");
loader.type="f";
break;
case"png":case"jpg":case"jpeg":case"gif":loader=new Image();
break;
}}if(!loader){;
loaderDone(url);
return;
}}else{loader=new Image();
}}loader.onerror=function(){;
loaderDone(loader,timer);
};
loader.onload=function(){;
loaderDone(loader,timer);
};
if(isGecko||(isSafari&&loader.tagName=="SCRIPT")){timer=ST(function(){;
loaderDone(loader,timer);
},timeout+Math.random()*100);
}if(isGecko){loader.data=url;
}else{loader.src=url;
}if(!isIE){loader.width=loader.height=0;
loader.style.display="none";
docElem.appendChild(loader);
}if(currentLoaders<allowedLoaders){load();
}};
function processUrlList(urlList,target){if(typeof(urlList)==="string"){urlList=[urlList];
}else{if(typeof(urlList)!=="object"||urlList===null){return;
}}var i,u;
for(i=0;
i<urlList.length;
i++){u=urlList[i];
if(u&&typeof(u)!=="string"){processUrlList(u,target);
}else{if(u&&!(u[0]==" ")){target.splice(Math.round(Math.random()*target.length),0,u);
}}}}me._getPLStat=function(){return{H:hiPriUrls.length,L:lowPriUrls.length,P:plUrls.length,CL:currentLoaders,AL:allowedLoaders};
};
me.addPL=function(urlList){processUrlList(urlList,lowPriUrls);
load();
};
me.PLNow=function(urlList){processUrlList(urlList,hiPriUrls);
load();
};
function triggerPagePreloads(){isLowPriEligibleYet=true;
load();
}if(typeof bootstrapAmznJQ.PLTriggerName!=="undefined"){amznJQ.available(bootstrapAmznJQ.PLTriggerName,triggerPagePreloads);
}else{$(window).load(function(){ST(triggerPagePreloads,1000);
});
}}());
me.strings={};
me.chars={};
if(bootstrapAmznJQ){$.extend(this.strings,bootstrapAmznJQ.strings);
$.extend(this.chars,bootstrapAmznJQ.chars);
}}();
$(window).load(function(){amznJQ.windowOnLoad();
});
if(window.ue&&bootstrapAmznJQ&&window.ues&&window.uex){ues("wb","jQueryActive",1);
uex("ld","jQueryActive");
}amznJQ.declareAvailable("JQuery");
amznJQ.declareAvailable("jQuery");
if(bootstrapAmznJQ){;
$.each(bootstrapAmznJQ._l,function(){amznJQ.addLogical(this[0],this[1]);
});
$.each(bootstrapAmznJQ._s,function(){amznJQ.addStyle(this[0]);
});
$.each(bootstrapAmznJQ._d,function(){amznJQ.declareAvailable(this[0],this[1]);
});
$.each(bootstrapAmznJQ._a,function(){amznJQ.available(this[0],this[1]);
});
$.each(bootstrapAmznJQ._t||[],function(){callInTimeslice(this[0]);
});
$.each(bootstrapAmznJQ._o,function(){amznJQ.onReady(this[0],this[1]);
});
$.each(bootstrapAmznJQ._c,function(){amznJQ.onCompletion(this[0],this[1]);
});
$.each(bootstrapAmznJQ._cs,function(){amznJQ.completedStage(this[0],this[1]);
});
amznJQ.addPL(bootstrapAmznJQ._pl);
}};
if(!initJQuery){initAmznJQ();
}else{if(!timesliceJS){initJQuery();
initAmznJQ();
}else{callInTimeslice(initJQuery);
callInTimeslice(initAmznJQ);
}}})();
