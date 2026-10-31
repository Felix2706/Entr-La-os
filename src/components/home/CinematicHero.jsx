import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function CinematicHero() {
  const mountRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState('#E68DA2');

  const luxuryThemes = [
    { name: 'Rose Silk', hex: '#E68DA2' },
    { name: 'Champagne Gold', hex: '#E2C799' },
    { name: 'Lilac Royale', hex: '#B59CD4' },
    { name: 'Emerald Velvet', hex: '#52796F' },
    { name: 'Noir & Pearl', hex: '#ECE4DB' },
  ];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0608, 0.075);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    currentMount.appendChild(renderer.domElement);

    // 2. Iluminação Cinematográfica de Estúdio
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 0.8);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffeef2, 4.0, 30, Math.PI / 4, 0.35, 1.2);
    keySpot.position.set(5, 8, 6);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const rimLight = new THREE.DirectionalLight(0xbfa5d8, 2.8);
    rimLight.position.set(-6, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffb6c1, 1.5, 15);
    fillLight.position.set(0, -4, 3);
    scene.add(fillLight);

    // 3. Campo de Partículas de Poeira Luminosa (Estelar/Sedosa)
    const particleCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 18;
      posArray[i + 1] = (Math.random() - 0.5) * 14;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Instalação Escultural de Fitas de Cetim 3D Flutuantes (Ribbon Stream)
    // Criamos 3 fitas contínuas com nós esculturais elegantes e curvatura infinita
    const ribbonGroup = new THREE.Group();
    scene.add(ribbonGroup);

    const createSatinRibbon = (controlPoints, tubeRadius, colorHex) => {
      const curve = new THREE.CatmullRomCurve3(controlPoints);
      curve.curveType = 'centripetal';
      const geo = new THREE.TubeGeometry(curve, 140, tubeRadius, 24, false);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        roughness: 0.22,
        metalness: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      return { mesh, mat };
    };

    // Fita Principal: Desenha a silhueta escultural de um laço contínuo no ar
    const mainRibbon = createSatinRibbon([
      new THREE.Vector3(-6, 3.5, -3),
      new THREE.Vector3(-2.5, 1.2, 0.5),
      new THREE.Vector3(-1.2, -1.8, 1.2),
      new THREE.Vector3(0, 0, 1.8), // Ponto do Nó Central no ar
      new THREE.Vector3(1.2, -1.8, 1.2),
      new THREE.Vector3(2.5, 1.2, 0.5),
      new THREE.Vector3(6, 3.5, -3),
    ], 0.22, activeTheme);
    ribbonGroup.add(mainRibbon.mesh);

    // Fita 2: Laço superior esvoaçante que abraça a cena
    const loopRibbon = createSatinRibbon([
      new THREE.Vector3(-3.5, -2, -1),
      new THREE.Vector3(-1.8, 2.2, 0.8),
      new THREE.Vector3(0, 1.2, 1.2),
      new THREE.Vector3(1.8, 2.2, 0.8),
      new THREE.Vector3(3.5, -2, -1),
    ], 0.16, activeTheme);
    ribbonGroup.add(loopRibbon.mesh);

    // Fita 3: Cauda fluida longa em espiral sutil
    const swirlRibbon = createSatinRibbon([
      new THREE.Vector3(-5, -4, 2),
      new THREE.Vector3(-2, -1, 0),
      new THREE.Vector3(0, 0.2, 0.4),
      new THREE.Vector3(2, 1.5, -1),
      new THREE.Vector3(5, 3, -2),
    ], 0.12, '#FFFFFF');
    swirlRibbon.mat.opacity = 0.85;
    swirlRibbon.mat.transparent = true;
    ribbonGroup.add(swirlRibbon.mesh);

    // Anel escultural dourado de alta joalheria no centro do entrelaçado
    const ringGeo = new THREE.TorusGeometry(0.55, 0.08, 24, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xF3E5AB,
      metalness: 0.95,
      roughness: 0.15,
    });
    const centerRing = new THREE.Mesh(ringGeo, ringMat);
    centerRing.position.set(0, 0, 1.7);
    ribbonGroup.add(centerRing);

    // 5. Timeline Cinematográfica com GSAP
    gsap.fromTo(camera.position, {
      z: 11,
      y: 2,
    }, {
      z: 7.2,
      y: 0,
      duration: 3.2,
      ease: 'power3.out',
    });

    gsap.fromTo(ribbonGroup.rotation, {
      x: 0.6,
      y: -Math.PI / 2,
    }, {
      x: 0.05,
      y: 0,
      duration: 3.8,
      ease: 'power2.out',
    });

    // 6. Rastreamento e Inércia do Mouse
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width) * 2 - 1;
      mouse.targetY = -(e.clientY / height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        ribbonGroup.rotation.y += deltaX * 0.009;
        ribbonGroup.rotation.x += deltaY * 0.006;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => { isDragging = false; };

    const domElement = renderer.domElement;
    window.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 7. Loop de Animação Contínuo com Movimento de Tecido Fluido
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Suave inércia de câmera
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      camera.position.x = mouse.x * 0.55;
      camera.position.y = mouse.y * 0.35;
      camera.lookAt(0, 0, 0);

      // Flutuação orgânica da escultura de fitas
      if (!isDragging) {
        ribbonGroup.rotation.y += 0.0035;
        ribbonGroup.position.y = Math.sin(elapsed * 1.4) * 0.12;
      }

      // Ondulação suave e respiração do tecido
      mainRibbon.mesh.rotation.z = Math.sin(elapsed * 0.8) * 0.06;
      loopRibbon.mesh.rotation.x = Math.cos(elapsed * 0.7) * 0.08;

      particles.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 9. Atualizador Dinâmico de Cor
    currentMount.__updateColor = (hex) => {
      const c = new THREE.Color(hex);
      mainRibbon.mat.color.set(c);
      loopRibbon.mat.color.set(c);
    };

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('mousedown', handleMouseDown);
      if (currentMount.contains(domElement)) {
        currentMount.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Atualizar cor quando clica nos botões
  useEffect(() => {
    if (mountRef.current && mountRef.current.__updateColor) {
      mountRef.current.__updateColor(activeTheme);
    }
  }, [activeTheme]);

  return (
    <section className="relative w-full min-h-screen bg-[#0A0608] overflow-hidden flex items-center justify-center">
      
      {/* 3D Canvas de Fitas Esculturais de Seda */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Gradiente Atmosférico Escurecido */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />

      {/* Camada Editorial de Conteúdo e Tipografia */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-20 pb-12 flex flex-col justify-between min-h-screen pointer-events-none">
        
        {/* Topo da Campanha */}
        <div className="flex items-center justify-between pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-full border border-white/20 overflow-hidden shadow-2xl bg-black/40 backdrop-blur-md">
              <img src="logo.jpg" alt="Logo Entre & Laços" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-accent text-3xl text-white font-bold tracking-wider block leading-none">
                Entre &amp; Laços
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.25em] font-body mt-1 block">
                Ateliê de Acessórios Nobres
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden sm:flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-body tracking-wider uppercase text-white/70">
              Alta Costura Artesanal • 2026
            </span>
          </motion.div>
        </div>

        {/* Centro: Títulos e Conceito Visual de Luxo */}
        <div className="max-w-2xl mt-16 mb-10 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full backdrop-blur-md mb-4">
              <span className="text-xs text-primary-light font-bold">✨ Exclusividade em Cada Detalhe</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight">
              A elegância esculpida em seda pura.
            </h1>
            
            <p className="font-body text-white/70 text-base sm:text-lg mt-5 leading-relaxed max-w-xl font-light">
              Fitas nobres, acabamento impecável e peças únicas criadas à mão com amor e precisão. Um toque de sofisticação autêntico para quem valoriza a verdadeira arte manual.
            </p>
          </motion.div>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <Link
              to="/catalogo"
              className="relative group overflow-hidden px-8 py-4 rounded-full bg-white text-dark font-body font-bold text-sm tracking-wide transition-all shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(201,116,141,0.5)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Ver Catálogo Completo</span>
                <span>→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <Link
              to="/personalizar"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-body font-semibold text-sm backdrop-blur-md border border-white/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Monte Seu Acessório</span>
              <span className="text-primary-light">🪄</span>
            </Link>
          </motion.div>
        </div>

        {/* Rodapé: Variações da Seda & Guia Interativo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10 pointer-events-auto">
          
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-white/50 font-body">
              Variações da Seda:
            </span>
            <div className="flex items-center gap-2">
              {luxuryThemes.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setActiveTheme(c.hex)}
                  title={c.name}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-300 relative ${
                    activeTheme === c.hex
                      ? 'scale-125 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/40 font-body">
            <span>💡 Clique e arraste na tela para interagir com o fluxo da seda</span>
          </div>

        </div>

      </div>

    </section>
  );
}
