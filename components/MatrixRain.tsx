import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

const GLYPHS =
  "日アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ETHBNB$ΞϾ=*+-<>¦｜XZ:・.";

const SPECIAL_WORDS = ["DEGEN"] as const;
/** Minimum time between new special-word column spawns. */
const WORD_SPAWN_INTERVAL_MS = 150;

type SpecialWord = (typeof SPECIAL_WORDS)[number];

type Column = {
  drop: number;
  wordActive: SpecialWord | null;
  wordIndex: number;
};

/**
 * A subtle, GPU-friendly "digital rain" canvas rendered behind the app. It is
 * purely decorative and is hidden from assistive tech.
 */
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const fontSize = 16;
    let columns: Column[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Allow an immediate first spawn once the effect starts.
    let lastWordSpawn = -WORD_SPAWN_INTERVAL_MS;

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const columnCount = Math.ceil(window.innerWidth / fontSize);
      columns = Array.from({ length: columnCount }, () => ({
        drop: Math.floor((Math.random() * window.innerHeight) / fontSize),
        wordActive: null,
        wordIndex: 0,
      }));
    };

    const startWordColumn = (column: Column, word: SpecialWord) => {
      column.wordActive = word;
      column.wordIndex = 0;
      column.drop = Math.floor((Math.random() * window.innerHeight) / fontSize);
    };

    const trySpawnWord = () => {
      const now = performance.now();
      if (now - lastWordSpawn < WORD_SPAWN_INTERVAL_MS) return;

      const candidates = columns.filter((column) => column.wordActive === null);
      if (candidates.length === 0) return;

      const word =
        SPECIAL_WORDS[Math.floor(Math.random() * SPECIAL_WORDS.length)];
      const column = candidates[Math.floor(Math.random() * candidates.length)];
      startWordColumn(column, word);
      lastWordSpawn = now;
    };

    const draw = () => {
      trySpawnWord();

      // Translucent black fade leaves trailing streaks.
      ctx.fillStyle = "rgba(3, 7, 4, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        let char: string;
        let isWordChar = false;

        if (column.wordActive && column.wordIndex < column.wordActive.length) {
          char = column.wordActive[column.wordIndex];
          column.wordIndex++;
          isWordChar = true;
          if (column.wordIndex >= column.wordActive.length) {
            column.wordActive = null;
          }
        } else {
          char = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
        }

        const x = i * fontSize;
        const y = column.drop * fontSize;

        // Special-word letters stay bright so the word stays readable in the trail.
        const isHead = Math.random() > 0.975;
        ctx.fillStyle = isWordChar ? "#d8ffd8" : isHead ? "#caffd0" : "#16c43a";
        ctx.shadowColor = "#00ff41";
        ctx.shadowBlur = isWordChar || isHead ? 12 : 0;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (
          column.wordActive === null &&
          y > window.innerHeight &&
          Math.random() > 0.975
        ) {
          column.drop = 0;
        }
        column.drop++;
      }
    };

    let raf = 0;
    let last = 0;
    const frameInterval = 1000 / 24;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < frameInterval) return;
      last = now;
      draw();
    };

    setup();
    if (prefersReducedMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        "&::after": {
          // Vignette + scanline wash for a polished, less-flat look.
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,255,65,0.10), transparent 55%)," +
            "radial-gradient(ellipse at 50% 120%, rgba(0,0,0,0.85), transparent 60%)",
        },
      }}
    >
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{ display: "block", opacity: 0.35 }}
      />
    </Box>
  );
};

export default MatrixRain;
