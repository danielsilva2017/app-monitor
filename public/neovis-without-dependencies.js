!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("@babel/runtime-corejs3/helpers/defineProperty"),require("neo4j-driver"),require("@babel/runtime-corejs3/regenerator"),require("@babel/runtime-corejs3/core-js/get-iterator"),require("@babel/runtime-corejs3/helpers/asyncToGenerator"),require("@babel/runtime-corejs3/helpers/classCallCheck"),require("@babel/runtime-corejs3/helpers/createClass"),require("@babel/runtime-corejs3/core-js-stable/object/values"),require("vis-network/dist/vis-network.min"),require("@babel/runtime-corejs3/core-js-stable/set-timeout"),require("@babel/runtime-corejs3/core-js-stable/promise"),require("@babel/runtime-corejs3/core-js-stable/instance/map"),require("@babel/runtime-corejs3/core-js-stable/instance/concat"),require("@babel/runtime-corejs3/helpers/typeof"),require("@babel/runtime-corejs3/core-js-stable/instance/for-each"),require("@babel/runtime-corejs3/core-js-stable/parse-int"),require("@babel/runtime-corejs3/core-js-stable/instance/includes"),require("vis-network/dist/vis-network.min.css")):"function"==typeof define&&define.amd?define(["@babel/runtime-corejs3/helpers/defineProperty","neo4j-driver","@babel/runtime-corejs3/regenerator","@babel/runtime-corejs3/core-js/get-iterator","@babel/runtime-corejs3/helpers/asyncToGenerator","@babel/runtime-corejs3/helpers/classCallCheck","@babel/runtime-corejs3/helpers/createClass","@babel/runtime-corejs3/core-js-stable/object/values","vis-network/dist/vis-network.min","@babel/runtime-corejs3/core-js-stable/set-timeout","@babel/runtime-corejs3/core-js-stable/promise","@babel/runtime-corejs3/core-js-stable/instance/map","@babel/runtime-corejs3/core-js-stable/instance/concat","@babel/runtime-corejs3/helpers/typeof","@babel/runtime-corejs3/core-js-stable/instance/for-each","@babel/runtime-corejs3/core-js-stable/parse-int","@babel/runtime-corejs3/core-js-stable/instance/includes","vis-network/dist/vis-network.min.css"],r):"object"==typeof exports?exports.NeoVis=r(require("@babel/runtime-corejs3/helpers/defineProperty"),require("neo4j-driver"),require("@babel/runtime-corejs3/regenerator"),require("@babel/runtime-corejs3/core-js/get-iterator"),require("@babel/runtime-corejs3/helpers/asyncToGenerator"),require("@babel/runtime-corejs3/helpers/classCallCheck"),require("@babel/runtime-corejs3/helpers/createClass"),require("@babel/runtime-corejs3/core-js-stable/object/values"),require("vis-network/dist/vis-network.min"),require("@babel/runtime-corejs3/core-js-stable/set-timeout"),require("@babel/runtime-corejs3/core-js-stable/promise"),require("@babel/runtime-corejs3/core-js-stable/instance/map"),require("@babel/runtime-corejs3/core-js-stable/instance/concat"),require("@babel/runtime-corejs3/helpers/typeof"),require("@babel/runtime-corejs3/core-js-stable/instance/for-each"),require("@babel/runtime-corejs3/core-js-stable/parse-int"),require("@babel/runtime-corejs3/core-js-stable/instance/includes"),require("vis-network/dist/vis-network.min.css")):e.NeoVis=r(e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0])}(window,(function(e,r,t,n,i,o,s,a,c,l,u,d,b,p,f,h,g,v){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var i in e)t.d(n,i,function(r){return e[r]}.bind(null,i));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=18)}([function(r,t){r.exports=e},function(e,t){e.exports=r},function(e,r){e.exports=t},function(e,r){e.exports=n},function(e,r){e.exports=i},function(e,r){e.exports=o},function(e,r){e.exports=s},function(e,r){e.exports=a},function(e,r){e.exports=c},function(e,r){e.exports=l},function(e,r){e.exports=u},function(e,r){e.exports=d},function(e,r){e.exports=b},function(e,r){e.exports=p},function(e,r){e.exports=f},function(e,r){e.exports=h},function(e,r){e.exports=g},function(e,r){e.exports=v},function(e,r,t){"use strict";t.r(r);var n=t(9),i=t.n(n),o=t(10),s=t.n(o),a=t(7),c=t.n(a),l=t(11),u=t.n(l),d=t(2),b=t.n(d),p=t(12),f=t.n(p),h=t(13),g=t.n(h),v=t(14),m=t.n(v),y=t(4),_=t.n(y),j=t(15),k=t.n(j),x=t(3),w=t.n(x),E=t(5),N=t.n(E),q=t(6),P=t.n(q),O=t(0),L=t.n(O),C=t(1),T=t.n(C),S=t(8),I=(t(17),{neo4j:{initialQuery:"MATCH (n) WHERE exists(n.pagerank)\n                        WITH (n), RAND() AS random\n                        ORDER BY random LIMIT 3000\n                        OPTIONAL MATCH (n)-[r]-(m)\n                        //WITH n,r,m WHERE exists(n.pagerank) AND exists(m.pagerank) AND exists(m.community)\n                        RETURN n, r, m;",neo4jUri:"bolt://localhost:7687",neo4jUser:"neo4j",neo4jPassword:"neo4j",encrypted:"ENCRYPTION_OFF",trust:"TRUST_ALL_CERTIFICATES"},visjs:{interaction:{hover:!0,hoverConnectedEdges:!0,selectConnectedEdges:!1,multiselect:"alwaysOn",zoomView:!1,experimental:{}},physics:{barnesHut:{damping:.1}},nodes:{mass:4,shape:"neo",labelHighlightBold:!1,widthConstraint:{maximum:40},heightConstraint:{maximum:40}},edges:{hoverWidth:0,selectionWidth:0,smooth:{type:"continuous",roundness:.15},font:{size:9,strokeWidth:0,align:"top"},color:{inherit:!1},arrows:{to:{enabled:!0,type:"arrow",scaleFactor:.5}}}}}),M=function(){function e(){N()(this,e),this._handlers=L()({},"completed",[])}return P()(e,[{key:"register",value:function(e,r){if(void 0===this._handlers[e])throw new Error("Unknown event: "+e);this._handlers[e].push(r)}},{key:"generateEvent",value:function(e,r){if(void 0===this._handlers[e])throw new Error("Unknown event: "+e);var t=!0,n=!1,i=void 0;try{for(var o,s=w()(this._handlers[e]);!(t=(o=s.next()).done);t=!0){var a=o.value;console.log("here"),a(r)}}catch(e){n=!0,i=e}finally{try{t||null==s.return||s.return()}finally{if(n)throw i}}}}]),e}(),z=t(16),A=t.n(z);function V(e,r){for(var t in e)if(A()(r).call(r,t))return e[t];return".."}t.d(r,"default",(function(){return R}));var R=function(){function e(r){var t=this;N()(this,e),L()(this,"_nodes",{}),L()(this,"_edges",{}),L()(this,"_data",{}),L()(this,"info",{}),L()(this,"info2",{}),L()(this,"orderBy",void 0),L()(this,"counterr",0),L()(this,"_network",null),L()(this,"_events",new M),L()(this,"_network_events",(function(e){var r=!0,n=!1,i=void 0;try{for(var o,s=w()(e.nodes);!(r=(o=s.next()).done);r=!0){var a=o.value,c=t._data.nodes.get(a),l=t._config&&t._config.labels&&t._config.labels[c.originalLabels[0]];l&&"function"==typeof l.clickEvent&&l.clickEvent({properties:c.originalProperties,labels:c.originalLabels,originalEvent:e})}}catch(e){n=!0,i=e}finally{try{r||null==s.return||s.return()}finally{if(n)throw i}}var u=!0,d=!1,b=void 0;try{for(var p,f=w()(e.edges);!(u=(p=f.next()).done);u=!0){var h=p.value,g=t._data.edges.get(h),v=t._config&&t._config.relationships&&t._config.relationships[g.originalType];v&&"function"==typeof v.clickEvent&&v.clickEvent({properties:g.originalProperties,originalEvent:e})}}catch(e){d=!0,b=e}finally{try{u||null==f.return||f.return()}finally{if(d)throw b}}})),this._init(r),this._consoleLog(r),this._consoleLog(I)}var r,t;return P()(e,[{key:"_consoleLog",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"log";("log"!==r||this._config.console_debug)&&console[r](e)}},{key:"_init",value:function(e){this._config=e,this._encrypted=e.encrypted||I.neo4j.encrypted,this._trust=e.trust||I.neo4j.trust,this._driver=T.a.driver(e.server_url||I.neo4j.neo4jUri,T.a.auth.basic(e.server_user||I.neo4j.neo4jUser,e.server_password||I.neo4j.neo4jPassword),{encrypted:this._encrypted,trust:this._trust}),this._query=e.initial_cypher||I.neo4j.initialQuery,this._container=document.getElementById(e.container_id)}},{key:"_addNode",value:function(e,r){this.counterr++,this._nodes[e.id]=e;var t=""+e.originalProperties.host;if(null==r){if(null==this.info[t])this.info[t]=[e.id];else{var n=!1;if(0!=(s=this.info[t]).length){for(var i=0;i<s.length;i++)if(e.id==s[i]){n=!0;break}0==n&&this.info[t].push(e.id)}}if("Socket"!=e.originalLabels){var o=""+e.originalProperties.cmd.split(" ")[0];if(null==this.info2[o])this.info2[o]=[e.id];else{var s;n=!1;if(0!=(s=this.info2[o]).length){for(i=0;i<s.length;i++)if(e.id==s[i]){n=!0;break}0==n&&this.info2[o].push(e.id)}}}else console.log("")}}},{key:"_addEdge",value:function(e){this._edges[e.id]=e}},{key:"createEdge",value:function(e,r,t){if("normal"==this.orderBy){for(var n="instance-"+e,i=this.info[n],o=0;o<i.length;o++){var s={id:99+(a=i[o]),from:r,originalType:"CONNECTED_TO",originalProperties:{sent_bytes:{low:132+a,high:0}},title:"132"+a,to:a,value:132+a,label:"",hidden:!0};this._addEdge(s)}console.log("inside edgerr")}else for(n=t,i=this.info2[n],o=0;o<i.length;o++){var a;s={id:99+(a=i[o]),from:r,to:a,originalType:"CONNECTED_TO",originalProperties:{sent_bytes:{low:132+a,high:0}},title:"132"+a,value:132+a,label:"",hidden:!0};this._addEdge(s)}}},{key:"createNode",value:function(e,r){var t,n,i,o=document.getElementById("viz"),s=o.clientWidth,a=-o.clientHeight,c=(k()(e),120*(e-1));"normal"==r?(n={originalLabels:["Process"],originalProperties:{cmd:"instance-"+e,comm:"instance-"+e,pid:{low:111+e,high:0},fake:"true",title:"instance-"+e},community:{low:e,high:0},host:"instance-"+e,label:"instance"+e,x:s,y:a+c,physics:!1,group:e,id:"120920293"+e},L()(n,"x",s),L()(n,"y",a+c),t=n):(1==e?s=-s:2==e?(s-=50,a+=50):3==e?a=-a:(s=-s,a=-a),i={originalLabels:["Process"],originalProperties:{cmd:"magnetizer-"+e,comm:"magnetizer-"+e,pid:{low:1112+e,high:0},fake:"true",title:"instance-"+e},community:{low:e,high:0},host:"instance-"+e,label:"magnetizer"+e,x:s,y:a+c,hidden:!0,physics:!1,group:e,id:"120922"+e},L()(i,"x",s),L()(i,"y",a+c),t=i);return t}},{key:"buildNodeVisObject",value:(t=_()(b.a.mark((function e(r,t){var n,i,o,s,a,c,l,u,d,p,h,v,y,_,j,k,x,E,N,q,P,O=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=O.length>2&&void 0!==O[2]?O[2]:null,(i={}).originalLabels=t.labels,i.originalProperties=t.properties,o=t.labels[0],s=this._config&&this._config.labels&&this._config.labels[o],a=s&&s.caption,c=s&&s.size,l=s&&s.sizeCypher,u=s&&s.community,i.id=t.identity.toInt(),!l){e.next=37;break}return n=n||this._driver.session(),e.next=15,n.run(l,{id:T.a.int(i.id)});case 15:for(d=e.sent,p=!0,h=!1,v=void 0,e.prev=19,y=w()(d.records);!(p=(_=y.next()).done);p=!0)j=_.value,m()(j).call(j,(function(e){"number"==typeof e?i.value=e:T.a.isInt(e)&&(i.value=e.toNumber())}));e.next=27;break;case 23:e.prev=23,e.t0=e.catch(19),h=!0,v=e.t0;case 27:e.prev=27,e.prev=28,p||null==y.return||y.return();case 30:if(e.prev=30,!h){e.next=33;break}throw v;case 33:return e.finish(30);case 34:return e.finish(27);case 35:e.next=38;break;case 37:"number"==typeof c?i.value=c:(k=t.properties[c])&&"number"==typeof k?i.value=k:k&&"object"===g()(k)&&T.a.isInt(k)&&k.inSafeRange()?i.value=k.toNumber():i.value=1;case 38:if(i.label="function"==typeof a?a(t):t.properties[a]||o||"",u)try{x=t.properties[u].split("-"),E=x[1],t.properties[u]?i.group=E||o||0:i.group=0}catch(e){i.group=0}else i.group=o;for(q in(N=document.getElementById("viz")).clientWidth,N.clientHeight,Math.floor(100*Math.random()),Math.floor(30*Math.random()),Math.floor(500*Math.random()),Math.floor(500*Math.random()),i.allowedToMoveX=!0,i.allowedToMoveY=!0,i.group,null!=i.originalProperties.cmd&&(i.shape="circularImage",i.image="..",i.image=V(r,i.originalProperties.cmd)),i.title="",t.properties)t.properties.hasOwnProperty(q)&&(i.title+=f()(P="<strong>".concat(q,":</strong> ")).call(P,t.properties[q],"<br>"));return e.abrupt("return",i);case 54:case"end":return e.stop()}}),e,this,[[19,23,27,35],[28,,30,34]])}))),function(e,r){return t.apply(this,arguments)})},{key:"buildEdgeVisObject",value:function(e){var r=this._config&&this._config.relationships&&this._config.relationships[e.type],t=r&&r.thickness,n=r&&r.caption,i={};for(var o in i.id=e.identity.toInt(),i.from=e.start.toInt(),i.to=e.end.toInt(),i.originalType=e.type,i.originalProperties=e.properties,i.title="",e.properties)e.properties.hasOwnProperty(o)&&(i.title+="<strong>Bytes enviados:</strong> ".concat(e.properties[o],"<br>"));return i.value=t&&"string"==typeof t?e.properties[t]:t&&"number"==typeof t?t:1,i.label="boolean"==typeof n?n?e.type:"":n&&"string"==typeof n?e.properties[n]||"":e.type,i}},{key:"render",value:(r=_()(b.a.mark((function e(r,t){var n,o,a,l,d,p=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.orderBy=t,n=0,o=[],a=[],l=this._driver.session(),d=[],l.run(this._query,{limit:30}).subscribe({onNext:function(e){var t;n++,p._consoleLog("CLASS NAME"),p._consoleLog(e&&e.constructor.name),p._consoleLog(e);var i=u()(t=c()(e.toObject())).call(t,function(){var e=_()(b.a.mark((function e(t){var n,i,s,c,u,d,f,h,g,v,m,y,_,j,k,x,E,N,q,P,O,L,C,S,I,M,z;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p._consoleLog("trying to find otu"),p._consoleLog("Constructor:"),p._consoleLog(t&&t.constructor.name),!(t instanceof T.a.types.Node)){e.next=10;break}return e.next=6,p.buildNodeVisObject(r,t,l);case 6:n=e.sent;try{p._addNode(n,!1)}catch(e){p._consoleLog(e,"error")}e.next=162;break;case 10:if(!(t instanceof T.a.types.Relationship)){e.next=15;break}i=p.buildEdgeVisObject(t),p._addEdge(i),e.next=162;break;case 15:if(!(t instanceof T.a.types.Path)){e.next=127;break}return p._consoleLog("PATH"),p._consoleLog(t),e.next=20,p.buildNodeVisObject(r,t.start,l);case 20:return s=e.sent,e.next=23,p.buildNodeVisObject(r,t.end,l);case 23:if(c=e.sent,u=s.originalProperties.host.split("-"),d=u[1],f=s.originalProperties.cmd.split(" "),h=f[0],0!=o.length){e.next=32;break}o.push(d),e.next=42;break;case 32:g=!1,v=0;case 34:if(!(v<o.length)){e.next=41;break}if(o[v]!=d){e.next=38;break}return g=!0,e.abrupt("break",41);case 38:v++,e.next=34;break;case 41:g||o.push(d);case 42:if(0!=a.length){e.next=46;break}a.push(h),e.next=56;break;case 46:m=!1,v=0;case 48:if(!(v<a.length)){e.next=55;break}if(a[v]!=h){e.next=52;break}return m=!0,e.abrupt("break",55);case 52:v++,e.next=48;break;case 55:m||a.push(h);case 56:if(u=c.originalProperties.host.split("-"),d=u[1],f=c.originalProperties.cmd.split(" "),h=f[0],0!=o.length){e.next=64;break}o.push(d),e.next=74;break;case 64:y=!1,v=0;case 66:if(!(v<o.length)){e.next=73;break}if(o[v]!=d){e.next=70;break}return y=!0,e.abrupt("break",73);case 70:v++,e.next=66;break;case 73:y||o.push(d);case 74:if(0!=a.length){e.next=78;break}a.push(h),e.next=88;break;case 78:_=!1,v=0;case 80:if(!(v<a.length)){e.next=87;break}if(a[v]!=h){e.next=84;break}return _=!0,e.abrupt("break",87);case 84:v++,e.next=80;break;case 87:_||a.push(h);case 88:p._addNode(s,!1),p._addNode(c,!1),j=!0,k=!1,x=void 0,e.prev=93,E=w()(t.segments);case 95:if(j=(N=E.next()).done){e.next=111;break}return q=N.value,e.t0=p,e.next=100,p.buildNodeVisObject(r,q.start,l);case 100:return e.t1=e.sent,e.t0._addNode.call(e.t0,e.t1),e.t2=p,e.next=105,p.buildNodeVisObject(r,q.end,l);case 105:e.t3=e.sent,e.t2._addNode.call(e.t2,e.t3),p._addEdge(p.buildEdgeVisObject(q.relationship));case 108:j=!0,e.next=95;break;case 111:e.next=117;break;case 113:e.prev=113,e.t4=e.catch(93),k=!0,x=e.t4;case 117:e.prev=117,e.prev=118,j||null==E.return||E.return();case 120:if(e.prev=120,!k){e.next=123;break}throw x;case 123:return e.finish(120);case 124:return e.finish(117);case 125:e.next=162;break;case 127:if(!(t instanceof Array)){e.next=162;break}P=!0,O=!1,L=void 0,e.prev=131,C=w()(t);case 133:if(P=(S=C.next()).done){e.next=148;break}if(I=S.value,p._consoleLog("Array element constructor:"),p._consoleLog(I&&I.constructor.name),!(I instanceof T.a.types.Node)){e.next=144;break}return e.next=140,p.buildNodeVisObject(r,I,l);case 140:M=e.sent,p._addNode(M),e.next=145;break;case 144:I instanceof T.a.types.Relationship&&(z=p.buildEdgeVisObject(I),p._addEdge(z));case 145:P=!0,e.next=133;break;case 148:e.next=154;break;case 150:e.prev=150,e.t5=e.catch(131),O=!0,L=e.t5;case 154:e.prev=154,e.prev=155,P||null==C.return||C.return();case 157:if(e.prev=157,!O){e.next=160;break}throw L;case 160:return e.finish(157);case 161:return e.finish(154);case 162:case"end":return e.stop()}}),e,null,[[93,113,117,125],[118,,120,124],[131,150,154,162],[155,,157,161]])})));return function(r){return e.apply(this,arguments)}}());d.push(s.a.all(i))},onCompleted:function(){var e=_()(b.a.mark((function e(){var r,t,s,u,d,f,h,g;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=0;r<o.length;r++)t=p.createNode(o[r],"normal"),p._addNode(t,!0),"normal"==p.orderBy&&(s=p.createNode(o[r],"magnetizer"),p._addNode(s,!0),u=s.id,p.createEdge(o[r],u));if(d=1,"normal"!=p.orderBy)for(f=0;f<a.length;f++)s=p.createNode(d,"magnetizer"),p._addNode(s,!0),u=s.id,p.createEdge(d,u,a[f]),d++;l.close(),h={nodes:{shape:"circularImage",image:"circularImage",borderWidth:3,borderWidthSelected:4,font:{size:26,strokeWidth:7},scaling:{label:{enabled:!0},customScalingFunction:function(e,r,t,n){return n/t},min:20,max:180}},edges:{arrows:{to:{enabled:p._config.arrows||!1}},length:200},layout:{hierarchical:{enabled:!1,levelSeparation:150,nodeSpacing:200}},physics:{stabilization:{iterations:300,fit:!0}}},g=p._container,p._data={nodes:new S.DataSet(c()(p._nodes)),edges:new S.DataSet(c()(p._edges))},p._consoleLog(p._data.nodes),p._consoleLog(p._data.edges),p._network&&p._network.off("click",p._network_events),p._network=new S.Network(g,p._data,h),p._consoleLog("completed"),i()((function(){p._network.stopSimulation()}),1e4),p._events.generateEvent("completed",{record_count:n}),p._network.on("doubleClick",p._network_events);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),onError:function(e){p._consoleLog(e,"error")}});case 7:case"end":return e.stop()}}),e,this)}))),function(e,t){return r.apply(this,arguments)})},{key:"clearNetwork",value:function(){this._nodes={},this._edges={},this._network.setData([])}},{key:"registerOnEvent",value:function(e,r){this._events.register(e,r)}},{key:"reinit",value:function(e){this._init(e),this.render()}},{key:"reload",value:function(){this.clearNetwork(),this.render()}},{key:"stabilize",value:function(){this._network.stopSimulation(),this._consoleLog("Calling stopSimulation")}},{key:"renderWithCypher",value:function(e){this.clearNetwork(),this._query=e,this.render()}}]),e}()}])}));
//# sourceMappingURL=neovis-without-dependencies.js.map