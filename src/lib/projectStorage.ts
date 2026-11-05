import { SEED_PROJECTS } from './constants';
import type { Project } from './types';

const STORAGE_KEY = 'portfolio_projects_data';
const UPDATE_EVENT = 'portfolio_projects_updated';

/**
 * Retrieves projects from localStorage, falling back to SEED_PROJECTS.
 */
export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return SEED_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading projects from localStorage:', e);
  }
  return SEED_PROJECTS;
}

/**
 * Saves projects array to localStorage and notifies active listeners.
 */
export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: projects }));
  } catch (e) {
    console.error('Error saving projects to localStorage:', e);
  }
}

/**
 * Updates a single project in local storage.
 */
export function updateProjectInStorage(updated: Project): Project[] {
  const current = getStoredProjects();
  const index = current.findIndex((p) => p.id === updated.id);
  let next: Project[];
  if (index >= 0) {
    next = [...current];
    next[index] = { ...next[index], ...updated, updated_at: new Date().toISOString() };
  } else {
    next = [updated, ...current];
  }
  saveStoredProjects(next);
  return next;
}

/**
 * Toggles the live domain enabled state for a given project ID.
 */
export function toggleLiveDomainInStorage(id: string, isEnabled?: boolean): Project[] {
  const current = getStoredProjects();
  const next = current.map((p) => {
    if (p.id === id) {
      const newStatus = isEnabled !== undefined ? isEnabled : p.is_live_enabled === false;
      return { ...p, is_live_enabled: newStatus, updated_at: new Date().toISOString() };
    }
    return p;
  });
  saveStoredProjects(next);
  return next;
}

/**
 * Deletes a project by ID from local storage.
 */
export function deleteProjectFromStorage(id: string): Project[] {
  const current = getStoredProjects();
  const next = current.filter((p) => p.id !== id);
  saveStoredProjects(next);
  return next;
}

/**
 * Subscribe to project storage update events.
 */
export function subscribeToProjectUpdates(callback: (projects: Project[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (event: Event) => {
    const custom = event as CustomEvent<Project[]>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(getStoredProjects());
    }
  };
  window.addEventListener(UPDATE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(UPDATE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
