/**
 * Copyright (c) 2010 Maxim Vasiliev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Maxim Vasiliev
 * Date: 09.09.2010
 * Time: 19:02:33
 */

var form2js=function(){function e(e,r,i,s,o,u){if(typeof i=="undefined"||i==null)i=!0;if(typeof s=="undefined"||s==null)s=!0;if(typeof r=="undefined"||r==null)r=".";arguments.length<6&&(u=!1),e=typeof e=="string"?document.getElementById(e):e;var a=[],f,l=0;if(e.constructor==Array||typeof NodeList!="undefined"&&e.constructor==NodeList)while(f=e[l++])a=a.concat(n(f,o,u));else a=n(e,o,u);return t(a,i,s,r)}function t(e,t,n,r){var i={},s={},o,u,a,f,l,c,h,p,d,v,m,g,y;for(o=0;o<e.length;o++){l=e[o].value,n&&l===""&&(l=null);if(!(!t||l!==""&&l!==null))continue;g=e[o].name;if(typeof g=="undefined")continue;y=g.split(r),c=[],h=i,p="";for(u=0;u<y.length;u++){m=y[u].split("][");if(m.length>1)for(a=0;a<m.length;a++){a==0?m[a]=m[a]+"]":a==m.length-1?m[a]="["+m[a]:m[a]="["+m[a]+"]",v=m[a].match(/([a-z_]+)?\[([a-z_][a-z0-9_]+?)\]/i);if(v)for(f=1;f<v.length;f++)v[f]&&c.push(v[f]);else c.push(m[a])}else c=c.concat(m)}for(u=0;u<c.length;u++)m=c[u],m.indexOf("[]")>-1&&u==c.length-1?(d=m.substr(0,m.indexOf("[")),p+=d,h[d]||(h[d]=[]),h[d].push(l)):m.indexOf("[")>-1?(d=m.substr(0,m.indexOf("[")),v=m.replace(/(^([a-z_]+)?\[)|(\]$)/gi,""),p+="_"+d+"_"+v,s[p]||(s[p]={}),d!=""&&!h[d]&&(h[d]=[]),u==c.length-1?d==""?(h.push(l),s[p][v]=h[h.length-1]):(h[d].push(l),s[p][v]=h[d][h[d].length-1]):s[p][v]||(/^[a-z_]+\[?/i.test(c[u+1])?h[d].push({}):h[d].push([]),s[p][v]=h[d][h[d].length-1]),h=s[p][v]):(p+=m,u<c.length-1?(h[m]||(h[m]={}),h=h[m]):h[m]=l)}return i}function n(e,t,n){var s=i(e,t,n);return s.length>0?s:r(e,t,n)}function r(e,t,n){var r=[],s=e.firstChild;while(s)r=r.concat(i(s,t,n)),s=s.nextSibling;return r}function i(e,t,n){var i,u,a,f=s(e,n);return i=t&&t(e),i&&i.name?a=[i]:f!=""&&e.nodeName.match(/INPUT|TEXTAREA/i)?(u=o(e),u==null&&e.type=="radio"?a=[]:a=[{name:f,value:u}]):f!=""&&e.nodeName.match(/SELECT/i)?(u=o(e),a=[{name:f.replace(/\[\]$/,""),value:u}]):a=r(e,t,n),a}function s(e,t){return e.name&&e.name!=""?e.name:t&&e.id&&e.id!=""?e.id:""}function o(e){if(e.disabled)return null;switch(e.nodeName){case"TEXTAREA":return $("<div/>").text(e.value).html();case"INPUT":switch(e.type.toLowerCase()){case"radio":case"checkbox":if(e.checked)return e.value;break;case"button":case"reset":case"submit":case"image":return"";default:return e.value}break;case"SELECT":return u(e);default:}return null}function u(e){var t=e.multiple,n=[],r,i,s;if(!t)return e.value;for(r=e.getElementsByTagName("option"),i=0,s=r.length;i<s;i++)r[i].selected&&n.push(r[i].value);return n}return e}();LSP.utilities=LSP.utilities||{},LSP.utilities.formToObject=form2js;