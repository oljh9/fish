'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { Sparkles, Waves } from 'lucide-react';
import FishCard, { type CaughtFishData } from '../components/FishCard';
import {
  drawFishIllustration,
  FISH_ASPECT_RATIO,
  FISH_CANVAS_HEIGHT,
  FISH_CANVAS_WIDTH,
} from '../components/fishArt';
import styles from './page.module.css';

const FISH_SPECIES = [
  '우럭',
  '돔',
  '광어',
  '참치',
  '연어',
  '고등어',
  '삼치',
  '갈치',
  '명태',
  '대구',
  '장어',
  '오징어',
  '문어',
  '해마',
  '복어',
  '가오리',
  '상어',
  '돌고래',
  '병어',
  '붕어',
] as const;

const POSITIVE_ADJECTIVES = [
  '미쳐 날뛰는',
  '주 168시간 업무하는',
  '카페인 수액 맞는',
  '자퇴각 뾰족하게 재는',
  '저 세상 텐션인',
  '도파민에 푹 절여진',
  '통장 잔고가 소박한',
  '폼이 우주를 뚫어버린',
  '영혼이 절찬리 가출 중인',
  '뇌 빼고 일하는',
  '혈중 카페인 농도 100%인',
  '점심 메뉴 고르다 기력 다한',
  '사장님 몰래 스텝 밟는',
  '퇴근 시간만 목 빠지게 기다리는',
  '머리없는',
  '머리털 다 쥐어뜯은',
  '내일의 나에게 당당히 미루는',
  '침대와 물아일체의 경지에 오른',
  '택배 기사님만 애타게 찾는',
  '알람 10개 맞추고 장렬히 늦잠 잔',
] as const;

const SPECIES_PATHS: Record<(typeof FISH_SPECIES)[number], string> = {
  우럭:
    'M20 62 C34 32 82 16 130 30 C152 14 188 18 208 52 C192 56 178 63 164 72 C187 77 201 85 210 102 C184 96 153 92 131 94 C83 106 36 94 20 62 Z',
  돔:
    'M26 60 C34 26 74 16 122 22 C156 26 184 40 202 60 C188 82 158 98 122 102 C74 108 36 94 26 60 Z M166 46 C188 38 205 36 216 48 C200 58 188 66 166 70 Z',
  광어:
    'M22 64 C42 34 92 18 146 24 C182 28 204 44 214 60 C204 78 182 92 146 96 C88 102 42 90 22 64 Z M146 24 C174 8 204 8 220 18 C198 28 176 34 146 38 Z',
  참치:
    'M16 60 C30 40 88 28 152 36 C178 24 206 28 220 48 C206 58 188 62 170 66 C186 70 206 74 218 88 C202 92 178 94 152 84 C90 92 32 82 16 60 Z',
  연어:
    'M18 62 C34 26 84 18 128 28 C152 16 182 18 206 44 C196 58 180 66 162 70 C176 76 194 84 206 98 C184 94 158 92 134 86 C88 100 34 94 18 62 Z',
  고등어:
    'M14 60 C30 42 84 30 146 36 C170 24 198 28 216 44 C202 56 186 62 170 66 C188 70 204 78 218 92 C194 94 170 92 146 84 C82 92 30 80 14 60 Z',
  삼치:
    'M10 60 C30 38 98 28 166 38 C184 20 210 18 224 32 C214 46 196 56 180 62 C196 68 214 78 224 92 C206 92 184 90 166 80 C96 92 28 84 10 60 Z',
  갈치:
    'M16 58 C44 42 94 34 148 40 C176 20 206 18 222 30 C208 44 186 52 168 60 C184 66 206 76 220 90 C198 92 176 88 148 76 C92 82 44 78 16 58 Z',
  명태:
    'M20 62 C34 34 78 22 124 28 C150 18 182 20 206 46 C196 58 180 66 162 70 C176 74 196 82 210 98 C188 96 162 92 138 88 C86 98 34 90 20 62 Z',
  대구:
    'M20 64 C32 30 72 18 120 22 C154 24 182 38 202 60 C184 88 154 100 120 102 C72 106 34 94 20 64 Z M164 50 C186 42 204 42 216 58 C200 70 186 76 164 74 Z',
  장어:
    'M14 74 C30 42 54 28 84 34 C106 38 120 56 138 60 C154 64 178 52 206 28 C198 60 198 76 208 100 C178 84 154 80 136 84 C116 88 104 106 82 104 C52 100 32 92 14 74 Z',
  오징어:
    'M90 16 C118 20 142 36 150 60 C154 80 148 98 138 108 C132 92 124 92 118 108 C114 90 106 90 100 108 C96 90 88 90 82 108 C76 92 68 92 62 108 C52 96 48 80 52 60 C58 34 76 18 90 16 Z',
  문어:
    'M74 24 C108 12 150 18 166 48 C176 68 170 86 160 102 C152 84 142 82 136 102 C128 84 118 82 112 102 C104 84 94 84 88 102 C80 84 70 84 64 102 C50 88 44 68 50 50 C56 36 64 28 74 24 Z',
  해마:
    'M132 18 C150 28 158 44 154 62 C150 78 140 88 130 96 C126 106 134 116 146 116 C138 128 118 126 108 116 C96 106 94 92 102 82 C90 72 84 58 88 42 C92 28 108 16 132 18 Z M90 42 C72 36 56 42 44 54 C58 54 70 58 84 70 Z',
  복어:
    'M52 60 C52 32 74 16 110 14 C148 16 174 34 176 60 C174 88 148 106 110 108 C74 106 52 88 52 60 Z M176 52 C194 44 210 46 222 60 C210 74 194 76 176 68 Z',
  가오리:
    'M24 58 C54 18 102 10 138 26 C156 34 172 52 182 72 C190 86 206 96 220 100 C198 106 178 106 162 100 C148 94 136 90 126 90 C116 90 104 94 90 100 C70 108 44 108 18 98 C40 90 54 78 60 64 C46 66 34 64 24 58 Z',
  상어:
    'M12 62 C34 44 84 34 138 38 C154 22 172 14 188 18 C180 28 176 40 178 48 C196 50 212 56 224 64 C212 70 196 76 178 80 C174 92 178 104 184 112 C164 106 150 96 138 82 C82 90 32 82 12 62 Z',
  돌고래:
    'M22 62 C42 26 98 20 146 34 C158 14 176 10 192 14 C182 26 178 36 180 46 C198 50 212 58 220 70 C208 76 194 80 178 80 C172 92 176 104 184 112 C162 106 146 94 134 82 C94 92 42 88 22 62 Z',
  병어:
    'M48 60 C72 24 108 14 142 20 C166 24 186 38 200 60 C188 84 166 98 142 100 C106 104 70 94 48 60 Z M200 54 C214 48 226 48 236 60 C226 72 214 72 200 66 Z',
  붕어:
    'M24 62 C36 30 76 18 120 22 C144 24 172 36 194 60 C172 88 144 100 120 102 C76 106 36 94 24 62 Z M194 52 C210 46 224 48 236 60 C224 74 210 76 194 68 Z',
};

type FishSpecies = (typeof FISH_SPECIES)[number];

type SwimmingFish = {
  id: number;
  species: FishSpecies;
  pathData: string;
  colors: [string, string];
  size: number;
  anchorX: number;
  anchorY: number;
  rangeX: number;
  rangeY: number;
  speed: number;
  drift: number;
  phase: number;
  rotation: number;
  hidden: boolean;
};

type CatchAnimation = {
  fish: CaughtFishData;
  originX: number;
  originY: number;
  expanded: boolean;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

function pickRandom<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase()}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string) {
  const safeHex = hex.replace('#', '');
  const bigint = Number.parseInt(safeHex, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) {
    return { h: 0, s: 0, l: lightness * 100 };
  }

  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue = 0;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  return {
    h: hue * 60,
    s: saturation * 100,
    l: lightness * 100,
  };
}

function getRepresentativeColorName(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  if (l < 10) {
    return '검정';
  }

  if (s < 8) {
    if (l > 92) {
      return '흰색';
    }

    return '회색';
  }

  if (l > 86 && s < 18) {
    return '은색';
  }

  if (h >= 38 && h <= 58 && s > 40 && l > 46) {
    return l > 70 ? '금색' : '노랑';
  }

  if (h >= 170 && h < 195) {
    return '청록';
  }

  if (h >= 330 || h < 14) {
    return '빨강';
  }

  if (h < 34) {
    return '주황';
  }

  if (h < 70) {
    return '노랑';
  }

  if (h < 150) {
    return '초록';
  }

  if (h < 210) {
    return '파랑';
  }

  if (h < 250) {
    return '남색';
  }

  if (h < 290) {
    return '보라';
  }

  if (h < 330) {
    return l < 42 ? '갈색' : '분홍';
  }

  return '분홍';
}

function createSwimmingFish(id: number): SwimmingFish {
  const species = pickRandom(FISH_SPECIES);

  return {
    id,
    species,
    pathData: SPECIES_PATHS[species],
    colors: [randomHexColor(), randomHexColor()],
    size: randomBetween(74, 138),
    anchorX: randomBetween(0.02, 0.88),
    anchorY: randomBetween(0.08, 0.82),
    rangeX: randomBetween(0.04, 0.16),
    rangeY: randomBetween(0.02, 0.09),
    speed: randomBetween(0.24, 0.82),
    drift: randomBetween(0.8, 1.5),
    phase: randomBetween(0, Math.PI * 2),
    rotation: randomBetween(-6, 6),
    hidden: false,
  };
}

function createSchool(count: number) {
  return Array.from({ length: count }, (_, index) => createSwimmingFish(index));
}

function buildCaughtFish(fish: SwimmingFish): CaughtFishData {
  const firstColorName = getRepresentativeColorName(fish.colors[0]);
  const secondColorName = getRepresentativeColorName(fish.colors[1]);

  return {
    id: `${fish.id}-${Date.now()}-${randomInt(100, 999)}`,
    species: fish.species,
    title: `${pickRandom(POSITIVE_ADJECTIVES)} ${fish.species}`,
    pathData: fish.pathData,
    colors: fish.colors,
    colorNames: [firstColorName, secondColorName],
    colorDescriptions: [
      `${pickRandom(POSITIVE_ADJECTIVES)} ${firstColorName}`,
      `${pickRandom(POSITIVE_ADJECTIVES)} ${secondColorName}`,
    ],
  };
}

function drawFish(
  ctx: CanvasRenderingContext2D,
  species: string,
  colors: [string, string],
) {
  drawFishIllustration(ctx, species, colors);
}

function SwimmingFishSprite({
  fish,
  disabled,
  registerRef,
  onCatch,
}: {
  fish: SwimmingFish;
  disabled: boolean;
  registerRef: (node: HTMLButtonElement | null) => void;
  onCatch: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    drawFish(context, fish.species, fish.colors);
  }, [fish.colors, fish.species]);

  return (
    <button
      ref={registerRef}
      type="button"
      className={styles.fishButton}
      style={
        {
          width: `${fish.size}px`,
          height: `${fish.size * FISH_ASPECT_RATIO}px`,
        } as CSSProperties
      }
      onClick={onCatch}
      disabled={disabled}
      aria-label={`${fish.species} 낚기`}
    >
      <span className={styles.fishBody}>
        <span
          className={styles.fishAura}
          style={
            {
              '--fish-a': fish.colors[0],
              '--fish-b': fish.colors[1],
            } as CSSProperties
          }
        />
        <canvas
          ref={canvasRef}
          className={styles.fishCanvas}
          width={FISH_CANVAS_WIDTH}
          height={FISH_CANVAS_HEIGHT}
        />
      </span>
    </button>
  );
}

export default function Page() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fishRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const fishStateRef = useRef<SwimmingFish[]>([]);
  const timersRef = useRef<number[]>([]);
  const catchCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [school, setSchool] = useState<SwimmingFish[]>([]);
  const [selectedFish, setSelectedFish] = useState<CaughtFishData | null>(null);
  const [catchAnimation, setCatchAnimation] = useState<CatchAnimation | null>(
    null,
  );

  useEffect(() => {
    const fishCount = randomInt(17, 25);
    setSchool(createSchool(fishCount));
  }, []);

  useEffect(() => {
    fishStateRef.current = school;
  }, [school]);

  useEffect(() => {
    let frameId = 0;

    const animate = (time: number) => {
      const stageBounds = stageRef.current?.getBoundingClientRect();

      if (stageBounds) {
        for (const fish of fishStateRef.current) {
          const node = fishRefs.current[fish.id];

          if (!node) {
            continue;
          }

          const usableWidth = Math.max(stageBounds.width - fish.size, 0);
          const usableHeight = Math.max(
            stageBounds.height - fish.size * FISH_ASPECT_RATIO,
            0,
          );
          const cycle = time / 1000;
          const x =
            fish.anchorX * usableWidth +
            Math.sin(cycle * fish.speed + fish.phase) *
              fish.rangeX *
              usableWidth;
          const y =
            fish.anchorY * usableHeight +
            Math.cos(cycle * fish.speed * fish.drift + fish.phase) *
              fish.rangeY *
              usableHeight;
          const direction = Math.cos(cycle * fish.speed + fish.phase) >= 0 ? 1 : -1;
          const bob = Math.sin(cycle * fish.speed * 1.7 + fish.phase) * 5;

          node.style.transform = `translate3d(${clamp(
            x,
            0,
            usableWidth,
          )}px, ${clamp(y + bob, 0, usableHeight)}px, 0) scale(${direction}, 1) rotate(${fish.rotation}deg)`;
          node.style.opacity = fish.hidden ? '0' : '1';
        }
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const canvas = catchCanvasRef.current;
    const context = canvas?.getContext('2d');

    if (!catchAnimation || !canvas || !context) {
      return;
    }

    drawFish(context, catchAnimation.fish.species, catchAnimation.fish.colors);
  }, [catchAnimation]);

  useEffect(() => {
    return () => {
      for (const timer of timersRef.current) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const handleCatch = (fish: SwimmingFish) => {
    if (catchAnimation || selectedFish) {
      return;
    }

    const node = fishRefs.current[fish.id];
    const bounds = node?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const caughtFish = buildCaughtFish(fish);

    setSchool((currentSchool) =>
      currentSchool.map((item) =>
        item.id === fish.id ? { ...item, hidden: true } : item,
      ),
    );

    setCatchAnimation({
      fish: caughtFish,
      originX: bounds.left + bounds.width / 2,
      originY: bounds.top + bounds.height / 2,
      expanded: false,
    });

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setCatchAnimation((currentCatch) =>
          currentCatch ? { ...currentCatch, expanded: true } : currentCatch,
        );
      });
    });

    timersRef.current.push(
      window.setTimeout(() => {
        setSelectedFish(caughtFish);
      }, 760),
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setCatchAnimation(null);
        setSchool((currentSchool) =>
          currentSchool.map((item) =>
            item.id === fish.id ? createSwimmingFish(fish.id) : item,
          ),
        );
      }, 1060),
    );
  };

  return (
    <main className={styles.page}>

      <div ref={stageRef} className={styles.seaStage}>
        <div className={styles.depthGlow} />
        <div className={styles.currentOne} />
        <div className={styles.currentTwo} />
        <div className={styles.bubbleField} />
        <div className={styles.tapHint}>
          <Sparkles size={15} />
          이준희의 낚시터
        </div>

        {school.map((fish) => (
          <SwimmingFishSprite
            key={fish.id}
            fish={fish}
            disabled={fish.hidden || Boolean(catchAnimation) || Boolean(selectedFish)}
            registerRef={(node) => {
              fishRefs.current[fish.id] = node;
            }}
            onCatch={() => handleCatch(fish)}
          />
        ))}
      </div>

      {selectedFish ? (
        <div
          className={styles.floatOverlay}
          onClick={() => setSelectedFish(null)}
          aria-hidden="true"
        >
          <div
            className={styles.floatCard}
            onClick={(event) => event.stopPropagation()}
          >
            <FishCard fish={selectedFish} onClose={() => setSelectedFish(null)} />
          </div>
        </div>
      ) : null}

      {catchAnimation ? (
        <div className={styles.catchLayer} aria-hidden="true">
          <div
            className={`${styles.catchFish} ${
              catchAnimation.expanded ? styles.catchFishExpanded : ''
            }`}
            style={
              {
                '--origin-x': `${catchAnimation.originX}px`,
                '--origin-y': `${catchAnimation.originY}px`,
                '--fish-a': catchAnimation.fish.colors[0],
                '--fish-b': catchAnimation.fish.colors[1],
              } as CSSProperties
            }
          >
            <span className={styles.catchGlow} />
            <canvas
              ref={catchCanvasRef}
              className={styles.catchCanvas}
              width={FISH_CANVAS_WIDTH}
              height={FISH_CANVAS_HEIGHT}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
