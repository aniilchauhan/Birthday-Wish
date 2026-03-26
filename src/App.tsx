import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Music2, Volume2, VolumeX, ChevronDown, Play, Pause, Camera, Calendar, MessageCircle, Gift, MapPin, Share2, Edit3, X, Save, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Toaster, toast } from 'sonner';
import pako from 'pako';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { BIRTHDAY_CONFIG } from './constants';
import { cn } from './lib/utils';

// --- Utils ---

const encodeConfig = (config: any) => {
  try {
    const json = JSON.stringify(config);
    const compressed = pako.deflate(json);
    const base64 = btoa(String.fromCharCode.apply(null, Array.from(compressed)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return base64;
  } catch (e) {
    console.error('Encoding error:', e);
    return null;
  }
};

const decodeConfig = (base64: string) => {
  try {
    const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decompressed = pako.inflate(bytes, { to: 'string' });
    return JSON.parse(decompressed);
  } catch (e) {
    console.error('Decoding error:', e);
    return null;
  }
};

// --- Components ---

const Customizer = ({ config, onSave, onClose }: { config: any, onSave: (newConfig: any) => void, onClose: () => void }) => {
  const [formData, setFormData] = useState(config);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, subField: string, value: any) => {
    const newArray = [...formData[field]];
    newArray[index] = { ...newArray[index], [subField]: value };
    handleChange(field, newArray);
  };

  const addArrayItem = (field: string, defaultItem: any) => {
    handleChange(field, [...formData[field], defaultItem]);
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = formData[field].filter((_: any, i: number) => i !== index);
    handleChange(field, newArray);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-heading text-romantic-pink">Customize Your Surprise</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Heart size={18} className="text-romantic-pink" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Her Name</label>
                <input 
                  value={formData.GIRLFRIEND_NAME} 
                  onChange={(e) => handleChange('GIRLFRIEND_NAME', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Your Name</label>
                <input 
                  value={formData.YOUR_NAME} 
                  onChange={(e) => handleChange('YOUR_NAME', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Password to Unlock</label>
                <input 
                  value={formData.PASSWORD} 
                  onChange={(e) => handleChange('PASSWORD', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Birthday Date (ISO)</label>
                <input 
                  type="datetime-local"
                  value={formData.BIRTHDAY_DATE.slice(0, 16)} 
                  onChange={(e) => handleChange('BIRTHDAY_DATE', e.target.value + ':00')}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                />
              </div>
            </div>
          </div>

          {/* Love Letter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <MessageCircle size={18} className="text-romantic-pink" /> Love Letter
            </h3>
            <textarea 
              value={formData.LOVE_LETTER} 
              onChange={(e) => handleChange('LOVE_LETTER', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 rounded-2xl border focus:border-romantic-pink outline-none resize-none"
            />
          </div>

          {/* Photos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Camera size={18} className="text-romantic-pink" /> Photos
              </h3>
              <button 
                onClick={() => addArrayItem('PHOTOS', { url: 'https://picsum.photos/800/1000', caption: 'New Memory' })}
                className="text-xs font-bold text-romantic-pink flex items-center gap-1"
              >
                <Plus size={14} /> Add Photo
              </button>
            </div>
            <div className="space-y-3">
              {formData.PHOTOS.map((photo: any, i: number) => (
                <div key={i} className="flex gap-2 items-start bg-gray-50 p-3 rounded-2xl">
                  <div className="flex-1 space-y-2">
                    <input 
                      placeholder="Image URL"
                      value={photo.url} 
                      onChange={(e) => handleArrayChange('PHOTOS', i, 'url', e.target.value)}
                      className="w-full px-3 py-1 text-sm rounded-lg border outline-none"
                    />
                    <input 
                      placeholder="Caption"
                      value={photo.caption} 
                      onChange={(e) => handleArrayChange('PHOTOS', i, 'caption', e.target.value)}
                      className="w-full px-3 py-1 text-sm rounded-lg border outline-none"
                    />
                  </div>
                  <button onClick={() => removeArrayItem('PHOTOS', i)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Music size={18} className="text-romantic-pink" /> Music & Video
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Music URL (MP3)</label>
                <input 
                  value={formData.MUSIC_URL} 
                  onChange={(e) => handleChange('MUSIC_URL', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Video URL (YouTube Embed)</label>
                <input 
                  value={formData.VIDEO_URL} 
                  onChange={(e) => handleChange('VIDEO_URL', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                />
              </div>
            </div>
          </div>

          {/* Journey/Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Calendar size={18} className="text-romantic-pink" /> Our Journey
              </h3>
              <button 
                onClick={() => addArrayItem('TIMELINE', { date: 'New Date', event: 'New Event', description: 'Describe the moment...' })}
                className="text-xs font-bold text-romantic-pink flex items-center gap-1"
              >
                <Plus size={14} /> Add Event
              </button>
            </div>
            <div className="space-y-4">
              {formData.TIMELINE.map((item: any, i: number) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl space-y-3 relative group">
                  <button 
                    onClick={() => removeArrayItem('TIMELINE', i)} 
                    className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Date</label>
                      <input 
                        placeholder="e.g. June 12, 2023"
                        value={item.date} 
                        onChange={(e) => handleArrayChange('TIMELINE', i, 'date', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border outline-none focus:border-romantic-pink"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Event Title</label>
                      <input 
                        placeholder="e.g. First Meet"
                        value={item.event} 
                        onChange={(e) => handleArrayChange('TIMELINE', i, 'event', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border outline-none focus:border-romantic-pink"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Description</label>
                    <textarea 
                      placeholder="What happened?"
                      value={item.description} 
                      onChange={(e) => handleArrayChange('TIMELINE', i, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border outline-none focus:border-romantic-pink resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => onSave(formData)}
              className="w-full py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-bold shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Save size={20} /> Save & Apply
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WelcomeScreen = ({ onStart }: { onStart: (receiver: string, sender: string) => void }) => {
  const [receiver, setReceiver] = useState('');
  const [sender, setSender] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiver.trim() && sender.trim()) {
      onStart(receiver.trim(), sender.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-romantic-pink/20 to-romantic-purple/20 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-[2.5rem] w-full max-w-md mx-4 text-center shadow-2xl border border-white/50"
      >
        <div className="mb-6 relative inline-block">
          <div className="absolute inset-0 bg-romantic-pink/20 blur-2xl rounded-full animate-pulse" />
          <Heart className="w-16 h-16 text-romantic-pink relative z-10" fill="currentColor" />
        </div>
        <h2 className="text-3xl font-heading mb-2 text-gray-800">Create a Surprise</h2>
        <p className="text-sm text-gray-500 mb-8 italic">Let's start with some basic details ❤️</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-4 tracking-widest">Who is this for?</label>
            <input
              required
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="Her name (e.g. Sarah)"
              className="w-full px-6 py-3 rounded-full bg-white/50 border-2 border-romantic-pink/20 focus:border-romantic-pink outline-none transition-all"
            />
          </div>
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-4 tracking-widest">Your Name</label>
            <input
              required
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Your name (e.g. Anil)"
              className="w-full px-6 py-3 rounded-full bg-white/50 border-2 border-romantic-pink/20 focus:border-romantic-pink outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-bold shadow-xl hover:shadow-romantic-pink/50 transition-all active:scale-95 mt-4"
          >
            Start Creating ✨
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const PasswordLock = ({ password, onUnlock }: { password: string, onUnlock: () => void }) => {
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword.toLowerCase() === password.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-romantic-pink/20 to-romantic-purple/20 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-3xl w-full max-w-sm mx-4 text-center"
      >
        <Heart className="w-16 h-16 text-romantic-pink mx-auto mb-6 animate-pulse" fill="currentColor" />
        <h2 className="text-3xl font-heading mb-2 text-gray-800">Unlock My Heart</h2>
        <p className="text-sm text-gray-500 mb-6 italic">Hint: Your name ❤️</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Enter password..."
            className={cn(
              "w-full px-6 py-3 rounded-full bg-white/50 border-2 outline-none transition-all text-center",
              error ? "border-red-400" : "border-romantic-pink/30 focus:border-romantic-pink"
            )}
          />
          <button 
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-semibold shadow-lg hover:shadow-romantic-pink/50 transition-all active:scale-95"
          >
            Unlock
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const birthday = new Date(targetDate).getTime();
      const difference = birthday - now;

      if (difference <= 0) {
        clearInterval(timer);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff85a2', '#a78bfa', '#ffffff']
        });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="glass p-3 rounded-2xl text-center">
          <motion.div 
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-romantic-pink"
          >
            {value}
          </motion.div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500">{unit}</div>
        </div>
      ))}
    </div>
  );
};

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="whitespace-pre-wrap leading-relaxed text-lg italic text-gray-700">
      {displayedText}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-6 bg-romantic-pink ml-1 align-middle"
      />
    </div>
  );
};

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: '110%', 
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: '-10%',
            x: (Math.random() * 100 - 50) + '%',
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute text-romantic-pink/20"
        >
          <Heart fill="currentColor" size={Math.random() * 30 + 20} />
        </motion.div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [config, setConfig] = useState(BIRTHDAY_CONFIG);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSParam, setHasSParam] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('s');
    if (data) {
      setHasSParam(true);
      const decoded = decodeConfig(data);
      if (decoded) {
        setConfig(decoded);
      }
    }
  }, []);

  const handleStart = (receiver: string, sender: string) => {
    const newConfig = {
      ...config,
      GIRLFRIEND_NAME: receiver,
      YOUR_NAME: sender,
      PASSWORD: receiver, // Default password is her name
      LOVE_LETTER: config.LOVE_LETTER.replace(/Sarah/g, receiver).replace(/Anil/g, sender)
    };
    setConfig(newConfig);
    setIsUnlocked(true);
    toast.success(`Welcome! Now you can customize the surprise for ${receiver}. ❤️`);
  };

  const handleSurprise = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff85a2', '#a78bfa', '#ffd700']
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleShare = async () => {
    const encoded = encodeConfig(config);
    const shareUrl = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
    
    const shareData = {
      title: 'A Special Surprise ❤️',
      text: `I made this special birthday website for ${config.GIRLFRIEND_NAME}! Check it out!`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Unique link copied! ❤️');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleSaveConfig = (newConfig: any) => {
    setConfig(newConfig);
    setIsCustomizing(false);
    toast.success('Surprise updated! Now click Share to get your link. ❤️');
  };

  if (!isUnlocked) {
    if (!hasSParam) {
      return <WelcomeScreen onStart={handleStart} />;
    }
    return <PasswordLock password={config.PASSWORD} onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Toaster position="bottom-center" richColors />
      <FloatingHearts />
      
      {/* Background Music */}
      <audio ref={audioRef} src={config.MUSIC_URL} loop />
      
      <div className="fixed top-6 right-6 z-40 flex gap-3">
        <button 
          onClick={() => setIsCustomizing(true)}
          className="glass p-3 rounded-full text-romantic-pink shadow-lg active:scale-90 transition-all"
          title="Customize Surprise"
        >
          <Edit3 size={24} />
        </button>
        <button 
          onClick={toggleMusic}
          className="glass p-3 rounded-full text-romantic-pink shadow-lg active:scale-90 transition-all"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isCustomizing && (
          <Customizer 
            config={config} 
            onSave={handleSaveConfig} 
            onClose={() => setIsCustomizing(false)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-6 inline-block"
          >
            <Heart size={64} className="text-romantic-pink" fill="currentColor" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-heading text-gradient mb-4">
            Happy Birthday {config.GIRLFRIEND_NAME}!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto italic">
            "This is something special just for you, my love..."
          </p>
          
          <Countdown targetDate={config.BIRTHDAY_DATE} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="mt-12 flex items-center gap-2 text-romantic-pink font-medium animate-bounce"
          >
            Tap to Begin <ChevronDown size={20} />
          </motion.button>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fff5f7]" />
      </section>

      {/* Love Letter Section */}
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <MessageCircle size={100} />
          </div>
          <h2 className="text-3xl font-heading text-romantic-pink mb-8 border-b border-romantic-pink/20 pb-4">
            A Letter for You
          </h2>
          <TypingText text={config.LOVE_LETTER} />
        </motion.div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center text-romantic-pink mb-12">Our Beautiful Memories</h2>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full max-w-4xl py-12"
          >
            {config.PHOTOS.map((photo: any, i: number) => (
              <SwiperSlide key={i} className="w-[300px] h-[400px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl group">
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white text-sm italic">{photo.caption}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-heading text-center text-romantic-pink mb-16">Our Journey Together</h2>
        <div className="max-w-lg mx-auto space-y-12">
          {config.TIMELINE.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex gap-6 items-start"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-romantic-pink text-white flex items-center justify-center shadow-lg">
                  <Calendar size={20} />
                </div>
                {i !== config.TIMELINE.length - 1 && (
                  <div className="w-0.5 h-24 bg-romantic-pink/20 mt-2" />
                )}
              </div>
              <div className="glass p-6 rounded-2xl flex-1">
                <span className="text-xs font-bold text-romantic-purple uppercase tracking-widest">{item.date}</span>
                <h3 className="text-xl font-bold text-gray-800 mt-1">{item.event}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reasons Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-romantic-pink/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center text-romantic-pink mb-12">Reasons Why I Love You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {config.REASONS_TO_LOVE.map((reason: any, i: number) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-3xl text-center hover:bg-white/60 transition-colors"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <p className="text-gray-700 font-medium italic">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-heading text-center text-romantic-pink mb-12">A Special Memory</h2>
          <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl glass p-2">
            <iframe
              className="w-full h-full rounded-2xl"
              src={config.VIDEO_URL}
              title="Romantic Memory"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Fun Section */}
      <section className="py-20 text-center px-6">
        <div className="glass p-12 rounded-[3rem] max-w-xl mx-auto relative overflow-hidden">
          <h2 className="text-3xl font-heading text-romantic-pink mb-8">Quick Question...</h2>
          <p className="text-2xl font-bold text-gray-800 mb-12">Do you love me? 🥺</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                confetti({ particleCount: 200, spread: 100 });
                alert("I KNEW IT! I LOVE YOU TOO! ❤️❤️❤️");
              }}
              className="px-10 py-4 rounded-full bg-romantic-pink text-white font-bold shadow-xl"
            >
              YES!
            </motion.button>
            
            <motion.button
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              className="px-10 py-4 rounded-full bg-gray-200 text-gray-500 font-bold"
            >
              No
            </motion.button>
          </div>
        </div>
      </section>

      {/* Surprise Section */}
      <section className="py-20 text-center">
        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSurprise}
          className="group relative inline-block"
        >
          <div className="absolute -inset-4 bg-romantic-pink/20 rounded-full blur-xl group-hover:bg-romantic-pink/40 transition-all" />
          <div className="glass p-10 rounded-full relative">
            <Gift size={64} className="text-romantic-pink" />
          </div>
          <p className="mt-6 font-heading text-2xl text-romantic-pink">Click for Surprise 🎁</p>
        </motion.button>
      </section>

      {/* Final Note */}
      <section className="py-40 text-center px-6 bg-gradient-to-t from-romantic-pink/20 to-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-heading text-romantic-pink mb-8">To the most beautiful girl...</h2>
          <p className="text-xl text-gray-600 italic mb-12 max-w-2xl mx-auto">
            "You are the best thing that ever happened to me. I promise to love you, cherish you, and make you smile every single day."
          </p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-5xl md:text-7xl font-heading text-romantic-pink"
          >
            I Love You Forever ❤️
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 text-sm">
        <div className="flex flex-col items-center justify-center gap-4 mb-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-romantic-pink text-white font-medium shadow-lg hover:shadow-romantic-pink/50 transition-all"
          >
            <Share2 size={18} /> Share this Surprise
          </motion.button>
          
          <div className="flex items-center gap-2">
            Made with <Heart size={14} className="text-romantic-pink animate-pulse" fill="currentColor" /> by {config.YOUR_NAME}
          </div>
        </div>
        <p>© 2026 • For My One and Only</p>
      </footer>
    </div>
  );
}
