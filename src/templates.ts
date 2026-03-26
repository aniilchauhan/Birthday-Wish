import { Heart, Stars, Scroll, Layout, Palmtree, Trees, Zap, Flower2, Sunrise, Snowflake } from 'lucide-react';

export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Romance',
    icon: Heart,
    description: 'Soft pinks, elegant serifs, and floating hearts. Perfect for a traditional romantic surprise.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "SlideUp",
        HERO_SUBTITLE: "Fade",
        SECTIONS: "SlideUp",
        BUTTONS: "Bounce",
        CARDS: "Zoom"
      },
      THEME: {
        primary: "#ff6b6b",
        secondary: "#f06292",
        accent: "#ff8e8e",
        background: "#fff5f5",
        text: "#4a4a4a"
      },
      LAYOUT: "classic",
      CONFETTI: {
        particleCount: 150,
        spread: 70,
        colors: ["#ff6b6b", "#f06292", "#ffffff"],
        density: 1
      }
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Starlight',
    icon: Stars,
    description: 'Deep blues and gold with twinkling celestial vibes. Ideal for a magical, starry night feel.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "Fade",
        HERO_SUBTITLE: "SlideDown",
        SECTIONS: "Fade",
        BUTTONS: "Zoom",
        CARDS: "Rotate"
      },
      THEME: {
        primary: "#f1c40f",
        secondary: "#f39c12",
        accent: "#e67e22",
        background: "#2c3e50",
        text: "#ecf0f1"
      },
      LAYOUT: "editorial",
      CONFETTI: {
        particleCount: 200,
        spread: 100,
        colors: ["#f1c40f", "#f39c12", "#ffffff", "#2c3e50"],
        density: 1.5
      }
    }
  },
  {
    id: 'vintage',
    name: 'Vintage Scrapbook',
    icon: Scroll,
    description: 'Beige tones, typewriter fonts, and paper textures. Feels like a hand-crafted memory book.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "Skew",
        HERO_SUBTITLE: "Fade",
        SECTIONS: "SlideRight",
        BUTTONS: "Flip",
        CARDS: "Skew"
      },
      THEME: {
        primary: "#8d6e63",
        secondary: "#a1887f",
        accent: "#bcaaa4",
        background: "#efebe9",
        text: "#3e2723"
      },
      LAYOUT: "scrapbook",
      CONFETTI: {
        particleCount: 100,
        spread: 50,
        colors: ["#8d6e63", "#a1887f", "#bcaaa4"],
        density: 0.8
      }
    }
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    icon: Layout,
    description: 'Clean whites, bold typography, and subtle motion. For a sophisticated and contemporary look.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "SlideLeft",
        HERO_SUBTITLE: "Fade",
        SECTIONS: "SlideUp",
        BUTTONS: "Fade",
        CARDS: "SlideUp"
      },
      THEME: {
        primary: "#2d3436",
        secondary: "#636e72",
        accent: "#b2bec3",
        background: "#dfe6e9",
        text: "#2d3436"
      },
      LAYOUT: "minimal",
      CONFETTI: {
        particleCount: 80,
        spread: 40,
        colors: ["#2d3436", "#636e72", "#ffffff"],
        density: 0.5
      }
    }
  },
  {
    id: 'tropical',
    name: 'Tropical Paradise',
    icon: Palmtree,
    description: 'Vibrant teals and oranges with a playful feel. Great for summer birthdays or beach lovers.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "Bounce",
        HERO_SUBTITLE: "SlideRight",
        SECTIONS: "Bounce",
        BUTTONS: "Rotate",
        CARDS: "Bounce"
      },
      THEME: {
        primary: "#00b894",
        secondary: "#00cec9",
        accent: "#fab1a0",
        background: "#e8f8f5",
        text: "#2d3436"
      },
      LAYOUT: "split",
      CONFETTI: {
        particleCount: 250,
        spread: 120,
        colors: ["#00b894", "#00cec9", "#fab1a0", "#ffffff"],
        density: 2
      }
    }
  },
  {
    id: 'enchanted',
    name: 'Enchanted Forest',
    icon: Trees,
    description: 'Deep greens and earth tones for a whimsical touch. Evokes a sense of mystery and nature.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "SlideUp",
        HERO_SUBTITLE: "Fade",
        SECTIONS: "SlideUp",
        BUTTONS: "Zoom",
        CARDS: "Rotate"
      },
      THEME: {
        primary: "#27ae60",
        secondary: "#2ecc71",
        accent: "#d35400",
        background: "#f1f8e9",
        text: "#1b5e20"
      },
      LAYOUT: "classic",
      CONFETTI: {
        particleCount: 150,
        spread: 80,
        colors: ["#27ae60", "#2ecc71", "#d35400"],
        density: 1.2
      }
    }
  },
  {
    id: 'retro',
    name: 'Retro Pop',
    icon: Zap,
    description: 'Neon colors and high-energy geometric shapes. A fun, 80s-inspired celebration style.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "Skew",
        HERO_SUBTITLE: "Bounce",
        SECTIONS: "Flip",
        BUTTONS: "Skew",
        CARDS: "Flip"
      },
      THEME: {
        primary: "#e84393",
        secondary: "#fd79a8",
        accent: "#0984e3",
        background: "#f9f1f7",
        text: "#2d3436"
      },
      LAYOUT: "bento",
      CONFETTI: {
        particleCount: 300,
        spread: 150,
        colors: ["#e84393", "#fd79a8", "#0984e3", "#ffffff"],
        density: 2.5
      }
    }
  },
  {
    id: 'lavender',
    name: 'Lavender Dream',
    icon: Flower2,
    description: 'Soft purples and airy fonts for a peaceful mood. Calm, serene, and deeply romantic.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "Fade",
        HERO_SUBTITLE: "Fade",
        SECTIONS: "Fade",
        BUTTONS: "Fade",
        CARDS: "Fade"
      },
      THEME: {
        primary: "#9b59b6",
        secondary: "#a29bfe",
        accent: "#d63031",
        background: "#f3e5f5",
        text: "#4a148c"
      },
      LAYOUT: "minimal",
      CONFETTI: {
        particleCount: 120,
        spread: 60,
        colors: ["#9b59b6", "#a29bfe", "#ffffff"],
        density: 0.9
      }
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    icon: Sunrise,
    description: 'Warm oranges and reds with glowing effects. Captures the beauty of a romantic evening.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "SlideDown",
        HERO_SUBTITLE: "SlideUp",
        SECTIONS: "SlideUp",
        BUTTONS: "Zoom",
        CARDS: "Zoom"
      },
      THEME: {
        primary: "#e67e22",
        secondary: "#d35400",
        accent: "#c0392b",
        background: "#fff3e0",
        text: "#5d4037"
      },
      LAYOUT: "editorial",
      CONFETTI: {
        particleCount: 180,
        spread: 90,
        colors: ["#e67e22", "#d35400", "#c0392b", "#ffffff"],
        density: 1.3
      }
    }
  },
  {
    id: 'winter',
    name: 'Winter Wonderland',
    icon: Snowflake,
    description: 'Crisp blues and whites with elegant lines. Cool, fresh, and sparkling like fresh snow.',
    config: {
      ANIMATIONS: {
        HERO_TITLE: "SlideDown",
        HERO_SUBTITLE: "Fade",
        SECTIONS: "SlideDown",
        BUTTONS: "Bounce",
        CARDS: "SlideDown"
      },
      THEME: {
        primary: "#3498db",
        secondary: "#2980b9",
        accent: "#ecf0f1",
        background: "#e3f2fd",
        text: "#0d47a1"
      },
      LAYOUT: "split",
      CONFETTI: {
        particleCount: 200,
        spread: 100,
        colors: ["#3498db", "#2980b9", "#ecf0f1", "#ffffff"],
        density: 1.4
      }
    }
  }
];
