(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),r=t(16),o=t.n(r),u=(t(22),t(17)),i=t(3),l=t(0),s=function(e){var n=Object(c.useState)(""),t=Object(i.a)(n,2),a=t[0],r=t[1],o=Object(c.useState)(""),u=Object(i.a)(o,2),s=u[0],d=u[1];return Object(l.jsxs)("form",{children:[Object(l.jsx)("div",{}),Object(l.jsxs)("div",{children:["name:",Object(l.jsx)("input",{value:a,onChange:function(e){r(e.target.value)}})]}),Object(l.jsxs)("div",{children:["number:",Object(l.jsx)("input",{value:s,onChange:function(e){d(e.target.value)}})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",onClick:function(n){var t={name:a,number:s};n.preventDefault(),e.parentCallback(t)},children:"add"})})]})},d=t(5),j=t.n(d),b="/api/persons",f=function(e){return j.a.post(b,e)},h=function(){return j.a.get(b).then((function(e){return e.data}))},m=function(e){return j.a.delete(b+"/".concat(e))},O=function(e,n){return j.a.put(b+"/".concat(e),n)},p=function(e){var n=e.people,t=e.handleDelete,c=n.map((function(e){return Object(l.jsxs)("li",{children:[e.name," , ",e.number,Object(l.jsx)("button",{onClick:function(){return n=e,void(window.confirm("Delete ".concat(n.name,"?"))&&m(n.id).then(t(n.id)));var n},children:"Delete"})]},e.name)}));return Object(l.jsx)("ul",{children:c})},v=function(e){var n=e.people,t=e.handleDelete,a=Object(c.useState)(""),r=Object(i.a)(a,2),o=r[0],u=r[1],s=n.filter((function(e){return e.name.toLowerCase().includes(o.toLowerCase())}));return Object(l.jsxs)("div",{children:["search:",Object(l.jsx)("input",{value:o,onChange:function(e){u(e.target.value)}}),Object(l.jsx)(p,{people:s,handleDelete:t})]})},x=function(e){var n=e.message;return null===n?null:Object(l.jsx)("div",{className:"success",style:{color:"green",fontStyle:"italic",fontSize:20,backgroundColor:"lightgrey",borderStyle:"solid",borderRadius:5,padding:10,maxWidth:300},children:n})},g=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(null),o=Object(i.a)(r,2),d=o[0],j=o[1],b=function(e,n){j("".concat(e," ").concat(n.name)),setTimeout((function(){j(null)}),2e3)},m=function(e){var n=Object(u.a)(t),c=t.find((function(n){return n.name===e.name}));c.number=e.number,O(c.id,c).then(a(n)).then(b("updated",c)).catch((function(e){b("Already deleted",c);var n=t.filter((function(e){return e.name!==c.name}));a(n)}))};return Object(c.useEffect)((function(){h().then((function(e){a(e)}))}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(s,{parentCallback:function(e){t.some((function(n){return n.name===e.name}))?window.confirm("Replace ".concat(e.name,"'s number?"))&&m(e):f(e).then((function(e){return e.data})).then((function(e){a(t.concat(e)),b("Successfuly added",e)})).catch((function(e){b("Validation error",e),console.log(e.message)}))}}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)(v,{people:t,handleDelete:function(e){a(t.filter((function(n){return n.id!==e})))}}),Object(l.jsx)(x,{message:d})]})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,43)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,r=n.getLCP,o=n.getTTFB;t(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(g,{})}),document.getElementById("root")),C()}},[[42,1,2]]]);
//# sourceMappingURL=main.f5ee47b0.chunk.js.map