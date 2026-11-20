import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GALAXY_NODES, CATEGORIES } from '../../data/universeData';
import { useUniverse } from '../../state/useUniverseStore';
import { GalaxyNode } from '../../types/universe';

// Helper to create crisp, high-DPI 3D Billboard Sprites locked directly to the stars
function createNodeLabelSprite(text: string, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const fontSize = 28;
  ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;

  const paddingX = 26;
  const paddingY = 16;
  const dotRadius = 6;
  const dotSpacing = 16;

  const totalW = textWidth + paddingX * 2 + dotRadius * 2 + dotSpacing;
  const totalH = fontSize + paddingY * 2;

  // 2x Retina resolution
  canvas.width = totalW * 2;
  canvas.height = totalH * 2;
  ctx.scale(2, 2);

  // Pill background
  ctx.fillStyle = 'rgba(8, 8, 14, 0.88)';
  ctx.beginPath();
  ctx.roundRect(0, 0, totalW, totalH, totalH / 2);
  ctx.fill();

  // Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Category glowing dot
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(paddingX + dotRadius, totalH / 2, dotRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, paddingX + dotRadius * 2 + dotSpacing, totalH / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(spriteMat);
  const aspect = totalW / totalH;
  const spriteHeight = 0.95;
  sprite.scale.set(spriteHeight * aspect, spriteHeight, 1);
  sprite.position.set(0, 1.45, 0); // Attached right above the star!
  sprite.name = 'labelSprite';

  return sprite;
}

// Initial home orbit values matching the balanced circular constellation view
const INITIAL_ORBIT = {
  radius: typeof window !== 'undefined' && window.innerWidth < 768 ? 35 : 27.0,
  theta: 0.17,
  phi: 0.82,
};

function getHomeCamPos(
  radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 35 : 27.0,
  theta = 0.17,
  phi = 0.82
): THREE.Vector3 {
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi) + 1.2;
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

export const UniverseCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { 
    selectedNode, 
    hoveredNode, 
    activeCategory, 
    highlightedNodes, 
    cameraTarget,
    isAutoExploring,
    setSelectedNode, 
    setHoveredNode 
  } = useUniverse();

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodesMeshMap = useRef<Map<string, THREE.Group>>(new Map());
  const linesMeshRef = useRef<THREE.LineSegments | null>(null);

  // Camera animation state (Starts directly at home position)
  const targetCamPos = useRef<THREE.Vector3>(getHomeCamPos());
  const currentCamLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 0));
  const targetCamLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 0));

  // Pointer & Orbit controls state
  const isPointerDown = useRef(false);
  const isDragging = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0, time: 0 });
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const sphericalCoords = useRef({ ...INITIAL_ORBIT });
  const dampingVelocity = useRef({ theta: 0, phi: 0 });

  // Raycaster for interactions
  const raycaster = useRef(new THREE.Raycaster());
  const mouseVec = useRef(new THREE.Vector2(-999, -999));

  // Auto explore tour index
  const autoTourIndex = useRef(0);
  const autoTourTimer = useRef<number | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.016);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    const initialPos = getHomeCamPos();
    camera.position.copy(initialPos);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Background Starfield
    const starCount = 1400;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 35 + Math.random() * 85;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const colorTint = Math.random();
      if (colorTint > 0.8) {
        starColors[i * 3] = 0.4;
        starColors[i * 3 + 1] = 0.8;
        starColors[i * 3 + 2] = 1.0;
      } else if (colorTint > 0.6) {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.8;
        starColors[i * 3 + 2] = 0.4;
      } else {
        const brightness = 0.4 + Math.random() * 0.5;
        starColors[i * 3] = brightness;
        starColors[i * 3 + 1] = brightness;
        starColors[i * 3 + 2] = brightness;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. Constellation Lines
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const nodeMap = new Map<string, GalaxyNode>();
    GALAXY_NODES.forEach(n => nodeMap.set(n.id, n));

    GALAXY_NODES.forEach(node => {
      const startPos = new THREE.Vector3(...node.position);
      const startCatColor = new THREE.Color(CATEGORIES[node.category]?.color || '#ffffff');

      node.connections.forEach(targetId => {
        const targetNode = nodeMap.get(targetId);
        if (targetNode) {
          const endPos = new THREE.Vector3(...targetNode.position);
          const endCatColor = new THREE.Color(CATEGORIES[targetNode.category]?.color || '#ffffff');

          linePositions.push(startPos.x, startPos.y, startPos.z);
          linePositions.push(endPos.x, endPos.y, endPos.z);

          lineColors.push(startCatColor.r * 0.4, startCatColor.g * 0.4, startCatColor.b * 0.4);
          lineColors.push(endCatColor.r * 0.4, endCatColor.g * 0.4, endCatColor.b * 0.4);
        }
      });
    });

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);
    linesMeshRef.current = linesMesh;

    // 6. Nodes Meshes with 3D Canvas Sprite Labels Attached
    nodesMeshMap.current.clear();

    GALAXY_NODES.forEach(node => {
      const group = new THREE.Group();
      group.position.set(...node.position);
      group.userData = { id: node.id, nodeData: node };

      const catColor = new THREE.Color(CATEGORIES[node.category]?.color || '#38bdf8');
      const hexColor = CATEGORIES[node.category]?.color || '#38bdf8';
      const baseSize = (node.size || 2.0) * 0.45;

      // Inner Core Sphere
      const coreGeo = new THREE.SphereGeometry(baseSize, 28, 28);
      const coreMat = new THREE.MeshStandardMaterial({
        color: catColor,
        emissive: catColor,
        emissiveIntensity: 1.0,
        roughness: 0.15,
        metalness: 0.85,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.name = 'core';
      group.add(coreMesh);

      // Outer Glow Halo
      const haloGeo = new THREE.SphereGeometry(baseSize * 1.5, 20, 20);
      const haloMat = new THREE.MeshBasicMaterial({
        color: catColor,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        wireframe: true,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.name = 'halo';
      group.add(haloMesh);

      // Pulsing atmospheric shell
      const shellGeo = new THREE.RingGeometry(baseSize * 1.6, baseSize * 2.1, 32);
      const shellMat = new THREE.MeshBasicMaterial({
        color: catColor,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      shellMesh.name = 'shell';
      group.add(shellMesh);

      // 3D Canvas Sprite Label attached directly to group (stays locked with the star in 3D!)
      const labelSprite = createNodeLabelSprite(node.label, hexColor);
      group.add(labelSprite);

      scene.add(group);
      nodesMeshMap.current.set(node.id, group);
    });

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 70);
    pointLight.position.set(0, 16, 16);
    scene.add(pointLight);

    // 8. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle starfield drift
      starField.rotation.y = elapsedTime * 0.005;

      // Pulse shells and halos
      nodesMeshMap.current.forEach(group => {
        const shell = group.getObjectByName('shell');
        const halo = group.getObjectByName('halo');
        if (shell && halo) {
          const pulse = 1 + Math.sin(elapsedTime * 2.2 + group.position.x) * 0.12;
          shell.scale.set(pulse, pulse, pulse);
          shell.lookAt(camera.position);
          halo.rotation.y = elapsedTime * 0.25;
        }
      });

      // Handle dragging or inertia
      if (isDragging.current) {
        const { radius, theta, phi } = sphericalCoords.current;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        targetCamPos.current.set(x, y + 1.2, z);
        camera.position.lerp(targetCamPos.current, 0.2);
      } else {
        // Inertia damping when released
        if (Math.abs(dampingVelocity.current.theta) > 0.00005 || Math.abs(dampingVelocity.current.phi) > 0.00005) {
          sphericalCoords.current.theta += dampingVelocity.current.theta;
          sphericalCoords.current.phi += dampingVelocity.current.phi;
          dampingVelocity.current.theta *= 0.92;
          dampingVelocity.current.phi *= 0.92;

          // Clamp phi
          sphericalCoords.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, sphericalCoords.current.phi));

          const { radius, theta, phi } = sphericalCoords.current;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          targetCamPos.current.set(x, y + 1.2, z);
          camera.position.lerp(targetCamPos.current, 0.15);
        } else {
          // Camera smoothly glides to targetCamPos
          camera.position.lerp(targetCamPos.current, 0.06);
        }
      }

      // Camera LookAt lerp
      currentCamLookAt.current.lerp(targetCamLookAt.current, 0.07);
      camera.lookAt(currentCamLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current?.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  // Update Node Highlights, Scales, and Label Opacity when selection or category changes
  useEffect(() => {
    nodesMeshMap.current.forEach((group, id) => {
      const isSelected = selectedNode?.id === id;
      const isHovered = hoveredNode?.id === id;
      const isHighlighted = highlightedNodes.length > 0 && highlightedNodes.includes(id);
      const isCatActive = activeCategory === 'all' || (GALAXY_NODES.find(n => n.id === id)?.category as string) === activeCategory;

      const core = group.getObjectByName('core') as THREE.Mesh;
      const halo = group.getObjectByName('halo') as THREE.Mesh;
      const labelSprite = group.getObjectByName('labelSprite') as THREE.Sprite;

      let scale = 1.0;
      let opacity = 1.0;

      if (isSelected) {
        scale = 1.55;
        opacity = 1.0;
      } else if (isHovered) {
        scale = 1.35;
        opacity = 1.0;
      } else if (isHighlighted) {
        scale = 1.2;
        opacity = 1.0;
      } else if (!isCatActive && (activeCategory as string) !== 'all') {
        scale = 0.55;
        opacity = 0.2;
      } else if (selectedNode && !isHighlighted) {
        scale = 0.7;
        opacity = 0.3;
      }

      group.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.3);

      if (core?.material instanceof THREE.MeshStandardMaterial) {
        core.material.emissiveIntensity = isSelected ? 1.8 : isHovered ? 1.4 : isHighlighted ? 1.1 : 0.8;
      }
      if (halo?.material instanceof THREE.MeshBasicMaterial) {
        halo.material.opacity = isSelected ? 0.6 : isHovered ? 0.45 : opacity * 0.25;
      }
      if (labelSprite?.material instanceof THREE.SpriteMaterial) {
        labelSprite.material.opacity = opacity;
      }
    });

    if (linesMeshRef.current?.material instanceof THREE.LineBasicMaterial) {
      linesMeshRef.current.material.opacity = selectedNode ? 0.45 : activeCategory !== 'all' ? 0.4 : 0.28;
    }
  }, [selectedNode, hoveredNode, activeCategory, highlightedNodes]);

  // Smooth Camera Pan when target changes
  useEffect(() => {
    dampingVelocity.current = { theta: 0, phi: 0 };
    if (cameraTarget && selectedNode) {
      const targetVec = new THREE.Vector3(...cameraTarget);
      targetCamLookAt.current.copy(targetVec);

      const offset = targetVec.clone().normalize().multiplyScalar(7.2);
      const shiftX = window.innerWidth > 768 ? -2.4 : 0;
      targetCamPos.current.copy(targetVec).add(offset).add(new THREE.Vector3(shiftX, 1.0, 0));
    } else {
      // Smoothly return to the balanced home view (Image 1)
      sphericalCoords.current = { ...INITIAL_ORBIT };
      targetCamPos.current.copy(getHomeCamPos());
      targetCamLookAt.current.set(0, 1.2, 0);
    }
  }, [cameraTarget, selectedNode]);

  // Auto explore tour runner
  useEffect(() => {
    if (!isAutoExploring) {
      if (autoTourTimer.current) {
        clearInterval(autoTourTimer.current);
        autoTourTimer.current = null;
      }
      return;
    }

    const tourNodeSequence = [
      'about-me',
      'projects',
      'hackathons',
      'college',
      'technical-dna',
      'after-college',
      'passions-future',
      'contact'
    ];

    const cycleTour = () => {
      const nextId = tourNodeSequence[autoTourIndex.current % tourNodeSequence.length];
      const nextNode = GALAXY_NODES.find(n => n.id === nextId);
      if (nextNode) {
        setSelectedNode(nextNode);
      }
      autoTourIndex.current++;
    };

    cycleTour();
    autoTourTimer.current = window.setInterval(cycleTour, 7000);

    return () => {
      if (autoTourTimer.current) {
        clearInterval(autoTourTimer.current);
      }
    };
  }, [isAutoExploring, setSelectedNode]);

  // POINTER EVENT HANDLERS (Rock-solid Touchpad & Mouse Handling)
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    isDragging.current = false;
    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const container = mountRef.current;
    if (!container || !cameraRef.current) return;

    const rect = container.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseVec.current.set(mouseX, mouseY);

    // If pointer is down AND pressed button (touch or mouse press)
    if (isPointerDown.current && (e.buttons > 0 || e.pointerType === 'touch')) {
      const moveDist = Math.hypot(e.clientX - pointerStart.current.x, e.clientY - pointerStart.current.y);

      // Only engage orbit drag if movement threshold is exceeded (> 6px)
      if (moveDist > 6) {
        isDragging.current = true;
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        const rotSpeed = 0.005;
        sphericalCoords.current.theta -= deltaX * rotSpeed;
        sphericalCoords.current.phi -= deltaY * rotSpeed;

        sphericalCoords.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, sphericalCoords.current.phi));

        dampingVelocity.current = {
          theta: -deltaX * rotSpeed * 0.35,
          phi: -deltaY * rotSpeed * 0.35,
        };

        previousMousePosition.current = { x: e.clientX, y: e.clientY };
        container.style.cursor = 'grabbing';
      }
    } else {
      // Just moving cursor WITHOUT pressing: NEVER rotate camera!
      raycaster.current.setFromCamera(mouseVec.current, cameraRef.current);
      const objectsToTest: THREE.Object3D[] = [];
      nodesMeshMap.current.forEach(group => {
        const core = group.getObjectByName('core');
        const sprite = group.getObjectByName('labelSprite');
        if (core) objectsToTest.push(core);
        if (sprite) objectsToTest.push(sprite);
      });

      const intersects = raycaster.current.intersectObjects(objectsToTest);
      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.parent;
        if (hitGroup && hitGroup.userData.nodeData) {
          setHoveredNode(hitGroup.userData.nodeData);
          container.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredNode(null);
      container.style.cursor = 'default';
    }
  }, [setHoveredNode]);

  const handlePointerUp = (e: React.PointerEvent) => {
    const container = mountRef.current;
    const deltaMove = Math.hypot(
      e.clientX - pointerStart.current.x,
      e.clientY - pointerStart.current.y
    );
    const duration = Date.now() - pointerStart.current.time;

    isPointerDown.current = false;

    // IF was NOT dragging and move was small -> Clean deliberate click/tap!
    if (!isDragging.current && deltaMove < 8 && duration < 400 && cameraRef.current) {
      dampingVelocity.current = { theta: 0, phi: 0 };

      raycaster.current.setFromCamera(mouseVec.current, cameraRef.current);
      const objectsToTest: THREE.Object3D[] = [];
      nodesMeshMap.current.forEach(group => {
        const core = group.getObjectByName('core');
        const sprite = group.getObjectByName('labelSprite');
        if (core) objectsToTest.push(core);
        if (sprite) objectsToTest.push(sprite);
      });

      const intersects = raycaster.current.intersectObjects(objectsToTest);
      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.parent;
        if (hitGroup && hitGroup.userData.nodeData) {
          setSelectedNode(hitGroup.userData.nodeData);
          isDragging.current = false;
          return;
        }
      }
    }

    isDragging.current = false;
    if (container) {
      container.style.cursor = hoveredNode ? 'pointer' : 'default';
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY * 0.012;
    sphericalCoords.current.radius = Math.max(9, Math.min(45, sphericalCoords.current.radius + zoomFactor));
    if (!selectedNode) {
      const { radius, theta, phi } = sphericalCoords.current;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi) + 1.2;
      const z = radius * Math.sin(phi) * Math.sin(theta);
      targetCamPos.current.set(x, y, z);
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-0 touch-none" />
    </div>
  );
};
