import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function BowViewer3D({ selection, colors }) {
  const mountRef = useRef(null);
  const colorHex = colors.find(c => c.id === selection.color)?.hex || '#C9748D';

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FAF7F2');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    currentMount.appendChild(renderer.domElement);

    // 2. Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xA78BCD, 1.0, 10);
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);

    // 3. Grupo Principal do Modelo 3D
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Material do laço baseado na seleção
    const isSatin = selection.material === 'cetim';
    const isVelvet = selection.material === 'veludo';

    const bowMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness: isSatin ? 0.25 : isVelvet ? 0.9 : 0.5,
      metalness: isSatin ? 0.2 : 0.05,
    });

    // 4. Estrutura geométrica do laço
    // Nó Central
    const knotGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const knotMesh = new THREE.Mesh(knotGeo, bowMaterial);
    knotMesh.castShadow = true;
    mainGroup.add(knotMesh);

    const ringGeo = new THREE.TorusGeometry(0.36, 0.15, 20, 36);
    const ringMesh = new THREE.Mesh(ringGeo, bowMaterial);
    ringMesh.rotation.z = Math.PI / 2;
    ringMesh.position.z = 0.06;
    mainGroup.add(ringMesh);

    // Strass brilhante no miolo
    const stoneGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
    const stoneMesh = new THREE.Mesh(stoneGeo, stoneMat);
    stoneMesh.position.z = 0.42;
    mainGroup.add(stoneMesh);

    // Asa Esquerda (Looping)
    const wingGeo = new THREE.TorusGeometry(0.72, 0.32, 24, 48);
    const leftWing = new THREE.Mesh(wingGeo, bowMaterial);
    leftWing.position.set(-0.95, 0.1, 0);
    leftWing.scale.set(0.6, 1.3, 1.6);
    leftWing.rotation.set(0.08, Math.PI / 2 + 0.2, 0.12);
    leftWing.castShadow = true;
    mainGroup.add(leftWing);

    // Asa Direita (Looping)
    const rightWing = new THREE.Mesh(wingGeo, bowMaterial);
    rightWing.position.set(0.95, 0.1, 0);
    rightWing.scale.set(0.6, 1.3, 1.6);
    rightWing.rotation.set(0.08, Math.PI / 2 - 0.2, -0.12);
    rightWing.castShadow = true;
    mainGroup.add(rightWing);

    // Caudas/Pontas inferiores
    const tailGeo = new THREE.BoxGeometry(0.55, 1.45, 0.08);
    const leftTail = new THREE.Mesh(tailGeo, bowMaterial);
    leftTail.position.set(-0.45, -0.9, 0.1);
    leftTail.rotation.set(0.25, 0.1, 0.35);
    leftTail.castShadow = true;
    mainGroup.add(leftTail);

    const rightTail = new THREE.Mesh(tailGeo, bowMaterial);
    rightTail.position.set(0.45, -0.9, 0.1);
    rightTail.rotation.set(0.25, -0.1, -0.35);
    rightTail.castShadow = true;
    mainGroup.add(rightTail);

    // Base específica conforme tipo
    if (selection.type === 'xuxinha') {
      const scrunchieGeo = new THREE.TorusGeometry(0.95, 0.24, 24, 48);
      const scrunchieMat = new THREE.MeshStandardMaterial({ color: 0x2A2A2A, roughness: 0.95 });
      const scrunchie = new THREE.Mesh(scrunchieGeo, scrunchieMat);
      scrunchie.position.set(0, -0.25, -0.6);
      scrunchie.rotation.x = Math.PI / 3.5;
      mainGroup.add(scrunchie);
    } else if (selection.type === 'bico-de-pato' || selection.type === 'presilha') {
      const clipGeo = new THREE.BoxGeometry(2.5, 0.35, 0.12);
      const clipMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, metalness: 0.85, roughness: 0.2 });
      const clip = new THREE.Mesh(clipGeo, clipMat);
      clip.position.set(0, -0.1, -0.55);
      clip.rotation.z = Math.PI / 14;
      mainGroup.add(clip);
    } else if (selection.type === 'tiara' || selection.type === 'faixa') {
      const tiaraGeo = new THREE.TorusGeometry(1.6, 0.18, 20, 60, Math.PI * 1.15);
      const tiaraMat = new THREE.MeshStandardMaterial({ color: selection.type === 'tiara' ? 0xF5EDE3 : new THREE.Color(colorHex), roughness: 0.4 });
      const tiara = new THREE.Mesh(tiaraGeo, tiaraMat);
      tiara.position.set(0, -0.3, -0.25);
      tiara.rotation.x = Math.PI / 6;
      mainGroup.add(tiara);
    }

    // Escala conforme tamanho
    const scale = selection.size === 'P' ? 0.75 : selection.size === 'G' ? 1.25 : 1.0;
    mainGroup.scale.set(scale, scale, scale);

    // 5. Interação de arrastar para girar (Orbit manual suave)
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

      mainGroup.rotation.y += deltaX * 0.012;
      mainGroup.rotation.x += deltaY * 0.012;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 6. Loop de animação
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        mainGroup.rotation.y += 0.007; // Rotação contínua e suave
      }
      renderer.render(scene, camera);
    };
    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (currentMount.contains(domElement)) {
        currentMount.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [selection.type, selection.size, selection.color, selection.material, colorHex]);

  return (
    <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-white via-secondary/60 to-secondary border border-border shadow-inner flex flex-col justify-between">
      
      {/* Badge Superior */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full shadow-sm border border-border/80">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
        <span className="text-[11px] font-body font-semibold text-dark">
          Preview 3D Interativo • Arraste para Girar
        </span>
      </div>

      {/* Container onde Three.js injeta o Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center" />

      {/* Rodapé do Visualizador */}
      <div className="absolute bottom-3 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
        <span className="text-[11px] font-body bg-white/85 backdrop-blur-md px-3 py-1 rounded-lg text-medium shadow-sm border border-border/60">
          Renderização em Tempo Real 🎀
        </span>
        <span className="text-[11px] font-body font-bold text-primary bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm border border-border/60 uppercase">
          {selection.type ? selection.type.replace(/-/g, ' ') : 'BICO DE PATO'}
        </span>
      </div>

    </div>
  );
}
