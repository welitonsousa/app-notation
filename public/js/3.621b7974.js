(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"322a":function(t,s,i){},3926:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"text-center"},[i("div",{staticClass:"q-pa-md"}),i("div",{staticClass:"row"},[i("div",{staticClass:"col"}),i("q-card",{staticClass:"col-12 col-md-3"},[i("q-card-section",[i("div",{staticClass:"title"},[t._v("Cadastro")]),i("q-form",{on:{submit:t.create}},[i("div",{staticClass:"column"},[i("q-input",{attrs:{outlined:"",label:"Nome de usuário",rules:[function(s){return t.validations.userNameValidator(s)}]},model:{value:t.name,callback:function(s){t.name=s},expression:"name"}}),i("q-input",{attrs:{outlined:"",label:"Email",rules:[function(s){return t.validations.emailValidator(s)}]},model:{value:t.email,callback:function(s){t.email=s},expression:"email"}}),i("q-input",{attrs:{outlined:"",label:"Senha",type:t.isPwdPass?"password":"text",rules:[function(s){return t.validations.passwordValidator(s)}]},scopedSlots:t._u([{key:"append",fn:function(){return[i("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwdPass?"visibility_off":"visibility"},on:{click:function(s){t.isPwdPass=!t.isPwdPass}}})]},proxy:!0}]),model:{value:t.password,callback:function(s){t.password=s},expression:"password"}}),i("q-input",{attrs:{outlined:"",label:"Confirme a senha",type:t.isPwdConfirmPass?"password":"text",rules:[function(s){return t.validations.confirmPasswordValidator(s,t.password)}]},scopedSlots:t._u([{key:"append",fn:function(){return[i("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwdConfirmPass?"visibility_off":"visibility"},on:{click:function(s){t.isPwdConfirmPass=!t.isPwdConfirmPass}}})]},proxy:!0}]),model:{value:t.confirmPassowrd,callback:function(s){t.confirmPassowrd=s},expression:"confirmPassowrd"}}),t.loading?i("q-btn",{attrs:{color:"primary"}},[i("q-circular-progress",{attrs:{indeterminate:"",color:"white",size:"20px"}})],1):i("q-btn",{attrs:{color:"primary",type:"submit",label:"Confirmar"}})],1)])],1)],1),i("div",{staticClass:"col"})],1)])},e=[],n=i("60a3"),r=i("6aaf"),o=i("5aa5"),l=function(t,s,i,a){var e,n=arguments.length,r=n<3?s:null===a?a=Object.getOwnPropertyDescriptor(s,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,s,i,a);else for(var o=t.length-1;o>=0;o--)(e=t[o])&&(r=(n<3?e(r):n>3?e(s,i,r):e(s,i))||r);return n>3&&r&&Object.defineProperty(s,i,r),r},c=function(t,s,i,a){function e(t){return t instanceof i?t:new i((function(s){s(t)}))}return new(i||(i=Promise))((function(i,n){function r(t){try{l(a.next(t))}catch(s){n(s)}}function o(t){try{l(a["throw"](t))}catch(s){n(s)}}function l(t){t.done?i(t.value):e(t.value).then(r,o)}l((a=a.apply(t,s||[])).next())}))};let u=class extends n["c"]{constructor(){super(...arguments),this.name="",this.email="",this.password="",this.confirmPassowrd="",this.isPwdPass=!0,this.isPwdConfirmPass=!0,this.validations=new r["a"],this.loading=!1}create(){return c(this,void 0,void 0,(function*(){this.loading=!0;try{const t=yield this.$axios.post("/users",{name:this.name,email:this.email,password:this.password});o["a"].success(t),this.$router.push({name:"login"})}catch(t){o["a"].error(t)}finally{this.loading=!1}}))}};u=l([n["a"]],u);var d=u,f=d,m=(i("f7ce"),i("2877")),p=Object(m["a"])(f,a,e,!1,null,"1ca38404",null);s["default"]=p.exports},"6aaf":function(t,s,i){"use strict";i.d(s,"a",(function(){return a}));class a{emailValidator(t){return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(`${t}`)||"email inválido"}passwordValidator(t){return t.length>7||"min 8 caracteres"}confirmPasswordValidator(t,s){return s.length>7?s==t||"senhas diferentes":"min 8 caracteres"}userNameValidator(t){return t.length>3||"Nome inválido"}}},f7ce:function(t,s,i){"use strict";i("322a")}}]);