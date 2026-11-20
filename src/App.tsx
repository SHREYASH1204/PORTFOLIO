import React, { useEffect } from 'react';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { CosmicHeader } from './components/layout/CosmicHeader';
import { ShimmerHero } from './components/layout/ShimmerHero';
import { BottomHUD } from './components/layout/BottomHUD';
import { NodeDetailDrawer } from './components/modal/NodeDetailDrawer';
import { QuickSearchModal } from './components/modal/QuickSearchModal';
import { ConstellationGrid } from './components/layout/ConstellationGrid';
import { AskShreyashChat } from './components/chat/AskShreyashChat';
import { useUniverse } from './state/useUniverseStore';

export const App: React.FC = () => {
  const { viewMode } = useUniverse();

  return (
    <div className="fixed inset-0 w-full h-full h-[100dvh] overflow-hidden bg-[#050508] text-white select-none font-sans">
      {/* 1. Header with Filters & Quick Links */}
      <CosmicHeader />

      {/* 2. 3D WebGL Constellation Canvas */}
      <UniverseCanvas />

      {/* 3. Hero Atmospheric Typography */}
      <ShimmerHero />

      {/* 4. Alternate Overview Grid (when toggled) */}
      {viewMode === 'list' && <ConstellationGrid />}

      {/* 5. Deep-Dive Slide-in Drawer */}
      <NodeDetailDrawer />

      {/* 6. Command Palette / Search Modal */}
      <QuickSearchModal />

      {/* 7. Interactive AI Persona Chat System */}
      <AskShreyashChat />

      {/* 8. Bottom Controls Dock (Reset, Auto-Tour, Audio, Hints) */}
      <BottomHUD />
    </div>
  );
};

export default App;
