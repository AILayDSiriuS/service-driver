(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fd13215","chunk-36c929e6"],{"0418":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header"},[n("transition",{attrs:{name:"fade"}},[n("SearchOverlay",{directives:[{name:"show",rawName:"v-show",value:e.isSearchOverlayVisible,expression:"isSearchOverlayVisible"}],on:{close:e.closeSearchOverlay}})],1),n("router-link",{attrs:{to:"/"}},[n("div",{staticClass:"logo"},[n("h2",[e._v("ServiceDriver")])])]),n("div",{staticClass:"profile"},[n("div",{staticClass:"actions"},[n("div",{class:e.search,on:{click:e.showSearchOverlay}},[n("img",{attrs:{src:i("2f4d"),alt:"Search"}})]),n("div",{class:e.notification,on:{click:e.changeNotificationMenuState}},[0!=e.requests.length?n("div",{staticClass:"notify-counter"},[n("span",[e._v(e._s(e.requests.length))])]):e._e(),n("img",{attrs:{src:i("5b43"),alt:"Notification"}}),n("transition",{attrs:{name:"fade"}},[n("NotificationMenu",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hideNotificationMenu,expression:"hideNotificationMenu"},{name:"show",rawName:"v-show",value:e.isNotificationMenuOpened,expression:"isNotificationMenuOpened"}]})],1)],1)]),n("div",{staticClass:"quickProfile"},[n("div",{class:e.quickProfile,on:{click:e.changeProfileState}},[n("span",[e._v(e._s(e.name))]),n("div",{attrs:{id:"profilePicture"}}),e._m(0)]),n("transition",{attrs:{name:"fade"}},[e.isQuickProfileOpened?n("QuickProfile",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hideProfile,expression:"hideProfile"}],attrs:{email:e.email,username:e.name},on:{closeProfile:e.hideProfile}}):e._e()],1)],1)])],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"profileMenu"}},[n("img",{attrs:{src:i("122e"),alt:"Menu"}})])}],c=(i("99af"),i("b0c0"),i("d3b7"),i("ac1f"),i("3ca3"),i("5319"),i("ddb0"),i("2b3d"),i("e67d")),o=i.n(c),r={name:"Header",data:function(){return{id:"",email:"",username:"",name:"",isQuickProfileOpened:!1,isSearchOverlayVisible:!1,isNotificationMenuOpened:!1,requests:""}},computed:{quickProfile:function(){return this.isQuickProfileOpened?"quick-profile-wrapper quick-profile-active":"quick-profile-wrapper"},search:function(){return this.isSearchOverlayVisible?"search search-active":"search"},notification:function(){return this.isNotificationMenuOpened?"notification notification-active":"notification"}},beforeMount:function(){if(document.cookie){var e=document.cookie,t=e.replace(/token=/g,"");this.getData(t),this.getFriendRequests(t)}else this.$router.push({name:"Signin"})},methods:{getData:function(e){var t=this,i=new Headers;i.append("Authorization","Token ".concat(e));var n={method:"GET",headers:i,redirect:"follow"};fetch("http://95.214.62.187/auth/me/",n).then((function(e){return e.text()})).then((function(i){var n=JSON.parse(i);t.type=n.data.type,t.id=n.data.id,t.username=n.data.attributes.username,t.email=n.data.attributes.email,t.getUser(e)})).catch((function(e){return console.log("error",e)}))},getUser:function(e){var t=this,i=new Headers;i.append("Authorization","Token ".concat(e));var n=new URLSearchParams;n.append("user_id",this.id);var a={method:"POST",headers:i,body:n};fetch("http://95.214.62.187/api/v1/main/users/",a).then((function(e){return e.text()})).then((function(e){var i=JSON.parse(e);t.name="".concat(i.data.data[0].first_name," ").concat(i.data.data[0].last_name)})).catch((function(e){return console.log("error",e)}))},hideProfile:function(){this.isQuickProfileOpened=!1},changeProfileState:function(){this.isSearchOverlayVisible=!1,this.isNotificationMenuOpened=!1,this.isQuickProfileOpened?this.isQuickProfileOpened=!1:this.isQuickProfileOpened=!0},hideNotificationMenu:function(){this.isNotificationMenuOpened=!1},changeNotificationMenuState:function(){this.isQuickProfileOpened=!1,this.isSearchOverlayVisible=!1,this.isNotificationMenuOpened?this.isNotificationMenuOpened=!1:this.isNotificationMenuOpened=!0},showSearchOverlay:function(){this.isQuickProfileOpened=!1,this.isNotificationMenuOpened=!1,this.isSearchOverlayVisible=!0},closeSearchOverlay:function(){this.isSearchOverlayVisible=!1},getFriendRequests:function(e){var t=this,i=new Headers;i.append("Authorization","Token ".concat(e));var n={method:"GET",headers:i};fetch("http://95.214.62.187/api/v1/main/friendship/friend_requests/me/",n).then((function(e){return e.text()})).then((function(e){var i=JSON.parse(e);t.requests=i.data.data})).catch((function(e){return console.log("error",e)}))}},components:{QuickProfile:function(){return i.e("chunk-e76f88f8").then(i.bind(null,"5f48"))},NotificationMenu:function(){return i.e("chunk-4bd9230e").then(i.bind(null,"bc6f"))},SearchOverlay:function(){return i.e("chunk-dd7c7222").then(i.bind(null,"6426"))}},directives:{ClickOutside:o.a},mounted:function(){this.popupItem=this.$el}},s=r,u=(i("8baf"),i("2877")),l=Object(u["a"])(s,n,a,!1,null,null,null);t["default"]=l.exports},"122e":function(e,t,i){e.exports=i.p+"img/Arrow.a2da8913.svg"},"2f4d":function(e,t,i){e.exports=i.p+"img/Search.d453a31d.svg"},"5b43":function(e,t,i){e.exports=i.p+"img/Notification.073c087d.svg"},6860:function(e,t,i){},"8baf":function(e,t,i){"use strict";var n=i("6860"),a=i.n(n);a.a},b0c0:function(e,t,i){var n=i("83ab"),a=i("9bf2").f,c=Function.prototype,o=c.toString,r=/^\s*function ([^ (]*)/,s="name";n&&!(s in c)&&a(c,s,{configurable:!0,get:function(){try{return o.call(this).match(r)[1]}catch(e){return""}}})},e67d:function(e,t){function i(e){return"function"===typeof e.value||(console.warn("[Vue-click-outside:] provided expression",e.expression,"is not a function."),!1)}function n(e,t){if(!e||!t)return!1;for(var i=0,n=t.length;i<n;i++)try{if(e.contains(t[i]))return!0;if(t[i].contains(e))return!1}catch(a){return!1}return!1}function a(e){return"undefined"!==typeof e.componentInstance&&e.componentInstance.$isServer}e.exports={bind:function(e,t,c){if(!i(t))return;function o(t){if(c.context){var i=t.path||t.composedPath&&t.composedPath();i&&i.length>0&&i.unshift(t.target),e.contains(t.target)||n(c.context.popupItem,i)||e.__vueClickOutside__.callback(t)}}e.__vueClickOutside__={handler:o,callback:t.value};const r="ontouchstart"in document.documentElement?"touchstart":"click";!a(c)&&document.addEventListener(r,o)},update:function(e,t){i(t)&&(e.__vueClickOutside__.callback=t.value)},unbind:function(e,t,i){const n="ontouchstart"in document.documentElement?"touchstart":"click";!a(i)&&e.__vueClickOutside__&&document.removeEventListener(n,e.__vueClickOutside__.handler),delete e.__vueClickOutside__}}}}]);
//# sourceMappingURL=chunk-4fd13215.18f39a8a.js.map