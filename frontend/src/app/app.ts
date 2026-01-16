import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

interface Point {
  x: number;
  y: number;
}

interface Star {
  x: number;
  y: number;
  mass: number;
  radius: number;
}

interface Planet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  size: number;
  color: string;
  trail: Point[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationId: number | null = null;

  // canvas
  private readonly width = 1000;
  private readonly height = 900;

  private getPlanetColor(index: number, total: number): string {
    const hue = (index / total) * 360;
    return `hsl(${hue}, 80%, 60%)`;
  }

  // звёзды
  private readonly stars: Star[] = [
    { x: 500, y: 400, mass: 2000, radius: 10 },
    { x: 600, y: 550, mass: 2000, radius: 10 },
    { x: 800, y: 350, mass: 2000, radius: 10 }
  ];

  // планеты
  private readonly planets: Planet[] = Array.from({ length: 100 }, (_, i) => {
    const angle = (i / 100) * Math.PI * 2;
    const radius = 10 + (i % 5) * 15;

    const speed = 1.2 + (i % 7) * 0.05;

    return {
      x: 300 + Math.cos(angle) * radius,
      y: 550 + Math.sin(angle) * radius,
      vx: -Math.sin(angle) * speed,
      vy:  Math.cos(angle) * speed,
      mass: 1,
      size: 2,
      color: this.getPlanetColor(i, 100),
      trail: []
    };
  });

  // физика
  private readonly G = 0.5;
  private readonly subSteps = 16;
  private readonly maxTrailLength = 600;

  private readonly timeScale = 0.5;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.ctx = ctx;
    this.animate();
  }

  private animate = (): void => {
    const canvas = this.canvasRef.nativeElement;

    // фон
    this.ctx.fillStyle = '#040406';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // физика
    for (let i = 0; i < this.subSteps; i++) {
      this.integratePhysics();
    }

    // рендер
    this.drawTrails();
    this.drawStars();
    this.drawPlanets();

    this.animationId = requestAnimationFrame(this.animate);
  };

  // --- физика ---
  private integratePhysics(): void {
    for (const planet of this.planets) {

      let axTotal = 0;
      let ayTotal = 0;

      for (const star of this.stars) {
        const dx = star.x - planet.x;
        const dy = star.y - planet.y;

        let r2 = dx * dx + dy * dy;
        const minR2 = star.radius * star.radius;
        if (r2 < minR2) r2 = minR2;

        const r = Math.sqrt(r2);
        const a = this.G * star.mass / r2;

        axTotal += a * dx / r;
        ayTotal += a * dy / r;
      }

      const dt = this.timeScale / this.subSteps;

      planet.vx += axTotal * dt;
      planet.vy += ayTotal * dt;

      planet.x += planet.vx * dt;
      planet.y += planet.vy * dt;

      planet.trail.push({ x: planet.x, y: planet.y });
      if (planet.trail.length > this.maxTrailLength) {
        planet.trail.shift();
      }
    }
  }

  // --- отрисовка ---
  private drawTrails(): void {
    this.ctx.lineWidth = 1;

    for (const planet of this.planets) {
      const t = planet.trail;
      if (t.length < 2) continue;

      this.ctx.strokeStyle = planet.color;
      this.ctx.beginPath();
      this.ctx.moveTo(t[0].x, t[0].y);
      for (let i = 1; i < t.length; i++) {
        this.ctx.lineTo(t[i].x, t[i].y);
      }
      this.ctx.stroke();
    }
  }

  private drawStars(): void {
    this.ctx.fillStyle = 'yellow';
    for (const star of this.stars) {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawPlanets(): void {
    for (const planet of this.planets) {
      this.ctx.fillStyle = planet.color;
      this.ctx.fillRect(
        planet.x - planet.size / 2,
        planet.y - planet.size / 2,
        planet.size,
        planet.size
      );
    }
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
