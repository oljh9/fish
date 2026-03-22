'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { toBlob } from 'html-to-image';
import { Download, Sparkles, X } from 'lucide-react';
import {
  BASE_EYE_SCALE,
  CARD_EYE_SCALE,
  drawFishIllustration,
  FISH_CANVAS_HEIGHT,
  FISH_CANVAS_WIDTH,
} from './fishArt';
import styles from './FishCard.module.css';

export type CaughtFishData = {
  id: string;
  species: string;
  title: string;
  pathData: string;
  colors: [string, string];
  colorNames: [string, string];
  colorDescriptions: [string, string];
};

type ChipData = {
  colors: [string, string];
  colorNames: [string, string];
};

export default function FishCard({
  fish,
  onClose,
}: {
  fish: CaughtFishData;
  onClose?: () => void;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copyLabel, setCopyLabel] = useState('Hex 복사하기');
  const [eyesNormalized, setEyesNormalized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const chip: ChipData = {
    colors: fish.colors,
    colorNames: fish.colorNames,
  };

  useEffect(() => {
    setEyesNormalized(false);
  }, [fish.id]);

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    if (eyesNormalized) {
      drawFishIllustration(
        context,
        fish.species,
        fish.colors,
        canvas.width,
        canvas.height,
        {
          eyeScale: BASE_EYE_SCALE,
          bloodshot: 0,
        },
      );

      return;
    }

    let animationFrame = 0;
    let startTime = 0;
    const duration = 560;

    const animate = (timestamp: number) => {
      if (startTime === 0) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const eyeScale =
        BASE_EYE_SCALE + (CARD_EYE_SCALE - BASE_EYE_SCALE) * eased;

      drawFishIllustration(
        context,
        fish.species,
        fish.colors,
        canvas.width,
        canvas.height,
        {
          eyeScale,
          bloodshot: eased,
        },
      );

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [eyesNormalized, fish]);

  const handleSave = () => {
    const node = cardRef.current;

    if (!node || isSaving) {
      return;
    }

    setIsSaving(true);

    void toBlob(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#07111f',
      filter: (domNode) => {
        if (!(domNode instanceof HTMLElement)) {
          return true;
        }

        return domNode.dataset.export !== 'exclude';
      },
      width: node.clientWidth,
      height: node.clientHeight,
      canvasWidth: node.clientWidth * 2,
      canvasHeight: node.clientHeight * 2,
    })
      .then((blob) => {
        if (!blob) {
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `color-chip-fish-${fish.species}-${fish.id}.png`;
        link.click();
        window.setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleCopyHex = async () => {
    const joined = `code1 ${fish.colors[0]}\ncode2 ${fish.colors[1]}`;

    try {
      await navigator.clipboard.writeText(joined);
      setCopyLabel('복사 완료');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = joined;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopyLabel('복사 완료');
    }

    window.setTimeout(() => {
      setCopyLabel('Hex 복사하기');
    }, 1600);
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      style={
        {
          '--fish-a': fish.colors[0],
          '--fish-b': fish.colors[1],
        } as CSSProperties
      }
    >
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>
            <Sparkles size={15} />
            그라데이션 컬러칩
          </span>
          <h3 className={styles.title}>{fish.title}</h3>
          <p className={styles.subtitle}>
            {fish.species}
          </p>
        </div>

        <div className={styles.headerActions}>
          <span className={styles.speciesTag}>{fish.species}</span>
          {onClose ? (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="카드 닫기"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>
      </header>

      <div className={styles.previewPanel}>
        <button
          type="button"
          className={styles.normalizeButton}
          onClick={() => setEyesNormalized(true)}
          disabled={eyesNormalized}
        >
          눈 정상화하기
        </button>
        <div className={styles.previewGlow} />
        <canvas
          ref={previewCanvasRef}
          className={styles.previewCanvas}
          width={FISH_CANVAS_WIDTH}
          height={FISH_CANVAS_HEIGHT}
        />
      </div>

      <section className={styles.chipDeck} aria-label="컬러칩">
        <article className={styles.colorChip}>
          <div
            className={styles.chipSwatch}
            style={
              {
                '--chip-start': chip.colors[0],
                '--chip-end': chip.colors[1],
              } as CSSProperties
            }
          />
          <div className={styles.chipLabel}>
            <span className={styles.chipSeries}>그라데이션 컬러칩</span>
            <div className={styles.chipCodeGrid}>
              <div className={styles.chipCodeBlock}>
                <span className={styles.chipCodeLabel}>code1</span>
                <strong className={styles.chipHex}>{chip.colors[0]}</strong>
                <span className={styles.chipName}>{chip.colorNames[0]}</span>
              </div>
              <div className={styles.chipCodeBlock}>
                <span className={styles.chipCodeLabel}>code2</span>
                <strong className={styles.chipHex}>{chip.colors[1]}</strong>
                <span className={styles.chipName}>{chip.colorNames[1]}</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <button type="button" className={styles.copyButton} onClick={handleCopyHex}>
        {copyLabel}
      </button>

      <button
        type="button"
        className={styles.saveButton}
        onClick={handleSave}
        data-export="exclude"
      >
        <Download size={16} />
        {isSaving ? '저장 중...' : '카드 저장하기'}
      </button>
    </article>
  );
}
