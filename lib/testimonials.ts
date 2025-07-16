export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'maria-gonzalez',
    name: 'María González',
    role: 'Directora de Marketing',
    company: 'Boutique Luna',
    content:
      'Hexágono transformó completamente nuestra presencia online. El sitio web que crearon es hermoso y funcional, y la gestión de redes sociales ha aumentado nuestras ventas un 40%.',
    avatar: '/testimonials/maria-gonzalez.jpg',
    rating: 5,
    featured: true,
  },
  {
    id: 'carlos-rodriguez',
    name: 'Carlos Rodríguez',
    role: 'CEO',
    company: 'TechStart Solutions',
    content:
      'Profesionales excepcionales. Entregaron nuestro sitio corporativo en tiempo récord y el soporte post-venta es impecable. Altamente recomendados.',
    avatar: '/testimonials/carlos-rodriguez.jpg',
    rating: 5,
    featured: true,
  },
  {
    id: 'ana-martinez',
    name: 'Ana Martínez',
    role: 'Propietaria',
    company: 'Café Central',
    content:
      'La landing page que desarrollaron para nuestro café generó un aumento del 60% en reservas online. El diseño es exactamente lo que necesitábamos.',
    avatar: '/testimonials/ana-martinez.jpg',
    rating: 5,
    featured: true,
  },
  {
    id: 'luis-fernandez',
    name: 'Luis Fernández',
    role: 'Gerente General',
    company: 'Constructora del Sur',
    content:
      'El sitio web corporativo superó nuestras expectativas. La integración con nuestro CRM y la optimización SEO nos han traído muchos clientes nuevos.',
    avatar: '/testimonials/luis-fernandez.jpg',
    rating: 5,
  },
  {
    id: 'sofia-torres',
    name: 'Sofía Torres',
    role: 'Fundadora',
    company: 'Estudio de Yoga Namaste',
    content:
      'La gestión de redes sociales ha sido increíble. Nuestro engagement creció 300% y ahora tenemos lista de espera para las clases.',
    avatar: '/testimonials/sofia-torres.jpg',
    rating: 5,
  },
];

export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.featured);
};

export const getAllTestimonials = (): Testimonial[] => {
  return testimonials;
};

export const getTestimonialById = (id: string): Testimonial | undefined => {
  return testimonials.find(testimonial => testimonial.id === id);
};