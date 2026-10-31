import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function BowViewer3D({ selection, colors }) {
  const mountRef = useRef(null);
  const currentColor = colors.find(c => c.id === selection.color)?.name || 'Rosa';
  const colorHex = colors.find(c => c.id === selection.color)?.hex || '#C9748D';
  const [activeSide, setActiveSide] = useState('frente');

  // Referência para girar o laço via botão se o usuário quiser virar 180 graus
  const bowPivotRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 460;
    const height = currentMount.clientHeight || 380;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1F161C');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    currentMount.appendChild(renderer.domElement);

    // 2. Iluminação com sombras para ressaltar o relevo 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ee, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xA78BCD, 1.5);
    rimLight.position.set(-3, -3, 3);
    scene.add(rimLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(0, 2, -4);
    scene.add(backLight);

    // 3. Carregar as texturas reais da frente e do verso
    const textureLoader = new THREE.TextureLoader();
    const textureFrente = textureLoader.load('laco_real_frente.jpg');
    const textureVerso = textureLoader.load('laco_real_verso.jpg');

    textureFrente.colorSpace = THREE.SRGBColorSpace;
    textureVerso.colorSpace = THREE.SRGBColorSpace;

    // Grupo pivô central que o usuário gira em 3D
    const bowPivot = new THREE.Group();
    bowPivotRef.current = bowPivot;
    scene.add(bowPivot);

    // 4. Criação da Malha 3D Curvada para a FRENTE (Double Bow volumoso)
    // Usamos CylinderGeometry aberto ou Curved Plane com relevo
    const frontRadius = 2.2;
    const frontLength = 2.4;
    const frontHeight = 1.8;
    const frontGeo = new THREE.CylinderGeometry(
      frontRadius, frontRadius, frontHeight, 48, 1, true, -Math.PI / 5, (Math.PI / 5) * 2
    );
    frontGeo.center();

    // Material com a foto real da frente + acabamento físico
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: textureFrente,
      roughness: 0.7,
      metalness: 0.05,
      side: THREE.FrontSide,
    });

    const frontMesh = new THREE.Mesh(frontGeo, frontMaterial);
    frontMesh.position.set(0, 0, 0.15);
    frontMesh.castShadow = true;
    bowPivot.add(frontMesh);

    // 5. Nó Central 3D em Relevo (Frente)
    // Curvatura convexa pronunciada no miolo
    const knotGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.9, 32, 1, true, -Math.PI / 3, (Math.PI / 3) * 2);
    knotGeo.center();
    const knotMat = new THREE.MeshStandardMaterial({
      map: textureFrente,
      roughness: 0.6,
      metalness: 0.05,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(0, 0, 0.42);
    knotMesh.scale.set(0.7, 0.9, 0.9);
    bowPivot.add(knotMesh);

    // 6. Camada Traseira: VERSO com a presilha bico de pato real em 3D
    const backGeo = new THREE.CylinderGeometry(
      frontRadius, frontRadius, frontHeight, 48, 1, true, Math.PI - Math.PI / 5, (Math.PI / 5) * 2
    );
    backGeo.center();

    const backMaterial = new THREE.MeshStandardMaterial({
      map: textureVerso,
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.FrontSide,
    });

    const backMesh = new THREE.Mesh(backGeo, backMaterial);
    backMesh.rotation.y = Math.PI;
    backMesh.position.set(0, 0, -0.15);
    backMesh.castShadow = true;
    bowPivot.add(backMesh);

    // 7. Clipe Metálico 3D no Verso (Bico de Pato em Aço Cromado)
    const clipGroup = new THREE.Group();
    clipGroup.position.set(0, -0.05, -0.42);
    clipGroup.rotation.y = Math.PI;
    clipGroup.rotation.z = Math.PI / 18;

    const clipMat = new THREE.MeshStandardMaterial({
      color: 0xDDDDDD,
      metalness: 0.95,
      roughness: 0.15,
    });

    // Corpo da presilha
    const clipBaseGeo = new THREE.BoxGeometry(2.1, 0.38, 0.08);
    const clipBaseMesh = new THREE.Mesh(clipBaseGeo, clipMat);
    clipGroup.add(clipBaseMesh);

    // Frisos de mola da presilha
    const springGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.38, 16);
    springGeo.center();
    const springMesh = new THREE.Mesh(springGeo, clipMat);
    springMesh.position.set(0.9, 0, 0.06);
    clipGroup.add(springMesh);

    bowPivot.add(clipGroup);

    // Escala conforme tamanho (P, M, G)
    const scale = selection.size === 'P' ? 0.78 : selection.size === 'G' ? 1.25 : 1.0;
    bowPivot.scale.set(scale, scale, scale);

    // 8. Controles de Órbita 3D e Rotação Manual Arrastando o Mouse
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

      // Trava de inclinação para não virar de ponta cabeça
      bowPivot.rotation.x = Math.max(-0.6, Math.min(0.6, bowPivot.rotation.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    // Suporte a Touch em Smartphones
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
      bowPivot.rotation.x = Math.max(-0.6, Math.min(0.6, bowPivot.rotation.x));

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

    // 9. Loop de animação com respiração flutuante
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Oscilação suave em levitação se não estiver arrastando
      if (!isDragging) {
        bowPivot.position.y = Math.sin(elapsed * 1.5) * 0.08;
        bowPivot.rotation.y += 0.004; // Rotação panorâmica lenta e elegante
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
  }, [selection.size, selection.color, selection.material]);

  // Função para girar 180° instantaneamente para a frente ou verso
  const flipTo = (side) => {
    setActiveSide(side);
    if (bowPivotRef.current) {
      const targetRotationY = side === 'frente' ? 0 : Math.PI;
      bowPivotRef.current.rotation.y = targetRotationY;
      bowPivotRef.current.rotation.x = 0;
    }
  };

  return (
    <div className="relative w-full h-84 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-[#24151E] via-[#1A1015] to-[#10090D] border border-primary/30 shadow-2xl flex flex-col justify-between">
      
      {/* Barra Superior */}
      <div className="absolute top-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-body font-semibold text-white">
            Modelo 3D Realista • Gire em 360°
          </span>
        </div>

        {/* Botões Rápidos para Frente / Verso */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => flipTo('frente')}
            className={`text-xs font-body font-bold px-3 py-1 rounded-full transition-all ${
              activeSide === 'frente'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white/15 text-white/80 hover:bg-white/25'
            }`}
          >
            Frente
          </button>
          <button
            onClick={() => flipTo('verso')}
            className={`text-xs font-body font-bold px-3 py-1 rounded-full transition-all ${
              activeSide === 'verso'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white/15 text-white/80 hover:bg-white/25'
            }`}
          >
            Verso (Presilha)
          </button>
        </div>
      </div>

      {/* Canvas Three.js Onde o Laço 3D Gira */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Barra Inferior com Legenda */}
      <div className="absolute bottom-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="text-[10px] text-white/70 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
          💡 Clique e arraste para inspecionar em qualquer ângulo
        </span>
        <span className="text-[11px] font-accent font-bold text-primary-light bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
          Feito à mão • Gorgurão Duplo
        </span>
      </div>

    </div>
  );
}
