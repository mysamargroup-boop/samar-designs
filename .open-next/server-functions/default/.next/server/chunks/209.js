exports.id=209,exports.ids=[209],exports.modules={14058:(a,b,c)=>{"use strict";c.d(b,{A:()=>p});var d=c(21124),e=c(24515),f=c(3991),g=c.n(f),h=c(87587),i=c(2980),j=c(18855),k=c(64727),l=c(17615),m=c(35284),n=c(37448),o=c(44943);function p({product:a}){let{addToWishlist:b,removeFromWishlist:c,isWishlisted:f}=(0,l.P)(),p=f(a.id),q=a.regular_price?Math.round((a.regular_price-a.sale_price)/a.regular_price*100):0,r=a.category.toLowerCase().replace(/[^a-z0-9]+/g,"-"),s=a.subcategory?a.subcategory.toLowerCase().replace(/[^a-z0-9]+/g,"-"):"handcrafted",t=a.slug||a.id,u=`/collections/${r}/${s}/${t}`;return(0,d.jsx)("div",{className:"group flex flex-col gap-3 bg-white p-2 rounded-xl shadow-sm hover:shadow-md hover:bg-primary/5 transition-all duration-300 border border-primary/5 w-full",children:(0,d.jsxs)(g(),{href:u,className:"block",children:[(0,d.jsxs)("div",{className:"relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden",children:[(0,d.jsx)(e.default,{src:a.imageUrl,alt:a.name,fill:!0,sizes:"(max-width: 768px) 50vw, 25vw",className:"object-cover transition-transform duration-700 group-hover:scale-110","data-ai-hint":"handmade product"}),(0,d.jsx)("div",{className:"absolute top-2 right-2 z-10",children:(0,d.jsx)(m.$,{size:"icon",variant:"secondary",className:"rounded-full size-8 bg-white/90 backdrop-blur-sm shadow-sm text-foreground/40 hover:text-primary transition-all border-none",onClick:d=>{d.preventDefault(),p?(c(a.id),(0,n.oR)({title:"Removed from saved"})):(b(a),(0,n.oR)({title:"Added to saved",description:a.name}))},children:(0,d.jsx)(h.A,{className:(0,o.cn)("h-3.5 w-3.5 transition-colors",p&&"fill-primary text-primary")})})}),q>0&&(0,d.jsxs)("div",{className:"absolute top-2 left-2 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-widest border border-white/20",children:[q,"% OFF"]}),(0,d.jsx)("div",{className:"absolute bottom-2 left-2 flex flex-wrap gap-1",children:a.tags?.slice(0,1).map(a=>(0,d.jsxs)("div",{className:"bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[7px] text-foreground font-black uppercase tracking-widest border border-primary/10 shadow-sm flex items-center gap-1",children:[(0,d.jsx)(i.A,{className:"h-2 w-2 text-primary"}),a]},a))})]}),(0,d.jsxs)("div",{className:"px-1 pt-3 pb-1 space-y-1.5",children:[(0,d.jsxs)("div",{className:"flex items-center justify-between",children:[(0,d.jsxs)("div",{className:"flex items-center gap-1 text-[8px] font-bold text-primary uppercase tracking-widest opacity-80",children:[(0,d.jsx)(j.A,{className:"h-2.5 w-2.5"}),a.category]}),(0,d.jsxs)("div",{className:"flex items-center gap-0.5 text-amber-400",children:[(0,d.jsx)(k.A,{className:"h-2.5 w-2.5 fill-current"}),(0,d.jsxs)("span",{className:"text-[9px] font-bold text-foreground/60",children:[a.rating||5,".0"]})]})]}),(0,d.jsx)("p",{className:"text-foreground text-[12px] font-black uppercase tracking-tight truncate leading-tight",children:a.name}),(0,d.jsxs)("div",{className:"flex items-center gap-2",children:[(0,d.jsxs)("p",{className:"text-primary text-[14px] font-black",children:["₹",a.sale_price]}),a.regular_price&&(0,d.jsxs)("p",{className:"text-muted-foreground text-[10px] line-through decoration-primary/20 decoration-2 font-bold",children:["₹",a.regular_price]})]})]})]})})}},15255:(a,b,c)=>{Promise.resolve().then(c.bind(c,93797)),Promise.resolve().then(c.bind(c,3412)),Promise.resolve().then(c.bind(c,41279)),Promise.resolve().then(c.bind(c,51641))},16577:a=>{"use strict";a.exports=JSON.parse('{"Z":[{"id":"SH-CNP-03","name":"Eternal Bond Couple Name Plate","description":"Celebrate your union with this bespoke couple\'s nameplate.","imageUrl":"/products/Couple Name Plate.webp","category":"Custom Name Plates","subcategory":"Couple name plates","regular_price":2499,"sale_price":2199,"weight":"700g","dimensions":"14x8 inches","tags":["Anniversary Gift"],"rating":5},{"id":"SH-CNP-04","name":"Royal Couple Door Decor","description":"Regal designs for the couple that appreciates tradition.","imageUrl":"/products/Couple Name Plate 2.webp","category":"Custom Name Plates","subcategory":"Couple name plates","regular_price":2800,"sale_price":2499,"weight":"800g","dimensions":"15x9 inches","tags":["Premium"],"rating":5},{"id":"SH-SS-01","name":"Spiritual Om Brass Art","description":"Traditional Om symbol handcrafted for home peace.","imageUrl":"/products/Shree Shivay Namastubhyam.webp","category":"Shubh Symbols","subcategory":null,"regular_price":899,"sale_price":699,"weight":"300g","dimensions":"8x8 inches","tags":["Traditional","Divine"],"rating":5},{"id":"SH-SS-02","name":"Prosperity Ganesha Mural","description":"Lippan-style Ganesha art for welcoming positive energy.","imageUrl":"/products/Jai Shree Ram Wall Hanging.webp","category":"Shubh Symbols","subcategory":null,"regular_price":2500,"sale_price":1999,"weight":"1kg","dimensions":"12x12 inches","tags":["Bestseller"],"rating":5},{"id":"SH-EEP-01","name":"Classic Nazar Wall Shield","description":"Authentic blue glass evil eye for home protection.","imageUrl":"/products/Nazar Battu Wall Hanging.webp","category":"Evil Eye Protection Decor","subcategory":"Wall Protectors","regular_price":799,"sale_price":599,"weight":"250g","dimensions":"7x7 inches","tags":["Protection"],"rating":5},{"id":"SH-DH-01","name":"Boho Macrame Wall Art","description":"Layered cotton macrame wall hanging for cozy vibes.","imageUrl":"/products/Shree Krishna Wall Hanging.webp","category":"Decorative Hangings","subcategory":"Wall Hangings","regular_price":2200,"sale_price":1850,"weight":"600g","dimensions":"24x12 inches","tags":["Bohemian"],"rating":5},{"id":"SH-CNP-07","name":"Elegant Couple Name Plate","description":"A beautiful name plate for couples.","imageUrl":"/products/Couple Name Plate 3.webp","category":"Custom Name Plates","subcategory":"Couple name plates","regular_price":2600,"sale_price":2299,"weight":"750g","dimensions":"14x8 inches","tags":["Gift"],"rating":4},{"id":"SH-CNP-08","name":"Stylish Couple Name Plate","description":"A stylish name plate for couples.","imageUrl":"/products/Couple Name Plate 4.png","category":"Custom Name Plates","subcategory":"Couple name plates","regular_price":2700,"sale_price":2399,"weight":"780g","dimensions":"15x8 inches","tags":["Modern"],"rating":4},{"id":"SH-CNP-09","name":"Personalized Couple Name Plate","description":"A personalized name plate for couples.","imageUrl":"/products/Couple Name Plate.png","category":"Custom Name Plates","subcategory":"Couple name plates","regular_price":2550,"sale_price":2250,"weight":"720g","dimensions":"14x8 inches","tags":["Personalized"],"rating":5},{"id":"SH-SS-06","name":"Shree Krishna Decorative Plate","description":"A beautiful decorative plate featuring Shree Krishna.","imageUrl":"/products/Shree Krishna Decorate Plate.webp","category":"Shubh Symbols","subcategory":null,"regular_price":1500,"sale_price":1299,"weight":"500g","dimensions":"10x10 inches","tags":["Decorative","Divine"],"rating":5}]}')},39238:(a,b,c)=>{"use strict";c.d(b,{A7:()=>o,FN:()=>m,Wk:()=>n});var d=c(21124),e=c(38301),f=c(83221),g=c(66782),h=c(83557),i=c(44943),j=c(35284);let k=e.createContext(null);function l(){let a=e.useContext(k);if(!a)throw Error("useCarousel must be used within a <Carousel />");return a}let m=e.forwardRef(({orientation:a="horizontal",opts:b,setApi:c,plugins:g,className:h,children:j,...l},m)=>{let[n,o]=(0,f.A)({...b,axis:"horizontal"===a?"x":"y"},g),[p,q]=e.useState(!1),[r,s]=e.useState(!1),t=e.useCallback(a=>{a&&(q(a.canScrollPrev()),s(a.canScrollNext()))},[]),u=e.useCallback(()=>{o?.scrollPrev()},[o]),v=e.useCallback(()=>{o?.scrollNext()},[o]),w=e.useCallback(a=>{"ArrowLeft"===a.key?(a.preventDefault(),u()):"ArrowRight"===a.key&&(a.preventDefault(),v())},[u,v]);return e.useEffect(()=>{o&&c&&c(o)},[o,c]),e.useEffect(()=>{if(o)return t(o),o.on("reInit",t),o.on("select",t),()=>{o?.off("select",t)}},[o,t]),(0,d.jsx)(k.Provider,{value:{carouselRef:n,api:o,opts:b,orientation:a||(b?.axis==="y"?"vertical":"horizontal"),scrollPrev:u,scrollNext:v,canScrollPrev:p,canScrollNext:r},children:(0,d.jsx)("div",{ref:m,onKeyDownCapture:w,className:(0,i.cn)("relative",h),role:"region","aria-roledescription":"carousel",...l,children:j})})});m.displayName="Carousel";let n=e.forwardRef(({className:a,...b},c)=>{let{carouselRef:e,orientation:f}=l();return(0,d.jsx)("div",{ref:e,className:"overflow-hidden",children:(0,d.jsx)("div",{ref:c,className:(0,i.cn)("flex","horizontal"===f?"-ml-4":"-mt-4 flex-col",a),...b})})});n.displayName="CarouselContent";let o=e.forwardRef(({className:a,...b},c)=>{let{orientation:e}=l();return(0,d.jsx)("div",{ref:c,role:"group","aria-roledescription":"slide",className:(0,i.cn)("min-w-0 shrink-0 grow-0 basis-full","horizontal"===e?"pl-4":"pt-4",a),...b})});o.displayName="CarouselItem",e.forwardRef(({className:a,variant:b="outline",size:c="icon",...e},f)=>{let{orientation:h,scrollPrev:k,canScrollPrev:m}=l();return(0,d.jsxs)(j.$,{ref:f,variant:b,size:c,className:(0,i.cn)("absolute  h-8 w-8 rounded-full","horizontal"===h?"-left-12 top-1/2 -translate-y-1/2":"-top-12 left-1/2 -translate-x-1/2 rotate-90",a),disabled:!m,onClick:k,...e,children:[(0,d.jsx)(g.A,{className:"h-4 w-4"}),(0,d.jsx)("span",{className:"sr-only",children:"Previous slide"})]})}).displayName="CarouselPrevious",e.forwardRef(({className:a,variant:b="outline",size:c="icon",...e},f)=>{let{orientation:g,scrollNext:k,canScrollNext:m}=l();return(0,d.jsxs)(j.$,{ref:f,variant:b,size:c,className:(0,i.cn)("absolute h-8 w-8 rounded-full","horizontal"===g?"-right-12 top-1/2 -translate-y-1/2":"-bottom-12 left-1/2 -translate-x-1/2 rotate-90",a),disabled:!m,onClick:k,...e,children:[(0,d.jsx)(h.A,{className:"h-4 w-4"}),(0,d.jsx)("span",{className:"sr-only",children:"Next slide"})]})}).displayName="CarouselNext"},76075:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>i});var d=c(75338),e=c(59836),f=c(64074),g=c(44683),h=c(78947);function i({children:a}){return(0,d.jsxs)("div",{className:"font-display antialiased min-h-screen flex flex-col pb-16 md:pb-0 relative art-bg-shell",children:[(0,d.jsx)(h.TopBar,{}),(0,d.jsx)(e.Header,{}),(0,d.jsx)("main",{className:"flex-grow relative z-10",children:a}),(0,d.jsx)(f.Footer,{}),(0,d.jsx)(g.BottomNav,{})]})}},78303:(a,b,c)=>{Promise.resolve().then(c.bind(c,44683)),Promise.resolve().then(c.bind(c,64074)),Promise.resolve().then(c.bind(c,59836)),Promise.resolve().then(c.bind(c,78947))},85427:(a,b,c)=>{"use strict";c.d(b,{$3:()=>i,QU:()=>h,AS:()=>e,ow:()=>l,ft:()=>k,t1:()=>j,y9:()=>g,M$:()=>f,Bm:()=>m});let d=(0,c(17185).UU)({projectId:"zhi2v4xf",dataset:"production",apiVersion:"2024-01-01",useCdn:!0,stega:{enabled:!1}});async function e(){let a=`*[_type == "product"] | order(_createdAt desc) {
    "id": productId,
    "slug": slug.current,
    name,
    description,
    "imageUrl": image.asset->url,
    "category": category->name,
    subcategory,
    regular_price,
    sale_price,
    weight,
    dimensions,
    tags,
    rating,
    isFeatured
  }`;return d.fetch(a,{},{next:{revalidate:60}})}async function f(a){let b=`*[_type == "product" && slug.current == $slug][0] {
    "id": productId,
    "slug": slug.current,
    name,
    description,
    "imageUrl": image.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "category": category->name,
    subcategory,
    regular_price,
    sale_price,
    weight,
    dimensions,
    tags,
    rating
  }`;return d.fetch(b,{slug:a},{next:{revalidate:60}})}async function g(a){let b=`*[_type == "product" && productId == $productId][0] {
    "id": productId,
    "slug": slug.current,
    name,
    description,
    "imageUrl": image.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "category": category->name,
    subcategory,
    regular_price,
    sale_price,
    weight,
    dimensions,
    tags,
    rating
  }`;return d.fetch(b,{productId:a},{next:{revalidate:60}})}async function h(){let a=`*[_type == "category"] | order(_createdAt asc) {
    "id": _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    "subCategories": subCategories[] {
      name,
      "imageUrl": image.asset->url
    }
  }`;return d.fetch(a,{},{next:{revalidate:60}})}async function i(){let a=`*[_type == "blogPost"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImageUrl": coverImage.asset->url,
    author,
    category,
    publishedAt
  }`;return d.fetch(a,{},{next:{revalidate:60}})}async function j(a){let b=`*[_type == "blogPost" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "coverImageUrl": coverImage.asset->url,
    author,
    category,
    publishedAt
  }`;return d.fetch(b,{slug:a},{next:{revalidate:60}})}async function k(a){let b=`*[_type == "blogPost" && _id == $id][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "coverImageUrl": coverImage.asset->url,
    author,
    category,
    publishedAt
  }`;return d.fetch(b,{id:a},{next:{revalidate:60}})}async function l(){let a=`*[_type == "testimonial"] | order(_createdAt asc) {
    name,
    role,
    content,
    stars,
    "avatarUrl": avatar.asset->url
  }`;return d.fetch(a,{},{next:{revalidate:60}})}async function m(){let a=`*[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    "heroSlides": heroSlides[] {
      badge,
      title,
      highlight,
      description,
      "imageUrl": image.asset->url,
      linkUrl,
      buttonText
    },
    "spotlightImages": spotlightImages[] {
      "imageUrl": image.asset->url,
      title
    },
    "instagramPosts": instagramPosts[].asset->url,
    instagramHandle,
    instagramUrl,
    whatsappNumber,
    email,
    aboutStory,
    aboutQuote
  }`;return d.fetch(a,{},{next:{revalidate:60}})}}};