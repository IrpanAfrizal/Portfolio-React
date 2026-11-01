export const categories = ['all', 'web', 'ai', 'android']
// featured = tampil di "Karya Pilihan" (Home). art = warna latar folder kaca.
export const projects = [
  { slug: 'chatbot-mawaris-ai', id: 'mawaris', title: 'Chatbot Mawaris AI', year: '2026', category: 'ai', art: 'ember', featured: true,
    image: '/images/projects/mawaris.png', github: 'https://github.com/IrpanAfrizal/Chatbot-Mawaris-Ai',
    stack: ['Python', 'React', 'RAG', 'Qdrant', 'Telegram Bot'],
    langs: [['Python', 79.7], ['JavaScript', 10.8], ['CSS', 9.4], ['HTML', 0.1]] },
  { slug: 'asset-management-information-system', id: 'archive', title: 'Asset Management Information System', year: '2025', category: 'web', art: 'dusk', featured: true,
    image: '/images/projects/archive.png', github: 'https://github.com/IrpanAfrizal/Sistem-Arsip-archiving-system-Ci4',
    stack: ['CodeIgniter 4', 'PHP 8+', 'MySQL / MariaDB', 'Bootstrap 5', 'jQuery & AJAX', 'Myth/Auth', 'Dompdf'] },
  { slug: 'image-to-glb', id: 'image3d', title: 'Image to GLB', status: 'progress', category: 'ai', art: 'glacier',
    image: '/images/projects/image-to-glb.png', github: 'https://github.com/IrpanAfrizal/Image-to-3D',
    stack: ['Python', 'SF3D', 'TripoSR', 'model-viewer', 'Apple MPS'] },
  { slug: 'portfolio-react', id: 'portreact', title: 'Portfolio React', year: '2026', category: 'web', art: 'verdant',
    image: '/images/projects/portfolio-react.png', github: 'https://github.com/IrpanAfrizal/Portfolio-React',
    stack: ['React', 'Vite', 'React Router', 'CSS'] },
  { slug: 'portfolio-3d', id: 'port3d', title: 'Portfolio 3D', year: '2026', category: 'web', art: 'aurora', featured: true,
    image: '/images/projects/portfolio-3d.png', github: 'https://github.com/IrpanAfrizal/Portfolio-Irpan-Afrizal-Putra-Eriani',
    stack: ['React', 'TypeScript', 'Vite', 'Three.js', 'React Three Fiber', 'Drei', 'Motion / GSAP', 'CSS'] },
  { slug: 'geographic-information-system', id: 'gis', title: 'Geographic Information System', year: '2025', category: 'android', art: 'glacier',
    image: '/images/projects/gis.png', stack: ['Java', 'OSMDroid'] },
]
