'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { DeskStudioScene } from '../studio-scene';
import { DeskStudioInteraction } from '../studio-interaction';
import { calculateSetupTotal, addSetupToCart } from '../studio-cart';
import { PRODUCTS } from '../../modules/products/products.api';
import { useCart } from '../../modules/cart/context/useCart';
import { useToast } from '../../shared/components/Toast/ToastContext';

function getProductIcon(id: number): string {
  switch (id) {
    case 9:
      return '🖥️';
    case 10:
      return '📺';
    case 1:
      return '⌨️';
    case 4:
      return '🖱️';
    case 8:
      return '🪵';
    case 2:
      return '🎧';
    case 3:
      return '💡';
    case 5:
      return '🖊️';
    case 6:
      return '📐';
    case 7:
      return '🔌';
    default:
      return '📦';
  }
}

export const DeskStudioPageView: React.FC = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<DeskStudioScene | null>(null);
  const interactionRef = useRef<DeskStudioInteraction | null>(null);

  const [setupTotal, setSetupTotal] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<THREE.Group | null>(null);
  const [rotationDeg, setRotationDeg] = useState<number>(0);

  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleSelectionChange = useCallback((selected: THREE.Group | null) => {
    setSelectedItem(selected);
    if (selected) {
      const deg = Math.round(((selected.rotation.y * 180) / Math.PI) % 360);
      setRotationDeg(deg >= 0 ? deg : deg + 360);
    }
  }, []);

  const handleSetupChange = useCallback((placed: THREE.Group[]) => {
    setSetupTotal(calculateSetupTotal(placed));
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new DeskStudioScene();
    scene.init(canvasRef.current);
    sceneRef.current = scene;

    const interaction = new DeskStudioInteraction(scene, handleSelectionChange, handleSetupChange);
    interactionRef.current = interaction;

    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
      interactionRef.current = null;
    };
  }, [handleSelectionChange, handleSetupChange]);

  const handleRotateChange = (deg: number) => {
    setRotationDeg(deg);
    if (interactionRef.current) {
      interactionRef.current.rotateSelected(deg);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItem && interactionRef.current) {
      interactionRef.current.deleteSelected();
      setSelectedItem(null);
    }
  };

  const handleClearDesk = () => {
    if (interactionRef.current) {
      interactionRef.current.clearAll();
      setSelectedItem(null);
      setSetupTotal(0);
      showToast('تم تفريغ سطح المكتب بالكامل');
    }
  };

  const handleAddAllToCart = () => {
    if (!interactionRef.current) return;
    const placed = interactionRef.current.placedObjects;
    if (placed.length === 0) {
      showToast('المكتب فارغ حالياً! اسحب منتجات إلى السطح أولاً');
      return;
    }

    const result = addSetupToCart(placed, addItem);
    showToast(
      `تمت إضافة ${result.totalItems} قطع من التشكيلة إلى السلة بقيمة ${result.totalAmount.toLocaleString('ar-SA')} ر.س`,
    );
    router.push('/cart');
  };

  return (
    <div
      className="w-full h-[calc(100vh-4rem)] min-h-[640px] relative bg-[#171614] overflow-hidden flex flex-col"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Top Bar Controls */}
      <header className="h-14 px-4 sm:px-6 bg-[#21201d] border-b border-[#38342c] flex items-center justify-between text-[var(--washi-ivory)] z-10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[var(--vermilion-seal)] text-white">
            3D WebGL
          </span>
          <h1 className="text-base sm:text-lg font-bold font-[family-name:var(--font-readex)]">
            استوديو تكوين مساحة العمل 3D
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-[#4a463c] text-xs font-semibold text-[var(--washi-ivory)] hover:bg-white/5 transition-colors cursor-pointer"
            onClick={handleClearDesk}
          >
            تفريغ السطح
          </button>
        </div>
      </header>

      {/* Main Studio Body: Canvas + Sidebar */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* 3D Canvas Container */}
        <div className="flex-1 h-full w-full relative" ref={canvasRef} />

        {/* Floating Right Catalog Drawer / Panel */}
        <aside
          className="w-80 sm:w-88 h-full bg-[#1e1c19]/95 backdrop-blur-md border-r border-[#38342c] text-[var(--washi-ivory)] flex flex-col shrink-0 z-10"
          aria-label="كتالوج قطع المكتب ثلاثية الأبعاد"
        >
          <div className="p-4 border-b border-[#38342c]">
            <h2 className="text-sm font-bold font-[family-name:var(--font-readex)]">📦 منتجات التجهيز</h2>
            <p className="text-[11px] text-[var(--muted-umeboshi)] mt-0.5">
              اضغط واسحب القطعة مباشرة نحو المكتب، أو انقر عليها لوضعها فوراً.
            </p>
          </div>

          {/* Catalog Items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-xl bg-[#282622] hover:bg-[#32302b] border border-[#3d3931] flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing transition-all select-none"
                role="button"
                tabIndex={0}
                aria-label={`إضافة ${product.name} إلى سطح المكتب`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  interactionRef.current?.startSpawnDrag(product.id, e.clientX, e.clientY);
                }}
                onClick={() => {
                  interactionRef.current?.spawnAtCenter(product.id);
                }}
              >
                <div className="text-2xl" aria-hidden="true">
                  {getProductIcon(product.id)}
                </div>
                <div className="flex-1 text-right">
                  <span className="block text-xs font-semibold text-[var(--washi-ivory)]">{product.name}</span>
                  <span className="block text-[11px] text-[var(--bamboo-tan)] font-bold mt-0.5">
                    {product.price.toLocaleString('ar-SA')} ر.س
                  </span>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-[#38342c] text-[var(--bamboo-tan)] font-bold">
                  اسحب
                </span>
              </div>
            ))}
          </div>

          {/* Setup Footer & Checkout Button */}
          <div className="p-4 border-t border-[#38342c] bg-[#21201d] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--washi-ivory)]/70">مجموع التشكيلة:</span>
              <span className="text-base font-bold text-[var(--bamboo-tan)]">
                {setupTotal.toLocaleString('ar-SA')} ر.س
              </span>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-[var(--bamboo-green)] hover:bg-[#255c34] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              onClick={handleAddAllToCart}
            >
              <span>🛒 إضافة التشكيلة كاملة للسلة والإنهاء</span>
            </button>
          </div>
        </aside>

        {/* Selected Item Control Bubble */}
        {selectedItem && (
          <div className="absolute bottom-6 left-6 z-20 p-4 rounded-2xl bg-[#21201d]/95 backdrop-blur-md border border-[#38342c] text-[var(--washi-ivory)] shadow-xl space-y-3 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-bold border-b border-[#38342c] pb-2">
              <span>تحكم في القطعة المحددة</span>
              <button
                type="button"
                className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                onClick={handleDeleteSelected}
              >
                حذف القطعة 🗑️
              </button>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-[var(--washi-ivory)]/70 mb-1">
                <span>زاوية الدوران:</span>
                <span dir="ltr">{rotationDeg}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={rotationDeg}
                onChange={(e) => handleRotateChange(Number(e.target.value))}
                className="w-full accent-[var(--bamboo-tan)] cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

