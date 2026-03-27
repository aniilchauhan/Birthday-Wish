import { Heart, Stars, Scroll, Layout, Palmtree, Trees, Zap, Flower2, Sunrise, Snowflake } from 'lucide-react';

export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Romance',
    icon: Heart,
    tag: 'Romantic',
    description: 'Soft pinks, elegant serifs, and floating hearts. Perfect for a traditional romantic surprise.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Bounce", CARDS: "Zoom" },
      THEME: { primary: "#ff6b6b", secondary: "#f06292", accent: "#ff8e8e", background: "#fff5f5", text: "#4a4a4a" },
      LAYOUT: "classic",
      CONFETTI: { particleCount: 150, spread: 70, colors: ["#ff6b6b", "#f06292", "#ffffff"], density: 1 }
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Starlight',
    icon: Stars,
    tag: 'Magical',
    description: 'Deep blues and gold with twinkling celestial vibes. Ideal for a magical, starry night feel.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Fade", HERO_SUBTITLE: "SlideDown", SECTIONS: "Fade", BUTTONS: "Zoom", CARDS: "Rotate" },
      THEME: { primary: "#f1c40f", secondary: "#f39c12", accent: "#e67e22", background: "#2c3e50", text: "#ecf0f1" },
      LAYOUT: "editorial",
      CONFETTI: { particleCount: 200, spread: 100, colors: ["#f1c40f", "#f39c12", "#ffffff", "#2c3e50"], density: 1.5 }
    }
  },
  {
    id: 'vintage',
    name: 'Vintage Scrapbook',
    icon: Scroll,
    tag: 'Artistic',
    description: 'Beige tones, typewriter fonts, and paper textures. Feels like a hand-crafted memory book.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Skew", HERO_SUBTITLE: "Fade", SECTIONS: "SlideRight", BUTTONS: "Flip", CARDS: "Skew" },
      THEME: { primary: "#8d6e63", secondary: "#a1887f", accent: "#bcaaa4", background: "#efebe9", text: "#3e2723" },
      LAYOUT: "scrapbook",
      CONFETTI: { particleCount: 100, spread: 50, colors: ["#8d6e63", "#a1887f", "#bcaaa4"], density: 0.8 }
    }
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    icon: Layout,
    tag: 'Clean',
    description: 'Clean whites, bold typography, and subtle motion. For a sophisticated and contemporary look.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideLeft", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Fade", CARDS: "SlideUp" },
      THEME: { primary: "#2d3436", secondary: "#636e72", accent: "#b2bec3", background: "#dfe6e9", text: "#2d3436" },
      LAYOUT: "minimal",
      CONFETTI: { particleCount: 80, spread: 40, colors: ["#2d3436", "#636e72", "#ffffff"], density: 0.5 }
    }
  },
  {
    id: 'tropical',
    name: 'Tropical Paradise',
    icon: Palmtree,
    tag: 'Vibrant',
    description: 'Vibrant teals and oranges with a playful feel. Great for summer birthdays or beach lovers.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Bounce", HERO_SUBTITLE: "SlideRight", SECTIONS: "Bounce", BUTTONS: "Rotate", CARDS: "Bounce" },
      THEME: { primary: "#00b894", secondary: "#00cec9", accent: "#fab1a0", background: "#e8f8f5", text: "#2d3436" },
      LAYOUT: "split",
      CONFETTI: { particleCount: 250, spread: 120, colors: ["#00b894", "#00cec9", "#fab1a0", "#ffffff"], density: 2 }
    }
  },
  {
    id: 'enchanted',
    name: 'Enchanted Forest',
    icon: Trees,
    tag: 'Nature',
    description: 'Deep greens and earth tones for a whimsical touch. Evokes a sense of mystery and nature.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Zoom", CARDS: "Rotate" },
      THEME: { primary: "#27ae60", secondary: "#2ecc71", accent: "#d35400", background: "#f1f8e9", text: "#1b5e20" },
      LAYOUT: "classic",
      CONFETTI: { particleCount: 150, spread: 80, colors: ["#27ae60", "#2ecc71", "#d35400"], density: 1.2 }
    }
  },
  {
    id: 'retro',
    name: 'Retro Pop',
    icon: Zap,
    tag: 'Energetic',
    description: 'Neon colors and high-energy geometric shapes. A fun, 80s-inspired celebration style.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Skew", HERO_SUBTITLE: "Bounce", SECTIONS: "Flip", BUTTONS: "Skew", CARDS: "Flip" },
      THEME: { primary: "#e84393", secondary: "#fd79a8", accent: "#0984e3", background: "#f9f1f7", text: "#2d3436" },
      LAYOUT: "bento",
      CONFETTI: { particleCount: 300, spread: 150, colors: ["#e84393", "#fd79a8", "#0984e3", "#ffffff"], density: 2.5 }
    }
  },
  {
    id: 'lavender',
    name: 'Lavender Dream',
    icon: Flower2,
    tag: 'Dreamy',
    description: 'Soft purples and airy fonts for a peaceful mood. Calm, serene, and deeply romantic.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Fade", HERO_SUBTITLE: "Fade", SECTIONS: "Fade", BUTTONS: "Fade", CARDS: "Fade" },
      THEME: { primary: "#9b59b6", secondary: "#a29bfe", accent: "#d63031", background: "#f3e5f5", text: "#4a148c" },
      LAYOUT: "minimal",
      CONFETTI: { particleCount: 120, spread: 60, colors: ["#9b59b6", "#a29bfe", "#ffffff"], density: 0.9 }
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    icon: Sunrise,
    tag: 'Warm',
    description: 'Warm oranges and reds with glowing effects. Captures the beauty of a romantic evening.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideDown", HERO_SUBTITLE: "SlideUp", SECTIONS: "SlideUp", BUTTONS: "Zoom", CARDS: "Zoom" },
      THEME: { primary: "#e67e22", secondary: "#d35400", accent: "#c0392b", background: "#fff3e0", text: "#5d4037" },
      LAYOUT: "editorial",
      CONFETTI: { particleCount: 180, spread: 90, colors: ["#e67e22", "#d35400", "#c0392b", "#ffffff"], density: 1.3 }
    }
  },
  {
    id: 'winter',
    name: 'Winter Wonderland',
    icon: Snowflake,
    tag: 'Cool',
    description: 'Crisp blues and whites with elegant lines. Cool, fresh, and sparkling like fresh snow.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideDown", HERO_SUBTITLE: "Fade", SECTIONS: "SlideDown", BUTTONS: "Bounce", CARDS: "SlideDown" },
      THEME: { primary: "#3498db", secondary: "#2980b9", accent: "#ecf0f1", background: "#e3f2fd", text: "#0d47a1" },
      LAYOUT: "split",
      CONFETTI: { particleCount: 200, spread: 100, colors: ["#3498db", "#2980b9", "#ecf0f1", "#ffffff"], density: 1.4 }
    }
  },
  {
    id: 'golden',
    name: 'Golden Hour',
    icon: Sunrise,
    tag: 'Luxury',
    description: 'Luxurious golds and ambers that capture the warmth of a perfect sunset.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Zoom", CARDS: "Zoom" },
      THEME: { primary: "#d4af37", secondary: "#f1c40f", accent: "#ffffff", background: "#1a1a1a", text: "#ffffff" },
      LAYOUT: "modern-split",
      CONFETTI: { particleCount: 250, spread: 80, colors: ["#d4af37", "#f1c40f", "#ffffff"], density: 2 }
    }
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    icon: Zap,
    tag: 'Celestial',
    description: 'Ethereal greens and deep violets inspired by the northern lights.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Fade", HERO_SUBTITLE: "SlideLeft", SECTIONS: "Fade", BUTTONS: "Rotate", CARDS: "Fade" },
      THEME: { primary: "#2ecc71", secondary: "#9b59b6", accent: "#1abc9c", background: "#0c0d16", text: "#ffffff" },
      LAYOUT: "editorial",
      CONFETTI: { particleCount: 300, spread: 180, colors: ["#2ecc71", "#9b59b6", "#1abc9c"], density: 2.5 }
    }
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    icon: Flower2,
    tag: 'Elegant',
    description: 'Soft pinks and creams for a delicate, spring-themed celebration.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Bounce", CARDS: "Bounce" },
      THEME: { primary: "#ffb7c5", secondary: "#ff8da1", accent: "#ffffff", background: "#fff5f6", text: "#4a4a4a" },
      LAYOUT: "love-stats",
      CONFETTI: { particleCount: 150, spread: 90, colors: ["#ffb7c5", "#ff8da1", "#ffffff"], density: 1.2 }
    }
  },
  {
    id: 'cyberpunk',
    name: 'Neon Nights',
    icon: Zap,
    tag: 'Futuristic',
    description: 'High-energy neon pinks and electric blues for a bold, futuristic surprise.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Skew", HERO_SUBTITLE: "Bounce", SECTIONS: "Flip", BUTTONS: "Skew", CARDS: "Flip" },
      THEME: { primary: "#ff00ff", secondary: "#00ffff", accent: "#ffff00", background: "#050510", text: "#ffffff" },
      LAYOUT: "bento",
      CONFETTI: { particleCount: 400, spread: 160, colors: ["#ff00ff", "#00ffff", "#ffff00"], density: 3 }
    }
  },
  {
    id: 'parisian',
    name: 'Parisian Café',
    icon: Scroll,
    tag: 'Sophisticated',
    description: 'Neutral creams, blacks, and elegant typography for a sophisticated vibe.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Fade", CARDS: "Fade" },
      THEME: { primary: "#1a1a1a", secondary: "#c0392b", accent: "#f3e5ab", background: "#f8f1e7", text: "#1a1a1a" },
      LAYOUT: "minimal",
      CONFETTI: { particleCount: 80, spread: 40, colors: ["#1a1a1a", "#c0392b", "#f3e5ab"], density: 0.6 }
    }
  },
  {
    id: 'garden',
    name: 'Garden Party',
    icon: Trees,
    tag: 'Whimsical',
    description: 'Whimsical pastels and floral accents inspired by a sunny afternoon outdoors.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Rotate", CARDS: "Bounce" },
      THEME: { primary: "#77dd77", secondary: "#fdfd96", accent: "#ff6961", background: "#fdfcf0", text: "#2e7d32" },
      LAYOUT: "classic",
      CONFETTI: { particleCount: 180, spread: 100, colors: ["#77dd77", "#fdfd96", "#ff6961"], density: 1.5 }
    }
  },
  {
    id: 'ruby',
    name: 'Ruby Romance',
    icon: Heart,
    tag: 'Passion',
    description: 'Passionate deep reds and velvety blacks for an intense, romantic feel.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Bounce", CARDS: "Zoom" },
      THEME: { primary: "#c0392b", secondary: "#8e44ad", accent: "#000000", background: "#0a0a0a", text: "#ffffff" },
      LAYOUT: "editorial",
      CONFETTI: { particleCount: 220, spread: 80, colors: ["#c0392b", "#8e44ad", "#000000"], density: 1.8 }
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    icon: Palmtree,
    tag: 'Refreshing',
    description: 'Refreshing teals and deep sea blues for a calm, relaxing surprise.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Fade", HERO_SUBTITLE: "SlideRight", SECTIONS: "Fade", BUTTONS: "Zoom", CARDS: "SlideRight" },
      THEME: { primary: "#008080", secondary: "#20b2aa", accent: "#e0ffff", background: "#f0ffff", text: "#004040" },
      LAYOUT: "split",
      CONFETTI: { particleCount: 150, spread: 110, colors: ["#008080", "#20b2aa", "#ffffff"], density: 1.1 }
    }
  },
  {
    id: 'mint',
    name: 'Minty Fresh',
    icon: Snowflake,
    tag: 'Clean',
    description: 'Cool mint greens and whites for a clean and crisp aesthetic.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Bounce", CARDS: "Zoom" },
      THEME: { primary: "#a8e6cf", secondary: "#dcedc1", accent: "#ffffff", background: "#f1f8e9", text: "#2e7d32" },
      LAYOUT: "minimal",
      CONFETTI: { particleCount: 120, spread: 70, colors: ["#a8e6cf", "#dcedc1", "#ffffff"], density: 1 }
    }
  },
  {
    id: 'sakura',
    name: 'Sakura Night',
    icon: Flower2,
    tag: 'Mystic',
    description: 'Deep blacks and vibrant cherry pinks for a striking nocturnal floral theme.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Fade", HERO_SUBTITLE: "SlideUp", SECTIONS: "Fade", BUTTONS: "Zoom", CARDS: "Zoom" },
      THEME: { primary: "#ff69b4", secondary: "#000000", accent: "#ff1493", background: "#1a1a1a", text: "#ffffff" },
      LAYOUT: "editorial",
      CONFETTI: { particleCount: 200, spread: 90, colors: ["#ff69b4", "#ffffff", "#000000"], density: 1.5 }
    }
  },
  {
    id: 'deep-sea',
    name: 'Deep Sea Mystery',
    icon: Palmtree,
    tag: 'Biolume',
    description: 'Dark teals and neon greens inspired by the glowing life in the deep ocean.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideLeft", HERO_SUBTITLE: "Fade", SECTIONS: "SlideLeft", BUTTONS: "Rotate", CARDS: "SlideRight" },
      THEME: { primary: "#00f5ff", secondary: "#008080", accent: "#000000", background: "#001a1a", text: "#ffffff" },
      LAYOUT: "bento",
      CONFETTI: { particleCount: 180, spread: 110, colors: ["#00f5ff", "#008080", "#000000"], density: 1.4 }
    }
  },
  {
    id: 'candy',
    name: 'Candy Shop',
    icon: Zap,
    tag: 'Playful',
    description: 'A sugar-rush of pastel rainbows and high-energy animations.',
    config: {
      ANIMATIONS: { HERO_TITLE: "Bounce", HERO_SUBTITLE: "Bounce", SECTIONS: "Bounce", BUTTONS: "Bounce", CARDS: "Bounce" },
      THEME: { primary: "#ff9ff3", secondary: "#feca57", accent: "#ff6b6b", background: "#fff5f5", text: "#2d3436" },
      LAYOUT: "classic",
      CONFETTI: { particleCount: 350, spread: 180, colors: ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb"], density: 3 }
    }
  },
  {
    id: 'royal',
    name: 'Royal Velvet',
    icon: Stars,
    tag: 'Majestic',
    description: 'Regal purples and shimmering golds for a celebration fit for royalty.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideUp", HERO_SUBTITLE: "Fade", SECTIONS: "SlideUp", BUTTONS: "Zoom", CARDS: "Zoom" },
      THEME: { primary: "#fdcb6e", secondary: "#6c5ce7", accent: "#ffffff", background: "#2d3436", text: "#ffffff" },
      LAYOUT: "modern-split",
      CONFETTI: { particleCount: 220, spread: 80, colors: ["#fdcb6e", "#6c5ce7", "#ffffff"], density: 1.8 }
    }
  },
  {
    id: 'loft',
    name: 'Modern Loft',
    icon: Layout,
    tag: 'Industrial',
    description: 'Muted greys, copper accents, and structured layouts for a mature, urban feel.',
    config: {
      ANIMATIONS: { HERO_TITLE: "SlideDown", HERO_SUBTITLE: "Fade", SECTIONS: "SlideDown", BUTTONS: "Fade", CARDS: "Fade" },
      THEME: { primary: "#d35400", secondary: "#7f8c8d", accent: "#2c3e50", background: "#ecf0f1", text: "#2c3e50" },
      LAYOUT: "minimal",
      CONFETTI: { particleCount: 60, spread: 30, colors: ["#d35400", "#7f8c8d", "#ffffff"], density: 0.4 }
    }
  }
];
