var ledgerjs;(()=>{"use strict";var e={114:e=>{e.exports=require("@ledgerhq/errors")},871:e=>{e.exports=require("buffer")}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={exports:{}};return e[n](i,i.exports,t),i.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{const e=require("invariant");var r=t.n(e);const n=require("bs58check");var o=t.n(n);const i=require("blake2b");var c=t.n(i),a=t(871).Buffer,s=function(e,r,t,n){return new(t||(t=Promise))((function(o,i){function c(e){try{s(n.next(e))}catch(e){i(e)}}function a(e){try{s(n.throw(e))}catch(e){i(e)}}function s(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(c,a)}s((n=n.apply(e,r||[])).next())}))},u=function(e,r){var t,n,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;c;)try{if(t=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,n=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=r.call(e,c)}catch(e){i=[6,e],n=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},l=function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,o,i=t.call(e),c=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)c.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return c};function d(e){var r=[];return e.split("/").forEach((function(e){var t=parseInt(e,10);isNaN(t)||(e.length>1&&"'"===e[e.length-1]&&(t+=2147483648),r.push(t))})),r}!function(){function e(e){this.transport=e,e.decorateAppAPIMethods(this,["getAddress","signOperation","getVersion"],"XTZ")}e.prototype.getAddress=function(e,r){return void 0===r&&(r={}),s(this,void 0,void 0,(function(){var t,n,o,i,c,s,l;return u(this,(function(u){switch(u.label){case 0:return(t=r.ins)||(t=r.verify?3:2),n=r.curve||0,o=d(e),(i=a.alloc(1+4*o.length))[0]=o.length,o.forEach((function(e,r){i.writeUInt32BE(e,1+4*r)})),[4,this.transport.send(128,t,0,n,i)];case 1:if(c=u.sent(),!(s=c[0]))throw new Error("invalid public key");return[2,{publicKey:(l=c.slice(1,1+s)).toString("hex"),address:p(l,n)}]}}))}))},e.prototype.signOperation=function(e,t,n){return void 0===n&&(n={}),s(this,void 0,void 0,(function(){var o,i,c,s,l,f,h,p,v,b,g,y;return u(this,(function(u){switch(u.label){case 0:for(o=n.curve||0,i=d(e),c=0,s=a.from(t,"hex"),l=[],(f=a.alloc(4*i.length+1))[0]=i.length,i.forEach((function(e,r){f.writeUInt32BE(e,1+4*r)})),l.push(f);c!==s.length;)void 0,h=c+230>=s.length?s.length-c:230,p=a.alloc(h),s.copy(p,0,c,c+h),l.push(p),c+=h;b=0,u.label=1;case 1:return b<l.length?(g=l[b],y=1,0===b?y=0:b===l.length-1&&(y=129),[4,this.transport.send(128,4,y,o,g)]):[3,4];case 2:v=u.sent(),u.label=3;case 3:return b++,[3,1];case 4:return r()(v,"hw-app-xtz: response is set"),[2,{signature:v.slice(0,v.length-2).toString("hex")}]}}))}))},e.prototype.getVersion=function(){return s(this,void 0,void 0,(function(){var e,r,t,n,o;return u(this,(function(i){switch(i.label){case 0:return[4,this.transport.send(128,0,0,0,a.alloc(0))];case 1:return e=l.apply(void 0,[i.sent(),4]),r=e[0],t=e[1],n=e[2],o=e[3],[2,{major:t,minor:n,patch:o,bakingApp:1===r}]}}))}))}}();var f=function(e,r){return a.concat([a.from([r,2+(1&e[64])]),e.slice(1,33)])},h=[{pkB58Prefix:a.from([13,15,37,217]),pkhB58Prefix:a.from([6,161,159]),compressPublicKey:function(e,r){return(e=e.slice(0))[0]=r,e}},{pkB58Prefix:a.from([3,254,226,86]),pkhB58Prefix:a.from([6,161,161]),compressPublicKey:f},{pkB58Prefix:a.from([3,178,139,127]),pkhB58Prefix:a.from([6,161,164]),compressPublicKey:f}],p=function(e,t){var n=h[t];r()(n,"%s curve not supported",t);var i=n.compressPublicKey(e,t).slice(1),s=c()(20);return s.update(i),s.digest(s=a.alloc(20)),o().encode(a.concat([n.pkhB58Prefix,s]))}})(),(()=>{const e=require("events");var r=t.n(e),n=t(114),o=t(871).Buffer,i=function(e,r,t,n){return new(t||(t=Promise))((function(o,i){function c(e){try{s(n.next(e))}catch(e){i(e)}}function a(e){try{s(n.throw(e))}catch(e){i(e)}}function s(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(c,a)}s((n=n.apply(e,r||[])).next())}))},c=function(e,r){var t,n,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;c;)try{if(t=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,n=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=r.call(e,c)}catch(e){i=[6,e],n=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},a=function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,o,i=t.call(e),c=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)c.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return c},s=function(e,r,t){if(t||2===arguments.length)for(var n,o=0,i=r.length;o<i;o++)!n&&o in r||(n||(n=Array.prototype.slice.call(r,0,o)),n[o]=r[o]);return e.concat(n||Array.prototype.slice.call(r))};!function(){function e(){var e=this;this.exchangeTimeout=3e4,this.unresponsiveTimeout=15e3,this.deviceModel=null,this._events=new(r()),this.send=function(r,t,a,s,u,l){return void 0===u&&(u=o.alloc(0)),void 0===l&&(l=[n.StatusCodes.OK]),i(e,void 0,void 0,(function(){var e,i;return c(this,(function(c){switch(c.label){case 0:if(u.length>=256)throw new n.TransportError("data.length exceed 256 bytes limit. Got: "+u.length,"DataLengthTooBig");return[4,this.exchange(o.concat([o.from([r,t,a,s]),o.from([u.length]),u]))];case 1:if(e=c.sent(),i=e.readUInt16BE(e.length-2),!l.some((function(e){return e===i})))throw new n.TransportStatusError(i);return[2,e]}}))}))},this.exchangeAtomicImpl=function(r){return i(e,void 0,void 0,(function(){var e,t,o,i,a,s=this;return c(this,(function(c){switch(c.label){case 0:if(this.exchangeBusyPromise)throw new n.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");t=new Promise((function(r){e=r})),this.exchangeBusyPromise=t,o=!1,i=setTimeout((function(){o=!0,s.emit("unresponsive")}),this.unresponsiveTimeout),c.label=1;case 1:return c.trys.push([1,,3,4]),[4,r()];case 2:return a=c.sent(),o&&this.emit("responsive"),[2,a];case 3:return clearTimeout(i),e&&e(),this.exchangeBusyPromise=null,[7];case 4:return[2]}}))}))},this._appAPIlock=null}e.prototype.exchange=function(e){throw new Error("exchange not implemented")},e.prototype.setScrambleKey=function(e){},e.prototype.close=function(){return Promise.resolve()},e.prototype.on=function(e,r){this._events.on(e,r)},e.prototype.off=function(e,r){this._events.removeListener(e,r)},e.prototype.emit=function(e){for(var r,t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];(r=this._events).emit.apply(r,s([e],a(t),!1))},e.prototype.setDebugMode=function(){console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.")},e.prototype.setExchangeTimeout=function(e){this.exchangeTimeout=e},e.prototype.setExchangeUnresponsiveTimeout=function(e){this.unresponsiveTimeout=e},e.create=function(e,r){var t=this;return void 0===e&&(e=3e3),new Promise((function(o,i){var c=!1,a=t.listen({next:function(r){c=!0,a&&a.unsubscribe(),s&&clearTimeout(s),t.open(r.descriptor,e).then(o,i)},error:function(e){s&&clearTimeout(s),i(e)},complete:function(){s&&clearTimeout(s),c||i(new n.TransportError(t.ErrorMessage_NoDeviceFound,"NoDeviceFound"))}}),s=r?setTimeout((function(){a.unsubscribe(),i(new n.TransportError(t.ErrorMessage_ListenTimeout,"ListenTimeout"))}),r):null}))},e.prototype.decorateAppAPIMethods=function(e,r,t){var n,o;try{for(var i=function(e){var r="function"==typeof Symbol&&Symbol.iterator,t=r&&e[r],n=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")}(r),c=i.next();!c.done;c=i.next()){var a=c.value;e[a]=this.decorateAppAPIMethod(a,e[a],e,t)}}catch(e){n={error:e}}finally{try{c&&!c.done&&(o=i.return)&&o.call(i)}finally{if(n)throw n.error}}},e.prototype.decorateAppAPIMethod=function(e,r,t,o){var a=this;return function(){for(var s=[],u=0;u<arguments.length;u++)s[u]=arguments[u];return i(a,void 0,void 0,(function(){var i;return c(this,(function(c){switch(c.label){case 0:if(i=this._appAPIlock)return[2,Promise.reject(new n.TransportError("Ledger Device is busy (lock "+i+")","TransportLocked"))];c.label=1;case 1:return c.trys.push([1,,3,4]),this._appAPIlock=e,this.setScrambleKey(o),[4,r.apply(t,s)];case 2:return[2,c.sent()];case 3:return this._appAPIlock=null,[7];case 4:return[2]}}))}))}},e.ErrorMessage_ListenTimeout="No Ledger device found (timeout)",e.ErrorMessage_NoDeviceFound="No Ledger device found"}()})(),(()=>{const e=require("@ledgerhq/hw-transport");var r=t.n(e);const n=require("react-native-ble-plx"),o=require("@ledgerhq/devices"),i=require("@ledgerhq/devices/lib/ble/sendAPDU"),c=require("@ledgerhq/devices/lib/ble/receiveAPDU"),a=require("@ledgerhq/logs"),s=require("rxjs"),u=require("rxjs/operators");var l=t(114),d=t(871).Buffer;const f=function(e,r){var t=setTimeout(e,r);return function(){return clearTimeout(t)}};var h,p=function(e,r){return void 0===r&&(r=3e3),new Promise((function(t,n){var o=!1,i="Unknown",c=e.onStateChange((function(e){if(i=e,(0,a.log)("ble-verbose","ble state -> "+e),"PoweredOn"===e){if(o)return;s(),o=!0,c.remove(),t()}}),!0),s=f((function(){o||(c.remove(),n(new l.BluetoothRequired("",{state:i})))}),r)}))},v=function(e){return e&&e.message&&(e.message.includes("was disconnected")||e.message.includes("not found"))?new l.DisconnectedDevice:e},b=function(e){throw v(e)},g=t(871).Buffer,y=(h=function(e,r){return h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])},h(e,r)},function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function t(){this.constructor=e}h(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}),m=function(e,r,t,n){return new(t||(t=Promise))((function(o,i){function c(e){try{s(n.next(e))}catch(e){i(e)}}function a(e){try{s(n.throw(e))}catch(e){i(e)}}function s(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(c,a)}s((n=n.apply(e,r||[])).next())}))},w=function(e,r){var t,n,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;c;)try{if(t=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,n=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=r.call(e,c)}catch(e){i=[6,e],n=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},S=function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,o,i=t.call(e),c=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)c.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return c},T=function(e){var r="function"==typeof Symbol&&Symbol.iterator,t=r&&e[r],n=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")},E={requestMTU:156},I={},D=new n.BleManager,N=function(e){if(e&&e.serviceUUIDs){var r=S(e.serviceUUIDs,1)[0];if(r){var t=(0,o.getInfosForServiceUuid)(r);if(t)return t}}},A={pairingThreshold:1e3,delayAfterFirstPairing:4e3};function P(e,r){return m(this,void 0,void 0,(function(){var t,i,c,f,h,v,b,g,y,m,C,O,x,_,M,B,L,R,k,F,q,j,G,z,H,K,W,X,V,Y,Z,Q,J,$;return w(this,(function(w){switch(w.label){case 0:return"string"!=typeof e?[3,13]:I[e]?((0,a.log)("ble-verbose","Transport in cache, using that."),[2,I[e]]):((0,a.log)("ble-verbose","open("+e+")"),[4,p(D)]);case 1:return w.sent(),t?[3,3]:[4,D.devices([e])];case 2:i=w.sent(),(0,a.log)("ble-verbose","found "+i.length+" devices"),V=S(i,1),t=V[0],w.label=3;case 3:return t?[3,5]:[4,D.connectedDevices((0,o.getBluetoothServiceUuids)())];case 4:c=w.sent(),f=c.filter((function(r){return r.id===e})),(0,a.log)("ble-verbose","found "+f.length+" connected devices"),Y=S(f,1),t=Y[0],w.label=5;case 5:if(t)return[3,12];(0,a.log)("ble-verbose","connectToDevice("+e+")"),w.label=6;case 6:return w.trys.push([6,8,,12]),[4,D.connectToDevice(e,E)];case 7:return t=w.sent(),[3,12];case 8:return(h=w.sent()).errorCode!==n.BleErrorCode.DeviceMTUChangeFailed?[3,10]:(E={},[4,D.connectToDevice(e)]);case 9:return t=w.sent(),[3,11];case 10:throw h;case 11:return[3,12];case 12:if(!t)throw new l.CantOpenDevice;return[3,14];case 13:t=e,w.label=14;case 14:return[4,t.isConnected()];case 15:if(w.sent())return[3,22];(0,a.log)("ble-verbose","not connected. connecting..."),w.label=16;case 16:return w.trys.push([16,18,,22]),[4,t.connect(E)];case 17:return w.sent(),[3,22];case 18:return(v=w.sent()).errorCode!==n.BleErrorCode.DeviceMTUChangeFailed?[3,20]:(E={},[4,t.connect()]);case 19:return w.sent(),[3,21];case 20:throw v;case 21:return[3,22];case 22:return[4,t.discoverAllServicesAndCharacteristics()];case 23:if(w.sent(),b=N(t))return[3,33];w.label=24;case 24:w.trys.push([24,31,32,33]),y=T((0,o.getBluetoothServiceUuids)()),m=y.next(),w.label=25;case 25:if(m.done)return[3,30];C=m.value,w.label=26;case 26:return w.trys.push([26,28,,29]),[4,t.characteristicsForService(C)];case 27:return g=w.sent(),b=(0,o.getInfosForServiceUuid)(C),[3,30];case 28:return w.sent(),[3,29];case 29:return m=y.next(),[3,25];case 30:return[3,33];case 31:return O=w.sent(),Z={error:O},[3,33];case 32:try{m&&!m.done&&(Q=y.return)&&Q.call(y)}finally{if(Z)throw Z.error}return[7];case 33:if(!b)throw new l.TransportError("service not found","BLEServiceNotFound");return x=b.deviceModel,_=b.serviceUuid,M=b.writeUuid,B=b.notifyUuid,g?[3,35]:[4,t.characteristicsForService(_)];case 34:g=w.sent(),w.label=35;case 35:if(!g)throw new l.TransportError("service not found","BLEServiceNotFound");try{for(k=T(g),F=k.next();!F.done;F=k.next())(q=F.value).uuid===M?L=q:q.uuid===B&&(R=q)}catch(e){J={error:e}}finally{try{F&&!F.done&&($=k.return)&&$.call(k)}finally{if(J)throw J.error}}if(!L)throw new l.TransportError("write characteristic not found","BLEChracteristicNotFound");if(!R)throw new l.TransportError("notify characteristic not found","BLEChracteristicNotFound");if(!L.isWritableWithResponse)throw new l.TransportError("write characteristic not writableWithResponse","BLEChracteristicInvalid");if(!R.isNotifiable)throw new l.TransportError("notify characteristic not notifiable","BLEChracteristicInvalid");(0,a.log)("ble-verbose","device.mtu="+t.mtu),j=(re=R,new s.Observable((function(e){(0,a.log)("ble-verbose","start monitor "+re.uuid);var r=re.monitor((function(r,t){if(r)(0,a.log)("ble-verbose","error monitor "+re.uuid+": "+r),e.error(r);else if(t)try{var n=d.from(t.value,"base64");e.next(n)}catch(r){e.error(r)}else e.error(new l.TransportError("characteristic monitor null value","CharacteristicMonitorNull"))}));return function(){(0,a.log)("ble-verbose","end monitor "+re.uuid),r.remove()}}))).pipe((0,u.tap)((function(e){(0,a.log)("ble-frame","<= "+e.toString("hex"))})),(0,u.share)()),G=j.subscribe(),z=new U(t,L,j,x),H=function(e){z.notYetDisconnected=!1,G.unsubscribe(),K.remove(),delete I[z.id],(0,a.log)("ble-verbose","BleTransport("+z.id+") disconnected"),z.emit("disconnect",e)},I[z.id]=z,K=t.onDisconnected((function(e){z.notYetDisconnected&&H(e)})),W=Date.now(),w.label=36;case 36:return w.trys.push([36,,38,44]),[4,z.inferMTU()];case 37:return w.sent(),[3,44];case 38:return X=Date.now(),A?(X-W<A.pairingThreshold&&(r=!1),r?[4,U.disconnect(z.id).catch((function(){}))]:[3,41]):[3,42];case 39:return w.sent(),[4,(ee=A.delayAfterFirstPairing,new Promise((function(e){return setTimeout(e,ee)})))];case 40:w.sent(),w.label=41;case 41:return[3,43];case 42:r=!1,w.label=43;case 43:return[7];case 44:return r?[2,P(t,!1)]:[2,z]}var ee,re}))}))}var U=function(e){function r(r,t,n,o){var u=e.call(this)||this;return u.mtuSize=20,u.notYetDisconnected=!0,u.exchange=function(e){return u.exchangeAtomicImpl((function(){return m(u,void 0,void 0,(function(){var r,t,n,o;return w(this,(function(u){switch(u.label){case 0:return u.trys.push([0,2,,5]),r=e.toString("hex"),(0,a.log)("apdu","=> "+r),[4,(0,s.merge)(this.notifyObservable.pipe(c.receiveAPDU),(0,i.sendAPDU)(this.write,e,this.mtuSize)).toPromise()];case 1:return t=u.sent(),n=t.toString("hex"),(0,a.log)("apdu","<= "+n),[2,t];case 2:return o=u.sent(),(0,a.log)("ble-error","exchange got "+String(o)),this.notYetDisconnected?[4,D.cancelDeviceConnection(this.id).catch((function(){}))]:[3,4];case 3:u.sent(),u.label=4;case 4:throw v(o);case 5:return[2]}}))}))}))},u.write=function(e,r){return m(u,void 0,void 0,(function(){var t;return w(this,(function(n){switch(n.label){case 0:(0,a.log)("ble-frame","=> "+e.toString("hex")),n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this.writeCharacteristic.writeWithResponse(e.toString("base64"),r)];case 2:return n.sent(),[3,4];case 3:throw t=n.sent(),new l.DisconnectedDeviceDuringOperation(t.message);case 4:return[2]}}))}))},u.id=r.id,u.device=r,u.writeCharacteristic=t,u.notifyObservable=n,u.deviceModel=o,(0,a.log)("ble-verbose","BleTransport("+String(u.id)+") new instance"),u}var t;return y(r,e),r.observeState=function(e){return D.onStateChange((function(r){e.next({type:r,available:"PoweredOn"===r})}),!0),{unsubscribe:function(){}}},r.listen=function(e){var t,n=this;(0,a.log)("ble-verbose","listen...");var i=D.onStateChange((function(a){return m(n,void 0,void 0,(function(){var n;return w(this,(function(s){switch(s.label){case 0:return"PoweredOn"!==a?[3,3]:(i.remove(),[4,D.connectedDevices((0,o.getBluetoothServiceUuids)())]);case 1:return n=s.sent(),t?[2]:[4,Promise.all(n.map((function(e){return r.disconnect(e.id).catch((function(){}))})))];case 2:if(s.sent(),t)return[2];D.startDeviceScan((0,o.getBluetoothServiceUuids)(),null,(function(r,t){if(r)return e.error(r),void c();var n=N(t),o=n&&n.deviceModel;e.next({type:"add",descriptor:t,deviceModel:o})})),s.label=3;case 3:return[2]}}))}))}),!0),c=function(){t=!0,D.stopDeviceScan(),i.remove(),(0,a.log)("ble-verbose","done listening.")};return{unsubscribe:c}},r.open=function(e){return m(this,void 0,void 0,(function(){return w(this,(function(r){return[2,P(e,!0)]}))}))},r.prototype.inferMTU=function(){return m(this,void 0,void 0,(function(){var e,r,t=this;return w(this,(function(n){switch(n.label){case 0:return e=this.device.mtu,[4,this.exchangeAtomicImpl((function(){return m(t,void 0,void 0,(function(){var r,t=this;return w(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,4]),[4,(0,s.merge)(this.notifyObservable.pipe((0,u.first)((function(e){return 8===e.readUInt8(0)})),(0,u.map)((function(e){return e.readUInt8(5)}))),(0,s.defer)((function(){return(0,s.from)(t.write(g.from([8,0,0,0,0])))})).pipe((0,u.ignoreElements)())).toPromise()];case 1:return e=n.sent()+3,[3,4];case 2:return r=n.sent(),(0,a.log)("ble-error","inferMTU got "+String(r)),[4,D.cancelDeviceConnection(this.id).catch((function(){}))];case 3:throw n.sent(),v(r);case 4:return[2]}}))}))}))];case 1:return n.sent(),e>23&&(r=e-3,(0,a.log)("ble-verbose","BleTransport("+String(this.id)+") mtu set to "+String(r)),this.mtuSize=r),[2,this.mtuSize]}}))}))},r.prototype.requestConnectionPriority=function(e){return m(this,void 0,void 0,(function(){return w(this,(function(r){switch(r.label){case 0:return[4,(t=this.device.requestConnectionPriority(n.ConnectionPriority[e]),t.catch(b))];case 1:return r.sent(),[2]}var t}))}))},r.prototype.setScrambleKey=function(){},r.prototype.close=function(){return m(this,void 0,void 0,(function(){return w(this,(function(e){switch(e.label){case 0:return this.exchangeBusyPromise?[4,this.exchangeBusyPromise]:[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}}))}))},t=r,r.isSupported=function(){return Promise.resolve("function"==typeof n.BleManager)},r.setLogLevel=function(e){D.setLogLevel(e)},r.list=function(){throw new Error("not implemented")},r.disconnect=function(e){return m(void 0,void 0,void 0,(function(){return w(t,(function(r){switch(r.label){case 0:return(0,a.log)("ble-verbose","user disconnect("+e+")"),[4,D.cancelDeviceConnection(e)];case 1:return r.sent(),[2]}}))}))},r}(r())})(),(()=>{var e={},r={},t=function(e,t){r[e]=t},n=function(r){var t=function(e,t){Object.assign(this,t),this.name=r,this.message=e||r,this.stack=(new Error).stack};return t.prototype=new Error,e[r]=t,t};function o(e,r){this.name="TransportError",this.message=e,this.stack=(new Error).stack,this.id=r}n("AccountNameRequired"),n("AccountNotSupported"),n("AmountRequired"),n("BluetoothRequired"),n("BtcUnmatchedApp"),n("CantOpenDevice"),n("CashAddrNotSupported"),n("CurrencyNotSupported"),n("DeviceAppVerifyNotSupported"),n("DeviceGenuineSocketEarlyClose"),n("DeviceNotGenuine"),n("DeviceOnDashboardExpected"),n("DeviceOnDashboardUnexpected"),n("DeviceInOSUExpected"),n("DeviceHalted"),n("DeviceNameInvalid"),n("DeviceSocketFail"),n("DeviceSocketNoBulkStatus"),n("DisconnectedDevice"),n("DisconnectedDeviceDuringOperation"),n("EnpointConfig"),n("EthAppPleaseEnableContractData"),n("FeeEstimationFailed"),n("FirmwareNotRecognized"),n("HardResetFail"),n("InvalidXRPTag"),n("InvalidAddress"),n("InvalidAddressBecauseDestinationIsAlsoSource"),n("LatestMCUInstalledError"),n("UnknownMCU"),n("LedgerAPIError"),n("LedgerAPIErrorWithMessage"),n("LedgerAPINotAvailable"),n("ManagerAppAlreadyInstalled"),n("ManagerAppRelyOnBTC"),n("ManagerAppDepInstallRequired"),n("ManagerAppDepUninstallRequired"),n("ManagerDeviceLocked"),n("ManagerFirmwareNotEnoughSpace"),n("ManagerNotEnoughSpace"),n("ManagerUninstallBTCDep"),n("NetworkDown"),n("NoAddressesFound"),n("NotEnoughBalance"),n("NotEnoughBalanceToDelegate"),n("NotEnoughBalanceInParentAccount"),n("NotEnoughSpendableBalance"),n("NotEnoughBalanceBecauseDestinationNotCreated"),n("NoAccessToCamera"),n("NotEnoughGas"),n("NotSupportedLegacyAddress"),n("GasLessThanEstimate"),n("PasswordsDontMatch"),n("PasswordIncorrect"),n("RecommendSubAccountsToEmpty"),n("RecommendUndelegation"),n("TimeoutTagged"),n("UnexpectedBootloader"),n("MCUNotGenuineToDashboard"),n("RecipientRequired"),n("UnavailableTezosOriginatedAccountReceive"),n("UnavailableTezosOriginatedAccountSend"),n("UpdateFetchFileFail"),n("UpdateIncorrectHash"),n("UpdateIncorrectSig"),n("UpdateYourApp"),n("UserRefusedDeviceNameChange"),n("UserRefusedAddress"),n("UserRefusedFirmwareUpdate"),n("UserRefusedAllowManager"),n("UserRefusedOnDevice"),n("TransportOpenUserCancelled"),n("TransportInterfaceNotAvailable"),n("TransportRaceCondition"),n("TransportWebUSBGestureRequired"),n("DeviceShouldStayInApp"),n("WebsocketConnectionError"),n("WebsocketConnectionFailed"),n("WrongDeviceForAccount"),n("WrongAppForCurrency"),n("ETHAddressNonEIP"),n("CantScanQRCode"),n("FeeNotLoaded"),n("FeeRequired"),n("FeeTooHigh"),n("SyncError"),n("PairingFailed"),n("GenuineCheckFailed"),n("LedgerAPI4xx"),n("LedgerAPI5xx"),n("FirmwareOrAppUpdateRequired"),n("NoDBPathGiven"),n("DBWrongPassword"),n("DBNotReset"),o.prototype=new Error,t("TransportError",(function(e){return new o(e.message,e.id)}));var i={PIN_REMAINING_ATTEMPTS:25536,INCORRECT_LENGTH:26368,MISSING_CRITICAL_PARAMETER:26624,COMMAND_INCOMPATIBLE_FILE_STRUCTURE:27009,SECURITY_STATUS_NOT_SATISFIED:27010,CONDITIONS_OF_USE_NOT_SATISFIED:27013,INCORRECT_DATA:27264,NOT_ENOUGH_MEMORY_SPACE:27268,REFERENCED_DATA_NOT_FOUND:27272,FILE_ALREADY_EXISTS:27273,INCORRECT_P1_P2:27392,INS_NOT_SUPPORTED:27904,CLA_NOT_SUPPORTED:28160,TECHNICAL_PROBLEM:28416,OK:36864,MEMORY_PROBLEM:37440,NO_EF_SELECTED:37888,INVALID_OFFSET:37890,FILE_NOT_FOUND:37892,INCONSISTENT_FILE:37896,ALGORITHM_NOT_SUPPORTED:38020,INVALID_KCV:38021,CODE_NOT_INITIALIZED:38914,ACCESS_CONDITION_NOT_FULFILLED:38916,CONTRADICTION_SECRET_CODE_STATUS:38920,CONTRADICTION_INVALIDATION:38928,CODE_BLOCKED:38976,MAX_VALUE_REACHED:38992,GP_AUTH_FAILED:25344,LICENSING:28482,HALTED:28586};function c(e){this.name="TransportStatusError";var r=Object.keys(i).find((function(r){return i[r]===e}))||"UNKNOWN_ERROR",t=function(e){switch(e){case 26368:return"Incorrect length";case 26624:return"Missing critical parameter";case 27010:return"Security not satisfied (dongle locked or have invalid access rights)";case 27013:return"Condition of use not satisfied (denied by the user?)";case 27264:return"Invalid data received";case 27392:return"Invalid parameter received"}if(28416<=e&&e<=28671)return"Internal error, please report"}(e)||r,n=e.toString(16);this.message="Ledger device: "+t+" (0x"+n+")",this.stack=(new Error).stack,this.statusCode=e,this.statusText=r}c.prototype=new Error,t("TransportStatusError",(function(e){return new c(e.statusCode)}))})(),(()=>{t.r(n),t.d(n,{DeviceModelId:()=>o,IICCID:()=>l,IIGenericHID:()=>a,IIKeyboardHID:()=>s,IIU2F:()=>u,IIWebUSB:()=>d,getBluetoothServiceUuids:()=>A,getDeviceModel:()=>b,getInfosForServiceUuid:()=>P,identifyProductName:()=>m,identifyTargetId:()=>g,identifyUSBProductId:()=>y,ledgerUSBVendorId:()=>v});const e=require("semver");var r,o,i=t.n(e),c=function(){return c=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var o in r=arguments[t])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},c.apply(this,arguments)},a=1,s=2,u=4,l=8,d=16;!function(e){e.blue="blue",e.nanoS="nanoS",e.nanoSP="nanoSP",e.nanoX="nanoX"}(o||(o={}));var f=((r={})[o.blue]={id:o.blue,productName:"Ledger Blue",productIdMM:0,legacyUsbProductId:0,usbOnly:!0,memorySize:491520,masks:[822083584,822149120],getBlockSize:function(e){return 4096}},r[o.nanoS]={id:o.nanoS,productName:"Ledger Nano S",productIdMM:16,legacyUsbProductId:1,usbOnly:!0,memorySize:327680,masks:[823132160],getBlockSize:function(e){var r;return i().lt(null!==(r=i().coerce(e))&&void 0!==r?r:"","2.0.0")?4096:2048}},r[o.nanoSP]={id:o.nanoSP,productName:"Ledger Nano SP",productIdMM:80,legacyUsbProductId:5,usbOnly:!0,memorySize:1569792,masks:[856686592],getBlockSize:function(e){return 512}},r[o.nanoX]={id:o.nanoX,productName:"Ledger Nano X",productIdMM:64,legacyUsbProductId:4,usbOnly:!1,memorySize:2097152,masks:[855638016],getBlockSize:function(e){return 4096},bluetoothSpec:[{serviceUuid:"d973f2e0-b19e-11e2-9e96-0800200c9a66",notifyUuid:"d973f2e1-b19e-11e2-9e96-0800200c9a66",writeUuid:"d973f2e2-b19e-11e2-9e96-0800200c9a66"},{serviceUuid:"13d63400-2c97-0004-0000-4c6564676572",notifyUuid:"13d63400-2c97-0004-0001-4c6564676572",writeUuid:"13d63400-2c97-0004-0002-4c6564676572"}]},r),h={Blue:o.blue,"Nano S":o.nanoS,"Nano X":o.nanoX},p=Object.values(f),v=11415,b=function(e){var r=f[e];if(!r)throw new Error("device '"+e+"' does not exist");return r},g=function(e){var r=p.find((function(r){return r.masks.find((function(r){return(4294901760&e)===r}))}));return r},y=function(e){var r=p.find((function(r){return r.legacyUsbProductId===e}));if(r)return r;var t=e>>8;return p.find((function(e){return e.productIdMM===t}))},m=function(e){var r=h[e];return!r&&e.startsWith("Nano S")&&(r=o.nanoSP),p.find((function(e){return e.id===r}))},w=[],S={};for(var T in f){var E=f[T],I=E.bluetoothSpec;if(I)for(var D=0;D<I.length;D++){var N=I[D];w.push(N.serviceUuid),S[N.serviceUuid]=S[N.serviceUuid.replace(/-/g,"")]=c({deviceModel:E},N)}}var A=function(){return w},P=function(e){return S[e.toLowerCase()]}})(),ledgerjs=n})();
//# sourceMappingURL=ledgerjs.js.map