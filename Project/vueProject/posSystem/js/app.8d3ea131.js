(function(t){function e(e){for(var a,i,l=e[0],c=e[1],r=e[2],u=0,f=[];u<l.length;u++)i=l[u],s[i]&&f.push(s[i][0]),s[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(f.length)f.shift()();return n.push.apply(n,r||[]),o()}function o(){for(var t,e=0;e<n.length;e++){for(var o=n[e],a=!0,l=1;l<o.length;l++){var c=o[l];0!==s[c]&&(a=!1)}a&&(n.splice(e--,1),t=i(i.s=o[0]))}return t}var a={},s={app:0},n=[];function i(e){if(a[e])return a[e].exports;var o=a[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=a,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(o,a,function(e){return t[e]}.bind(null,a));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var r=0;r<l.length;r++)e(l[r]);var d=c;n.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"032d":function(t,e,o){"use strict";var a=o("7fe4"),s=o.n(a);s.a},"034f":function(t,e,o){"use strict";var a=o("c21b"),s=o.n(a);s.a},"0b67":function(t,e,o){},"56d7":function(t,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("097d");var a=o("2b0e"),s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("leftNav"),o("div",{staticClass:"main"},[o("router-view")],1)],1)},n=[],i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},l=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"leftNav"},[o("ul",[o("li",[o("i",{staticClass:"iconfont icon-shouyin"}),o("div",[t._v("收银")])]),o("li",[o("i",{staticClass:"iconfont icon-dianpu"}),o("div",[t._v("店铺")])]),o("li",[o("i",{staticClass:"iconfont icon-shiwu"}),o("div",[t._v("商品")])]),o("li",[o("i",{staticClass:"iconfont icon-huiyuan"}),o("div",[t._v("会员")])]),o("li",[o("i",{staticClass:"iconfont icon-statistics"}),o("div",[t._v("统计")])])])])}],c={name:"leftNav",data:function(){return{}}},r=c,d=(o("7c1d"),o("2877")),u=Object(d["a"])(r,i,l,!1,null,null,null);u.options.__file="leftNav.vue";var f=u.exports,p={name:"app",components:{leftNav:f}},v=p,b=(o("034f"),Object(d["a"])(v,s,n,!1,null,null,null));b.options.__file="App.vue";var h=b.exports,m=o("8c4f"),g=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"pos"},[o("div",[o("el-row",[o("el-col",{staticClass:"post-order",attrs:{span:7,id:"order-list"}},[o("el-tabs",{attrs:{stretch:!0}},[o("el-tab-pane",{attrs:{label:"点餐"}},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[o("el-table-column",{attrs:{prop:"goodsName",label:"商品名称"}}),o("el-table-column",{attrs:{prop:"count",label:"数量"}}),o("el-table-column",{attrs:{prop:"price",label:"价格"}}),o("el-table-column",{attrs:{label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){t.delSingleGood(e.row)}}},[t._v("删除")]),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){t.addOrderList(e.row)}}},[t._v("增加")])]}}])})],1),o("div",{staticClass:"totalList"},[o("small",[t._v("总数：")]),t._v(t._s(t.totalCount)+"   "),o("small",[t._v(" 总价格：")]),t._v(" "+t._s(t.totalPrice)+"\n                        ")]),o("div",{staticClass:"div-btn"},[o("el-button",{attrs:{type:"warning"}},[t._v("挂单")]),o("el-button",{attrs:{type:"danger"},on:{click:t.delAllGoods}},[t._v("删除")]),o("el-button",{attrs:{type:"success"},on:{click:t.checkOut}},[t._v("结账")])],1)],1),o("el-tab-pane",{attrs:{label:"挂单"}}),o("el-tab-pane",{attrs:{label:"外卖"}})],1)],1),o("el-col",{attrs:{span:17}},[o("div",{staticClass:"often-goods"},[o("div",{staticClass:"title"},[t._v("热门商品")]),o("div",{staticClass:"often-goods-list"},[o("ul",t._l(t.oftenGoods,function(e){return o("li",{on:{click:function(o){t.addOrderList(e)}}},[o("span",[t._v(t._s(e.goodsName))]),o("span",{staticClass:"o-price"},[t._v("￥"+t._s(e.price)+"元")])])}))])]),o("div",{staticClass:"good-type"},[o("el-tabs",{attrs:{stretch:!0}},[o("el-tab-pane",{attrs:{label:"汉堡"}},[o("ul",{staticClass:"cookList"},t._l(t.type0Goods,function(e){return o("li",{on:{click:function(o){t.addOrderList(e)}}},[o("span",{staticClass:"foodImg"},[o("img",{attrs:{src:e.goodsImg,width:"100%"}})]),o("span",{staticClass:"foodName"},[t._v(t._s(e.goodsName))]),o("span",{staticClass:"foodPrice"},[t._v("￥"+t._s(e.price)+"元")])])}))]),o("el-tab-pane",{attrs:{label:"小食"}},[o("ul",{staticClass:"cookList"},t._l(t.type1Goods,function(e){return o("li",{on:{click:function(o){t.addOrderList(e)}}},[o("span",{staticClass:"foodImg"},[o("img",{attrs:{src:e.goodsImg,width:"100%"}})]),o("span",{staticClass:"foodName"},[t._v(t._s(e.goodsName))]),o("span",{staticClass:"foodPrice"},[t._v("￥"+t._s(e.price)+"元")])])}))]),o("el-tab-pane",{attrs:{label:"饮料"}},[o("ul",{staticClass:"cookList"},t._l(t.type2Goods,function(e){return o("li",{on:{click:function(o){t.addOrderList(e)}}},[o("span",{staticClass:"foodImg"},[o("img",{attrs:{src:e.goodsImg,width:"100%"}})]),o("span",{staticClass:"foodName"},[t._v(t._s(e.goodsName))]),o("span",{staticClass:"foodPrice"},[t._v("￥"+t._s(e.price)+"元")])])}))]),o("el-tab-pane",{attrs:{label:"套餐"}},[o("ul",{staticClass:"cookList"},t._l(t.type3Goods,function(e){return o("li",{on:{click:function(o){t.addOrderList(e)}}},[o("span",{staticClass:"foodImg"},[o("img",{attrs:{src:e.goodsImg,width:"100%"}})]),o("span",{staticClass:"foodName"},[t._v(t._s(e.goodsName))]),o("span",{staticClass:"foodPrice"},[t._v("￥"+t._s(e.price)+"元")])])}))])],1)],1)])],1)],1)])},_=[],y=(o("ac6a"),o("7f43")),C=o.n(y),w={name:"pos",data:function(){return{tableData:[],oftenGoods:[],type0Goods:[],type1Goods:[],type2Goods:[],type3Goods:[],totalPrice:0,totalCount:0}},created:function(){var t=this;C.a.get("https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods").then(function(e){console.log(e),t.oftenGoods=e.data}).catch(function(t){alert("数据请求错误，请刷新页面")}),C.a.get("https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods").then(function(e){console.log(e),t.type0Goods=e.data[0],t.type1Goods=e.data[1],t.type2Goods=e.data[2],t.type3Goods=e.data[3]}).catch(function(t){alert("数据请求错误，请数刷新页面")})},mounted:function(){var t=document.body.clientHeight;document.getElementById("order-list").style.height=t+"px"},methods:{addOrderList:function(t){this.totalPrice=0,this.totalCount=0;for(var e=!1,o=0;o<this.tableData.length;o++)t.goodsId===this.tableData[o].goodsId&&(e=!0,this.tableData[o].count++);e||this.tableData.push({goodsId:t.goodsId,goodsName:t.goodsName,count:1,price:t.price}),this.getAll()},delSingleGood:function(t){this.tableData=this.tableData.filter(function(e){return e.goodsId!=t.goodsId}),this.getAll()},delAllGoods:function(){this.totalCount=0,this.totalPrice=0,this.tableData=[]},getAll:function(){var t=this;this.totalCount=0,this.totalPrice=0,this.tableData.forEach(function(e){t.totalPrice=t.totalPrice+e.count*e.price,t.totalCount+=e.count})},checkOut:function(){0!=this.totalCount?(this.delAllGoods(),this.$message({message:"结账成功，感谢您的付出！",type:"success"})):this.$message.error("不能空结，加油！")}}},k=w,G=(o("032d"),Object(d["a"])(k,g,_,!1,null,null,null));G.options.__file="Pos.vue";var O=G.exports;a["default"].use(m["a"]);var P=new m["a"]({routes:[{path:"/",name:"Pos",component:O}]}),N=o("beff"),I=o.n(N);o("f513");a["default"].config.productionTip=!1,a["default"].use(I.a),new a["default"]({router:P,render:function(t){return t(h)}}).$mount("#app")},"7c1d":function(t,e,o){"use strict";var a=o("0b67"),s=o.n(a);s.a},"7fe4":function(t,e,o){},c21b:function(t,e,o){}});
//# sourceMappingURL=app.8d3ea131.js.map