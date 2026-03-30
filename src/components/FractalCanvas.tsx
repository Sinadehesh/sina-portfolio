import { useEffect, useRef } from "react";

export default function FractalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Sacred geometry nodes ---
    const NODE_COUNT = 7;
    const nodes: { x: number; y: number; phase: number; speed: number }[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      nodes.push({
        x: 0.5 + 0.28 * Math.cos(angle),
        y: 0.5 + 0.28 * Math.sin(angle),
        phase: angle,
        speed: 0.0004 + i * 0.00005,
      });
    }

    const getPos = (node: typeof nodes[0]) => ({
      x: (0.5 + 0.28 * Math.cos(node.phase + t * node.speed * 1000)) * canvas.width,
      y: (0.5 + 0.28 * Math.sin(node.phase + t * node.speed * 1000)) * canvas.height,
    });

    // --- Fractal spiral helper ---
    function drawSpiral(
      cx: number, cy: number,
      radius: number, turns: number,
      color: string, alpha: number
    ) {
      ctx!.beginPath();
      for (let a = 0; a < turns * Math.PI * 2; a += 0.05) {
        const r = (radius * a) / (turns * Math.PI * 2);
        const x = cx + r * Math.cos(a + t * 0.3);
        const y = cy + r * Math.sin(a + t * 0.3);
        if (a === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = color;
      ctx!.globalAlpha = alpha;
      ctx!.lineWidth = 0.6;
      ctx!.stroke();
      ctx!.globalAlpha = 1;
    }

    function drawMandala(cx: number, cy: number, r: number, petals: number) {
      for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2 + t * 0.08;
        const bx = cx + r * Math.cos(angle);
        const by = cy + r * Math.sin(angle);
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.quadraticCurveTo(
          cx + (r * 0.6) * Math.cos(angle + 0.4),
          cy + (r * 0.6) * Math.sin(angle + 0.4),
          bx, by
        );
        ctx!.quadraticCurveTo(
          cx + (r * 0.6) * Math.cos(angle - 0.4),
          cy + (r * 0.6) * Math.sin(angle - 0.4),
          cx, cy
        );
        const isDark = document.documentElement.classList.contains("dark");
        ctx!.strokeStyle = isDark
          ? `hsla(${260 + p * 15}, 60%, 70%, 0.12)`
          : `hsla(${260 + p * 15}, 50%, 40%, 0.08)`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
      }
    }

    function drawPolygon(cx: number, cy: number, r: number, sides: number, rot: number, color: string, alpha: number) {
      ctx!.beginPath();
      for (let i = 0; i <= sides; i++) {
        const a = (i / sides) * Math.PI * 2 + rot;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = color;
      ctx!.globalAlpha = alpha;
      ctx!.lineWidth = 0.7;
      ctx!.stroke();
      ctx!.globalAlpha = 1;
    }

    const draw = (timestamp: number) => {
      t = timestamp / 1000;
      const w = canvas.width;
      const h = canvas.height;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);

      // --- Background bloom ---
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, minDim * 0.55);
      if (isDark) {
        bloom.addColorStop(0, "rgba(120, 100, 200, 0.06)");
        bloom.addColorStop(0.5, "rgba(80, 60, 160, 0.03)");
        bloom.addColorStop(1, "transparent");
      } else {
        bloom.addColorStop(0, "rgba(120, 100, 200, 0.04)");
        bloom.addColorStop(1, "transparent");
      }
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      // --- Mandala center ---
      drawMandala(cx, cy, minDim * 0.18, 12);
      drawMandala(cx, cy, minDim * 0.10, 8);

      // --- Concentric rotating polygons ---
      for (let i = 3; i <= 8; i++) {
        const r = minDim * (0.06 + i * 0.025);
        const rot = t * (i % 2 === 0 ? 0.04 : -0.035) + (i * Math.PI) / i;
        const alpha = isDark ? 0.08 : 0.05;
        const hue = 240 + i * 18;
        drawPolygon(cx, cy, r, i, rot, `hsl(${hue}, 60%, ${isDark ? 70 : 45}%)`, alpha);
      }

      // --- Flower of Life rings ---
      const fol_r = minDim * 0.22;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t * 0.025;
        const nx = cx + fol_r * Math.cos(a);
        const ny = cy + fol_r * Math.sin(a);
        drawPolygon(nx, ny, fol_r * 0.22, 6, t * 0.02, isDark ? "rgba(180,160,255,0.06)" : "rgba(100,80,200,0.04)", 1);
      }

      // --- Sacred geometry node web ---
      const positions = nodes.map(getPos);
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = minDim * 0.4;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.12 : 0.07);
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.strokeStyle = isDark ? `rgba(160,140,255,${alpha})` : `rgba(100,80,200,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // --- Spiral arms ---
      drawSpiral(cx, cy, minDim * 0.35, 3, isDark ? "rgba(160,130,255,1)" : "rgba(120,100,200,1)", isDark ? 0.07 : 0.04);
      drawSpiral(cx, cy, minDim * 0.35, 3, isDark ? "rgba(200,160,255,1)" : "rgba(150,120,220,1)", isDark ? 0.04 : 0.025);

      // --- Node dots ---
      for (const pos of positions) {
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 6);
        grd.addColorStop(0, isDark ? "rgba(200,180,255,0.5)" : "rgba(120,100,200,0.3)");
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(220,200,255,0.6)" : "rgba(100,80,200,0.4)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
