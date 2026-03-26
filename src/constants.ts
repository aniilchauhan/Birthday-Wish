/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BIRTHDAY_CONFIG = {
  GIRLFRIEND_NAME: "Sarah", // Change this to her name
  PASSWORD: "Sarah", // The password to unlock the site
  BIRTHDAY_DATE: "2026-04-15T00:00:00", // YYYY-MM-DDTHH:mm:ss
  YOUR_NAME: "Anil",
  
  LOVE_LETTER: `My Dearest Sarah,

From the moment I first saw you, I knew my life would never be the same. Your smile lights up my darkest days, and your kindness makes me want to be a better man.

Every moment spent with you is a treasure I hold close to my heart. On this special day, I want you to know how much you mean to me. You are my best friend, my soulmate, and my everything.

Happy Birthday, my love. May your day be as beautiful and radiant as you are.

Forever Yours,
Anil`,

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

  MUSIC_URL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Replace with a real romantic instrumental URL
  VIDEO_URL: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your memory video
  
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
  }
};
