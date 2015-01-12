/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
var ClientHash=function(){};ClientHash.prototype.putClientHash=function(a,c,b,d,e){document.cookie=a+"\x3d"+c+(b?"; domain\x3d"+b:"")+(d?"; path\x3d"+d:"; path\x3d/")+(e?"; Secure":"")};ClientHash.prototype.getClientHash=function(a){var c=document.cookie;a+="\x3d";var b=c.indexOf("; "+a);if(-1==b){if(b=c.indexOf(a),0!=b)return null}else b+=2;var d=document.cookie.indexOf(";",b);-1==d&&(d=c.length);return unescape(c.substring(b+a.length,d))};
ClientHash.prototype.needsClientHash=function(a,c,b,d){a=ClientHash.prototype.getClientHash(a);var e=a==c;e||(e=-1<unescape(window.location.href).indexOf(c,0));e||(window.location.href=d+"\x26winLoc\x3d"+window.location+"\x26c\x3d"+a+"\x26s\x3d"+c+"\x26cs\x3d"+b);return e};

//# sourceMappingURL=/javascript/1420712686000/sfdc/source/Security.js.map
