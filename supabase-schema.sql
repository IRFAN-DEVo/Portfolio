-- ==============================================================================
-- IRFAN PORTFOLIO — COMPLETE SUPABASE POSTGRESQL DATABASE SCHEMA & POLICIES
-- ==============================================================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT DEFAULT '',
    tech_stack TEXT[] DEFAULT '{}',
    image_url TEXT,
    github_url TEXT,
    live_url TEXT,
    is_live_enabled BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure is_live_enabled column exists if table was created previously
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'projects' 
        AND column_name = 'is_live_enabled'
    ) THEN
        ALTER TABLE public.projects ADD COLUMN is_live_enabled BOOLEAN DEFAULT true;
    END IF;
END $$;

-- 2. Messages / Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT DEFAULT 'Portfolio Inquiry',
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Website Profile & Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'site_settings',
    name TEXT NOT NULL DEFAULT 'Mohammed Irfan K',
    title TEXT NOT NULL DEFAULT 'Python / Django Developer',
    focus TEXT NOT NULL DEFAULT 'Backend Development & Full-Stack Development',
    bio TEXT NOT NULL DEFAULT 'Python/Django Backend Developer specializing in concurrency-safe architectures, high-throughput REST APIs, cryptographic licensing backends, and full-stack web applications with React.',
    email TEXT NOT NULL DEFAULT 'irfanmuthu56@gmail.com',
    phone TEXT NOT NULL DEFAULT '8086175728',
    location TEXT NOT NULL DEFAULT 'Calicut, Kerala, India',
    resume_url TEXT DEFAULT '/resume.pdf',
    profile_image_url TEXT DEFAULT '/images/particle_reference.jpg',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Grouped Skills Table
CREATE TABLE IF NOT EXISTS public.skills_grouped (
    id TEXT PRIMARY KEY DEFAULT 'skills_root',
    categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Professional Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    duration TEXT DEFAULT '',
    location TEXT NOT NULL,
    responsibilities TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Education Table
CREATE TABLE IF NOT EXISTS public.education (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ==============================================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_grouped ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- RLS POLICIES
-- ==============================================================================

-- Projects Policies
DROP POLICY IF EXISTS "Public Read Published Projects" ON public.projects;
CREATE POLICY "Public Read Published Projects"
    ON public.projects FOR SELECT
    USING (published = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin All Projects" ON public.projects;
CREATE POLICY "Admin All Projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Messages Policies
DROP POLICY IF EXISTS "Public Insert Messages" ON public.messages;
CREATE POLICY "Public Insert Messages"
    ON public.messages FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Messages" ON public.messages;
CREATE POLICY "Admin All Messages"
    ON public.messages FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Settings Policies
DROP POLICY IF EXISTS "Public Read Settings" ON public.settings;
CREATE POLICY "Public Read Settings"
    ON public.settings FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admin All Settings" ON public.settings;
CREATE POLICY "Admin All Settings"
    ON public.settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Skills Policies
DROP POLICY IF EXISTS "Public Read Skills" ON public.skills_grouped;
CREATE POLICY "Public Read Skills"
    ON public.skills_grouped FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admin All Skills" ON public.skills_grouped;
CREATE POLICY "Admin All Skills"
    ON public.skills_grouped FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Experience Policies
DROP POLICY IF EXISTS "Public Read Experience" ON public.experience;
CREATE POLICY "Public Read Experience"
    ON public.experience FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admin All Experience" ON public.experience;
CREATE POLICY "Admin All Experience"
    ON public.experience FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Education Policies
DROP POLICY IF EXISTS "Public Read Education" ON public.education;
CREATE POLICY "Public Read Education"
    ON public.education FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admin All Education" ON public.education;
CREATE POLICY "Admin All Education"
    ON public.education FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Settings
INSERT INTO public.settings (id, name, title, focus, bio, email, phone, location, resume_url)
VALUES (
    'site_settings',
    'Mohammed Irfan K',
    'Python / Django Developer',
    'Backend Development & Full-Stack Development',
    'Python/Django Backend Developer specializing in concurrency-safe architectures, high-throughput REST APIs, cryptographic licensing backends, and full-stack web applications with React. Rigorous in database transaction modeling, JWT security, and automated API validation.',
    'irfanmuthu56@gmail.com',
    '8086175728',
    'Calicut, Kerala, India',
    '/resume.pdf'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Projects
INSERT INTO public.projects (id, title, short_description, long_description, tech_stack, image_url, github_url, live_url, is_live_enabled, featured, published, display_order)
VALUES
(
    'proj-1',
    'LicenseGuard',
    'Time-based DRF licensing backend featuring ES256 elliptic curve offline token verification and concurrency-safe device activation limits.',
    'Designed and engineered an enterprise licensing subsystem using Django REST Framework and PostgreSQL.\n\nKey Highlights:\n• Offline Verification: Issues ES256-signed cryptographic tokens verified client-side without runtime database calls.\n• Concurrency-Safe Activations: Wrapped device activation counters in PostgreSQL SELECT FOR UPDATE transactions to eliminate race conditions.\n• Append-Only Audit Logging: Immutable database audit tables for license activations, revocations, and expirations.\n• Automated OpenAPI Documentation: Generated full schema via DRF Spectacular with 100% test coverage in Postman.',
    ARRAY['Python', 'Django', 'DRF', 'PostgreSQL', 'Cryptography (ES256)', 'Docker'],
    '/portfolio/assets/ecommerce-DVISmkX7.jpg',
    'https://github.com/IRFAN-DEVo',
    'https://licenseguard-api.demo.com',
    true,
    true,
    true,
    1
),
(
    'proj-2',
    'DjangoMart',
    'Production-grade e-commerce REST backend with JWT role-based access control, PostgreSQL schema, and multi-gateway checkout (Razorpay, Stripe, COD).',
    'Full-stack e-commerce API backend built with Django REST Framework and PostgreSQL.\n\nKey Highlights:\n• Multi-Gateway Payments: Unified checkout pipeline supporting Razorpay, Stripe webhooks, and Cash on Delivery.\n• Security & RBAC: JWT authentication with custom permissions enforcing customer vs admin role separation.\n• Relational Schema Design: Indexed relational models for product variants, shopping carts, order states, and transaction histories.\n• Rigorous Postman Testing: Complete collection covering edge-case payloads, idempotency keys, and error status codes.',
    ARRAY['Python', 'Django', 'DRF', 'PostgreSQL', 'Razorpay', 'Stripe', 'JWT', 'Postman'],
    '/portfolio/assets/expense-sbI4i9tg.jpg',
    'https://github.com/IRFAN-DEVo',
    'https://djangomart-store.demo.com',
    true,
    true,
    true,
    2
),
(
    'proj-3',
    'AI Study Assistant',
    'Document-grounded RAG learning platform: uploads PDF/DOCX, overlapping chunking, Nomic embeddings, ChromaDB vector search, and local Ollama (Llama 3).',
    'A local-first document analysis and question-answering assistant.\n\nKey Highlights:\n• RAG Pipeline: Ingestion of PDF, DOCX, TXT, and Markdown files with token-aware overlapping chunking.\n• Vector Retrieval: Generates embeddings using Nomic Embed Text stored in ChromaDB vector store.\n• Local Privacy-Preserving Inference: Queries Ollama running Llama 3 for context-grounded citations.\n• Automated Quizzes & Flashcards: Generates structured test questions and summary cards directly from uploaded syllabus materials.',
    ARRAY['Python', 'Django', 'React', 'ChromaDB', 'Ollama (Llama 3)', 'Nomic Embed', 'REST APIs'],
    '/portfolio/assets/habitflow-BhEplUHh.jpg',
    'https://github.com/IRFAN-DEVo',
    'https://ai-study-assistant.demo.com',
    false,
    true,
    true,
    3
),
(
    'proj-4',
    'LinkPad',
    'High-throughput URL gateway and device routing controller with analytics, custom short slugs, and rate-limiting.',
    'High-performance backend routing service designed for low-latency redirection and click analytics.\n\nKey Highlights:\n• Low-Latency Redirection: Database indexing on short slugs delivering sub-15ms response times.\n• Device Intelligence: Parses User-Agent headers to route users to platform-specific deep links.\n• Analytics Pipeline: Tracks referrers, geographic locations, and click timestamps.',
    ARRAY['Python', 'Django REST Framework', 'PostgreSQL', 'Docker', 'React'],
    '/portfolio/assets/mindpixel-Bx0qpjdU.jpg',
    'https://github.com/IRFAN-DEVo',
    'https://linkpad-gateway.demo.com',
    true,
    false,
    true,
    4
)
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Experience
INSERT INTO public.experience (id, role, company, period, duration, location, responsibilities)
VALUES (
    'exp-1',
    'Python Developer Intern',
    'Febno Technologies',
    'Sep 2026 – Oct 2026',
    '1 Month',
    'Malappuram, Kerala',
    ARRAY[
        'Executed rigorous QA & API testing on Amazon APIs with Postman, validating endpoints, parameters, and headers.',
        'Conducted full website audits diagnosing broken links, redirect chains, and HTTP status code anomalies.',
        'Architected a Django REST Framework backend for time-based licensing with ES256 cryptographic signatures and offline verification.',
        'Designed PostgreSQL schemas for licenses, devices, idempotency records, and append-only audit events.',
        'Implemented concurrency-safe device activations using database transactions to prevent race conditions.'
    ]
)
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Education
INSERT INTO public.education (id, degree, institution, period)
VALUES 
(
    'edu-1',
    'Python Django Full Stack Development',
    'TechnoDot Academy of R&D&I',
    'Jan 2026 – Aug 2026'
),
(
    'edu-2',
    'BA English Literature',
    'University of Calicut',
    '2022 – 2025'
)
ON CONFLICT (id) DO NOTHING;
