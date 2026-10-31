import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function BowViewer3D({ selection, colors }) {
  const mountRef = useRef(null);
  const colorHex = colors.find(c => c.id === selection.color)?.hex || '#C9748D';
  const colorName = colors.find(c => c.id === selection.color)?.name || 'Rosa';

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 460;
    const height = currentMount.clientHeight || 380;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FAF7F2');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    currentMount.appendChild(renderer.domElement);

    // 2. Luzes de estúdio para realçar o brilho do cetim e reflexos
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xffe4e6, 1.2, 12);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xA78BCD, 1.0);
    rimLight.position.set(0, -3, -3);
    scene.add(rimLight);

    // 3. Carregar textura do laço de cetim HD transparente
    const textureLoader = new THREE.TextureLoader();
    const textureBow = textureLoader.load('laco_cetim_hd.png');
    textureBow.colorSpace = THREE.SRGBColorSpace;

    // 4. Grupo Pivô Central 3D
    const bowPivot = new THREE.Group();
    scene.add(bowPivot);

    // Calcular cor base selecionada (o PNG original é rosa #F19AB1)
    const baseSelectedColor = new THREE.Color(colorHex);

    // Ajuste de brilho/rugosidade conforme o material
    const isSatin = selection.material === 'cetim' || !selection.material;
    const isVelvet = selection.material === 'veludo';

    const bowMaterial = new THREE.MeshStandardMaterial({
      map: textureBow,
      color: baseSelectedColor,
      transparent: true,
      alphaTest: 0.05,
      roughness: isSatin ? 0.35 : isVelvet ? 0.9 : 0.6,
      metalness: isSatin ? 0.25 : 0.05,
      side: THREE.DoubleSide,
    });

    // 5. Construção Tridimensional das Asas e Caudas Curvadas (Relevo Real)
    // Plano principal frontal com curvatura orgânica
    const bowGeo = new THREE.PlaneGeometry(3.3, 2.3, 32, 32);
    
    // Curvar a geometria para gerar volume 3D realista
    const pos = bowGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Arco no eixo Z para dar efeito de fita abaulada e nó projetado
      const distFromCenter = Math.sqrt(x * x + y * y);
      const curveZ = -Math.pow(x * 0.45, 2) + Math.cos(distFromCenter * 1.5) * 0.15;
      pos.setZ(i, curveZ);
    }
    bowGeo.computeVertexNormals();

    const bowMesh = new THREE.Mesh(bowGeo, bowMaterial);
    bowMesh.castShadow = true;
    bowPivot.add(bowMesh);

    // Camada de profundidade traseira para dar espessura de tecido duplo
    const backBowMesh = new THREE.Mesh(bowGeo, bowMaterial.clone());
    backBowMesh.position.set(0, 0, -0.06);
    backBowMesh.scale.set(0.98, 0.98, 0.98);
    bowPivot.add(backBowMesh);

    // 6. Nó Central em Relevo Pronunciado (Volume de Laço Físico)
    const knotGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.65, 32, 1, false, -Math.PI / 2, Math.PI);
    knotGeo.center();
    const knotMesh = new THREE.Mesh(
      knotGeo,
      new THREE.MeshStandardMaterial({
        color: baseSelectedColor,
        roughness: isSatin ? 0.3 : 0.85,
        metalness: isSatin ? 0.2 : 0.05,
      })
    );
    knotMesh.position.set(0, 0, 0.18);
    knotMesh.scale.set(0.65, 1.1, 0.6);
    bowPivot.add(knotMesh);

    // Strass de luxo no miolo central
    const gemGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const gemMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.1 });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, 0, 0.32);
    bowPivot.add(gemMesh);

    // 7. Base Selecionada (Xuxinha, Bico de Pato, Tiara)
    if (selection.type === 'xuxinha') {
      const scrunchieGeo = new THREE.TorusGeometry(0.9, 0.22, 24, 48);
      const scrunchieMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
      const scrunchie = new THREE.Mesh(scrunchieGeo, scrunchieMat);
      scrunchie.position.set(0, -0.2, -0.5);
      scrunchie.rotation.x = Math.PI / 4;
      bowPivot.add(scrunchie);
    } else if (selection.type === 'bico-de-pato' || selection.type === 'presilha') {
      const clipGeo = new THREE.BoxGeometry(2.2, 0.35, 0.08);
      const clipMat = new THREE.MeshStandardMaterial({ color: 0xD4D4D8, metalness: 0.9, roughness: 0.2 });
      const clip = new THREE.Mesh(clipGeo, clipMat);
      clip.position.set(0, -0.05, -0.3);
      clip.rotation.z = Math.PI / 16;
      bowPivot.add(clip);
    } else if (selection.type === 'tiara' || selection.type === 'faixa') {
      const tiaraGeo = new THREE.TorusGeometry(1.5, 0.16, 20, 60, Math.PI * 1.15);
      const tiaraMat = new THREE.MeshStandardMaterial({
        color: selection.type === 'tiara' ? 0xF5EDE3 : baseSelectedColor,
        roughness: 0.4,
      });
      const tiara = new THREE.Mesh(tiaraGeo, tiaraMat);
      tiara.position.set(0, -0.3, -0.25);
      tiara.rotation.x = Math.PI / 6;
      bowPivot.add(tiara);
    }

    // Escala dinâmica conforme tamanho escolhido (P, M, G)
    const scale = selection.size === 'P' ? 0.78 : selection.size === 'G' ? 1.25 : 1.0;
    bowPivot.scale.set(scale, scale, scale);

    // 8. Interação de Rotação 3D ao clicar e arrastar (Mouse e Touch)
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      bowPivot.rotation.y += deltaX * 0.012;
      bowPivot.rotation.x += deltaY * 0.008;

      // Limitar inclinação vertical para ângulo estético
      bowPivot.rotation.x = Math.max(-0.55, Math.min(0.55, bowPivot.rotation.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      bowPivot.rotation.y += deltaX * 0.012;
      bowPivot.rotation.x += deltaY * 0.008;
      bowPivot.rotation.x = Math.max(-0.55, Math.min(0.55, bowPivot.rotation.x));

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDragging = false; };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Loop de Animação com Respiração Flutuante
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        // Efeito de flutuação suave
        bowPivot.position.y = Math.sin(elapsed * 1.8) * 0.06;
        // Rotação suave contínua para exibir o cetim
        bowPivot.rotation.y += 0.004;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (currentMount.contains(domElement)) {
        currentMount.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [selection.type, selection.size, selection.color, selection.material, colorHex]);

  return (
    <div className="relative w-full h-84 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-white via-secondary/60 to-secondary border border-border shadow-inner flex flex-col justify-between">
      
      {/* Top Header */}
      <div className="absolute top-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-border/80">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span className="text-[11px] font-body font-semibold text-dark">
            Simulador 3D em Tempo Real • Gire Livremente
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-border/80 pointer-events-auto">
          <span className="w-3.5 h-3.5 rounded-full border border-border" style={{ background: colorHex }} />
          <span className="text-xs font-body font-bold text-dark">{colorName}</span>
        </div>
      </div>

      {/* Canvas 3D */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Bottom Footer com Dicas */}
      <div className="absolute bottom-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="text-[10px] text-medium font-body bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-border/60 shadow-sm">
          💡 Clique e arraste para girar em 360°
        </span>
        <span className="text-[11px] font-accent font-bold text-primary bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg border border-border/60 shadow-sm uppercase">
          {selection.type ? selection.type.replace(/-/g, ' ') : 'BICO DE PATO'} • TAMANHO {selection.size || 'M'}
        </span>
      </div>

    </div>
  );
}
