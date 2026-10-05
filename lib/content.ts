export const initial = {
  whatsappNumber:'+51 931 015 583',whatsappMessage:'Hola HANNA, me gustaría información sobre prendas personalizadas.',whatsappButton:'Contactar por WhatsApp',
  announcement:'CONFECCIÓN PERSONALIZADA · TU MARCA, TU ESTILO', benefit1:'Tus colores',benefit2:'Tu confección',benefit3:'Tu identidad',heroFoot:'01 / CONFECCIÓN CON IDENTIDAD', featureButton:'Conoce el proceso',processEyebrow:'ASÍ EMPIEZA TU CREACIÓN',partnersEyebrow:'COLABORADORES', selectionTitle:'Tu selección',selectionText:'Estas son las colecciones que te interesan. Puedes copiar la lista para preparar tu consulta.',selectionButton:'Copiar selección',collectionText:'Una colección que puedes personalizar con tus colores, textos y logo.',collectionButton:'Añadir a mi selección',footerNote:'Confecciones y Creaciones',
  brand: 'HANNA', tagline: 'Confecciones y Creaciones',
  navCatalog: 'Colecciones', navProcess: 'Cómo lo hacemos', navAbout: 'Nuestra esencia',
  eyebrow: 'HECHO PARA SER TUYO', heroTitle: 'Tu identidad.\nNuestra confección.',
  heroText: 'Ropa deportiva y prendas personalizadas que cuentan tu historia. Elige tu colección y dale forma a tu próxima creación.',
  heroButton: 'Explorar colecciones', heroImage: 'https://www.owayo.es/_astro/home-myd-kachel_ZBYVnk.webp', logoImage: '',
  catalogEyebrow: 'CADA EQUIPO, UNA HISTORIA', catalogTitle: 'Encuentra tu colección', catalogText: 'Del primer entrenamiento al día del partido. Prendas para tu deporte y tu estilo.',
  featureEyebrow: 'EL DETALLE HACE LA DIFERENCIA', featureTitle: 'Diseñado contigo.\nConfeccionado para ti.',
  featureText: 'Colores, escudos y detalles que representan a tu equipo. En HANNA, cada creación empieza con tu idea.', featureImage: 'https://www.owayo.es/_astro/home-staerken_ZihlQp.webp',
  processTitle: 'De tu idea a tu prenda', step1Title:'Elige tu colección', step1Text:'Encuentra la prenda que se adapta a tu deporte o proyecto.', step2Title:'Hazla tuya', step2Text:'Define colores, textos y los detalles de tu equipo.', step3Title:'Crea con HANNA', step3Text:'Prepara tu selección y comparte tu idea con nosotros.',
  partnersTitle: 'Creamos mejor, juntos.', partnersText: 'Confección y creatividad se encuentran. HANNA × Grafiplot Vásquez.', partnersImage: '/colaboradores.jpg',
  footerText: 'Prendas con identidad. Creaciones con intención.', faqTitle:'Antes de empezar', faq1Title:'¿Puedo usar mi propio logo?', faq1Text:'Sí. Tu logo, colores y textos son el punto de partida de una prenda personalizada.', faq2Title:'¿Cómo elijo una colección?',faq2Text:'Selecciona una categoría para ver su propuesta. Puedes preparar una lista con las prendas que te interesan.',
  categories: [
    {name:'Fútbol', subtitle:'La identidad de tu equipo',image:''},
    {name:'Ciclismo',subtitle:'Kilómetros con tu sello',image:''},
    {name:'Running',subtitle:'Tu ritmo, tu estilo',image:''},
    {name:'Baloncesto',subtitle:'Un equipo. Una identidad.',image:''},
    {name:'Voleibol',subtitle:'Creaciones para la cancha',image:''},
    {name:'eSports',subtitle:'Lleva tus colores al juego',image:''},
    {name:'Camisetas',subtitle:'Ideas que se llevan puestas',image:''},
    {name:'Sudaderas',subtitle:'Tu esencia, cada día',image:''}
  ]
};
export type Content = typeof initial;
export function validateContent(input: unknown): Content {
  if (!input || typeof input !== 'object') throw new Error('Contenido inválido');
  const x = input as Record<string, unknown>;
  const result = {...initial};
  for (const key of Object.keys(initial).filter(k=>k!=='categories')) {
    const value=x[key]; if(typeof value!=='string' || value.length>5000) throw new Error('Revisa los textos');
    if(key==='whatsappNumber' && !/^\d{10,15}$/.test(value.replace(/[^0-9]/g,''))) throw new Error('Incluye el código de país en el número de WhatsApp (por ejemplo +51 931 015 583)');
    if(key.toLowerCase().includes('image') && value && !validImage(value)) throw new Error('Usa un enlace directo HTTPS para las imágenes');
    (result as unknown as Record<string,unknown>)[key]=value;
  }
  if(!Array.isArray(x.categories)||x.categories.length!==8) throw new Error('Revisa las colecciones');
  result.categories=x.categories.map((c: Record<string,unknown>)=>{
    if(!c || typeof c.name!=='string'||typeof c.subtitle!=='string'||typeof c.image!=='string'||c.name.length>100||c.subtitle.length>300||c.image.length>3000||(c.image&&!validImage(c.image))) throw new Error('Revisa las colecciones y sus imágenes');
    return {name:c.name,subtitle:c.subtitle,image:c.image};
  });
  return result;
}
function validImage(value:string){if(value==='/colaboradores.jpg'||value==='/colaboradores.png')return true;try{return new URL(value).protocol==='https:'}catch{return false}}
