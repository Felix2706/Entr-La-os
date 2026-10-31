import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function CinematicHero({ onExploreClick }) {
  const mountRef = useRef(null);
  const textRef = useRef(null);
  const [phase, setPhase] = useState('opening'); // 'opening' -> 'revealed'
  const [interactiveColor, setInteractiveColor] = useState('#E68DA2');

  const colorVariants = [
    { name: 'Rosa Seda', hex: '#E68DA2' },
    { name: 'Champagne / Nude', hex: '#EAD7C5' },
    { name: 'Lilás Real', hex: '#B59CD4' },
    { name: 'Preto Noir', hex: '#2A2628' },
    { name: 'Rubi Veludo', hex: '#9E2A43' },
  ];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || window.innerHeight;

    // 1. Cenário Cinematográfico High-End
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c070a, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    currentMount.appendChild(renderer.domElement);

    // 2. Iluminação de Campanha Publicitária de Luxo
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.7);
    scene.add(ambientLight);

    // Key light dourada / quente
    const spotKey = new THREE.SpotLight(0xffe6eb, 4.5, 25, Math.PI / 4, 0.4, 1.2);
    spotKey.position.set(4, 7, 5);
    spotKey.castShadow = true;
    scene.add(spotKey);

    // Rim light frio e sofisticado (revela o fio e o contorno da fita)
    const rimLight = new THREE.DirectionalLight(0xc9a0dc, 2.5);
    rimLight.position.set(-6, 3, -2);
    scene.add(rimLight);

    // Luz rasteira móvel (cinematic light sweep)
    const sweepLight = new THREE.PointLight(0xffffff, 2.0, 10);
    sweepLight.position.set(-5, 0, 2);
    scene.add(sweepLight);

    // 3. Partículas Luminosas / Poeira Estelar Fotográfica
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
      scaleArray[i / 3] = Math.random();
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xfce7f3,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // 4. Fitas de Cetim 3D Esculpidas por Splines (NURBS / CatmullRom)
    // Curva cinematográfica que atravessa o espaço com largura e espessura real
    const ribbonSplinePoints = [
      new THREE.Vector3(-8, 4, -4),
      new THREE.Vector3(-4, 1.5, -1),
      new THREE.Vector3(-1.5, -2, 1.5),
      new THREE.Vector3(1.8, -0.8, 0.5),
      new THREE.Vector3(4, 2.5, -1.5),
      new THREE.Vector3(7, -3, -3),
    ];
    const ribbonCurve = new THREE.CatmullRomCurve3(ribbonSplinePoints);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 120, 0.16, 16, false);

    // Material de cetim com reflexo anisotrópico e suavidade de seda
    const satinColor = new THREE.Color(interactiveColor);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: satinColor,
      roughness: 0.28,
      metalness: 0.15,
      wireframe: false,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.castShadow = true;
    scene.add(ribbonMesh);

    // 5. Laço Principal 3D Hiper-Realista em Cetim
    const bowGroup = new THREE.Group();
    scene.add(bowGroup);

    // Carregar textura fotográfica real em alta fidelidade
    const textureLoader = new THREE.TextureLoader();
    const bowTexture = textureLoader.load('laco_cetim_hd.png');
    bowTexture.colorSpace = THREE.SRGBColorSpace;

    // Duas asas voluptuosas em relevo 3D
    const bowPlaneGeo = new THREE.PlaneGeometry(3.6, 2.5, 40, 40);
    const pos = bowPlaneGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      const curve = -Math.pow(x * 0.42, 2) + Math.sin(r * 1.8) * 0.18;
      pos.setZ(i, curve);
    }
    bowPlaneGeo.computeVertexNormals();

    const bowMaterial = new THREE.MeshStandardMaterial({
      map: bowTexture,
      color: satinColor,
      transparent: true,
      alphaTest: 0.05,
      roughness: 0.32,
      metalness: 0.18,
      side: THREE.DoubleSide,
    });

    const bowMesh = new THREE.Mesh(bowPlaneGeo, bowMaterial);
    bowMesh.castShadow = true;
    bowGroup.add(bowMesh);

    // Nó central em relevo escultural
    const knotGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.75, 32, 1, false, -Math.PI / 2, Math.PI);
    knotGeo.center();
    const knotMesh = new THREE.Mesh(
      knotGeo,
      new THREE.MeshStandardMaterial({
        color: satinColor,
        roughness: 0.25,
        metalness: 0.15,
      })
    );
    knotMesh.position.set(0, 0, 0.22);
    knotMesh.scale.set(0.7, 1.15, 0.65);
    bowGroup.add(knotMesh);

    // Micro-partícula de diamante/brilho no centro
    const gemGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const gemMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.05 });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, 0, 0.36);
    bowGroup.add(gemMesh);

    // Posição inicial cinematográfica (escondido ou distante na abertura)
    bowGroup.scale.set(0.001, 0.001, 0.001);
    bowGroup.position.set(0, 0, 0);

    // 6. Timeline Cinematográfica com GSAP (Sequência de Abertura)
    const tl = gsap.timeline({
      onComplete: () => setPhase('revealed'),
    });

    // Animação da câmera e surgimento da fita
    tl.to(camera.position, {
      z: 5.2,
      y: 0.2,
      duration: 3.2,
      ease: 'power3.out',
    }, 0);

    tl.fromTo(ribbonMesh.rotation, {
      x: -Math.PI / 3,
      y: -Math.PI / 2,
    }, {
      x: 0.1,
      y: 0.3,
      duration: 4.5,
      ease: 'sine.out',
    }, 0);

    // O laço surge com revelação escultural
    tl.to(bowGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2.8,
      ease: 'elastic.out(1, 0.75)',
    }, 1.2);

    tl.fromTo(bowGroup.rotation, {
      y: Math.PI * 0.8,
      x: -0.3,
    }, {
      y: 0,
      x: 0,
      duration: 3.0,
      ease: 'power3.out',
    }, 1.2);

    // Light sweep atravessa o laço
    tl.fromTo(sweepLight.position, {
      x: -6,
      z: 1,
    }, {
      x: 6,
      z: 3,
      duration: 3.5,
      ease: 'power2.inOut',
    }, 1.8);

    // 7. Mouse Tracker & Parallax
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const ndcX = (e.clientX / width) * 2 - 1;
      const ndcY = -(e.clientY / height) * 2 + 1;
      mouse.targetX = ndcX;
      mouse.targetY = ndcY;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        bowGroup.rotation.y += deltaX * 0.01;
        bowGroup.rotation.x += deltaY * 0.007;
        bowGroup.rotation.x = Math.max(-0.5, Math.min(0.5, bowGroup.rotation.x));
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

    // 8. Render Loop Contínuo com Inércia
    let animId;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      // Suave inércia no mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax sutil na câmera
      camera.position.x = mouse.x * 0.45;
      camera.position.y = mouse.y * 0.35;
      camera.lookAt(0, 0, 0);

      // Flutuação orgânica do laço
      if (!isDragging) {
        bowGroup.position.y = Math.sin(elapsed * 1.6) * 0.08;
        bowGroup.rotation.y += 0.003;
      }

      // Movimento contínuo ondulante da fita 3D
      ribbonMesh.rotation.z = Math.sin(elapsed * 0.6) * 0.08;
      ribbonMesh.position.y = Math.cos(elapsed * 0.8) * 0.12;

      // Movimentação sutil das partículas
      particlesMesh.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };
    renderLoop();

    // 9. Resize Listener
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 10. Atualizador dinâmico de cor do laço e fita
    currentMount.__updateColor = (hex) => {
      const c = new THREE.Color(hex);
      bowMaterial.color.set(c);
      ribbonMat.color.set(c);
      knotMesh.material.color.set(c);
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

  // Efeito para trocar cor em tempo de execução
  useEffect(() => {
    if (mountRef.current && mountRef.current.__updateColor) {
      mountRef.current.__updateColor(interactiveColor);
    }
  }, [interactiveColor]);

  return (
    <section className="relative w-full min-h-screen bg-[#0C070A] overflow-hidden flex items-center justify-center">
      
      {/* 3D Canvas de Fundo & Centro */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Vinheta Cinematográfica Escurecida nas Bordas */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />

      {/* Conteúdo Overlay em Camadas Tipográficas de Luxo */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-20 pb-12 flex flex-col justify-between min-h-screen pointer-events-none">
        
        {/* Topo: Marca & Status de Edição */}
        <div className="flex items-center justify-between pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden shadow-2xl bg-black/40 backdrop-blur-md">
              <img src="logo.jpg" alt="Logo Entre & Laços" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-accent text-2xl text-white font-bold tracking-wider block leading-none">
                Entre &amp; Laços
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-body mt-0.5 block">
                Haute Couture Accessories
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-body tracking-wider uppercase text-white/70">
              Coleção Primavera 2026
            </span>
          </motion.div>
        </div>

        {/* Centro/Destaque: Título e Call-to-action */}
        <div className="max-w-2xl mt-12 mb-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-accent text-3xl sm:text-4xl text-primary-light font-bold mb-3 block">
              A Poesia da Seda
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight">
              Elegância tecida à mão.
            </h1>
            <p className="font-body text-white/70 text-base sm:text-lg mt-5 leading-relaxed max-w-lg font-light">
              Uma experiência sensorial onde o cetim puro encontra a precisão da alta chapelaria. Cada laço nasce como uma escultura única para adornar seus momentos mais marcantes.
            </p>
          </motion.div>

          {/* Botões de Ação com Efeito Luxo */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <Link
              to="/catalogo"
              className="relative group overflow-hidden px-8 py-4 rounded-full bg-white text-dark font-body font-bold text-sm tracking-wide transition-all shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(201,116,141,0.5)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Adquirir Peça da Coleção</span>
                <span>→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <Link
              to="/personalizar"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-body font-semibold text-sm backdrop-blur-md border border-white/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Ateliê 3D Sob Medida</span>
              <span className="text-primary-light">✨</span>
            </Link>
          </motion.div>
        </div>

        {/* Rodapé do Hero: Seletor Interativo de Cores do Cetim em Tempo Real */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10 pointer-events-auto">
          
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-white/50 font-body">
              Variações da Seda:
            </span>
            <div className="flex items-center gap-2">
              {colorVariants.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setInteractiveColor(c.hex)}
                  title={c.name}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-300 relative ${
                    interactiveColor === c.hex
                      ? 'scale-125 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/40 font-body">
            <span>💡 Arraste com o cursor para girar a escultura em 360°</span>
          </div>

        </div>

      </div>

    </section>
  );
}
