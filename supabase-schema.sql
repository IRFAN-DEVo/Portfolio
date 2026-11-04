-- ==============================================================================
-- IRFAN PORTFOLIO — SUPABASE POSTGRESQL DATABASE SCHEMA & ROW LEVEL SECURITY
-- ==============================================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT DEFAULT '',
    tech_stack TEXT[] DEFAULT '{}',
    image_url TEXT,
    github_url TEXT,
    live_url TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Messages / Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 4. Projects RLS Policies
-- Allow anyone to read published projects
CREATE POLICY "Public Read Published Projects"
    ON public.projects FOR SELECT
    USING (published = true OR auth.role() = 'authenticated');

-- Allow authenticated admin users to insert, update, and delete projects
CREATE POLICY "Admin All Projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Messages RLS Policies
-- Allow anyone (public visitors) to submit contact messages
CREATE POLICY "Public Insert Messages"
    ON public.messages FOR INSERT
    WITH CHECK (true);

-- Allow authenticated admin users to view, mark read, and delete messages
CREATE POLICY "Admin All Messages"
    ON public.messages FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Seed Initial Core Projects
INSERT INTO public.projects (title, short_description, long_description, tech_stack, image_url, github_url, live_url, featured, published, display_order)
VALUES
(
    'LicenseGuard',
    'Time-based DRF licensing backend featuring ES256 elliptic curve offline token verification and concurrency-safe device activation limits.',
    'Designed and engineered an enterprise licensing subsystem using Django REST Framework and PostgreSQL.\n\nKey Highlights:\n• Offline Verification: Issues ES256-signed cryptographic tokens verified client-side without runtime database calls.\n• Concurrency-Safe Activations: Wrapped device activation counters in PostgreSQL SELECT FOR UPDATE transactions to eliminate race conditions.\n• Append-Only Audit Logging: Immutable database audit tables for license activations, revocations, and expirations.\n• Automated OpenAPI Documentation: Generated full schema via DRF Spectacular with 100% test coverage in Postman.',
    ARRAY['Python', 'Django', 'DRF', 'PostgreSQL', 'Cryptography (ES256)', 'Docker'],
    '/portfolio/assets/ecommerce-DVISmkX7.jpg',
    'https://github.com/IRFAN-DEVo',
    NULL,
    true,
    true,
    1
),
(
    'DjangoMart',
    'Production-grade e-commerce REST backend with JWT role-based access control, PostgreSQL schema, and multi-gateway checkout (Razorpay, Stripe, COD).',
    'Full-stack e-commerce API backend built with Django REST Framework and PostgreSQL.\n\nKey Highlights:\n• Multi-Gateway Payments: Unified checkout pipeline supporting Razorpay, Stripe webhooks, and Cash on Delivery.\n• Security & RBAC: JWT authentication with custom permissions enforcing customer vs admin role separation.\n• Relational Schema Design: Indexed relational models for product variants, shopping carts, order states, and transaction histories.\n• Rigorous Postman Testing: Complete collection covering edge-case payloads, idempotency keys, and error status codes.',
    ARRAY['Python', 'Django', 'DRF', 'PostgreSQL', 'Razorpay', 'Stripe', 'JWT', 'Postman'],
    '/portfolio/assets/expense-sbI4i9tg.jpg',
    'https://github.com/IRFAN-DEVo',
    NULL,
    true,
    true,
    2
),
(
    'AI Study Assistant',
    'Document-grounded RAG learning platform: uploads PDF/DOCX, overlapping chunking, Nomic embeddings, ChromaDB vector search, and local Ollama (Llama 3).',
    'A local-first document analysis and question-answering assistant.\n\nKey Highlights:\n• RAG Pipeline: Ingestion of PDF, DOCX, TXT, and Markdown files with token-aware overlapping chunking.\n• Vector Retrieval: Generates embeddings using Nomic Embed Text stored in ChromaDB vector store.\n• Local Privacy-Preserving Inference: Queries Ollama running Llama 3 for context-grounded citations.\n• Automated Quizzes & Flashcards: Generates structured test questions and summary cards directly from uploaded syllabus materials.',
    ARRAY['Python', 'Django', 'React', 'ChromaDB', 'Ollama (Llama 3)', 'Nomic Embed', 'REST APIs'],
    '/portfolio/assets/habitflow-BhEplUHh.jpg',
    'https://github.com/IRFAN-DEVo',
    NULL,
    true,
    true,
    3
),
(
    'LinkPad',
    'High-throughput URL gateway and device routing controller with analytics, custom short slugs, and rate-limiting.',
    'High-performance backend routing service designed for low-latency redirection and click analytics.\n\nKey Highlights:\n• Low-Latency Redirection: Database indexing on short slugs delivering sub-15ms response times.\n• Device Intelligence: Parses User-Agent headers to route users to platform-specific deep links.\n• Analytics Pipeline: Tracks referrers, geographic locations, and click timestamps.',
    ARRAY['Python', 'Django REST Framework', 'PostgreSQL', 'Docker', 'React'],
    '/portfolio/assets/mindpixel-Bx0qpjdU.jpg',
    'https://github.com/IRFAN-DEVo',
    NULL,
    false,
    true,
    4
)
ON CONFLICT DO NOTHING;
