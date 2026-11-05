export interface Project {
  id: string;
  title: string;
  short_description: string;
  long_description: string;
  tech_stack: string[];
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  is_live_enabled?: boolean;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools';
  display_order?: number;
}

export interface SkillEntry {
  id?: string;
  name: string;
  tag: string;
}

export interface SkillCategoryGroup {
  id: string;
  category: string;
  iconName: 'Server' | 'Layout' | 'Database' | 'Wrench';
  variant: 'kraft' | 'lined' | 'grid' | 'parchment';
  tapeVariant: 'cream' | 'pink' | 'sage';
  rotation: string;
  skills: SkillEntry[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  duration?: string;
  location: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
  icon?: string;
}

export interface WebsiteSettings {
  name: string;
  title: string;
  focus: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  resume_url?: string;
  profile_image_url?: string;
}

