import { Heart, Stars, Scroll, Layout, Palmtree, Trees, Zap, Flower2, Sunrise, Snowflake } from 'lucide-react';

export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Romance',
    icon: Heart,
    description: 'Soft pinks, elegant serifs, and floating hearts.',
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
      }
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Starlight',
    icon: Stars,
    description: 'Deep blues and gold with twinkling celestial vibes.',
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
      }
    }
  },
  {
    id: 'vintage',
    name: 'Vintage Scrapbook',
    icon: Scroll,
    description: 'Beige tones, typewriter fonts, and paper textures.',
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
      }
    }
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    icon: Layout,
    description: 'Clean whites, bold typography, and subtle motion.',
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
      }
    }
  },
  {
    id: 'tropical',
    name: 'Tropical Paradise',
    icon: Palmtree,
    description: 'Vibrant teals and oranges with a playful feel.',
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
      }
    }
  },
  {
    id: 'enchanted',
    name: 'Enchanted Forest',
    icon: Trees,
    description: 'Deep greens and earth tones for a whimsical touch.',
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
      }
    }
  },
  {
    id: 'retro',
    name: 'Retro Pop',
    icon: Zap,
    description: 'Neon colors and high-energy geometric shapes.',
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
      }
    }
  },
  {
    id: 'lavender',
    name: 'Lavender Dream',
    icon: Flower2,
    description: 'Soft purples and airy fonts for a peaceful mood.',
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
      }
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    icon: Sunrise,
    description: 'Warm oranges and reds with glowing effects.',
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
      }
    }
  },
  {
    id: 'winter',
    name: 'Winter Wonderland',
    icon: Snowflake,
    description: 'Crisp blues and whites with elegant lines.',
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
      }
    }
  }
];
