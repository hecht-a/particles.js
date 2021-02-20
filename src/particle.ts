// import * as fs from 'fs/promises';
import { Config } from './interfaces/Config'
import { Color, Rgb } from './interfaces/config_interfaces/particles/interfaces/Color';
import { ParticlesData } from './interfaces/ParticlesData';

interface Position {
  x: number,
  y: number
}

interface Canvas {
  canvas?: HTMLCanvasElement,
  ctx?: CanvasRenderingContext2D
}

function hexToRgb(hex: string): Rgb {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }
      : {
        r: 255,
        g: 255,
        b: 255
    };
}

class Particlejs {
  tagId: string;
  canvasClass: string;
  configPath: string;
  config: Promise<Config>;
  canvas!: Canvas;
  particles: Array<ParticlesData>;

  async init(){
    await this.initCanvas();
    this.setStyle();
    await this.particlesCreate();
    await this.particle(await this.config, { rgb: { r: 255, g: 255, b: 255 }, value: "#12feff" }, 1)
    await this.draw();
    console.log(this.particles)
  }

  constructor(tagId: string, configPath: string) {
    this.tagId = tagId;
    this.canvasClass = "particles-js-canvas-el";
    this.configPath = configPath;
    this.config = this.getConfig();
    this.canvas = {};
    this.particles = [];
  }

  async getConfig(): Promise<Config> {
    const res: Response = await fetch(this.configPath)
    const result: Config = await res.json()
    return result
  }

  async setStyle() {
    const pjsTag = document.getElementById(this.tagId);
    const config = await this.config;
    const divBgColor = config.divStyle.bgColor ? config.divStyle.bgColor : "red";
    const divBgImage = config.divStyle.bgImage ? config.divStyle.bgImage : "";
    const divBgSize = config.divStyle.bgSize ? config.divStyle.bgSize : "100%";
    pjsTag!.style.backgroundColor = divBgColor;
    pjsTag!.style.backgroundImage = `url(${divBgImage})`;
    pjsTag!.style.backgroundSize = divBgSize;
  }

  async initCanvas() {
    if (!this.tagId) {
      this.tagId = "particle-js"
    }
    const config = await this.config

    const pjsTag = document.getElementById(this.tagId),
      pjsCanvasEl = document.getElementsByClassName(this.canvasClass);
      
    if (pjsCanvasEl) {
      while (pjsCanvasEl.length > 0) {
        pjsTag?.removeChild(pjsCanvasEl[0]);
      }
    }

    const canvasEl = document.createElement('canvas');
    canvasEl.className = this.canvasClass;

    const canvas = pjsTag!.appendChild(canvasEl);
    canvas!.style.width = "100%";
    canvas!.style.height = "100%";

    const canvasCtx = canvas!.getContext("2d");

    if (config && config.interactivity.events.resize) {
      window.addEventListener('resize', () => {
        this.canvas.canvas!.width = window.pageXOffset;
        this.canvas.canvas!.height = window.pageYOffset;
      })
    }
    this.canvas.canvas = canvas;
    this.canvas.ctx = canvasCtx as CanvasRenderingContext2D;
    console.log(this.canvas)
  }

  particlesEmpty() {
    this.particles = [];
  }

  async particlesCreate() {
    const config = await this.config
    for (let i = 0; i < config.particles.number.value; i++) {
      this.particles.push(await this.particle(config, config.particles.color, config.particles.opacity.value));
    }
  }

  async particle(config: Config, color: Color | string, _opacity: number, position?: Position): Promise<ParticlesData> {
    console.log(config)
    const particlesData: ParticlesData = {
      "color": {
        "value": "#fff0ff",
        "rgb": {
          "r": 255,
          "g": 255,
          "b": 255
        }
      },
      "opacity": 0,
      "radius": config.particles.size.random ? Math.random() : 1,
      "shape": "circle",
      "vx": 0,
      "vx_i": 0,
      "vy": 0,
      "vy_i": 0,
      "x": 0,
      "y": 0
    };
    
    if (config.particles.size.anim.enable) {
     particlesData.sizeStatus = false;
     particlesData.vs = config.particles.size.anim.speed / 100;
     if (!config.particles.size.anim.sync) {
        particlesData.vs *= Math.random();
      }
    }

    particlesData.x = position?.x ?? Math.random() * this.canvas.canvas!.width;
    particlesData.y = position?.y ?? Math.random() * this.canvas.canvas!.height;

    if (particlesData.x > this.canvas.canvas!.width - particlesData.radius * 2) {
      particlesData.x -= particlesData.radius;
    }
    else if (particlesData.x < particlesData.radius * 2) {
      particlesData.x += particlesData.radius;
    }
    
    if (particlesData.y > this.canvas.canvas!.height - particlesData.radius * 2) {
      particlesData.y -= particlesData.radius;
    }
    else if (particlesData.y > this.canvas.canvas!.height) {
      particlesData.y += particlesData.radius;
    }

    color = color as Color;

    if (color.value === 'random') {
      (particlesData.color as Color).rgb = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      };
    }
    else if (typeof color.value === 'string') {
      particlesData.color = color;
      (particlesData.color as Color).rgb = hexToRgb(color.value);
    }

    particlesData.opacity = (
      config.particles.opacity.random
        ? Math.random()
        : 1
    ) * config.particles.opacity.value;

    if (config.particles.opacity.anim.enable) {
      particlesData.opacityStatus = false;
      particlesData.vo = config.particles.opacity.anim.speed / 100;
      if (!config.particles.opacity.anim.sync) {
        particlesData.vo *= Math.random();
      }
    }

    const velbase = { x: 0, y: 0 };

    switch (config.particles.move.direction) {
      case 'top':
        velbase.x = 0;
        velbase.y = -1;
        break;
      case 'top-right':
        velbase.x = 0.5;
        velbase.y = -0.5;
        break;
      case 'right':
        velbase.x = 1;
        velbase.y = 0;
        break;
      case 'bottom-right':
        velbase.x = 0.5;
        velbase.y = 0.5;
        break;
      case 'bottom':
        velbase.x = 0;
        velbase.y = 1;
        break;
      case 'bottom-left':
        velbase.x = -0.5;
        velbase.y = 1;
        break;
      case 'left':
        velbase.x = -1;
        velbase.y = 0;
        break;
      case 'top-left':
        velbase.x = -0.5;
        velbase.y = -0.5;
        break;
      default:
        velbase.x = 0;
        velbase.y = 0;
        break;
    }

    if (config.particles.move.straight) {
      particlesData.vx = velbase.x;
      particlesData.vy = velbase.y;
      if (config.particles.move.random) {
        particlesData.vx *= Math.random();
        particlesData.vy *= Math.random();
      }
    } else {
        particlesData.vx = velbase.x + Math.random() - 0.5;
        particlesData.vy = velbase.y + Math.random() - 0.5;
    }

    particlesData.vx_i = particlesData.vx;
    particlesData.vy_i = particlesData.vy;

    return particlesData;
  }

  async draw() {
    const canvas = this.canvas.ctx;
    this.particles.forEach(async (conf) => {
      const color = conf.color as Color
      const colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${conf.opacity})`;
      console.log(colorValue)
      canvas!.fillStyle = colorValue;
      canvas!.beginPath();
      canvas!.arc(conf.x, conf.y, 1, 0, Math.PI * 2, false);
      canvas!.closePath()
      canvas!.fill();
    });
  }
}

const particles = new Particlejs("particles-js", "../../assets/particules.json");
particles.init();