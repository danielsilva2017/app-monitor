!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("neo4j-driver"),require("@babel/runtime-corejs3/helpers/defineProperty"),require("@babel/runtime-corejs3/core-js/get-iterator"),require("@babel/runtime-corejs3/regenerator"),require("@babel/runtime-corejs3/helpers/classCallCheck"),require("@babel/runtime-corejs3/helpers/createClass"),require("@babel/runtime-corejs3/core-js-stable/object/values"),require("@babel/runtime-corejs3/helpers/asyncToGenerator"),require("vis-network/dist/vis-network.min"),require("@babel/runtime-corejs3/core-js-stable/promise"),require("@babel/runtime-corejs3/core-js-stable/instance/concat"),require("@babel/runtime-corejs3/core-js-stable/set-timeout"),require("@babel/runtime-corejs3/core-js-stable/instance/map"),require("@babel/runtime-corejs3/helpers/typeof"),require("@babel/runtime-corejs3/core-js-stable/instance/for-each"),require("vis-network/dist/vis-network.min.css")):"function"==typeof define&&define.amd?define(["neo4j-driver","@babel/runtime-corejs3/helpers/defineProperty","@babel/runtime-corejs3/core-js/get-iterator","@babel/runtime-corejs3/regenerator","@babel/runtime-corejs3/helpers/classCallCheck","@babel/runtime-corejs3/helpers/createClass","@babel/runtime-corejs3/core-js-stable/object/values","@babel/runtime-corejs3/helpers/asyncToGenerator","vis-network/dist/vis-network.min","@babel/runtime-corejs3/core-js-stable/promise","@babel/runtime-corejs3/core-js-stable/instance/concat","@babel/runtime-corejs3/core-js-stable/set-timeout","@babel/runtime-corejs3/core-js-stable/instance/map","@babel/runtime-corejs3/helpers/typeof","@babel/runtime-corejs3/core-js-stable/instance/for-each","vis-network/dist/vis-network.min.css"],r):"object"==typeof exports?exports.NeoVis=r(require("neo4j-driver"),require("@babel/runtime-corejs3/helpers/defineProperty"),require("@babel/runtime-corejs3/core-js/get-iterator"),require("@babel/runtime-corejs3/regenerator"),require("@babel/runtime-corejs3/helpers/classCallCheck"),require("@babel/runtime-corejs3/helpers/createClass"),require("@babel/runtime-corejs3/core-js-stable/object/values"),require("@babel/runtime-corejs3/helpers/asyncToGenerator"),require("vis-network/dist/vis-network.min"),require("@babel/runtime-corejs3/core-js-stable/promise"),require("@babel/runtime-corejs3/core-js-stable/instance/concat"),require("@babel/runtime-corejs3/core-js-stable/set-timeout"),require("@babel/runtime-corejs3/core-js-stable/instance/map"),require("@babel/runtime-corejs3/helpers/typeof"),require("@babel/runtime-corejs3/core-js-stable/instance/for-each"),require("vis-network/dist/vis-network.min.css")):e.NeoVis=r(e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0],e[void 0])}(window,(function(e,r,t,n,o,i,s,a,c,l,u,d,p,b,f,h){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=16)}([function(r,t){r.exports=e},function(e,t){e.exports=r},function(e,r){e.exports=t},function(e,r){e.exports=n},function(e,r){e.exports=o},function(e,r){e.exports=i},function(e,r){e.exports=s},function(e,r){e.exports=a},function(e,r){e.exports=c},function(e,r){e.exports=l},function(e,r){e.exports=u},function(e,r){e.exports=d},function(e,r){e.exports=p},function(e,r){e.exports=b},function(e,r){e.exports=f},function(e,r){e.exports=h},function(e,r,t){"use strict";t.r(r);var n=t(11),o=t.n(n),i=t(9),s=t.n(i),a=t(6),c=t.n(a),l=t(12),u=t.n(l),d=t(3),p=t.n(d),b=t(10),f=t.n(b),h=t(13),v=t.n(h),_=t(14),g=t.n(_),m=t(7),y=t.n(m),j=t(2),k=t.n(j),x=t(4),w=t.n(x),q=t(5),N=t.n(q),E=t(1),O=t.n(E),L=t(0),C=t.n(L),T=t(8),P=(t(15),{neo4j:{initialQuery:"MATCH (n) WHERE exists(n.pagerank)\n                        WITH (n), RAND() AS random\n                        ORDER BY random LIMIT 3000\n                        OPTIONAL MATCH (n)-[r]-(m)\n                        //WITH n,r,m WHERE exists(n.pagerank) AND exists(m.pagerank) AND exists(m.community)\n                        RETURN n, r, m;",neo4jUri:"bolt://localhost:7687",neo4jUser:"neo4j",neo4jPassword:"neo4j",encrypted:"ENCRYPTION_OFF",trust:"TRUST_ALL_CERTIFICATES"},visjs:{interaction:{hover:!0,hoverConnectedEdges:!0,selectConnectedEdges:!1,multiselect:"alwaysOn",zoomView:!1,experimental:{}},physics:{barnesHut:{damping:.1}},nodes:{mass:4,shape:"neo",labelHighlightBold:!1,widthConstraint:{maximum:40},heightConstraint:{maximum:40}},edges:{hoverWidth:0,selectionWidth:0,smooth:{type:"continuous",roundness:.15},font:{size:9,strokeWidth:0,align:"top"},color:{inherit:!1},arrows:{to:{enabled:!0,type:"arrow",scaleFactor:.5}}}}}),S=function(){function e(){w()(this,e),this._handlers=O()({},"completed",[])}return N()(e,[{key:"register",value:function(e,r){if(void 0===this._handlers[e])throw new Error("Unknown event: "+e);this._handlers[e].push(r)}},{key:"generateEvent",value:function(e,r){if(void 0===this._handlers[e])throw new Error("Unknown event: "+e);var t=!0,n=!1,o=void 0;try{for(var i,s=k()(this._handlers[e]);!(t=(i=s.next()).done);t=!0){var a=i.value;console.log("here"),a(r)}}catch(e){n=!0,o=e}finally{try{t||null==s.return||s.return()}finally{if(n)throw o}}}}]),e}();t.d(r,"default",(function(){return I}));var I=function(){function e(r){var t=this;w()(this,e),O()(this,"_nodes",{}),O()(this,"_edges",{}),O()(this,"_data",{}),O()(this,"_network",null),O()(this,"_events",new S),O()(this,"_network_events",(function(e){var r=!0,n=!1,o=void 0;try{for(var i,s=k()(e.nodes);!(r=(i=s.next()).done);r=!0){var a=i.value,c=t._data.nodes.get(a),l=t._config&&t._config.labels&&t._config.labels[c.originalLabels[0]];l&&"function"==typeof l.clickEvent&&l.clickEvent({properties:c.originalProperties,labels:c.originalLabels,originalEvent:e})}}catch(e){n=!0,o=e}finally{try{r||null==s.return||s.return()}finally{if(n)throw o}}var u=!0,d=!1,p=void 0;try{for(var b,f=k()(e.edges);!(u=(b=f.next()).done);u=!0){var h=b.value,v=t._data.edges.get(h),_=t._config&&t._config.relationships&&t._config.relationships[v.originalType];_&&"function"==typeof _.clickEvent&&_.clickEvent({properties:v.originalProperties,originalEvent:e})}}catch(e){d=!0,p=e}finally{try{u||null==f.return||f.return()}finally{if(d)throw p}}})),this._init(r),this._consoleLog(r),this._consoleLog(P)}var r;return N()(e,[{key:"_consoleLog",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"log";("log"!==r||this._config.console_debug)&&console[r](e)}},{key:"_init",value:function(e){this._config=e,this._encrypted=e.encrypted||P.neo4j.encrypted,this._trust=e.trust||P.neo4j.trust,this._driver=C.a.driver(e.server_url||P.neo4j.neo4jUri,C.a.auth.basic(e.server_user||P.neo4j.neo4jUser,e.server_password||P.neo4j.neo4jPassword),{encrypted:this._encrypted,trust:this._trust}),this._query=e.initial_cypher||P.neo4j.initialQuery,this._container=document.getElementById(e.container_id)}},{key:"_addNode",value:function(e){this._nodes[e.id]=e}},{key:"_addEdge",value:function(e){this._edges[e.id]=e}},{key:"buildNodeVisObject",value:(r=y()(p.a.mark((function e(r){var t,n,o,i,s,a,c,l,u,d,b,h,_,m,y,j,x,w,q=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=q.length>1&&void 0!==q[1]?q[1]:null,(n={}).originalLabels=r.labels,n.originalProperties=r.properties,o=r.labels[0],i=this._config&&this._config.labels&&this._config.labels[o],s=i&&i.caption,a=i&&i.size,c=i&&i.sizeCypher,l=i&&i.community,n.id=r.identity.toInt(),!c){e.next=37;break}return t=t||this._driver.session(),e.next=15,t.run(c,{id:C.a.int(n.id)});case 15:for(u=e.sent,d=!0,b=!1,h=void 0,e.prev=19,_=k()(u.records);!(d=(m=_.next()).done);d=!0)y=m.value,g()(y).call(y,(function(e){"number"==typeof e?n.value=e:C.a.isInt(e)&&(n.value=e.toNumber())}));e.next=27;break;case 23:e.prev=23,e.t0=e.catch(19),b=!0,h=e.t0;case 27:e.prev=27,e.prev=28,d||null==_.return||_.return();case 30:if(e.prev=30,!b){e.next=33;break}throw h;case 33:return e.finish(30);case 34:return e.finish(27);case 35:e.next=38;break;case 37:"number"==typeof a?n.value=a:(j=r.properties[a])&&"number"==typeof j?n.value=j:j&&"object"===v()(j)&&C.a.isInt(j)&&j.inSafeRange()?n.value=j.toNumber():n.value=1;case 38:if(n.label="function"==typeof s?s(r):r.properties[s]||o||"",l)try{r.properties[l]?n.group=r.properties[l].toNumber()||o||0:n.group=0}catch(e){n.group=0}else n.group=o;for(x in n.title="",r.properties)r.properties.hasOwnProperty(x)&&(n.title+=f()(w="<strong>".concat(x,":</strong> ")).call(w,r.properties[x],"<br>"));return e.abrupt("return",n);case 43:case"end":return e.stop()}}),e,this,[[19,23,27,35],[28,,30,34]])}))),function(e){return r.apply(this,arguments)})},{key:"buildEdgeVisObject",value:function(e){var r=this._config&&this._config.relationships&&this._config.relationships[e.type],t=r&&r.thickness,n=r&&r.caption,o={};for(var i in o.id=e.identity.toInt(),o.from=e.start.toInt(),o.to=e.end.toInt(),o.originalType=e.type,o.originalProperties=e.properties,o.title="",e.properties){var s;if(e.properties.hasOwnProperty(i))o.title+=f()(s="<strong>".concat(i,":</strong> ")).call(s,e.properties[i],"<br>")}return o.value=t&&"string"==typeof t?e.properties[t]:t&&"number"==typeof t?t:1,o.label="boolean"==typeof n?n?e.type:"":n&&"string"==typeof n?e.properties[n]||"":e.type,o}},{key:"render",value:function(){var e,r=this,t=0,n=this._driver.session(),i=[];n.run(this._query,{limit:30}).subscribe({onNext:function(e){var o;t++,r._consoleLog("CLASS NAME"),r._consoleLog(e&&e.constructor.name),r._consoleLog(e);var a=u()(o=c()(e.toObject())).call(o,function(){var e=y()(p.a.mark((function e(t){var o,i,s,a,c,l,u,d,b,f,h,v,_,g,m,y,j,x;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r._consoleLog("Constructor:"),r._consoleLog(t&&t.constructor.name),!(t instanceof C.a.types.Node)){e.next=9;break}return e.next=5,r.buildNodeVisObject(t,n);case 5:o=e.sent;try{r._addNode(o)}catch(e){r._consoleLog(e,"error")}e.next=97;break;case 9:if(!(t instanceof C.a.types.Relationship)){e.next=14;break}i=r.buildEdgeVisObject(t),r._addEdge(i),e.next=97;break;case 14:if(!(t instanceof C.a.types.Path)){e.next=62;break}return r._consoleLog("PATH"),r._consoleLog(t),e.next=19,r.buildNodeVisObject(t.start,n);case 19:return s=e.sent,e.next=22,r.buildNodeVisObject(t.end,n);case 22:a=e.sent,r._addNode(s),r._addNode(a),c=!0,l=!1,u=void 0,e.prev=28,d=k()(t.segments);case 30:if(c=(b=d.next()).done){e.next=46;break}return f=b.value,e.t0=r,e.next=35,r.buildNodeVisObject(f.start,n);case 35:return e.t1=e.sent,e.t0._addNode.call(e.t0,e.t1),e.t2=r,e.next=40,r.buildNodeVisObject(f.end,n);case 40:e.t3=e.sent,e.t2._addNode.call(e.t2,e.t3),r._addEdge(r.buildEdgeVisObject(f.relationship));case 43:c=!0,e.next=30;break;case 46:e.next=52;break;case 48:e.prev=48,e.t4=e.catch(28),l=!0,u=e.t4;case 52:e.prev=52,e.prev=53,c||null==d.return||d.return();case 55:if(e.prev=55,!l){e.next=58;break}throw u;case 58:return e.finish(55);case 59:return e.finish(52);case 60:e.next=97;break;case 62:if(!(t instanceof Array)){e.next=97;break}h=!0,v=!1,_=void 0,e.prev=66,g=k()(t);case 68:if(h=(m=g.next()).done){e.next=83;break}if(y=m.value,r._consoleLog("Array element constructor:"),r._consoleLog(y&&y.constructor.name),!(y instanceof C.a.types.Node)){e.next=79;break}return e.next=75,r.buildNodeVisObject(y,n);case 75:j=e.sent,r._addNode(j),e.next=80;break;case 79:y instanceof C.a.types.Relationship&&(x=r.buildEdgeVisObject(y),r._addEdge(x));case 80:h=!0,e.next=68;break;case 83:e.next=89;break;case 85:e.prev=85,e.t5=e.catch(66),v=!0,_=e.t5;case 89:e.prev=89,e.prev=90,h||null==g.return||g.return();case 92:if(e.prev=92,!v){e.next=95;break}throw _;case 95:return e.finish(92);case 96:return e.finish(89);case 97:case"end":return e.stop()}}),e,null,[[28,48,52,60],[53,,55,59],[66,85,89,97],[90,,92,96]])})));return function(r){return e.apply(this,arguments)}}());i.push(s.a.all(a))},onCompleted:(e=y()(p.a.mark((function e(){var a,l;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.all(i);case 2:n.close(),a={nodes:{shape:"dot",font:{size:26,strokeWidth:7},scaling:{label:{enabled:!0}}},edges:{arrows:{to:{enabled:r._config.arrows||!1}},length:200},layout:{improvedLayout:!1,hierarchical:{enabled:r._config.hierarchical||!1,sortMethod:r._config.hierarchical_sort_method||"hubsize"}},physics:{adaptiveTimestep:!0,stabilization:{iterations:200,fit:!0}}},l=r._container,r._data={nodes:new T.DataSet(c()(r._nodes)),edges:new T.DataSet(c()(r._edges))},r._consoleLog(r._data.nodes),r._consoleLog(r._data.edges),r._network&&r._network.off("click",r._network_events),r._network=new T.Network(l,r._data,a),r._consoleLog("completed"),o()((function(){r._network.stopSimulation()}),1e4),r._events.generateEvent("completed",{record_count:t}),r._network.on("click",r._network_events);case 14:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)}),onError:function(e){r._consoleLog(e,"error")}})}},{key:"clearNetwork",value:function(){this._nodes={},this._edges={},this._network.setData([])}},{key:"registerOnEvent",value:function(e,r){this._events.register(e,r)}},{key:"reinit",value:function(e){this._init(e),this.render()}},{key:"reload",value:function(){this.clearNetwork(),this.render()}},{key:"stabilize",value:function(){this._network.stopSimulation(),this._consoleLog("Calling stopSimulation")}},{key:"renderWithCypher",value:function(e){this.clearNetwork(),this._query=e,this.render()}}]),e}()}])}));
//# sourceMappingURL=neovis-without-dependencies.js.map