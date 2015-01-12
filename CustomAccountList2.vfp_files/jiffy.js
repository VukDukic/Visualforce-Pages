
var Jiffy=function(){this.addBulkLoad=function(_eventName,elapsedTime){measures.captured[_eventName]=elapsedTime;}
this.getUID=function(){return Math.round(Math.random()*1000000000000000);}
this.checkRemoveEvent=function(eventName){if(eventsForRemoval[eventName]!=null){var captureDetails=eventsForRemoval[eventName];Jiffy.utils.removeEvent(captureDetails.element_id,captureDetails.browser_event,captureDetails.callback_func,true);}}
this.addMarksMeasures=function(referenceID,eventName,elapseTime,refTime){marks_measures.push({name:referenceID,evt:eventName,et:elapseTime,rt:refTime});}
var eventsForRemoval={};var pageTimer=(window.JiffyParams!=undefined&&JiffyParams.jsStart!=undefined)?JiffyParams.jsStart:(new Date()).getTime();var pname=(window.JiffyParams!=undefined&&JiffyParams.pname!=undefined)?JiffyParams.pname:encodeURI(window.location);var uid=(window.JiffyParams!=undefined&&JiffyParams.uid!=undefined)?JiffyParams.uid:getUID();var markers=[];var measures={pn:pname,st:pageTimer,uid:uid,captured:{}};var marks_measures=[];return{mark:function(referenceID){var currTime=(new Date()).getTime();markers[referenceID]={startTime:currTime,lastTime:currTime};},measure:function(eventName,referenceID){if(Jiffy.options.USE_JIFFY==undefined||!Jiffy.options.USE_JIFFY){return};var _eventName=(typeof eventName=="string"?eventName:eventName.type);var currTime=new Date().getTime();var refStartTime;var elapsedTime;if(referenceID!=null&&markers[referenceID]!=null){refStartTime=markers[referenceID].lastTime;elapsedTime=currTime-refStartTime;markers[referenceID].lastTime=currTime;}
else
{refStartTime=pageTimer;elapsedTime=currTime-refStartTime;}
if(referenceID!=null){addMarksMeasures(referenceID,_eventName,elapsedTime,refStartTime);}
else{markers["PageStart"]={startTime:refStartTime,lastTime:currTime};addMarksMeasures("PageStart",_eventName,elapsedTime,refStartTime);}
if(Jiffy.options.ISBULKLOAD&&_eventName!="unload"){addBulkLoad(_eventName,elapsedTime);}
else{var curMeasures=Jiffy.utils.formatMeasure(_eventName,elapsedTime);}
checkRemoveEvent(eventName);},_bulkLoad:function(){var bulkmeasures=Jiffy.getMeasures();var bulkmeasuresCount=bulkmeasures.length;var measuresStr="";for(x=0;x<bulkmeasuresCount;x++){measuresStr+=Jiffy.utils.formatMeasure(bulkmeasures[x].evt,bulkmeasures[x].et)+",";}
measuresStr=measuresStr.replace(/\,$/g,'');Jiffy.Ajax.get('/rx',{uid:uid,st:pageTimer,pn:pname,ets:measuresStr});},getMeasures:function(){return marks_measures;},clearMeasures:function(){marks_measures=[];markers=[];}}}();Jiffy.options={USE_JIFFY:true,ISBULKLOAD:false,BROWSER_EVENTS:{"unload":window,"load":window},SOFT_ERRORS:false};Jiffy.utils={inArray:function(ary,target){for(var i=0,len=ary.length;i<len;i++){if(target==ary[i]){return true;}}
return false;},get:function(id){return document.getElementById(id);},onDOMReady:function(func){if(document.addEventListener){document.addEventListener("DOMContentLoaded",func,false);}
/*@cc_on @*/
/*@if (@_win32)
        document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
        var script = document.getElementById("__ie_onload");
        script.onreadystatechange = function() {
          if (this.readyState == "complete") {
                func.call();
          }
        };
        /*@end @*/
if(/WebKit/i.test(navigator.userAgent)){var _timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){func;}},10);}},on:function(elem,evt,func,bubble){bubble=bubble||false;if(evt=='DOMReady'){this.onDOMReady(func);return true;}
else{var el=(typeof(elem)=='string')?this.get(elem):elem;if(window.addEventListener){el.addEventListener(evt,func,bubble);return true;}
else
if(window.attachEvent){el.attachEvent('on'+evt,func);return true;}
else{return false;}}},serialize:function(obj){var str='';if(typeof(obj)=='object'){for(key in obj){str+=key+'='+obj[key]+'&';}}
return str.replace(/&$/,'');},formatMeasure:function(name,val){return name+":"+val;},hashToJiffyList:function(obj){var str='';if(typeof(obj)=='object'){for(key in obj){if(typeof(obj[key])=='object'){Jiffy.utils.hashToJiffyList(obj[key]);}
else{str+=Jiffy.utils.formatMeasure(key,obj[key])+',';}}}
return str.replace(/,$/,'');},removeEvent:function(elem,evt,func,bubble){var el=(typeof(elem)=='string')?this.get(elem):elem;if(window.removeEventListener){el.removeEventListener(evt,func,bubble);return true;}
else
if(window.detachEvent){el.detachEvent('on'+evt,func);return true;}
else{return false;}},getUID:function(){return Math.round(Math.random()*1000000000000000);},hashMerge:function(hash1,hash2){for(var option in hash1)
{if(hash2[option]!=null){hash2[option]=hash1[option];}}}};Jiffy.Ajax={connection:function(){return((window.XMLHttpRequest)?new XMLHttpRequest():(window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):null);},post:function(url,params,success,failure){var req=this.connection();var strParams=(typeof(params)=='string')?params:Jiffy.utils.serialize(params);req.onreadystatechange=(!success&&!failure)?function(){return;}:function(){if(this.status==200){if(success){success.call(req);}}
else{if(failure){failure.call(req);}}};req.open('POST',url,true);req.send(strParams);},get:function(url,params,success,failure){var req=this.connection();var strParams=(typeof(params)=='string')?params:Jiffy.utils.serialize(params);url+='?'+strParams;req.onreadystatechange=(!success&&!failure)?function(){return;}:function(){if(req.readyState!=4)
return;if(req.status==200){if(success){success.call(req);}}
else{if(failure){failure.call(req);}}};req.open('GET',url,true);req.send(null);}};Jiffy.utils.escapeQuote=function(str){str=str+"";return str.replace(/\n/g,"").replace(/"/g,"\"");}
Jiffy.toCSV=function(){var measures=Jiffy.getMeasures(),csv="";for(var i=0;i<measures.length;i++){csv+='"'+Jiffy.utils.escapeQuote(measures[i].name)+'","'+Jiffy.utils.escapeQuote(measures[i].evt)+'","'+Jiffy.utils.escapeQuote(measures[i].et)+'"\n';}
var jiffyDiv=document.getElementById("_jiffy");if(!jiffyDiv){jiffyDiv=document.createElement("textarea");jiffyDiv.id="_jiffy";document.body.appendChild(jiffyDiv);}
jiffyDiv.value=csv;return 1;}
Jiffy.init=function(){if(window.JiffyOptions!=undefined){Jiffy.utils.hashMerge(window.JiffyOptions,Jiffy.options);}
if(Jiffy.options.USE_JIFFY==undefined||!Jiffy.options.USE_JIFFY){return};var BROWSER_EVENTS=Jiffy.options.BROWSER_EVENTS;for(var bEvents in BROWSER_EVENTS)
{var objToBind=BROWSER_EVENTS[bEvents];if(objToBind){Jiffy.utils.on(objToBind,bEvents,Jiffy.measure);}}
if(Jiffy.options.ISBULKLOAD){Jiffy.utils.on(window,"load",Jiffy._bulkLoad);}};Jiffy.init();