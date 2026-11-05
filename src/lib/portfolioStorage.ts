import { 
  SITE_CONFIG, 
  DEFAULT_SKILL_CATEGORIES, 
  DEFAULT_EXPERIENCE_DATA, 
  DEFAULT_EDUCATION_DATA 
} from './constants';
import type { 
  WebsiteSettings, 
  SkillCategoryGroup, 
  ExperienceItem, 
  EducationItem 
} from './types';

const PROFILE_STORAGE_KEY = 'portfolio_profile_settings';
const SKILLS_STORAGE_KEY = 'portfolio_skills_data';
const EXPERIENCE_STORAGE_KEY = 'portfolio_experience_data';
const EDUCATION_STORAGE_KEY = 'portfolio_education_data';

const PROFILE_UPDATE_EVENT = 'portfolio_profile_updated';
const SKILLS_UPDATE_EVENT = 'portfolio_skills_updated';
const EXPERIENCE_UPDATE_EVENT = 'portfolio_experience_updated';
const EDUCATION_UPDATE_EVENT = 'portfolio_education_updated';

// ============================================================================
// PROFILE & CV SETTINGS
// ============================================================================

export function getStoredProfile(): WebsiteSettings {
  if (typeof window === 'undefined') return SITE_CONFIG;
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return { ...SITE_CONFIG, ...parsed };
      }
    }
  } catch (e) {
    console.error('Error reading profile from localStorage:', e);
  }
  return SITE_CONFIG;
}

export function saveStoredProfile(profile: WebsiteSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATE_EVENT, { detail: profile }));
  } catch (e) {
    console.error('Error saving profile to localStorage:', e);
  }
}

export function subscribeToProfileUpdates(callback: (profile: WebsiteSettings) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (event: Event) => {
    const custom = event as CustomEvent<WebsiteSettings>;
    callback(custom.detail || getStoredProfile());
  };
  window.addEventListener(PROFILE_UPDATE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(PROFILE_UPDATE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

// ============================================================================
// SKILLS SETTINGS
// ============================================================================

export function getStoredSkills(): SkillCategoryGroup[] {
  if (typeof window === 'undefined') return DEFAULT_SKILL_CATEGORIES;
  try {
    const raw = localStorage.getItem(SKILLS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading skills from localStorage:', e);
  }
  return DEFAULT_SKILL_CATEGORIES;
}

export function saveStoredSkills(skills: SkillCategoryGroup[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(skills));
    window.dispatchEvent(new CustomEvent(SKILLS_UPDATE_EVENT, { detail: skills }));
  } catch (e) {
    console.error('Error saving skills to localStorage:', e);
  }
}

export function subscribeToSkillsUpdates(callback: (skills: SkillCategoryGroup[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (event: Event) => {
    const custom = event as CustomEvent<SkillCategoryGroup[]>;
    callback(custom.detail || getStoredSkills());
  };
  window.addEventListener(SKILLS_UPDATE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(SKILLS_UPDATE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

// ============================================================================
// EXPERIENCE SETTINGS
// ============================================================================

export function getStoredExperience(): ExperienceItem[] {
  if (typeof window === 'undefined') return DEFAULT_EXPERIENCE_DATA;
  try {
    const raw = localStorage.getItem(EXPERIENCE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading experience from localStorage:', e);
  }
  return DEFAULT_EXPERIENCE_DATA;
}

export function saveStoredExperience(experience: ExperienceItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(experience));
    window.dispatchEvent(new CustomEvent(EXPERIENCE_UPDATE_EVENT, { detail: experience }));
  } catch (e) {
    console.error('Error saving experience to localStorage:', e);
  }
}

export function subscribeToExperienceUpdates(callback: (experience: ExperienceItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (event: Event) => {
    const custom = event as CustomEvent<ExperienceItem[]>;
    callback(custom.detail || getStoredExperience());
  };
  window.addEventListener(EXPERIENCE_UPDATE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EXPERIENCE_UPDATE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

// ============================================================================
// EDUCATION SETTINGS
// ============================================================================

export function getStoredEducation(): EducationItem[] {
  if (typeof window === 'undefined') return DEFAULT_EDUCATION_DATA;
  try {
    const raw = localStorage.getItem(EDUCATION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading education from localStorage:', e);
  }
  return DEFAULT_EDUCATION_DATA;
}

export function saveStoredEducation(education: EducationItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(EDUCATION_STORAGE_KEY, JSON.stringify(education));
    window.dispatchEvent(new CustomEvent(EDUCATION_UPDATE_EVENT, { detail: education }));
  } catch (e) {
    console.error('Error saving education to localStorage:', e);
  }
}

export function subscribeToEducationUpdates(callback: (education: EducationItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (event: Event) => {
    const custom = event as CustomEvent<EducationItem[]>;
    callback(custom.detail || getStoredEducation());
  };
  window.addEventListener(EDUCATION_UPDATE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EDUCATION_UPDATE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

