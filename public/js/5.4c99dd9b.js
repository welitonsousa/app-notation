(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{2593:function(t,e,n){},"40fa":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-center"},[n("div",{staticClass:"q-pa-md"}),n("div",{staticClass:"row"},[n("div",{staticClass:"col"}),n("q-card",{staticClass:"col-12 col-md-3"},[n("q-card-section",[n("div",{staticClass:"title"},[t._v("Contate-nos")]),n("q-form",{on:{submit:t.sendMessage}},[n("div",{staticClass:"column"},[n("q-input",{attrs:{outlined:"",label:"Nome de usuário",rules:[function(t){return!!t||"Nome inválido"}]},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("q-input",{attrs:{outlined:"",label:"Email",rules:[function(e){return t.validations.emailValidator(e)}]},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),n("q-input",{attrs:{outlined:"",label:"Mensagem",type:"text",autogrow:"",rules:[function(t){return!!t||"Campo inválido"}]},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),t.loading?n("q-btn",{attrs:{color:"primary"}},[n("q-circular-progress",{attrs:{indeterminate:"",color:"white",size:"20px"}})],1):n("q-btn",{attrs:{color:"primary",type:"submit",label:"Confirmar"}})],1)])],1)],1),n("div",{staticClass:"col"})],1)])},i=[],s=n("60a3"),o=n("6aaf"),r=function(t,e,n,a){var i,s=arguments.length,o=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)o=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o);return s>3&&o&&Object.defineProperty(e,n,o),o},l=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,s){function o(t){try{l(a.next(t))}catch(e){s(e)}}function r(t){try{l(a["throw"](t))}catch(e){s(e)}}function l(t){t.done?n(t.value):i(t.value).then(o,r)}l((a=a.apply(t,e||[])).next())}))};let c=class extends s["c"]{constructor(){super(...arguments),this.name="",this.email="",this.text="",this.validations=new o["a"],this.loading=!1}sendMessage(){return l(this,void 0,void 0,(function*(){this.loading||(this.loading=!0,yield setTimeout((()=>{this.loading=!1,this.$router.push({name:"home"}),this.$q.notify({message:"Mensagem enviada",color:"green"})}),2e3))}))}};c=r([s["a"]],c);var u=c,d=u,f=(n("b98d"),n("2877")),m=Object(f["a"])(d,a,i,!1,null,"8cb8fa9c",null);e["default"]=m.exports},"6aaf":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));class a{emailValidator(t){return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(`${t}`)||"email inválido"}passwordValidator(t){return t.length>7||"min 8 caracteres"}confirmPasswordValidator(t,e){return e.length>7?e==t||"senhas diferentes":"min 8 caracteres"}userNameValidator(t){return t.length>3||"Nome inválido"}}},b98d:function(t,e,n){"use strict";n("2593")}}]);