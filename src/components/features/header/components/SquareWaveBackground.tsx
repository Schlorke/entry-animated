"use client";

import { useEffect, useRef } from "react";

import styles from "../styles/header.module.css";

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 vUv;

  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uPointer;

  varying vec2 vUv;

  #define MAX_STEPS 72
  #define MAX_DIST 28.0
  #define SURF_EPS 0.0025

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float sdRoundBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
  }

  float blockHeight(vec2 id) {
    float seedA = hash12(id);
    float seedB = hash12(id + 19.17);
    float seedC = hash12(id + 41.73);
    float phase = seedA * 6.2831853;
    float speed = mix(0.48, 1.02, seedB);
    float secondarySpeed = mix(0.28, 0.62, seedC);
    float primary = sin(uTime * speed + phase);
    float secondary = sin(uTime * secondarySpeed + seedC * 6.2831853) * 0.28;
    float motion = smoothstep(-0.95, 0.95, primary + secondary);
    float amplitude = mix(0.62, 1.0, hash12(id + 73.11));

    return mix(0.22, 0.96, clamp(motion * amplitude, 0.0, 1.0));
  }

  float blockDistance(vec3 p, vec2 id, float cell) {
    vec2 local = p.xz - id * cell;
    float height = blockHeight(id);
    float radius = 0.07 + hash12(id) * 0.015;
    vec3 boxPoint = vec3(local.x, p.y - height * 0.5, local.y);

    return sdRoundBox(boxPoint, vec3(1.045, height * 0.5, 1.045), radius);
  }

  float mapScene(vec3 p) {
    p.xz = rotate2d(0.705398) * p.xz;
    p.x -= 0.72;
    p.z -= 0.85;

    float cell = 2.06;
    vec2 baseId = floor((p.xz + cell * 0.5) / cell);
    float sceneDistance = 999.0;

    for (int x = -1; x <= 1; x++) {
      for (int y = -1; y <= 1; y++) {
        vec2 id = baseId + vec2(float(x), float(y));
        sceneDistance = min(sceneDistance, blockDistance(p, id, cell));
      }
    }

    return sceneDistance;
  }

  float rayMarch(vec3 rayOrigin, vec3 rayDirection) {
    float distanceOrigin = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 position = rayOrigin + rayDirection * distanceOrigin;
      float sceneDistance = mapScene(position);
      distanceOrigin += sceneDistance * 0.72;

      if (distanceOrigin > MAX_DIST || abs(sceneDistance) < SURF_EPS) {
        break;
      }
    }

    return distanceOrigin;
  }

  vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.0025, 0.0);
    float d = mapScene(p);
    return normalize(d - vec3(
      mapScene(p - e.xyy),
      mapScene(p - e.yxy),
      mapScene(p - e.yyx)
    ));
  }

  float softShadow(vec3 rayOrigin, vec3 rayDirection) {
    float result = 1.0;
    float travel = 0.04;

    for (int i = 0; i < 20; i++) {
      float height = mapScene(rayOrigin + rayDirection * travel);
      result = min(result, 12.0 * height / travel);
      travel += clamp(height, 0.05, 0.28);

      if (result < 0.05 || travel > 8.0) {
        break;
      }
    }

    return clamp(result, 0.0, 1.0);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
    vec2 pointer = (uPointer - 0.5) * 2.0;
    uv.y -= 0.08;

    vec3 rayOrigin = vec3(-2.95 + pointer.x * 0.34, 4.15 + pointer.y * 0.1, 3.62);
    vec3 target = vec3(-0.4 + pointer.x * 0.14, -0.62, -0.28);

    vec3 forward = normalize(target - rayOrigin);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
    vec3 up = cross(forward, right);
    vec3 rayDirection = normalize(uv.x * right + uv.y * up + 1.42 * forward);

    float distanceOrigin = rayMarch(rayOrigin, rayDirection);
    vec3 backgroundColor = vec3(1.0);
    vec3 color = backgroundColor;
    float hitAmount = 0.0;

    if (distanceOrigin < MAX_DIST) {
      hitAmount = 1.0;
      vec3 position = rayOrigin + rayDirection * distanceOrigin;
      vec3 normal = getNormal(position);
      vec3 lightDirection = normalize(vec3(-0.55, 1.24, 0.3));
      vec3 overheadDirection = normalize(vec3(-0.08, 1.0, -0.06));
      vec3 halfVector = normalize(lightDirection - rayDirection);
      vec3 overheadHalfVector = normalize(overheadDirection - rayDirection);

      float diffuse = max(dot(normal, lightDirection), 0.0);
      float overheadDiffuse = max(dot(normal, overheadDirection), 0.0);
      float shadow = softShadow(position + normal * 0.025, lightDirection);
      float specular = pow(max(dot(normal, halfVector), 0.0), 48.0);
      float overheadSpecular = pow(max(dot(normal, overheadHalfVector), 0.0), 32.0);
      float rim = pow(1.0 - max(dot(normal, -rayDirection), 0.0), 2.35);
      float topLight = smoothstep(-0.2, 0.92, normal.y);
      vec2 overheadOffset = (position.xz - vec2(-1.28, -0.68)) * vec2(0.2, 0.16);
      float overheadPool = exp(-dot(overheadOffset, overheadOffset));
      float topBeam = overheadPool * topLight * overheadDiffuse;
      float broadReflection = pow(max(dot(normal, overheadHalfVector), 0.0), 14.0) * topLight;
      float edgeGlint = pow(1.0 - abs(normal.y), 2.35) * (0.78 + topLight * 0.42);

      vec3 base = mix(
        vec3(0.153, 0.212, 0.514),
        vec3(0.184, 0.345, 0.643),
        clamp(topLight + topBeam * 0.34, 0.0, 1.0)
      );
      color = base;
      color += diffuse * shadow * vec3(0.04, 0.1, 0.2);
      color += topBeam * vec3(0.16, 0.3, 0.48);
      color += broadReflection * overheadPool * vec3(0.1, 0.18, 0.3);
      color += specular * vec3(0.36, 0.5, 0.72);
      color += overheadSpecular * overheadPool * vec3(0.52, 0.68, 0.86);
      color += rim * vec3(0.04, 0.12, 0.26);
      color += edgeGlint * vec3(0.08, 0.2, 0.36);
    }

    float vignette = smoothstep(1.58, 0.18, length(uv - vec2(-0.05, 0.02)));
    float centerFade = smoothstep(0.04, 1.04, length(uv - vec2(-0.14, -0.18)));
    color = mix(color, color * mix(0.72, 0.96, vignette) * mix(0.82, 0.98, centerFade), hitAmount);
    color = mix(backgroundColor, color, hitAmount);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const FULLSCREEN_TRIANGLE_STRIP = new Float32Array([
  -1, -1, 1, -1, -1, 1, 1, 1,
]);

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER_SOURCE,
  );

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function getWebGlContext(canvas: HTMLCanvasElement) {
  try {
    return (
      (canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        depth: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
        stencil: false,
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl", {
        alpha: false,
        antialias: true,
        depth: false,
        preserveDrawingBuffer: false,
        stencil: false,
      }) as WebGLRenderingContext | null)
    );
  } catch {
    return null;
  }
}

export function SquareWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    if (navigator.userAgent.toLowerCase().includes("jsdom")) {
      return undefined;
    }

    const gl = getWebGlContext(canvas);

    if (!gl) {
      return undefined;
    }

    const program = createProgram(gl);

    if (!program) {
      return undefined;
    }

    const positionBuffer = gl.createBuffer();

    if (!positionBuffer) {
      gl.deleteProgram(program);
      return undefined;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const pointerLocation = gl.getUniformLocation(program, "uPointer");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;
    let startTime = performance.now();
    let currentPointerX = 0.5;
    let currentPointerY = 0.5;
    let targetPointerX = 0.5;
    let targetPointerY = 0.5;

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, FULLSCREEN_TRIANGLE_STRIP, gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = Math.max(1, Math.floor(bounds.width * ratio));
      const height = Math.max(1, Math.floor(bounds.height * ratio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    const updatePointer = (event: PointerEvent) => {
      targetPointerX = event.clientX / Math.max(window.innerWidth, 1);
      targetPointerY = event.clientY / Math.max(window.innerHeight, 1);
    };

    const render = (time: number) => {
      resize();
      currentPointerX += (targetPointerX - currentPointerX) * 0.05;
      currentPointerY += (targetPointerY - currentPointerY) * 0.05;

      gl.useProgram(program);

      if (resolutionLocation) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }

      if (timeLocation) {
        gl.uniform1f(timeLocation, (time - startTime) * 0.001);
      }

      if (pointerLocation) {
        gl.uniform2f(pointerLocation, currentPointerX, currentPointerY);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const observer =
      "ResizeObserver" in window ? new ResizeObserver(resize) : null;

    observer?.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });

    if (reducedMotion) {
      startTime -= 4200;
      render(startTime);
    } else {
      animationFrame = window.requestAnimationFrame(render);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      observer?.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={styles.backgroundEffect}
      data-background="square-wave"
      data-background-engine="webgl"
    >
      <canvas ref={canvasRef} className={styles.squareWaveCanvas} />
    </div>
  );
}
