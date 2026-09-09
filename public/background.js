(()=>{
  const ids=['10-nuLaaNRKUPQOQvJwP5fMfNL2tPQsUy','1AEnQBHJhIC62itL9Il431pB9ZMEg9T-a','1FsYgnQpbnYqECGYcKAXOqMCgdwybSmuM','1JIdUk-e-WBqIyiD74Dxq-bKSsTOLLA2-','1LQJB9aYtn35hM17iG1OS_zNClfb-13t-','1MswpaehCQP29qjM8r44a3EBZqU5vgLKc','1OwuOISBa72Y7fR-o4ms24nm5j3gbR8MA','1U7s5W5tM98GwTTBdkwTISB96PBQakI1d','1VEgH7jzY4e9j9jJPJhfr-ML-0FhHc_KK','1Yxcpi4xs3YDgMiM-eP90-r09FLlLJXH1','1hsktHkL1PBdZppzLx4ZOu91zrd4NhSmG','1kYblIlez3QOWhJhPmptC7i120_gzWH4Y','1pNYsaoRnYKu2HwqNmoQ-0RkfOr5WFicV'];
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
      {top:'4%',left:'3%',width:'39%',height:'42%',transform:'rotate(-2deg)'},
      {top:'8%',right:'3%',width:'38%',height:'40%',transform:'rotate(2deg)'},
      {bottom:'5%',left:'6%',width:'37%',height:'43%',transform:'rotate(2deg)'},
      {bottom:'4%',right:'6%',width:'38%',height:'42%',transform:'rotate(-2deg)'}
    ];
    const applyPosition=(tile,p)=>{
      tile.style.top=p.top||'auto';tile.style.bottom=p.bottom||'auto';tile.style.left=p.left||'auto';tile.style.right=p.right||'auto';tile.style.width=p.width;tile.style.height=p.height;tile.style.transform=p.transform;
    };
    const show=(tile,src,p)=>{applyPosition(tile,p);tile.style.setProperty('--photo',`url("${src}")`);tile.querySelector('img').src=src;tile.classList.add('visible')};
    const nextUnique=()=>{if(!pool.length)pool=shuffle(urls);return pool.pop()};
    tiles.forEach((tile,i)=>show(tile,nextUnique(),positions[i]));
    setInterval(()=>{
      const tile=tiles[step%4];
      const position=positions[Math.floor(Math.random()*positions.length)];
      const src=nextUnique();
      tile.classList.remove('visible');
      setTimeout(()=>show(tile,src,position),420);
      step++;
    },1800);
  });
})();
