(()=>{
  const ids=['10-nuLaaNRKUPQOQvJwP5fMfNL2tPQsUy','15ZU-6_UOpRbDHexn5dz8rgdqzn9KsOfk','18cQYZgc_e-N2LD24iBTinV21UvWEc9iG','1AEnQBHJhIC62itL9Il431pB9ZMEg9T-a','1FsYgnQpbnYqECGYcKAXOqMCgdwybSmuM','1G_VKHvwcBhZFDt7XY8jDiP5qwjuFXHoT','1JIdUk-e-WBqIyiD74Dxq-bKSsTOLLA2-','1LQJB9aYtn35hM17iG1OS_zNClfb-13t-','1MswpaehCQP29qjM8r44a3EBZqU5vgLKc','1OwuOISBa72Y7fR-o4ms24nm5j3gbR8MA','1U7s5W5tM98GwTTBdkwTISB96PBQakI1d','1VEgH7jzY4e9j9jJPJhfr-ML-0FhHc_KK','1Yxcpi4xs3YDgMiM-eP90-r09FLlLJXH1','1ZHCCXlZnTiuWqFHoOhbbRsOYxW-TI77r','1_FlgbnKERVGzxsco-lZmylQOa67ldz8K','1eDZYwB0Em63F1oKgatA0u9xeecx2lCNg','1hsktHkL1PBdZppzLx4ZOu91zrd4NhSmG','1kYblIlez3QOWhJhPmptC7i120_gzWH4Y','1kc5miOenwZipkWMQ3pGUNRHlD_uch5lW','1pNYsaoRnYKu2HwqNmoQ-0RkfOr5WFicV','1ufn3koU1cMDO1luJLwdDny04BILjSm0e'];
  const urls=ids.map(id=>`https://drive.google.com/thumbnail?id=${id}&sz=w1600`);
  const collage=document.createElement('div');
  collage.className='photo-collage';
  collage.setAttribute('aria-hidden','true');
  collage.innerHTML='<div class="photo-tile"><img></div><div class="photo-tile"><img></div><div class="photo-tile"><img></div><div class="photo-tile"><img></div>';
  document.body.prepend(collage);
  const tiles=[...collage.querySelectorAll('.photo-tile')];
  const preload=urls.map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve(src);im.onerror=()=>resolve(src);im.src=src;}));
  const shuffle=a=>a.slice().sort(()=>Math.random()-.5);
  Promise.all(preload).then(()=>{
    let pool=shuffle(urls);
    let step=0;
    const positions=[
      {top:'3%',left:'2%',width:'40%',height:'44%',transform:'rotate(-2deg)'},
      {top:'4%',right:'2%',width:'40%',height:'43%',transform:'rotate(2deg)'},
      {top:'29%',left:'-4%',width:'38%',height:'45%',transform:'rotate(1deg)'},
      {top:'27%',right:'-4%',width:'39%',height:'46%',transform:'rotate(-1deg)'},
      {bottom:'3%',left:'3%',width:'40%',height:'44%',transform:'rotate(2deg)'},
      {bottom:'3%',right:'3%',width:'40%',height:'44%',transform:'rotate(-2deg)'},
      {top:'8%',left:'31%',width:'38%',height:'39%',transform:'rotate(-1deg)'},
      {bottom:'7%',left:'30%',width:'39%',height:'39%',transform:'rotate(1deg)'},
      {top:'12%',left:'7%',width:'35%',height:'41%',transform:'rotate(-3deg)'},
      {top:'10%',right:'7%',width:'35%',height:'41%',transform:'rotate(3deg)'},
      {bottom:'10%',left:'8%',width:'34%',height:'40%',transform:'rotate(3deg)'},
      {bottom:'9%',right:'8%',width:'34%',height:'40%',transform:'rotate(-3deg)'}
    ];
    const applyPosition=(tile,p)=>{
      tile.style.top=p.top||'auto';tile.style.bottom=p.bottom||'auto';tile.style.left=p.left||'auto';tile.style.right=p.right||'auto';tile.style.width=p.width;tile.style.height=p.height;tile.style.transform=p.transform;
    };
    const show=(tile,src,p)=>{applyPosition(tile,p);tile.style.setProperty('--photo',`url("${src}")`);tile.querySelector('img').src=src;tile.classList.add('visible')};
    const nextUnique=()=>{if(!pool.length)pool=shuffle(urls);return pool.pop()};
    const firstPositions=shuffle(positions).slice(0,4);
    tiles.forEach((tile,i)=>show(tile,nextUnique(),firstPositions[i]));
    let lastPosition=-1;
    setInterval(()=>{
      const tile=tiles[step%4];
      let posIndex=Math.floor(Math.random()*positions.length);
      while(posIndex===lastPosition)posIndex=Math.floor(Math.random()*positions.length);
      lastPosition=posIndex;
      const src=nextUnique();
      tile.classList.remove('visible');
      setTimeout(()=>show(tile,src,positions[posIndex]),420);
      step++;
    },1800);
  });
})();
