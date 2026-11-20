import { useState, useEffect } from 'react';
import { GalaxyNode, NodeCategory } from '../types/universe';
import { GALAXY_NODES } from '../data/universeData';
import { audioUniverse } from '../data/audioSynthesizer';

interface StoreState {
  selectedNode: GalaxyNode | null;
  hoveredNode: GalaxyNode | null;
  activeCategory: NodeCategory | 'all';
  highlightedNodes: string[];
  searchQuery: string;
  isSearching: boolean;
  isChatOpen: boolean;
  isAutoExploring: boolean;
  cameraTarget: [number, number, number] | null;
  soundMuted: boolean;
  viewMode: '3d' | 'list';
}

type Listener = () => void;

let state: StoreState = {
  selectedNode: null,
  hoveredNode: null,
  activeCategory: 'all',
  highlightedNodes: [],
  searchQuery: '',
  isSearching: false,
  isChatOpen: false,
  isAutoExploring: false,
  cameraTarget: null,
  soundMuted: true,
  viewMode: '3d',
};

const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const universeStore = {
  getState: () => state,
  
  setSelectedNode: (node: GalaxyNode | null) => {
    state = {
      ...state,
      selectedNode: node,
      cameraTarget: node ? node.position : null,
      highlightedNodes: node ? [node.id, ...node.connections] : [],
    };
    if (node) {
      audioUniverse.playSelectSound(550);
    } else {
      audioUniverse.playCloseSound();
    }
    emitChange();
  },

  setHoveredNode: (node: GalaxyNode | null) => {
    if (state.hoveredNode?.id !== node?.id) {
      state = { ...state, hoveredNode: node };
      if (node) {
        audioUniverse.playHoverTone(480);
      }
      emitChange();
    }
  },

  setActiveCategory: (cat: NodeCategory | 'all') => {
    state = {
      ...state,
      activeCategory: cat,
      highlightedNodes: cat === 'all' 
        ? [] 
        : GALAXY_NODES.filter(n => n.category === cat).map(n => n.id),
    };
    audioUniverse.playHoverTone(380);
    emitChange();
  },

  setHighlightedNodes: (ids: string[]) => {
    state = { ...state, highlightedNodes: ids };
    emitChange();
  },

  setSearchQuery: (query: string) => {
    state = { ...state, searchQuery: query };
    emitChange();
  },

  setIsSearching: (val: boolean) => {
    state = { ...state, isSearching: val };
    emitChange();
  },

  setIsChatOpen: (val: boolean) => {
    state = { ...state, isChatOpen: val };
    emitChange();
  },

  toggleAutoExplore: () => {
    const nextVal = !state.isAutoExploring;
    state = { ...state, isAutoExploring: nextVal };
    if (nextVal) {
      audioUniverse.playSelectSound(680);
    }
    emitChange();
  },

  stopAutoExplore: () => {
    if (state.isAutoExploring) {
      state = { ...state, isAutoExploring: false };
      emitChange();
    }
  },

  resetCamera: () => {
    state = {
      ...state,
      selectedNode: null,
      cameraTarget: null,
      activeCategory: 'all',
      highlightedNodes: [],
      isAutoExploring: false,
    };
    audioUniverse.playCloseSound();
    emitChange();
  },

  toggleSound: () => {
    const muted = audioUniverse.toggleMute();
    state = { ...state, soundMuted: muted };
    emitChange();
  },

  setViewMode: (mode: '3d' | 'list') => {
    state = { ...state, viewMode: mode };
    emitChange();
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useUniverse() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return universeStore.subscribe(() => setTick(t => t + 1));
  }, []);

  return {
    ...universeStore.getState(),
    setSelectedNode: universeStore.setSelectedNode,
    setHoveredNode: universeStore.setHoveredNode,
    setActiveCategory: universeStore.setActiveCategory,
    setHighlightedNodes: universeStore.setHighlightedNodes,
    setSearchQuery: universeStore.setSearchQuery,
    setIsSearching: universeStore.setIsSearching,
    setIsChatOpen: universeStore.setIsChatOpen,
    toggleAutoExplore: universeStore.toggleAutoExplore,
    stopAutoExplore: universeStore.stopAutoExplore,
    resetCamera: universeStore.resetCamera,
    toggleSound: universeStore.toggleSound,
    setViewMode: universeStore.setViewMode,
  };
}
