import type { Project, SkillItem, SocialLink, WebsiteSettings } from './types';

export const SITE_CONFIG: WebsiteSettings = {
  name: 'IRFAN',
  title: 'Python / Django Developer',
  focus: 'Backend Development & Full-Stack Development',
  email: 'irfanneerolpalam12@gmail.com',
  phone: '8086175728',
  location: 'Calicut, Kerala, India',
  bio: 'Python/Django Backend Developer specializing in concurrency-safe architectures, high-throughput REST APIs, cryptographic licensing backends, and full-stack web applications with React. Rigorous in database transaction modeling, JWT security, and automated API validation.',
  resume_url: '#',
  profile_image_url: '/images/particle_reference.jpg',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    platform: 'GitHub',
    url: 'https://github.com/IRFAN-DEVo',
    label: 'github.com/IRFAN-DEVo',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/mohammed-irfan-a4b3153b3',
    label: 'linkedin.com/in/mohammed-irfan',
  },
  {
    id: 'email',
    platform: 'Email',
    url: 'mailto:irfanneerolpalam12@gmail.com',
    label: 'irfanneerolpalam12@gmail.com',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const SKILLS_CATEGORIZED: Record<'Backend' | 'Frontend' | 'Database' | 'Tools', string[]> = {
  Backend: ['Python', 'Django', 'Django REST Framework', 'REST APIs', 'JWT', 'RBAC'],
  Frontend: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  Database: ['PostgreSQL', 'Django ORM', 'SQLite', 'ChromaDB'],
  Tools: ['Git', 'GitHub', 'Docker', 'Postman', 'DRF Spectacular'],
};

export const SKILLS_LIST: SkillItem[] = [
  { id: '1', name: 'Python', category: 'Backend', display_order: 1 },
  { id: '2', name: 'Django', category: 'Backend', display_order: 2 },
  { id: '3', name: 'Django REST Framework', category: 'Backend', display_order: 3 },
  { id: '4', name: 'REST APIs', category: 'Backend', display_order: 4 },
  { id: '5', name: 'JWT', category: 'Backend', display_order: 5 },
  { id: '6', name: 'React', category: 'Frontend', display_order: 6 },
  { id: '7', name: 'JavaScript', category: 'Frontend', display_order: 7 },
  { id: '8', name: 'HTML5', category: 'Frontend', display_order: 8 },
  { id: '9', name: 'CSS3', category: 'Frontend', display_order: 9 },
  { id: '10', name: 'PostgreSQL', category: 'Database', display_order: 10 },
  { id: '11', name: 'Django ORM', category: 'Database', display_order: 11 },
  { id: '12', name: 'Git', category: 'Tools', display_order: 12 },
  { id: '13', name: 'GitHub', category: 'Tools', display_order: 13 },
  { id: '14', name: 'Docker', category: 'Tools', display_order: 14 },
  { id: '15', name: 'Postman', category: 'Tools', display_order: 15 },
];

export const EXPERIENCE_DATA = [
  {
    role: 'Python Developer Intern',
    company: 'Febno Technologies',
    period: 'Sep 2026 – Oct 2026',
    duration: '1 Month',
    location: 'Malappuram, Kerala',
    responsibilities: [
      'Executed rigorous QA & API testing on Amazon APIs with Postman, validating endpoints, parameters, and headers.',
      'Conducted full website audits diagnosing broken links, redirect chains, and HTTP status code anomalies.',
      'Architected a Django REST Framework backend for time-based licensing with ES256 cryptographic signatures and offline verification.',
      'Designed PostgreSQL schemas for licenses, devices, idempotency records, and append-only audit events.',
      'Implemented concurrency-safe device activations using database transactions to prevent race conditions.',
    ],
  },
];

export const EDUCATION_DATA = [
  {
    degree: 'Python Django Full Stack Development',
    institution: 'TechnoDot Academy of R&D&I',
    period: 'Jan 2026 – Aug 2026',
  },
  {
    degree: 'BA English Literature',
    institution: 'University of Calicut',
    period: '2022 – 2025',
  },
];

export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'LicenseGuard',
    short_description:
      'Time-based DRF licensing backend featuring ES256 elliptic curve offline token verification and concurrency-safe device activation limits.',
    long_description:
      'Designed and engineered an enterprise licensing subsystem using Django REST Framework and PostgreSQL.\n\nKey Highlights:\n• Offline Verification: Issues ES256-signed cryptographic tokens verified client-side without runtime database calls.\n• Concurrency-Safe Activations: Wrapped device activation counters in PostgreSQL SELECT FOR UPDATE transactions to eliminate race conditions.\n• Append-Only Audit Logging: Immutable database audit tables for license activations, revocations, and expirations.\n• Automated OpenAPI Documentation: Generated full schema via DRF Spectacular with 100% test coverage in Postman.',
    tech_stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Cryptography (ES256)', 'Docker'],
    image_url: '/portfolio/assets/ecommerce-DVISmkX7.jpg',
    github_url: 'https://github.com/IRFAN-DEVo',
    live_url: 'https://licenseguard-api.demo.com',
    is_live_enabled: true,
    featured: true,
    published: true,
    display_order: 1,
  },
  {
    id: 'proj-2',
    title: 'DjangoMart',
    short_description:
      'Production-grade e-commerce REST backend with JWT role-based access control, PostgreSQL schema, and multi-gateway checkout (Razorpay, Stripe, COD).',
    long_description:
      'Full-stack e-commerce API backend built with Django REST Framework and PostgreSQL.\n\nKey Highlights:\n• Multi-Gateway Payments: Unified checkout pipeline supporting Razorpay, Stripe webhooks, and Cash on Delivery.\n• Security & RBAC: JWT authentication with custom permissions enforcing customer vs admin role separation.\n• Relational Schema Design: Indexed relational models for product variants, shopping carts, order states, and transaction histories.\n• Rigorous Postman Testing: Complete collection covering edge-case payloads, idempotency keys, and error status codes.',
    tech_stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Razorpay', 'Stripe', 'JWT', 'Postman'],
    image_url: '/portfolio/assets/expense-sbI4i9tg.jpg',
    github_url: 'https://github.com/IRFAN-DEVo',
    live_url: 'https://djangomart-store.demo.com',
    is_live_enabled: true,
    featured: true,
    published: true,
    display_order: 2,
  },
  {
    id: 'proj-3',
    title: 'AI Study Assistant',
    short_description:
      'Document-grounded RAG learning platform: uploads PDF/DOCX, overlapping chunking, Nomic embeddings, ChromaDB vector search, and local Ollama (Llama 3).',
    long_description:
      'A local-first document analysis and question-answering assistant.\n\nKey Highlights:\n• RAG Pipeline: Ingestion of PDF, DOCX, TXT, and Markdown files with token-aware overlapping chunking.\n• Vector Retrieval: Generates embeddings using Nomic Embed Text stored in ChromaDB vector store.\n• Local Privacy-Preserving Inference: Queries Ollama running Llama 3 for context-grounded citations.\n• Automated Quizzes & Flashcards: Generates structured test questions and summary cards directly from uploaded syllabus materials.',
    tech_stack: ['Python', 'Django', 'React', 'ChromaDB', 'Ollama (Llama 3)', 'Nomic Embed', 'REST APIs'],
    image_url: '/portfolio/assets/habitflow-BhEplUHh.jpg',
    github_url: 'https://github.com/IRFAN-DEVo',
    live_url: 'https://ai-study-assistant.demo.com',
    is_live_enabled: false,
    featured: true,
    published: true,
    display_order: 3,
  },
  {
    id: 'proj-4',
    title: 'LinkPad',
    short_description:
      'High-throughput URL gateway and device routing controller with analytics, custom short slugs, and rate-limiting.',
    long_description:
      'High-performance backend routing service designed for low-latency redirection and click analytics.\n\nKey Highlights:\n• Low-Latency Redirection: Database indexing on short slugs delivering sub-15ms response times.\n• Device Intelligence: Parses User-Agent headers to route users to platform-specific deep links.\n• Analytics Pipeline: Tracks referrers, geographic locations, and click timestamps.',
    tech_stack: ['Python', 'Django REST Framework', 'PostgreSQL', 'Docker', 'React'],
    image_url: '/portfolio/assets/mindpixel-Bx0qpjdU.jpg',
    github_url: 'https://github.com/IRFAN-DEVo',
    live_url: 'https://linkpad-gateway.demo.com',
    is_live_enabled: true,
    featured: false,
    published: true,
    display_order: 4,
  },
];

