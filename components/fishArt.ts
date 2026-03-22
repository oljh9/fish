export const FISH_CANVAS_WIDTH = 360;
export const FISH_CANVAS_HEIGHT = 220;
export const FISH_ASPECT_RATIO = FISH_CANVAS_HEIGHT / FISH_CANVAS_WIDTH;
export const BASE_EYE_SCALE = 1.95;
export const CARD_EYE_SCALE = 9.75;

export type FishRenderOptions = {
  eyeScale?: number;
  bloodshot?: number;
};

type Archetype =
  | 'deep'
  | 'round'
  | 'flat'
  | 'torpedo'
  | 'blade'
  | 'eel'
  | 'squid'
  | 'octopus'
  | 'seahorse'
  | 'puffer'
  | 'ray'
  | 'shark'
  | 'dolphin';

type FishBlueprint = {
  bodyPaths: string[];
  finPaths?: string[];
  accentPaths?: string[];
  eyePoints: Array<[number, number, number]>;
  gillPath?: string;
  mouthPath?: string;
};

const ARCHETYPE_BY_SPECIES: Record<string, Archetype> = {
  우럭: 'deep',
  돔: 'round',
  광어: 'flat',
  참치: 'torpedo',
  연어: 'torpedo',
  고등어: 'torpedo',
  삼치: 'torpedo',
  갈치: 'blade',
  명태: 'deep',
  대구: 'deep',
  장어: 'eel',
  오징어: 'squid',
  문어: 'octopus',
  해마: 'seahorse',
  복어: 'puffer',
  가오리: 'ray',
  상어: 'shark',
  돌고래: 'dolphin',
  병어: 'flat',
  붕어: 'round',
};

const BLUEPRINTS: Record<Archetype, FishBlueprint> = {
  deep: {
    bodyPaths: [
      'M68 112 C82 70 126 42 188 46 C250 50 296 76 308 112 C296 150 248 178 184 182 C126 184 80 156 68 112 Z',
      'M306 102 C336 86 356 92 360 112 C356 132 336 140 306 124 C316 118 320 112 306 102 Z',
    ],
    finPaths: [
      'M150 52 C174 24 210 24 234 52 C204 58 178 60 150 52 Z',
      'M144 114 C122 102 110 126 126 142 C146 138 154 128 144 114 Z',
      'M154 164 C180 152 208 154 226 170 C198 182 176 182 154 164 Z',
    ],
    accentPaths: ['M114 92 C160 108 212 116 278 114'],
    eyePoints: [[116, 92, 7]],
    gillPath: 'M138 78 C150 92 150 118 136 134',
    mouthPath: 'M86 110 C94 114 102 116 108 114',
  },
  round: {
    bodyPaths: [
      'M72 112 C82 58 136 34 198 40 C254 46 292 76 298 112 C292 154 252 188 196 192 C136 196 82 166 72 112 Z',
      'M296 100 C324 86 348 94 352 112 C348 132 324 140 296 126 C306 118 308 110 296 100 Z',
    ],
    finPaths: [
      'M156 48 C180 18 214 22 236 48 C206 56 180 58 156 48 Z',
      'M152 170 C180 156 212 160 230 178 C198 188 176 188 152 170 Z',
      'M140 114 C118 102 110 126 124 142 C144 138 150 128 140 114 Z',
    ],
    accentPaths: ['M114 86 C154 104 214 118 268 118'],
    eyePoints: [[120, 90, 7]],
    gillPath: 'M142 74 C154 90 154 118 140 136',
    mouthPath: 'M88 112 C96 116 104 116 112 114',
  },
  flat: {
    bodyPaths: [
      'M56 114 C90 78 142 60 210 62 C264 64 302 84 320 114 C300 144 262 166 206 170 C140 174 90 154 56 114 Z',
      'M318 102 C344 92 358 100 360 114 C358 128 344 136 318 126',
    ],
    finPaths: [
      'M118 70 C162 48 232 48 278 74 C228 74 174 76 118 70 Z',
      'M116 154 C176 146 230 146 280 158 C232 172 176 174 116 154 Z',
    ],
    accentPaths: ['M116 112 C170 100 232 102 284 114'],
    eyePoints: [
      [124, 88, 6],
      [148, 92, 5.6],
    ],
    gillPath: 'M176 86 C186 96 186 118 174 130',
    mouthPath: 'M96 108 C102 112 108 114 114 112',
  },
  torpedo: {
    bodyPaths: [
      'M48 114 C82 72 150 64 232 82 C254 68 292 72 322 98 C312 106 300 112 286 116 C302 122 314 132 324 146 C292 154 256 154 232 142 C150 160 80 152 48 114 Z',
    ],
    finPaths: [
      'M176 66 C194 38 220 36 236 64 C214 70 196 72 176 66 Z',
      'M178 146 C198 138 220 138 238 152 C212 160 196 160 178 146 Z',
      'M144 112 C124 104 118 126 130 138 C146 134 152 126 144 112 Z',
    ],
    accentPaths: [
      'M118 92 C178 102 238 106 292 102',
      'M110 104 C176 118 242 122 302 118',
    ],
    eyePoints: [[112, 96, 6]],
    gillPath: 'M132 84 C142 94 142 116 130 128',
    mouthPath: 'M80 110 C88 112 96 112 104 110',
  },
  blade: {
    bodyPaths: [
      'M42 114 C88 90 168 84 248 92 C274 72 314 70 346 84 C320 96 306 104 294 114 C308 122 322 132 348 148 C316 156 276 154 248 136 C166 142 88 138 42 114 Z',
    ],
    finPaths: [
      'M208 90 C228 64 250 60 274 74 C252 82 232 88 208 90 Z',
      'M206 138 C228 132 252 132 274 144 C248 150 228 148 206 138 Z',
    ],
    accentPaths: [
      'M84 112 C150 102 220 102 290 112',
      'M84 124 C152 118 222 118 290 124',
    ],
    eyePoints: [[96, 102, 5.5]],
    gillPath: 'M116 94 C124 102 124 118 114 126',
    mouthPath: 'M68 112 C76 114 84 114 92 112',
  },
  eel: {
    bodyPaths: [
      'M42 136 C66 94 92 76 130 80 C164 84 180 106 210 112 C244 118 282 94 326 62 C310 98 310 132 328 170 C286 146 248 140 214 146 C182 152 164 182 126 182 C90 182 62 166 42 136 Z',
    ],
    accentPaths: [
      'M72 132 C110 108 148 110 186 126',
      'M170 130 C214 136 256 126 304 92',
    ],
    eyePoints: [[88, 110, 5.5]],
    gillPath: 'M104 100 C112 110 112 122 102 132',
    mouthPath: 'M64 118 C72 120 80 120 88 116',
  },
  squid: {
    bodyPaths: [
      'M170 34 C212 38 244 70 244 118 C244 144 232 164 218 176 C210 152 200 150 192 176 C186 150 176 150 168 176 C162 150 152 150 144 176 C138 150 128 150 120 176 C104 162 94 142 94 118 C94 70 126 38 170 34 Z',
    ],
    finPaths: [
      'M124 84 C96 78 78 92 70 114 C90 112 110 116 128 130 Z',
      'M216 84 C244 78 262 92 270 114 C250 112 230 116 212 130 Z',
    ],
    accentPaths: [
      'M146 62 C156 92 156 120 146 144',
      'M170 56 C178 88 178 122 170 150',
      'M194 62 C202 94 202 122 194 144',
    ],
    eyePoints: [
      [152, 88, 6],
      [188, 88, 6],
    ],
    mouthPath: 'M156 114 C164 122 176 122 184 114',
  },
  octopus: {
    bodyPaths: [
      'M120 46 C158 18 220 22 242 72 C256 104 242 132 228 150 C216 124 204 124 194 154 C184 124 172 124 162 156 C152 126 140 126 130 156 C118 124 106 124 96 154 C74 132 68 102 80 76 C88 60 102 50 120 46 Z',
    ],
    finPaths: [
      'M94 154 C78 164 72 182 78 198 C92 192 102 184 110 170',
      'M122 156 C106 172 102 190 110 206 C124 198 132 188 138 172',
      'M154 158 C142 176 144 198 156 210 C166 198 170 182 172 164',
      'M186 156 C188 176 196 196 210 204 C218 190 216 172 204 156',
      'M214 152 C224 170 236 184 254 188 C258 170 252 154 236 144',
    ],
    accentPaths: [
      'M136 80 C144 96 144 114 136 128',
      'M170 74 C178 94 178 116 170 136',
      'M204 80 C212 98 212 116 204 128',
    ],
    eyePoints: [
      [150, 90, 6],
      [192, 90, 6],
    ],
    mouthPath: 'M162 118 C170 126 176 126 184 118',
  },
  seahorse: {
    bodyPaths: [
      'M232 32 C258 46 270 74 266 104 C262 126 246 140 228 150 C218 166 224 184 244 186 C232 208 202 202 188 186 C170 168 170 142 184 126 C166 112 158 92 162 72 C168 48 192 28 232 32 Z',
      'M178 76 C154 68 124 74 104 96 C126 98 146 106 164 122 Z',
    ],
    finPaths: ['M218 90 C236 76 250 80 256 100 C242 108 228 108 218 90 Z'],
    accentPaths: [
      'M206 56 C216 78 214 100 198 120',
      'M198 122 C186 138 188 158 206 170',
    ],
    eyePoints: [[222, 72, 6]],
    gillPath: 'M232 82 C242 94 242 108 230 118',
    mouthPath: 'M250 78 C258 76 262 72 266 66',
  },
  puffer: {
    bodyPaths: [
      'M98 112 C98 68 132 42 186 42 C242 42 280 70 280 112 C280 156 242 182 186 182 C132 182 98 156 98 112 Z',
      'M278 104 C304 92 326 98 338 114 C326 130 304 136 278 124 Z',
    ],
    finPaths: [
      'M136 74 C154 58 176 58 194 70 C172 80 154 82 136 74 Z',
      'M138 152 C160 142 180 142 198 154 C174 164 156 164 138 152 Z',
    ],
    accentPaths: [],
    eyePoints: [[146, 96, 7]],
    gillPath: 'M164 84 C176 96 176 116 162 128',
    mouthPath: 'M122 116 C130 120 140 120 148 116',
  },
  ray: {
    bodyPaths: [
      'M52 118 C102 54 172 38 226 56 C252 64 280 88 298 122 C312 150 332 164 356 170 C320 182 286 180 256 164 C236 154 216 148 190 148 C164 148 144 154 124 164 C90 182 54 182 22 170 C50 160 74 142 90 116 C76 122 62 124 52 118 Z',
    ],
    finPaths: ['M218 148 C244 160 260 184 252 210 C236 194 226 174 218 148 Z'],
    accentPaths: [
      'M118 110 C154 98 200 98 244 112',
      'M144 128 C176 120 206 122 232 132',
    ],
    eyePoints: [
      [156, 94, 5],
      [194, 94, 5],
    ],
    mouthPath: 'M162 132 C172 138 182 140 194 136',
  },
  shark: {
    bodyPaths: [
      'M42 116 C82 74 150 64 232 80 C254 56 284 40 314 42 C302 58 296 74 298 92 C322 94 344 104 360 116 C344 126 322 136 298 140 C294 164 300 182 310 196 C280 188 256 170 236 144 C152 156 82 148 42 116 Z',
    ],
    finPaths: [
      'M186 74 C198 40 214 26 236 20 C242 44 238 60 220 78 Z',
      'M184 142 C202 134 220 136 234 150 C212 158 196 158 184 142 Z',
    ],
    accentPaths: [
      'M112 92 C170 102 238 102 298 96',
      'M108 106 C178 116 250 118 310 110',
    ],
    eyePoints: [[112, 92, 5.5]],
    gillPath: 'M132 86 C142 96 142 112 132 122',
    mouthPath: 'M74 118 C88 118 96 116 110 112',
  },
  dolphin: {
    bodyPaths: [
      'M48 118 C88 64 158 56 228 78 C248 50 278 34 308 36 C294 56 290 70 294 88 C320 94 342 106 356 120 C338 128 316 136 292 138 C286 164 294 182 304 194 C274 186 252 168 234 144 C160 154 88 148 48 118 Z',
    ],
    finPaths: [
      'M176 82 C186 54 204 38 228 32 C232 56 224 72 204 88 Z',
      'M188 140 C208 132 226 136 240 150 C218 156 200 154 188 140 Z',
    ],
    accentPaths: [
      'M108 96 C168 108 232 110 292 104',
      'M104 110 C168 124 234 124 296 116',
    ],
    eyePoints: [[116, 94, 5.5]],
    gillPath: 'M134 88 C144 96 144 110 136 120',
    mouthPath: 'M78 120 C92 120 102 116 116 110',
  },
};

function createCombinedPath(paths: string[]) {
  const combined = new Path2D();

  for (const path of paths) {
    combined.addPath(new Path2D(path));
  }

  return combined;
}

function drawPatternOverlay(
  ctx: CanvasRenderingContext2D,
  species: string,
  bodyClip: Path2D,
) {
  ctx.save();
  ctx.clip(bodyClip);

  switch (species) {
    case '고등어':
    case '삼치':
    case '참치':
      ctx.strokeStyle = 'rgba(10, 20, 34, 0.18)';
      ctx.lineWidth = 6;
      for (let x = 120; x < 300; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 70);
        ctx.quadraticCurveTo(x + 12, 88, x - 2, 106);
        ctx.stroke();
      }
      break;
    case '연어':
    case '붕어':
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (let x = 132; x < 266; x += 26) {
        for (let y = 78; y < 146; y += 24) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    case '명태':
    case '대구':
      ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
      for (let index = 0; index < 10; index += 1) {
        ctx.beginPath();
        ctx.arc(138 + index * 16, 88 + (index % 2) * 22, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case '복어':
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
      ctx.lineWidth = 2;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 10) {
        ctx.beginPath();
        ctx.moveTo(188 + Math.cos(angle) * 50, 112 + Math.sin(angle) * 50);
        ctx.lineTo(188 + Math.cos(angle) * 67, 112 + Math.sin(angle) * 67);
        ctx.stroke();
      }
      break;
    case '가오리':
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      for (let index = 0; index < 18; index += 1) {
        ctx.beginPath();
        ctx.arc(
          116 + (index % 6) * 28,
          96 + Math.floor(index / 6) * 18,
          2.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      break;
    case '오징어':
    case '문어':
    case '해마':
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 2;
      for (let y = 76; y < 150; y += 16) {
        ctx.beginPath();
        ctx.moveTo(128, y);
        ctx.quadraticCurveTo(178, y + 8, 220, y);
        ctx.stroke();
      }
      break;
    default:
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2.2;
      for (let x = 132; x < 270; x += 26) {
        ctx.beginPath();
        ctx.moveTo(x, 80);
        ctx.quadraticCurveTo(x + 10, 108, x, 136);
        ctx.stroke();
      }
      break;
  }

  ctx.restore();
}

function drawEye(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  options?: FishRenderOptions,
) {
  const eyeScale = options?.eyeScale ?? BASE_EYE_SCALE;
  const bloodshot = options?.bloodshot ?? 0;
  const expandedRadius = radius * eyeScale;
  const redGreen = Math.round(254 - bloodshot * 18);
  const redBlue = Math.round(254 - bloodshot * 22);

  ctx.beginPath();
  ctx.fillStyle = `rgba(255, ${redGreen}, ${redBlue}, 0.98)`;
  ctx.arc(x, y, expandedRadius, 0, Math.PI * 2);
  ctx.fill();

  if (bloodshot > 0.01) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, expandedRadius, 0, Math.PI * 2);
    ctx.clip();

    const irritation = ctx.createRadialGradient(
      x - expandedRadius * 0.15,
      y - expandedRadius * 0.1,
      expandedRadius * 0.2,
      x,
      y,
      expandedRadius,
    );
    irritation.addColorStop(0, `rgba(255, 255, 255, ${0.08 * bloodshot})`);
    irritation.addColorStop(0.55, `rgba(255, 112, 112, ${0.16 * bloodshot})`);
    irritation.addColorStop(1, `rgba(150, 10, 10, ${0.26 * bloodshot})`);
    ctx.fillStyle = irritation;
    ctx.fillRect(
      x - expandedRadius,
      y - expandedRadius,
      expandedRadius * 2,
      expandedRadius * 2,
    );

    ctx.strokeStyle = `rgba(168, 20, 20, ${0.42 * bloodshot})`;
    ctx.lineWidth = Math.max(0.7, expandedRadius * 0.16);
    const veinOffsets = [-0.48, -0.18, 0.14, 0.42];
    for (const offset of veinOffsets) {
      ctx.beginPath();
      ctx.moveTo(x - expandedRadius * 0.94, y + expandedRadius * offset);
      ctx.quadraticCurveTo(
        x - expandedRadius * 0.32,
        y + expandedRadius * (offset - 0.24),
        x + expandedRadius * 0.18,
        y + expandedRadius * (offset + 0.08),
      );
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.beginPath();
  ctx.fillStyle = 'rgba(4, 10, 22, 0.92)';
  ctx.arc(x, y, expandedRadius * 0.42, 0, Math.PI * 2);
  ctx.fill();

  if (bloodshot > 0.01) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(128, 10, 10, ${0.38 * bloodshot})`;
    ctx.lineWidth = Math.max(1, expandedRadius * 0.16);
    ctx.arc(x, y, expandedRadius * 0.82, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.66)';
  ctx.arc(
    x - expandedRadius * 0.22,
    y - expandedRadius * 0.2,
    expandedRadius * 0.12,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}

export function drawFishIllustration(
  ctx: CanvasRenderingContext2D,
  species: string,
  colors: [string, string],
  width = ctx.canvas.width,
  height = ctx.canvas.height,
  options?: FishRenderOptions,
) {
  const archetype = ARCHETYPE_BY_SPECIES[species] ?? 'deep';
  const blueprint = BLUEPRINTS[archetype];
  const combinedFill = createCombinedPath([
    ...blueprint.bodyPaths,
    ...(blueprint.finPaths ?? []),
  ]);
  const bodyClip = createCombinedPath(blueprint.bodyPaths);

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.scale(width / FISH_CANVAS_WIDTH, height / FISH_CANVAS_HEIGHT);

  const bodyGradient = ctx.createLinearGradient(54, 38, 308, 184);
  bodyGradient.addColorStop(0, colors[0]);
  bodyGradient.addColorStop(0.55, colors[1]);
  bodyGradient.addColorStop(1, colors[0]);

  const finGradient = ctx.createLinearGradient(112, 42, 280, 172);
  finGradient.addColorStop(0, 'rgba(255, 255, 255, 0.26)');
  finGradient.addColorStop(0.35, colors[0]);
  finGradient.addColorStop(1, colors[1]);

  ctx.save();
  ctx.shadowColor = `${colors[0]}C0`;
  ctx.shadowBlur = 24;
  ctx.fillStyle = bodyGradient;
  for (const path of blueprint.bodyPaths) {
    ctx.fill(new Path2D(path));
  }
  ctx.restore();

  if (blueprint.finPaths) {
    ctx.save();
    ctx.fillStyle = finGradient;
    for (const path of blueprint.finPaths) {
      ctx.fill(new Path2D(path));
    }
    ctx.restore();
  }

  ctx.save();
  ctx.clip(combinedFill);
  const sheen = ctx.createLinearGradient(70, 40, 284, 168);
  sheen.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
  sheen.addColorStop(0.2, 'rgba(255, 255, 255, 0.22)');
  sheen.addColorStop(0.6, 'rgba(255, 255, 255, 0.04)');
  sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, FISH_CANVAS_WIDTH, FISH_CANVAS_HEIGHT);

  const backShade = ctx.createLinearGradient(0, 48, 0, 180);
  backShade.addColorStop(0, 'rgba(5, 12, 24, 0.04)');
  backShade.addColorStop(1, 'rgba(5, 12, 24, 0.18)');
  ctx.fillStyle = backShade;
  ctx.fillRect(0, 0, FISH_CANVAS_WIDTH, FISH_CANVAS_HEIGHT);
  ctx.restore();

  drawPatternOverlay(ctx, species, bodyClip);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 2.2;
  ctx.stroke(combinedFill);

  if (blueprint.gillPath) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 2.2;
    const gill = new Path2D(blueprint.gillPath);
    ctx.stroke(gill);
  }

  if (blueprint.mouthPath) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(7, 14, 24, 0.38)';
    ctx.lineWidth = 2;
    const mouth = new Path2D(blueprint.mouthPath);
    ctx.stroke(mouth);
  }

  if (blueprint.accentPaths) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.7;
    for (const accent of blueprint.accentPaths) {
      ctx.stroke(new Path2D(accent));
    }
  }

  for (const [x, y, radius] of blueprint.eyePoints) {
    drawEye(ctx, x, y, radius, options);
  }

  ctx.restore();
}
