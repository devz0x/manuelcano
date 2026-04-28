import { create } from 'zustand';

export type ViewType =
  | 'home'
  | 'shop'
  | 'product'
  | 'about'
  | 'athletes'
  | 'technology'
  | 'contact'
  | 'blog'
  | 'blogPost'
  | 'configurator'
  | 'cart'
  | 'checkout'
  | 'search';

interface NavigationState {
  view: ViewType;
  params: Record<string, string>;
  previousView: ViewType;
  navigate: (view: ViewType, params?: Record<string, string>) => void;
  goBack: () => void;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  view: 'home',
  params: {},
  previousView: 'home',

  navigate: (view, params = {}) => {
    const { view: currentView } = get();
    set({
      view,
      params,
      previousView: currentView,
    });
    // Scroll to top on navigation
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  },

  goBack: () => {
    const { previousView } = get();
    set({ view: previousView, params: {} });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  },
}));
