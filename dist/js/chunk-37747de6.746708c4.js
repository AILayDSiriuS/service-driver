(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37747de6"],{"057f":function(t,e,r){var n=r("fc6a"),i=r("241c").f,o={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==o.call(t)?a(t):i(n(t))}},"159b":function(t,e,r){var n=r("da84"),i=r("fdbc"),o=r("17c2"),c=r("9112");for(var a in i){var f=n[a],u=f&&f.prototype;if(u&&u.forEach!==o)try{c(u,"forEach",o)}catch(s){u.forEach=o}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,i=r("a640"),o=r("ae40"),c=i("forEach"),a=o("forEach");t.exports=c&&a?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,r){var n=r("d039"),i=r("b622"),o=r("2d00"),c=i("species");t.exports=function(t){return o>=51||!n((function(){var e=[],r=e.constructor={};return r[c]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},4160:function(t,e,r){"use strict";var n=r("23e7"),i=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"4de4":function(t,e,r){"use strict";var n=r("23e7"),i=r("b727").filter,o=r("1dde"),c=r("ae40"),a=o("filter"),f=c("filter");n({target:"Array",proto:!0,forced:!a||!f},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"62f6":function(t,e,r){"use strict";var n=r("fb15"),i=r.n(n);i.a},"65f0":function(t,e,r){var n=r("861d"),i=r("e8b5"),o=r("b622"),c=o("species");t.exports=function(t,e){var r;return i(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?n(r)&&(r=r[c],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"746f":function(t,e,r){var n=r("428f"),i=r("5135"),o=r("e538"),c=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});i(e,t)||c(e,t,{value:o.f(t)})}},8418:function(t,e,r){"use strict";var n=r("c04e"),i=r("9bf2"),o=r("5c6c");t.exports=function(t,e,r){var c=n(e);c in t?i.f(t,c,o(0,r)):t[c]=r}},a3fd:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"articles-page"}},[r("Header"),r("Aside",{attrs:{active:"Главная"}}),r("div",{staticClass:"container"},[r("div",{staticClass:"section first"},[r("router-link",{attrs:{to:"/"}},[r("span",{staticClass:"prev-page"},[r("svg",{staticClass:"svg-inline--fa fa-angle-left fa-w-8",attrs:{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"angle-left",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 512"}},[r("path",{attrs:{fill:"currentColor",d:"M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"}})]),t._v(" PREVIOUS PAGE ")])]),r("h3",[t._v("Видео")])],1),r("div",{staticClass:"row"},t._l(t.VIDEOS.data.data.data,(function(t){return r("Video",{key:t.id,attrs:{data:t}})})),1)]),r("Footer")],1)},i=[],o=(r("d3b7"),r("ac1f"),r("5319"),r("5530")),c=r("2f62"),a={name:"Videos",data:function(){return{id:"",email:"",username:""}},beforeMount:function(){if(document.cookie){var t=document.cookie,e=t.replace(/token=/g,"");this.getData(e)}else this.$router.push({name:"Signin"})},computed:Object(o["a"])({},Object(c["c"])(["VIDEOS"])),methods:Object(o["a"])({getData:function(t){var e=this,r=new Headers;r.append("Authorization","Token ".concat(t));var n={method:"GET",headers:r,redirect:"follow"};fetch("http://95.214.62.187/auth/me/",n).then((function(t){return t.text()})).then((function(t){var r=JSON.parse(t);e.type=r.data.type,e.id=r.data.id,e.username=r.data.attributes.username,e.email=r.data.attributes.email})).catch((function(t){return console.log("error",t)}))}},Object(c["b"])(["GET_VIDEOS_FROM_API"])),mounted:function(){this.GET_VIDEOS_FROM_API()},components:{Header:function(){return Promise.all([r.e("chunk-16eaa619"),r.e("chunk-46f26466")]).then(r.bind(null,"0418"))},Video:function(){return r.e("chunk-d86de488").then(r.bind(null,"9cbc"))},Footer:function(){return r.e("chunk-d06359f4").then(r.bind(null,"fd2d"))},Aside:function(){return r.e("chunk-6b748234").then(r.bind(null,"3d13"))}}},f=a,u=(r("62f6"),r("2877")),s=Object(u["a"])(f,n,i,!1,null,"fd9d4c52",null);e["default"]=s.exports},a4d3:function(t,e,r){"use strict";var n=r("23e7"),i=r("da84"),o=r("d066"),c=r("c430"),a=r("83ab"),f=r("4930"),u=r("fdbf"),s=r("d039"),l=r("5135"),d=r("e8b5"),b=r("861d"),p=r("825a"),h=r("7b0b"),v=r("fc6a"),g=r("c04e"),y=r("5c6c"),m=r("7c73"),O=r("df75"),S=r("241c"),w=r("057f"),j=r("7418"),P=r("06cf"),E=r("9bf2"),L=r("d1e7"),k=r("9112"),x=r("6eeb"),T=r("5692"),A=r("f772"),C=r("d012"),D=r("90e3"),V=r("b622"),M=r("e538"),_=r("746f"),G=r("d44e"),I=r("69f3"),N=r("b727").forEach,R=A("hidden"),F="Symbol",H="prototype",J=V("toPrimitive"),B=I.set,z=I.getterFor(F),$=Object[H],q=i.Symbol,Q=o("JSON","stringify"),U=P.f,W=E.f,K=w.f,X=L.f,Y=T("symbols"),Z=T("op-symbols"),tt=T("string-to-symbol-registry"),et=T("symbol-to-string-registry"),rt=T("wks"),nt=i.QObject,it=!nt||!nt[H]||!nt[H].findChild,ot=a&&s((function(){return 7!=m(W({},"a",{get:function(){return W(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=U($,e);n&&delete $[e],W(t,e,r),n&&t!==$&&W($,e,n)}:W,ct=function(t,e){var r=Y[t]=m(q[H]);return B(r,{type:F,tag:t,description:e}),a||(r.description=e),r},at=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof q},ft=function(t,e,r){t===$&&ft(Z,e,r),p(t);var n=g(e,!0);return p(r),l(Y,n)?(r.enumerable?(l(t,R)&&t[R][n]&&(t[R][n]=!1),r=m(r,{enumerable:y(0,!1)})):(l(t,R)||W(t,R,y(1,{})),t[R][n]=!0),ot(t,n,r)):W(t,n,r)},ut=function(t,e){p(t);var r=v(e),n=O(r).concat(pt(r));return N(n,(function(e){a&&!lt.call(r,e)||ft(t,e,r[e])})),t},st=function(t,e){return void 0===e?m(t):ut(m(t),e)},lt=function(t){var e=g(t,!0),r=X.call(this,e);return!(this===$&&l(Y,e)&&!l(Z,e))&&(!(r||!l(this,e)||!l(Y,e)||l(this,R)&&this[R][e])||r)},dt=function(t,e){var r=v(t),n=g(e,!0);if(r!==$||!l(Y,n)||l(Z,n)){var i=U(r,n);return!i||!l(Y,n)||l(r,R)&&r[R][n]||(i.enumerable=!0),i}},bt=function(t){var e=K(v(t)),r=[];return N(e,(function(t){l(Y,t)||l(C,t)||r.push(t)})),r},pt=function(t){var e=t===$,r=K(e?Z:v(t)),n=[];return N(r,(function(t){!l(Y,t)||e&&!l($,t)||n.push(Y[t])})),n};if(f||(q=function(){if(this instanceof q)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=D(t),r=function(t){this===$&&r.call(Z,t),l(this,R)&&l(this[R],e)&&(this[R][e]=!1),ot(this,e,y(1,t))};return a&&it&&ot($,e,{configurable:!0,set:r}),ct(e,t)},x(q[H],"toString",(function(){return z(this).tag})),x(q,"withoutSetter",(function(t){return ct(D(t),t)})),L.f=lt,E.f=ft,P.f=dt,S.f=w.f=bt,j.f=pt,M.f=function(t){return ct(V(t),t)},a&&(W(q[H],"description",{configurable:!0,get:function(){return z(this).description}}),c||x($,"propertyIsEnumerable",lt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!f,sham:!f},{Symbol:q}),N(O(rt),(function(t){_(t)})),n({target:F,stat:!0,forced:!f},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var r=q(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),n({target:"Object",stat:!0,forced:!f,sham:!a},{create:st,defineProperty:ft,defineProperties:ut,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!f},{getOwnPropertyNames:bt,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:s((function(){j.f(1)}))},{getOwnPropertySymbols:function(t){return j.f(h(t))}}),Q){var ht=!f||s((function(){var t=q();return"[null]"!=Q([t])||"{}"!=Q({a:t})||"{}"!=Q(Object(t))}));n({target:"JSON",stat:!0,forced:ht},{stringify:function(t,e,r){var n,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(n=e,(b(e)||void 0!==t)&&!at(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!at(e))return e}),i[1]=e,Q.apply(null,i)}})}q[H][J]||k(q[H],J,q[H].valueOf),G(q,F),C[R]=!0},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},ae40:function(t,e,r){var n=r("83ab"),i=r("d039"),o=r("5135"),c=Object.defineProperty,a={},f=function(t){throw t};t.exports=function(t,e){if(o(a,t))return a[t];e||(e={});var r=[][t],u=!!o(e,"ACCESSORS")&&e.ACCESSORS,s=o(e,0)?e[0]:f,l=o(e,1)?e[1]:void 0;return a[t]=!!r&&!i((function(){if(u&&!n)return!0;var t={length:-1};u?c(t,1,{enumerable:!0,get:f}):t[1]=1,r.call(t,s,l)}))}},b64b:function(t,e,r){var n=r("23e7"),i=r("7b0b"),o=r("df75"),c=r("d039"),a=c((function(){o(1)}));n({target:"Object",stat:!0,forced:a},{keys:function(t){return o(i(t))}})},b727:function(t,e,r){var n=r("0366"),i=r("44ad"),o=r("7b0b"),c=r("50c4"),a=r("65f0"),f=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,s=4==t,l=6==t,d=5==t||l;return function(b,p,h,v){for(var g,y,m=o(b),O=i(m),S=n(p,h,3),w=c(O.length),j=0,P=v||a,E=e?P(b,w):r?P(b,0):void 0;w>j;j++)if((d||j in O)&&(g=O[j],y=S(g,j,m),t))if(e)E[j]=y;else if(y)switch(t){case 3:return!0;case 5:return g;case 6:return j;case 2:f.call(E,g)}else if(s)return!1;return l?-1:u||s?s:E}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},dbb4:function(t,e,r){var n=r("23e7"),i=r("83ab"),o=r("56ef"),c=r("fc6a"),a=r("06cf"),f=r("8418");n({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var e,r,n=c(t),i=a.f,u=o(n),s={},l=0;while(u.length>l)r=i(n,e=u[l++]),void 0!==r&&f(s,e,r);return s}})},e439:function(t,e,r){var n=r("23e7"),i=r("d039"),o=r("fc6a"),c=r("06cf").f,a=r("83ab"),f=i((function(){c(1)})),u=!a||f;n({target:"Object",stat:!0,forced:u,sham:!a},{getOwnPropertyDescriptor:function(t,e){return c(o(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},fb15:function(t,e,r){},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-37747de6.746708c4.js.map