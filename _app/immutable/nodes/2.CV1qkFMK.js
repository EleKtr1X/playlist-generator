import{s as m,n as p}from"../chunks/scheduler.CtbWrGNo.js";import{S as y,i as _,e as c,s as b,c as d,m as f,f as x,a as g,d as l,n as v,g as h,h as C}from"../chunks/index.ang74hVB.js";const S="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let w=(n=21)=>{let t="",e=crypto.getRandomValues(new Uint8Array(n));for(;n--;)t+=S[e[n]&63];return t};function A(n){let t,e="Spotify Playlist Generator",i,s,o,u="Log in with Spotify";return{c(){t=c("h1"),t.textContent=e,i=b(),s=c("a"),o=c("button"),o.textContent=u,this.h()},l(a){t=d(a,"H1",{"data-svelte-h":!0}),f(t)!=="svelte-u4a079"&&(t.textContent=e),i=x(a),s=d(a,"A",{href:!0});var r=g(s);o=d(r,"BUTTON",{"data-svelte-h":!0}),f(o)!=="svelte-c89vt1"&&(o.textContent=u),r.forEach(l),this.h()},h(){v(s,"href",n[0])},m(a,r){h(a,t,r),h(a,i,r),h(a,s,r),C(s,o)},p,i:p,o:p,d(a){a&&(l(t),l(i),l(s))}}}const P="user-library-read playlist-modify-public";function U(n){const t=w(),e=new URLSearchParams;return e.append("response_type","code"),e.append("client_id","dab5276ca4ba46f4b634a28ef8965e5a"),e.append("redirect_uri","https://elektr1x.github.io/playlist-generator/generate"),e.append("state",t),e.append("scope",P),["https://accounts.spotify.com/authorize?"+e.toString()]}class T extends y{constructor(t){super(),_(this,t,U,A,m,{})}}export{T as component};
