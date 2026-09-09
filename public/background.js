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
  Promise.all(preload).then(()=>{
    const show=(tile,src)=>{tile.style.setProperty('--photo',`url("${src}")`);tile.querySelector('img').src=src;tile.classList.add('visible')};
    tiles.forEach((tile,i)=>show(tile,urls[i]));
    let step=4;
    setInterval(()=>{
      const tile=tiles[(step-4)%4];
      const src=urls[step%urls.length];
      tile.classList.remove('visible');
      setTimeout(()=>show(tile,src),420);
      step++;
    },1800);
  });
})();
