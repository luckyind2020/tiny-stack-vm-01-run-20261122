import{readFileSync,readdirSync,writeFileSync,mkdirSync}from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
for(const d of readdirSync(I).sort()){
 const P=readFileSync(I+'/'+d+'/program.bin'),N=readFileSync(I+'/'+d+'/input.bin'),S=[],C=[],M=new Int32Array(256),B=[]
 let p=0,i=0,n=0,e=-1
 const T=x=>e=x
 while(e<0){
  if(n>=1e6){T(10);break}
  if(p<0||p>=P.length){T(9);break}
  const o=P[p],L=o==1?1:o==2?4:o>=48&&o<=51?2:0
  if(o>83||o==31||o>7&&o<16||o>34&&o<48||o>52&&o<64||o>65&&o<80){T(5);break}
  if(p+1+L>P.length){T(9);break}
  const v=L==1?P[p+1]:L==2?P[p+1]|P[p+2]<<8:L==4?P[p+1]|P[p+2]<<8|P[p+3]<<16|P[p+4]<<24:0
  const g=o==1||o==2||o==82?[0,1]:o==4?[1,2]:o==6?[2,3]:o==5?[2,2]:o==7?[3,3]:o>15&&o<35&&o!=23&&o!=27?[2,1]:o==23||o==27||o==64?[1,1]:o==3||o==49||o==50||o==80||o==81||o==83?[1,0]:o==65?[2,0]:[0,0]
  if(S.length<g[0]){T(2);break}
  if(S.length-g[0]+g[1]>256){T(3);break}
  n++
  let q=p+1+L
  if(o==0)T(0)
  else if(o<3)S.push(o==1?v<<24>>24:v|0)
  else if(o==3)S.pop()
  else if(o==4)S.push(S[S.length-1])
  else if(o==5){const a=S.pop(),b=S.pop();S.push(a,b)}
  else if(o==6)S.push(S[S.length-2])
  else if(o==7){const c=S.pop(),b=S.pop(),a=S.pop();S.push(b,c,a)}
  else if(o>15&&o<35&&o!=23&&o!=27){
   const b=S.pop(),a=S.pop()
   let r
   if(o==16)r=a+b|0
   else if(o==17)r=a-b|0
   else if(o==18)r=Math.imul(a,b)
   else if(o==19){if(!b){T(4);continue}r=Math.trunc(a/b)|0}
   else if(o==20){if(!b){T(4);continue}r=a%b|0}
   else if(o==21){if(!b){T(4);continue}r=Math.trunc((a>>>0)/(b>>>0))|0}
   else if(o==22){if(!b){T(4);continue}r=(a>>>0)%(b>>>0)|0}
   else if(o==24)r=a&b
   else if(o==25)r=a|b
   else if(o==26)r=a^b
   else if(o==28)r=a<<(b&31)
   else if(o==29)r=a>>(b&31)
   else if(o==30)r=(a>>>(b&31))|0
   else if(o==32)r=a==b?1:0
   else if(o==33)r=a<b?1:0
   else r=(a>>>0)<(b>>>0)?1:0
   S.push(r)
  }
  else if(o==23)S.push(-S.pop()|0)
  else if(o==27)S.push(~S.pop())
  else if(o==48)q=p+3+(v&32768?v-65536:v)
  else if(o==49){if(!S.pop())q=p+3+(v&32768?v-65536:v)}
  else if(o==50){if(S.pop())q=p+3+(v&32768?v-65536:v)}
  else if(o==51){if(C.length>63){T(7);continue}C.push(p+3);q=v}
  else if(o==52){if(!C.length){T(8);continue}q=C.pop()}
  else if(o==64){const a=S.pop();if(a<0||a>255){T(6);continue}S.push(M[a])}
  else if(o==65){const a=S.pop(),x=S.pop();if(a<0||a>255){T(6);continue}M[a]=x}
  else if(o==80){const s=String(S.pop());if(B.length+s.length>65536){T(11);continue}for(let j=0;j<s.length;j++)B.push(s.charCodeAt(j))}
  else if(o==81){if(B.length>65535){T(11);continue}B.push(S.pop()&255)}
  else if(o==82)S.push(i<N.length?N[i++]:-1)
  else if(o==83)T(S.pop()&255)
  if(e<0)p=q
 }
 mkdirSync(O+'/'+d,{recursive:true})
 writeFileSync(O+'/'+d+'/stdout.bin',Buffer.from(B))
 writeFileSync(O+'/'+d+'/exit.txt',String(e<0?0:e)+'\n')
}
