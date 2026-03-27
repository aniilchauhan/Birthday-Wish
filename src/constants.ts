/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const EVENT_TYPES = [
  { id: 'birthday', label: 'Birthday', titlePrefix: 'Happy Birthday', icon: '🎂' },
  { id: 'anniversary', label: 'Anniversary', labelFull: 'Happy Anniversary', titlePrefix: 'Happy Anniversary', icon: '💑' },
  { id: 'graduation', label: 'Graduation', labelFull: 'Congratulations on Your Graduation', titlePrefix: 'Congratulations', icon: '🎓' },
  { id: 'proposal', label: 'Proposal', labelFull: 'A Special Question', titlePrefix: 'Will You Marry Me?', icon: '💍' },
  { id: 'promotion', label: 'Promotion', labelFull: 'Congrats on Your Promotion', titlePrefix: 'Congratulations', icon: '🚀' },
  { id: 'other', label: 'Other Special Event', labelFull: 'A Special Celebration', titlePrefix: 'Celebrating', icon: '✨' }
];

export const BIRTHDAY_CONFIG = {
  EVENT_TYPE: "birthday",
  GIRLFRIEND_NAME: "Tanvi", // Change this to her name
  PASSWORD: "Tanvi", // The password to unlock the site
  PASSWORD_HINT: "Think of your own name 💭", // Hint shown on password screen
  BIRTHDAY_DATE: "2026-04-15T00:00:00", // YYYY-MM-DDTHH:mm:ss
  YOUR_NAME: "Anil",

  // Feature: Scheduled Reveal / Time-Lock
  SCHEDULED_REVEAL: {
    enabled: false,
    revealAt: "2026-04-15T00:00:00", // Exact datetime to unlock
    lockMessage: "Something special is waiting for you... 🎁",
    lockSubMessage: "It will be revealed on your birthday!"
  },

  LOVE_LETTER: `My Dearest Sarah,

From the moment I first saw you, I knew my life would never be the same. Your smile lights up my darkest days, and your kindness makes me want to be a better man.

Every moment spent with you is a treasure I hold close to my heart. On this special day, I want you to know how much you mean to me. You are my best friend, my soulmate, and my everything.

Happy Birthday, my love. May your day be as beautiful and radiant as you are.

Forever Yours,
Anil`,

  // Feature: Multiple Surprise Envelopes
  SURPRISE_ENVELOPES: [
    { emoji: "💌", title: "The Day We Met", message: "I remember the exact moment I first saw you. My heart skipped a beat and I knew you were someone special." },
    { emoji: "🌹", title: "What I Love About You", message: "Everything. Your laugh, your kindness, the way you light up a room without even trying." },
    { emoji: "🌟", title: "My Promise To You", message: "I promise to always be there for you, to make you laugh, and to love you more every single day." }
  ],

  REASONS_TO_LOVE: [
    { icon: "😊", text: "Your infectious smile that brightens my world." },
    { icon: "💕", text: "The way you care for everyone around you." },
    { icon: "💖", text: "You complete me in ways I never thought possible." },
    { icon: "✨", text: "Your intelligence and the way you challenge me." },
    { icon: "🌹", text: "Your grace and elegance in everything you do." },
    { icon: "💬", text: "Our late-night conversations that never seem to end." }
  ],

  TIMELINE: [
    { date: "June 12, 2023", event: "First Meet ❤️", description: "The day our eyes first met at the coffee shop." },
    { date: "June 15, 2023", event: "First Chat 💬", description: "We talked for hours and didn't even notice the time." },
    { date: "July 01, 2023", event: "First Date 🌹", description: "A beautiful dinner under the stars." },
    { date: "August 20, 2023", event: "Special Memories ✨", description: "Our first trip together to the beach." }
  ],

  PHOTOS: [
    { url: "https://picsum.photos/seed/love1/800/1000", caption: "Our first photo together" },
    { url: "https://picsum.photos/seed/love2/800/1000", caption: "That beautiful sunset" },
    { url: "https://picsum.photos/seed/love3/800/1000", caption: "Laughing at nothing" },
    { url: "https://picsum.photos/seed/love4/800/1000", caption: "A quiet moment" },
    { url: "https://picsum.photos/seed/love5/800/1000", caption: "You look stunning here" },
    { url: "https://picsum.photos/seed/love6/800/1000", caption: "Forever memories" }
  ],

  HERO_IMAGE: "https://picsum.photos/seed/romantic/1920/1080",
  GIRLFRIEND_PHOTO: "https://picsum.photos/seed/girl/400/400",
  STATS: {
    DAYS_TOGETHER: 365,
    DAYS_SINCE_MET: 400, // Total days since first meeting
    PHOTOS_SHARED: 1240,
    DATE_NIGHTS: 52,
    LOVE_SCORE: 100,
    FIRST_MET_DATE: "2023-06-12" // YYYY-MM-DD format
  },

  MUSIC_URL: "https://cdn.pixabay.com/audio/2022/10/24/audio_dc39b1a5aa.mp3", // Free Happy Birthday MP3 (Pixabay CDN)
  SONG_NAME: "Happy Birthday To You 🎂",
  SONG_ARTIST: "Pixabay Free Audio",
  VIDEO_URL: "https://www.youtube.com/embed/OkpIoEC44kk", // Tenu Sang Rakhna - Jigra | Arijit Singh

  // Feature: Wish List / Gift Ideas
  WISH_LIST: [
    { emoji: "💐", item: "A bouquet of her favourite flowers", gifted: false },
    { emoji: "🍫", item: "Belgian chocolates", gifted: true },
    { emoji: "📖", item: "Her favourite book", gifted: false },
    { emoji: "💍", item: "A surprise she won't expect", gifted: false }
  ],

  // Feature: Star Map
  STAR_MAP: {
    show: false,
    date: "2023-06-12", // Date of first meeting
    location: "Mumbai, India",
    title: "The Sky When We Met",
    description: "This is how the stars aligned the night we first met."
  },

  // Feature: Guestbook
  GUESTBOOK: {
    enabled: true,
    title: "Leave Me a Message 💌",
    placeholder: "Write something sweet here..."
  },

  MAP_CONFIG: {
    show: false,
    title: "Our Special Place",
    location: "Central Park, New York",
    description: "The place where we first met and our journey began."
  },

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
  FONT_FAMILY: "'Playfair Display', serif", // Custom font
  LAYOUT: "classic", // Options: classic, minimal, editorial, split, modern-split, love-stats, bento, love-stats
  
  // Advanced Design Options
  DESIGN: {
    floatingObject: "heart", // heart, star, music, sparkle, petal, snow
    glassIntensity: 0.1, // 0 to 1
    borderRadius: "1.5rem", // '0' to '3rem'
    fontFamily: 'Inter',
    bgStyle: 'gradient',
    bgSubStyle: 'soft-romantic',
    buttonStyle: 'pill', // pill, rounded, square, outline
    animationIntensity: 'normal', // subtle, normal, energetic
    cursorTrail: true,
    particleType: 'hearts',
    particleSpeed: 'medium',
    confettiDensity: 1.5,
  },

  // Section Visibility Toggles
  SECTIONS: {
    stats: true,
    timeline: true,
    map: false,
    starMap: false,
    reasons: true,
    video: true,
    envelopes: true,
    polaroid: true,
    wishlist: false,
    guestbook: false,
    daysSince: true,
    candles: true,
  },

  CONFETTI: {
    particleCount: 150,
    spread: 70,
    colors: ["#ff6b6b", "#f06292", "#ffffff"],
    density: 1
  }
};

export const ANIMATION_PRESETS = {
  Fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  },
  SlideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  SlideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  SlideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  SlideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  Zoom: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  Rotate: {
    initial: { opacity: 0, rotate: -180, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    transition: { duration: 1, ease: "easeOut" }
  },
  Bounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 260, damping: 20 }
  },
  Flip: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  Skew: {
    initial: { opacity: 0, skewX: -20, x: -50 },
    animate: { opacity: 1, skewX: 0, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  StaggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  StaggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
};
