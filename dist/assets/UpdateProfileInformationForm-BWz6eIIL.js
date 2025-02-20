import{j as y,C as x,f as n,o as i,b as r,g as v,a as s,u as t,l as k,e as m,w as u,P as V,v as _,T as b,d as w}from"./app-ktTZm4lV.js";import{_ as d,a as f}from"./InputLabel-CWCT_9Tx.js";import{_ as h}from"./PrimaryButton-DONOzyJS.js";import{_ as c}from"./TextInput-BJ1RQ3E7.js";const S={key:0},U={class:"mt-2 text-sm text-gray-800 dark:text-gray-200"},N={class:"mt-2 text-sm font-medium text-green-600 dark:text-green-400"},$={class:"flex items-center gap-4"},B={key:0,class:"text-sm text-gray-600 dark:text-gray-400"},T={__name:"UpdateProfileInformationForm",props:{mustVerifyEmail:{type:Boolean},status:{type:String}},setup(p){const l=y().props.auth.user,a=x({name:l.name,username:l.username,email:l.email});return(g,e)=>(i(),n("section",null,[e[7]||(e[7]=r("header",null,[r("h2",{class:"text-lg font-medium text-gray-900 dark:text-gray-100"}," Profile Information "),r("p",{class:"mt-1 text-sm text-gray-600 dark:text-gray-400"}," Update your account's profile information and email address. ")],-1)),r("form",{onSubmit:e[3]||(e[3]=w(o=>t(a).patch(g.route("profile.update")),["prevent"])),class:"mt-6 space-y-6"},[r("div",null,[s(d,{for:"name",value:"Name"}),s(c,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:t(a).name,"onUpdate:modelValue":e[0]||(e[0]=o=>t(a).name=o),required:"",autocomplete:"name"},null,8,["modelValue"]),s(f,{class:"mt-2",message:t(a).errors.name},null,8,["message"])]),r("div",null,[s(d,{for:"username",value:"Username"}),s(c,{id:"username",type:"text",class:"mt-1 block w-full",modelValue:t(a).username,"onUpdate:modelValue":e[1]||(e[1]=o=>t(a).username=o),required:"",autocomplete:"username"},null,8,["modelValue"]),s(f,{class:"mt-2",message:t(a).errors.username},null,8,["message"])]),r("div",null,[s(d,{for:"email",value:"Email"}),s(c,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:t(a).email,"onUpdate:modelValue":e[2]||(e[2]=o=>t(a).email=o),required:"",autocomplete:"username"},null,8,["modelValue"]),s(f,{class:"mt-2",message:t(a).errors.email},null,8,["message"])]),p.mustVerifyEmail&&t(l).email_verified_at===null?(i(),n("div",S,[r("p",U,[e[5]||(e[5]=m(" Your email address is unverified. ")),s(t(V),{href:g.route("verification.send"),method:"post",as:"button",class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"},{default:u(()=>e[4]||(e[4]=[m(" Click here to re-send the verification email. ")])),_:1},8,["href"])]),k(r("div",N," A new verification link has been sent to your email address. ",512),[[_,p.status==="verification-link-sent"]])])):v("",!0),r("div",$,[s(h,{disabled:t(a).processing},{default:u(()=>e[6]||(e[6]=[m("Save")])),_:1},8,["disabled"]),s(b,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:u(()=>[t(a).recentlySuccessful?(i(),n("p",B," Saved. ")):v("",!0)]),_:1})])],32)]))}};export{T as default};
