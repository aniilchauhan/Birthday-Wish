import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Heart, Music, Music2, Volume2, VolumeX, ChevronDown, Play, Pause, Camera, Calendar, MessageCircle, Gift, MapPin, Share2, Edit3, X, Save, Plus, Trash2, Download, FileText, Video, FileCode, Layout, Zap, Type, Bold, Italic, Upload, Stars, Sparkles, Smile, Eye, EyeOff, Sliders, Palette, MousePointer2, Brush, CloudSnow, Scissors, Mail, User, Info, Lock, ChevronLeft, ChevronRight, Clock, RefreshCw, Send, Image, Maximize2, Pointer, Square, Check, Copy, Link, QrCode } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Toaster, toast } from 'sonner';
import pako from 'pako';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { BIRTHDAY_CONFIG, ANIMATION_PRESETS, EVENT_TYPES } from './constants';
import { TEMPLATES } from './templates';
import { cn } from './lib/utils';
import ThemeGalleryModal from './components/ThemeGalleryModal';
import Balloons from './components/Balloons';

type AnimationKey = keyof typeof ANIMATION_PRESETS;

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

const CursorTrail = ({ config }: { config: any }) => {
  const [particles, setParticles] = useState<any[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!config.DESIGN?.cursorTrail) {
      setParticles([]);
      return;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
      if (dist < 40) return;

      lastPos.current = { x: e.clientX, y: e.clientY };

      const id = Math.random();
      const p = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
        color: config.THEME.primary
      };

      setParticles(prev => [...prev.slice(-30), p]);
      setTimeout(() => {
        setParticles(prev => prev.filter(item => item.id !== id));
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [config.DESIGN?.cursorTrail, config.THEME.primary]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1001] overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 1, rotate: p.rotation }}
            animate={{ scale: 1.5, opacity: 0, y: -50, rotate: p.rotation + 90 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'fixed',
              left: p.x,
              top: p.y,
              color: p.color,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
          >
            <Heart size={p.size} fill="currentColor" className="drop-shadow-lg" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Customizer = ({ config, onSave, onClose, onDownloadHTML, onDownloadPDF, onDownloadStory, onEnterCinematicMode }: {
  config: any,
  onSave: (config: any) => void,
  onClose: () => void,
  onDownloadHTML: () => void,
  onDownloadPDF: () => void,
  onDownloadStory: () => void,
  onEnterCinematicMode: () => void
}) => {
  const [formData, setFormData] = useState(config);
  const [activeTab, setActiveTab] = useState<'content' | 'appearance' | 'layout' | 'advanced'>('content');

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

  const tabs = [
    { id: 'content', label: 'Content', icon: Type },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'advanced', label: 'Advanced', icon: Sliders },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-3xl max-h-[95vh] md:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="bg-white/80 backdrop-blur-md z-10 p-4 md:p-6 border-b flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-romantic-pink/10 rounded-xl">
              <Brush size={24} className="text-romantic-pink" />
            </div>
            <h2 className="text-xl md:text-2xl font-heading text-romantic-pink">Studio Customizer</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b overflow-x-auto no-scrollbar flex-shrink-0 bg-gray-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-bold transition-all border-b-2",
                activeTab === tab.id
                  ? "border-romantic-pink text-romantic-pink bg-white"
                  : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8">
          {activeTab === 'content' && (
            <>
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Heart size={18} className="text-romantic-pink" /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Recipient Name</label>
                    <input
                      value={formData.GIRLFRIEND_NAME}
                      onChange={(e) => handleChange('GIRLFRIEND_NAME', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border bg-gray-50/50 focus:bg-white focus:border-romantic-pink outline-none transition-all"
                      placeholder="e.g. Sarah"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Your Name</label>
                    <input
                      value={formData.YOUR_NAME}
                      onChange={(e) => handleChange('YOUR_NAME', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border bg-gray-50/50 focus:bg-white focus:border-romantic-pink outline-none transition-all"
                      placeholder="e.g. Anil"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Password to Unlock</label>
                    <input
                      value={formData.PASSWORD}
                      onChange={(e) => handleChange('PASSWORD', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border bg-gray-50/50 focus:bg-white focus:border-romantic-pink outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Event Date & Time</label>
                    <input
                      type="datetime-local"
                      value={formData.BIRTHDAY_DATE.slice(0, 16)}
                      onChange={(e) => handleChange('BIRTHDAY_DATE', e.target.value + ':00')}
                      className="w-full px-4 py-3 rounded-2xl border bg-gray-50/50 focus:bg-white focus:border-romantic-pink outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Love Letter */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MessageCircle size={18} className="text-romantic-pink" /> Love Letter
                  </h3>
                </div>
                <textarea
                  value={formData.LOVE_LETTER}
                  onChange={(e) => handleChange('LOVE_LETTER', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-4 rounded-[2rem] border bg-gray-50/50 focus:bg-white focus:border-romantic-pink outline-none resize-none transition-all"
                  placeholder="Tell her how you feel..."
                />
              </div>

              {/* Photos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Camera size={18} className="text-romantic-pink" /> Memories
                  </h3>
                  <button
                    onClick={() => addArrayItem('PHOTOS', { url: 'https://picsum.photos/800/1000', caption: 'New Memory' })}
                    className="text-xs font-bold text-romantic-pink flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Photo
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.PHOTOS.map((photo: any, i: number) => (
                    <div key={i} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl relative group">
                      <button onClick={() => removeArrayItem('PHOTOS', i)} className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                        <Trash2 size={14} />
                      </button>
                      <input
                        value={photo.url}
                        onChange={(e) => handleArrayChange('PHOTOS', i, 'url', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border outline-none bg-white"
                        placeholder="Image URL"
                      />
                      <input
                        value={photo.caption}
                        onChange={(e) => handleArrayChange('PHOTOS', i, 'caption', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border outline-none bg-white font-medium"
                        placeholder="Caption"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              {/* Theme Colors */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Palette size={18} className="text-romantic-pink" /> Color Palette
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-3xl">
                  {Object.entries(formData.THEME).map(([key, value]) => (
                    <div key={key} className="space-y-2 text-center">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{key}</label>
                      <div className="relative group">
                        <input
                          type="color"
                          value={value as string}
                          onChange={(e) => handleChange('THEME', { ...formData.THEME, [key]: e.target.value })}
                          className="w-full h-12 rounded-2xl cursor-pointer border-4 border-white shadow-sm appearance-none p-0 overflow-hidden"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Sliders */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Brush size={18} className="text-romantic-pink" /> Design Finetuning
                </h3>
                <div className="space-y-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Glass Intensity</label>
                      <span className="text-xs font-bold text-romantic-pink">{(formData.DESIGN?.glassIntensity || 0.4).toFixed(1)}</span>
                    </div>
                    <input
                      type="range" min="0" max="1" step="0.1"
                      value={formData.DESIGN?.glassIntensity || 0.4}
                      onChange={(e) => handleChange('DESIGN', { ...formData.DESIGN, glassIntensity: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-romantic-pink"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Corner Rounding</label>
                      <span className="text-xs font-bold text-romantic-pink">{formData.DESIGN?.borderRadius || '2rem'}</span>
                    </div>
                    <input
                      type="range" min="0" max="48" step="4"
                      value={parseInt(formData.DESIGN?.borderRadius || '32')}
                      onChange={(e) => handleChange('DESIGN', { ...formData.DESIGN, borderRadius: `${e.target.value}px` })}
                      className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-romantic-pink"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Font Family</label>
                    <select
                      value={formData.FONT_FAMILY}
                      onChange={(e) => handleChange('FONT_FAMILY', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border bg-white focus:border-romantic-pink outline-none"
                    >
                      <option value="'Playfair Display', serif">Premium Serif (Playfair)</option>
                      <option value="'Dancing Script', cursive">Romantic Cursive (Dancing Script)</option>
                      <option value="'Pacifico', cursive">Playful Script (Pacifico)</option>
                      <option value="'Outfit', sans-serif">Modern Clean (Outfit)</option>
                      <option value="'Inter', sans-serif">Professional (Inter)</option>
                      <option value="'Cormorant Garamond', serif">Classic Elegant (Cormorant)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Particles Control */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Stars size={18} className="text-romantic-pink" /> Floating Elements
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'heart', label: 'Hearts', icon: Heart },
                    { id: 'star', label: 'Stars', icon: Stars },
                    { id: 'sparkle', label: 'Sparkles', icon: Sparkles },
                    { id: 'music', label: 'Music', icon: Music2 },
                    { id: 'snow', label: 'Snow', icon: CloudSnow },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleChange('DESIGN', { ...formData.DESIGN, floatingObject: item.id })}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        formData.DESIGN?.floatingObject === item.id
                          ? "border-romantic-pink bg-romantic-pink/10 text-romantic-pink"
                          : "border-gray-100 hover:border-romantic-pink/20"
                      )}
                    >
                      <item.icon size={20} />
                      <span className="text-[10px] font-bold uppercase">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Styles */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Square size={18} className="text-romantic-pink" /> Button Style
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'pill', label: 'Pill', radius: '9999px' },
                    { id: 'rounded', label: 'Soft', radius: '1.25rem' },
                    { id: 'square', label: 'Square', radius: '0.4rem' },
                    { id: 'outline', label: 'Outline', radius: '1.25rem', outline: true },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleChange('DESIGN', { ...formData.DESIGN, buttonStyle: style.id })}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        formData.DESIGN?.buttonStyle === style.id
                          ? "border-romantic-pink bg-romantic-pink/10 text-romantic-pink font-bold"
                          : "border-gray-100 hover:border-romantic-pink/20"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-6 border-2 flex items-center justify-center text-[10px]",
                          style.outline ? "border-current bg-transparent" : "bg-current border-transparent"
                        )}
                        style={{ borderRadius: style.radius }}
                      >
                        {style.id === 'outline' ? '' : '•'}
                      </div>
                      <span className="text-[10px] uppercase tracking-tighter">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Layout size={18} className="text-romantic-pink" /> Page Components
              </h3>
              <p className="text-sm text-gray-400 italic">Toggle which sections should be visible in your surprise ❤️</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'stats', label: 'Relationship Stats', icon: Zap },
                  { id: 'timeline', label: 'Our Journey Timeline', icon: Calendar },
                  { id: 'envelopes', label: 'Surprise Envelopes', icon: FileCode },
                  { id: 'polaroid', label: 'Polaroid Wall', icon: Camera },
                  { id: 'reasons', label: 'Reasons to Love', icon: MessageCircle },
                  { id: 'video', label: 'Video Memory', icon: Video },
                  { id: 'map', label: 'Special Location Map', icon: MapPin },
                  { id: 'starMap', label: 'Celestial Star Map', icon: Stars },
                  { id: 'candles', label: 'Birthday Candles', icon: Zap },
                  { id: 'daysSince', label: 'Days Counter', icon: Heart },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleChange('SECTIONS', {
                      ...formData.SECTIONS,
                      [section.id]: !formData.SECTIONS[section.id as keyof typeof formData.SECTIONS]
                    })}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      formData.SECTIONS?.[section.id as keyof typeof formData.SECTIONS]
                        ? "border-romantic-pink bg-romantic-pink/5 text-gray-800"
                        : "border-gray-100 text-gray-300 bg-gray-50/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-xl",
                      formData.SECTIONS?.[section.id as keyof typeof formData.SECTIONS] ? "bg-romantic-pink text-white" : "bg-gray-200 text-white"
                    )}>
                      <section.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm leading-tight">{section.label}</p>
                      <p className="text-[10px] opacity-70 uppercase tracking-widest">
                        {formData.SECTIONS?.[section.id as keyof typeof formData.SECTIONS] ? 'Enabled' : 'Hidden'}
                      </p>
                    </div>
                    {formData.SECTIONS?.[section.id as keyof typeof formData.SECTIONS] ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-8">
              {/* Confetti */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Zap size={18} className="text-romantic-pink" /> Interaction FX
                </h3>
                <div className="p-6 bg-gray-50 rounded-3xl space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Confetti Density</label>
                    <input
                      type="range" min="50" max="500" step="10"
                      value={formData.CONFETTI?.particleCount || 150}
                      onChange={(e) => handleChange('CONFETTI', { ...formData.CONFETTI, particleCount: parseInt(e.target.value) })}
                      className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-romantic-pink"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Floating Object Speed</label>
                    <input
                      type="range" min="0.5" max="3" step="0.1"
                      value={formData.DESIGN?.particleSpeed || 1.0}
                      onChange={(e) => handleChange('DESIGN', { ...formData.DESIGN, particleSpeed: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-romantic-pink"
                    />
                  </div>
                </div>
              </div>

              {/* Layout Mode */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <MousePointer2 size={18} className="text-romantic-pink" /> Interaction Design
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['default', 'minimal', 'editorial', 'split', 'bento', 'scrapbook', 'love-stats', 'modern-split'].map(layout => (
                    <button
                      key={layout}
                      onClick={() => handleChange('LAYOUT', layout)}
                      className={cn(
                        "py-3 px-4 rounded-xl border-2 text-[11px] font-bold uppercase transition-all",
                        formData.LAYOUT === layout ? "border-romantic-pink bg-romantic-pink/5 text-romantic-pink" : "border-gray-100 hover:bg-gray-50"
                      )}
                    >
                      {layout.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* New Interactivity Controls */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles size={18} className="text-romantic-pink" /> Advanced Interactivity
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleChange('DESIGN', {
                      ...formData.DESIGN,
                      cursorTrail: !formData.DESIGN?.cursorTrail
                    })}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-[1.5rem] border-2 transition-all text-left",
                      formData.DESIGN?.cursorTrail
                        ? "border-romantic-pink bg-romantic-pink/5 text-gray-800"
                        : "border-gray-100 text-gray-300 bg-gray-50/50"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-2xl",
                      formData.DESIGN?.cursorTrail ? "bg-romantic-pink text-white" : "bg-gray-200 text-white"
                    )}>
                      <Pointer size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm leading-tight">Cursor Trail</p>
                      <p className="text-[10px] opacity-70 uppercase tracking-widest mt-1">
                        {formData.DESIGN?.cursorTrail ? 'Hearts follow mouse' : 'Disabled'}
                      </p>
                    </div>
                    {formData.DESIGN?.cursorTrail ? <Zap size={16} className="text-yellow-400 fill-current" /> : <EyeOff size={16} />}
                  </button>

                  <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Animation Intensity</label>
                    <div className="flex gap-1 p-1 bg-white rounded-xl shadow-sm">
                      {['subtle', 'normal', 'energetic'].map(level => (
                        <button
                          key={level}
                          onClick={() => handleChange('DESIGN', { ...formData.DESIGN, animationIntensity: level })}
                          className={cn(
                            "flex-1 py-2 text-[9px] font-bold uppercase rounded-lg transition-all",
                            formData.DESIGN?.animationIntensity === level ? "bg-romantic-pink text-white shadow-md" : "text-gray-400 hover:bg-gray-50"
                          )}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 bg-gray-50/80 backdrop-blur-md border-t flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="flex-1 py-4 rounded-[1.5rem] bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-bold shadow-xl shadow-romantic-pink/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} /> Save Changes
          </button>
          <button
            onClick={() => setFormData(BIRTHDAY_CONFIG)}
            className="px-8 py-4 rounded-[1.5rem] border-2 border-gray-200 text-gray-400 font-bold hover:bg-white hover:text-gray-600 transition-all text-sm"
          >
            Reset
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ShareModal = ({ config, onClose, onDownloadHTML, onDownloadPDF, onDownloadStory, onEnterCinematicMode }: {
  config: any,
  onClose: () => void,
  onDownloadHTML: () => void,
  onDownloadPDF: () => void,
  onDownloadStory: (templateId: number) => void,
  onEnterCinematicMode: () => void
}) => {
  const currentEvent = EVENT_TYPES.find(e => e.id === config.EVENT_TYPE) || EVENT_TYPES[0];
  const [showStoryPreview, setShowStoryPreview] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(0);

  const handleCopyLink = async () => {
    const encoded = encodeConfig(config);
    const shareUrl = `${window.location.origin}${window.location.pathname}?s=${encoded}`;

    const shareData = {
      title: 'A Special Surprise ❤️',
      text: `I made this special ${currentEvent.label.toLowerCase()} surprise for ${config.GIRLFRIEND_NAME}! Check it out!`,
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

  const handleDirectCopy = async () => {
    const encoded = encodeConfig(config);
    const shareUrl = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard! 🔗', {
        duration: 3000,
      });
    } catch (err) {
      console.error('Error copying:', err);
      toast.error('Failed to copy link. Please try again.');
    }
  };

  if (showQR) {
    const encoded = encodeConfig(config);
    const shareUrl = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
    return <QRCodeModal url={shareUrl} onClose={() => setShowQR(false)} config={config} />;
  }

  if (showStoryPreview) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 my-auto"
        >
          <button
            onClick={() => setShowStoryPreview(false)}
            className="absolute -top-12 right-0 md:top-0 md:-right-12 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Left: Preview */}
          <div className="flex-shrink-0">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/5"
              style={{
                width: 'min(320px, 80vw)',
                height: 'min(568px, 142vw)', // 9:16 ratio
                position: 'relative'
              }}
            >
              <div style={{ transform: `scale(${Math.min(320, window.innerWidth * 0.8) / 1080})`, transformOrigin: 'top left', width: '1080px', height: '1920px' }}>
                <StoryCard config={config} templateId={selectedTemplateId} />
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex-1 flex flex-col gap-6 text-white w-full">
            <div>
              <h3 className="text-2xl font-heading mb-2">Template Browser</h3>
              <p className="text-sm opacity-60">Browse 100+ Pinterest-style birthday templates</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
              {TEMPLATE_PRESETS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  className={cn(
                    "p-4 rounded-2xl text-left transition-all border-2",
                    selectedTemplateId === t.id
                      ? "bg-romantic-pink border-white shadow-lg scale-105"
                      : "bg-white/5 border-transparent hover:bg-white/10"
                  )}
                >
                  <p className="font-bold text-sm">Template #{t.id + 1}</p>
                  <p className="text-[10px] opacity-60 uppercase tracking-widest">{t.layout.replace('-', ' ')}</p>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onDownloadStory(selectedTemplateId);
                  setShowStoryPreview(false);
                }}
                className="w-full py-4 bg-romantic-pink text-white rounded-2xl font-bold shadow-xl hover:bg-romantic-pink/90 transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} /> Download Template #{selectedTemplateId + 1}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTemplateId(prev => Math.max(0, prev - 1))}
                  className="flex-1 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSelectedTemplateId(prev => Math.min(99, prev + 1))}
                  className="flex-1 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2rem] md:rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden my-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8 text-center">
          <div className="inline-block p-3 md:p-4 bg-romantic-pink/10 rounded-full mb-4">
            <Share2 size={28} className="text-romantic-pink md:w-8 md:h-8" />
          </div>
          <h2 className="text-xl md:text-2xl font-heading text-romantic-pink mb-2">Share the Love</h2>
          <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8 italic">Choose how you want to share this special surprise ❤️</p>

          <div className="grid grid-cols-1 gap-3 md:gap-4">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group text-left"
            >
              <div className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Share2 size={20} className="text-romantic-pink md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Share Link</p>
                <p className="text-[10px] md:text-xs text-gray-400">Send the live website link</p>
              </div>
            </button>

            <button
              onClick={handleDirectCopy}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group text-left"
            >
              <div className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Copy size={20} className="text-romantic-pink md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Copy Link</p>
                <p className="text-[10px] md:text-xs text-gray-400">Copy the URL to clipboard</p>
              </div>
            </button>

            <button
              onClick={onDownloadHTML}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group text-left"
            >
              <div className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <FileCode size={20} className="text-romantic-pink md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Save as HTML</p>
                <p className="text-[10px] md:text-xs text-gray-400">Download offline shortcut</p>
              </div>
            </button>

            <button
              onClick={() => setShowStoryPreview(true)}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group text-left"
            >
              <div className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Camera size={20} className="text-romantic-pink md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Instagram Story</p>
                <p className="text-[10px] md:text-xs text-gray-400">Preview & generate card</p>
              </div>
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group text-left"
            >
              <div className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <QrCode size={20} className="text-romantic-pink md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Save as QR Code</p>
                <p className="text-[10px] md:text-xs text-gray-400">Scan to open surprise</p>
              </div>
            </button>

            <button
              onClick={onDownloadPDF}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group text-left"
            >
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <FileText size={24} className="text-romantic-pink" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Save as PDF</p>
                <p className="text-xs text-gray-400">Printable keepsake card</p>
              </div>
            </button>

            <button
              onClick={onEnterCinematicMode}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group text-left"
            >
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Video size={24} className="text-romantic-pink" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Record Video</p>
                <p className="text-xs text-gray-400">Enter Cinematic Mode</p>
              </div>
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-3 rounded-full border-2 border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const WelcomeScreen = ({ onStart }: { onStart: (receiver: string, sender: string) => void }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#050505]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-romantic-pink/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-romantic-purple/10 rounded-full blur-[150px]"
        />
        {[...Array(30)].map((_, i) => (
          <motion.div key={i}
            initial={{ y: '110%', x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 0.4, 0] }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
            className="absolute text-romantic-pink/20"
          >
            <Heart fill="currentColor" size={16 + Math.random() * 24} />
          </motion.div>
        ))}
      </div>

      <div className="h-full flex items-center justify-center p-2 md:p-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg max-h-full"
        >
          <div className="glass p-5 md:p-12 rounded-[1.5rem] md:rounded-[3rem] text-center shadow-2xl border border-white/10 backdrop-blur-3xl bg-white/5 overflow-hidden">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mb-3 md:mb-8 relative inline-block"
            >
              <div className="absolute inset-0 bg-romantic-pink/30 blur-3xl rounded-full animate-pulse" />
              <div className="relative z-10 p-3 md:p-6 bg-gradient-to-br from-romantic-pink to-romantic-purple rounded-xl md:rounded-3xl shadow-2xl shadow-romantic-pink/20">
                <Heart className="w-6 h-6 md:w-10 md:h-10 text-white" fill="currentColor" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-5xl font-heading mb-1 md:mb-2 text-white tracking-tight"
            >
              Create a <span className="text-romantic-pink">Surprise</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 mb-4 md:mb-10 text-xs md:text-base font-light leading-relaxed"
            >
              Craft a beautiful, personalized experience for your special someone.
            </motion.p>

            <div className="space-y-3 md:space-y-6">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStart("Tanvi", "Anil")}
                className="w-full py-3 md:py-4 rounded-lg md:rounded-2xl bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-bold text-sm md:text-lg shadow-2xl transition-all mt-1 md:mt-4"
              >
                Start Creating ✨
              </motion.button>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-3 md:mt-6 text-center text-gray-500 text-[9px] md:text-xs"
          >
            Your data is stored locally and in the URL.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-romantic-pink/10 backdrop-blur-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink/20 via-white to-romantic-purple/20" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1.5, 0],
              y: [null, '-30%']
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute text-romantic-pink/40"
          >
            <Heart fill="currentColor" size={10 + Math.random() * 30} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <Heart size={80} className="text-romantic-pink" fill="currentColor" />
          </motion.div>

          {/* Glowing Aura */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-romantic-pink rounded-full blur-3xl -z-10"
          />
        </div>

        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl font-heading text-romantic-pink mb-2"
        >
          Preparing Your Surprise...
        </motion.h2>
        <p className="text-gray-500 italic">Filling the air with love ❤️</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-romantic-pink to-romantic-purple"
        />
      </div>
    </div>
  );
};

const PasswordLock = ({ onUnlock }: { onUnlock: () => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ['#ff6b6b', '#f06292', '#ffffff'] });
    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffe4e8 0%, #f3e0f7 50%, #e0e8ff 100%)' }}>
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div key={i}
            initial={{ y: '110%', x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 0.6, 0] }}
            transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 4, ease: 'linear' }}
            className="absolute text-romantic-pink/40"
          >
            <Heart fill="currentColor" size={16 + Math.random() * 34} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-8 text-center">
          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-romantic-pink to-romantic-purple flex items-center justify-center shadow-xl shadow-romantic-pink/30 mx-auto">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
          </motion.div>

          <h2 className="text-3xl font-heading text-gray-800 mb-1">You have a surprise! 💝</h2>
          <p className="text-sm text-gray-400 mb-6">Tap the button below to open it</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              autoFocus
              className="w-full py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-bold shadow-lg shadow-romantic-pink/30 transition-all text-lg"
            >
              Open My Surprise 💝
            </motion.button>
          </form>

          <p className="text-[10px] text-gray-300 mt-6">Made with ❤️ just for you</p>
        </div>
      </motion.div>
    </div>
  );
};

const Countdown = ({ targetDate, config }: { targetDate: string, config: any }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const currentEvent = EVENT_TYPES.find(e => e.id === config.EVENT_TYPE) || EVENT_TYPES[0];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventDate = new Date(targetDate).getTime();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        confetti({
          particleCount: Math.floor((config.CONFETTI?.particleCount || 150) * (config.CONFETTI?.density || 1)),
          spread: config.CONFETTI?.spread || 70,
          origin: { y: 0.6 },
          colors: config.CONFETTI?.colors || [config.THEME.primary, config.THEME.secondary, '#ffffff']
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
    <div className="whitespace-pre-wrap leading-relaxed text-lg italic text-gray-700 markdown-content">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-6 bg-romantic-pink ml-1 align-middle"
      />
    </div>
  );
};

const ParallaxSection = ({ children, offset = 50 }: { children: React.ReactNode, offset?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

const FloatingHearts = ({ config }: { config: any }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'star': return Stars;
      case 'music': return Music2;
      case 'sparkle': return Sparkles;
      case 'petal': return Heart; // Petal is basically a thin heart but we can use heart for now
      case 'snow': return CloudSnow;
      default: return Heart;
    }
  };

  const Icon = getIcon(config.DESIGN?.floatingObject || 'heart');

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + '%',
            y: '110%',
            scale: Math.random() * 0.6 + 0.4,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: '-10%',
            x: (Math.random() * 100 - 50) + '%',
            rotate: Math.random() * 360
          }}
          transition={{
            duration: (Math.random() * 8 + 10) / (config.DESIGN?.particleSpeed || 1),
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute"
          style={{ color: i % 2 === 0 ? config.THEME.primary : config.THEME.secondary }}
        >
          <Icon fill="currentColor" size={Math.random() * 30 + 15} />
        </motion.div>
      ))}
    </div>
  );
};

const StatsSection = ({ config }: { config: any }) => {
  const stats = [
    { label: 'Days Together', value: config.STATS?.DAYS_TOGETHER || 365, icon: Heart },
    { label: 'Photos Shared', value: config.STATS?.PHOTOS_SHARED || 1240, icon: Camera },
    { label: 'Date Nights', value: config.STATS?.DATE_NIGHTS || 52, icon: MessageCircle },
    { label: 'Love Score', value: `${config.STATS?.LOVE_SCORE || 100}%`, icon: Zap }
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-romantic-pink rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
          <div>
            <p className="text-romantic-pink font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-4">// Relationship_Metrics</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading tracking-tight">The Data of <span className="text-romantic-pink italic">Us</span></h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">System_Status: Stable</p>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Connection: Forever</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-8 md:p-10 group hover:bg-white/5 transition-colors"
            >
              <div className="flex justify-between items-start mb-8 md:mb-12">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-romantic-pink/20 transition-colors">
                  <stat.icon size={24} className="text-romantic-pink" />
                </div>
                <span className="text-gray-700 font-mono text-xs">0{i + 1}</span>
              </div>
              <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="text-4xl md:text-5xl font-bold tracking-tighter group-hover:text-romantic-pink transition-colors">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapSection = ({ config }: { config: any }) => {
  if (!config.MAP_CONFIG?.show) return null;

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(config.MAP_CONFIG.location)}`;

  // Fallback if no API key is provided - use a standard search embed which is free but less customizable
  const fallbackMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(config.MAP_CONFIG.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey] as any}
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-romantic-pink/10 rounded-full mb-4">
            <MapPin size={32} className="text-romantic-pink" />
          </div>
          <h2 className="text-4xl font-heading text-romantic-pink mb-4">{config.MAP_CONFIG.title}</h2>
          <p className="text-gray-600 italic max-w-lg mx-auto">{config.MAP_CONFIG.description}</p>
        </motion.div>

        <motion.div
          {...ANIMATION_PRESETS[config.ANIMATIONS.CARDS as AnimationKey] as any}
          whileInView="animate"
          viewport={{ once: true }}
          className="glass p-4 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video relative"
        >
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={fallbackMapUrl}
            allowFullScreen
            title="Our Special Location"
            className="rounded-2xl"
          ></iframe>

          <div className="absolute bottom-8 left-8 right-8 glass p-4 rounded-2xl backdrop-blur-md border border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-romantic-pink rounded-lg text-white">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                <p className="text-gray-800 font-medium">{config.MAP_CONFIG.location}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Template System Constants ---

const TEMPLATE_LAYOUTS = [
  'editorial-modern', 'glass-floating', 'atmospheric-blur', 'brutalist-bold', 'organic-soft',
  'polaroid-stack', 'magazine-cover', 'minimal-text', 'collage-scatter', 'film-strip', 'love-stats', 'modern-split'
];

const TEMPLATE_FONTS = [
  { name: 'Serif', family: "'Playfair Display', serif" },
  { name: 'Sans', family: "'Inter', sans-serif" },
  { name: 'Mono', family: "'JetBrains Mono', monospace" },
  { name: 'Handwritten', family: "'Dancing Script', cursive" },
  { name: 'Display', family: "'Anton', sans-serif" }
];

const TEMPLATE_DECORATIONS = [
  'hearts', 'sparkles', 'tape', 'minimal', 'floral', 'geometric', 'stars', 'bubbles'
];

const TEMPLATE_BACKGROUNDS = [
  'solid', 'gradient', 'blurred-image', 'paper-texture', 'mesh-gradient'
];

// Generate 100 preset IDs
const TEMPLATE_PRESETS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  layout: TEMPLATE_LAYOUTS[i % TEMPLATE_LAYOUTS.length],
  font: TEMPLATE_FONTS[Math.floor(i / 20) % TEMPLATE_FONTS.length],
  decoration: TEMPLATE_DECORATIONS[Math.floor(i / 12) % TEMPLATE_DECORATIONS.length],
  background: TEMPLATE_BACKGROUNDS[Math.floor(i / 25) % TEMPLATE_BACKGROUNDS.length],
}));

const StoryCard = ({ config, templateId = 0 }: { config: any, templateId?: number }) => {
  const currentEvent = EVENT_TYPES.find(e => e.id === config.EVENT_TYPE) || EVENT_TYPES[0];
  const template = TEMPLATE_PRESETS[templateId] || TEMPLATE_PRESETS[0];

  const primaryColor = config.THEME.primary;
  const textColor = config.THEME.text;
  const bgColor = config.THEME.background;

  // Helper to get background style
  const getBackgroundStyle = () => {
    switch (template.background) {
      case 'gradient':
        return { background: `linear-gradient(135deg, ${bgColor}, ${primaryColor}33)` };
      case 'mesh-gradient':
        return {
          background: `radial-gradient(at 0% 0%, ${primaryColor}22 0, transparent 50%), 
                       radial-gradient(at 100% 0%, ${primaryColor}22 0, transparent 50%),
                       radial-gradient(at 100% 100%, ${primaryColor}22 0, transparent 50%),
                       radial-gradient(at 0% 100%, ${primaryColor}22 0, transparent 50%)`,
          backgroundColor: bgColor
        };
      case 'blurred-image':
        return {
          backgroundImage: `url(${config.PHOTOS[0]?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px) brightness(0.8)'
        };
      case 'paper-texture':
        return {
          backgroundColor: '#fdfcf0',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")',
          color: '#2c3e50'
        };
      default:
        return { backgroundColor: bgColor };
    }
  };

  // Helper to render decorations
  const renderDecorations = () => {
    switch (template.decoration) {
      case 'hearts':
        return [...Array(15)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: 0.1, color: primaryColor, transform: `rotate(${Math.random() * 360}deg)` }}>
            <Heart size={Math.random() * 100 + 50} fill="currentColor" />
          </div>
        ));
      case 'sparkles':
        return [...Array(30)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: 0.2, color: primaryColor }}>
            <Zap size={Math.random() * 30 + 10} fill="currentColor" />
          </div>
        ));
      case 'tape':
        return (
          <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', width: '200px', height: '60px', backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 100 }} />
        );
      default: return null;
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '1080px',
    height: '1920px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: template.font.family,
    color: textColor,
    ...getBackgroundStyle()
  };

  // Layout Renderers
  const renderLayout = () => {
    const photos = config.PHOTOS;
    const mainPhoto = config.GIRLFRIEND_PHOTO || photos[0]?.url || 'https://picsum.photos/800/1000';
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    switch (template.layout) {
      case 'editorial-modern':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '14px', letterSpacing: '4px', opacity: 0.5, textTransform: 'uppercase' }}>
                {dateStr} — Captured with Love
              </div>
              <h1 style={{ fontSize: '180px', fontWeight: '900', lineHeight: 0.8, margin: 0, letterSpacing: '-8px' }}>
                {config.GIRLFRIEND_NAME.substring(0, 1).toUpperCase()}
              </h1>
            </div>
            <div style={{ flex: 1, position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
              <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', backgroundColor: 'white', padding: '40px', borderRadius: '12px' }}>
                <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '4px', color: primaryColor, marginBottom: '10px', fontWeight: 'bold' }}>Happy {currentEvent.label}</p>
                <h2 style={{ fontSize: '60px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#111' }}>{config.GIRLFRIEND_NAME}</h2>
                <div style={{ fontSize: '28px', color: '#666', lineHeight: 1.6 }} className="markdown-content">
                  <ReactMarkdown>{config.LOVE_LETTER.substring(0, 180) + '...'}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        );

      case 'glass-floating':
        return (
          <div style={{ height: '100%', position: 'relative', padding: '60px' }}>
            <img src={mainPhoto} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />

            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '40px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                {photos.slice(0, 2).map((p: any, i: number) => (
                  <div key={i} style={{ width: '200px', height: '280px', borderRadius: '20px', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
                    <img src={p.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(30px)', padding: '60px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
                <p style={{ fontSize: '24px', color: 'white', opacity: 0.8, letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '20px' }}>Happy {currentEvent.label}</p>
                <h1 style={{ fontSize: '100px', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>{config.GIRLFRIEND_NAME}</h1>
                <div style={{ fontSize: '32px', color: 'white', lineHeight: 1.6, opacity: 0.9 }} className="markdown-content">
                  <ReactMarkdown>{config.LOVE_LETTER.substring(0, 250) + '...'}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        );

      case 'atmospheric-blur':
        return (
          <div style={{ height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
            <img src={mainPhoto} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(40px) brightness(0.7)' }} crossOrigin="anonymous" />
            <div style={{ position: 'absolute', inset: '40px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '40px' }} />

            <div style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
              <div style={{ width: '300px', height: '300px', margin: '0 auto 60px', borderRadius: '50%', overflow: 'hidden', border: '8px solid white', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              </div>
              <p style={{ fontSize: '24px', letterSpacing: '12px', textTransform: 'uppercase', marginBottom: '20px', opacity: 0.8 }}>Happy {currentEvent.label}</p>
              <h1 style={{ fontSize: '120px', fontWeight: '200', letterSpacing: '10px', marginBottom: '40px' }}>{config.GIRLFRIEND_NAME}</h1>
              <div style={{ fontSize: '36px', lineHeight: 1.8, fontStyle: 'italic', opacity: 0.9 }} className="markdown-content">
                <ReactMarkdown>{config.LOVE_LETTER.substring(0, 350) + '...'}</ReactMarkdown>
              </div>
            </div>
          </div>
        );

      case 'brutalist-bold':
        return (
          <div style={{ height: '100%', backgroundColor: '#000', padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', gap: '40px', flex: 1 }}>
              <div style={{ flex: 1, border: '10px solid #fff', overflow: 'hidden' }}>
                <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} crossOrigin="anonymous" />
              </div>
              <div style={{ width: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff', fontSize: '24px', fontWeight: 'bold', writingMode: 'vertical-rl' }}>
                <span>{dateStr}</span>
                <span style={{ color: primaryColor }}>{currentEvent.id.toUpperCase()}.EDITION</span>
                <span>2026.VOL.01</span>
              </div>
            </div>
            <div style={{ backgroundColor: primaryColor, padding: '60px', border: '10px solid #fff' }}>
              <h1 style={{ fontSize: '140px', fontWeight: '900', color: '#000', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '20px' }}>{config.GIRLFRIEND_NAME}</h1>
              <div style={{ fontSize: '32px', color: '#000', fontWeight: 'bold', lineHeight: 1.4 }} className="markdown-content">
                <ReactMarkdown>{config.LOVE_LETTER.substring(0, 200)}</ReactMarkdown>
              </div>
            </div>
          </div>
        );

      case 'organic-soft':
        return (
          <div style={{ height: '100%', backgroundColor: '#f9f7f2', padding: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '1000px', marginBottom: '80px' }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', width: '60%', height: '80%', borderRadius: '300px 300px 0 0', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
                <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: '10%', width: '50%', height: '60%', borderRadius: '200px', overflow: 'hidden', border: '20px solid #fff', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
                <img src={photos[0]?.url || mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              </div>
            </div>
            <div style={{ textAlign: 'center', maxWidth: '800px' }}>
              <p style={{ fontSize: '28px', color: '#8a817c', fontStyle: 'italic', marginBottom: '20px' }}>To my dearest {config.GIRLFRIEND_NAME}</p>
              <h1 style={{ fontSize: '100px', fontFamily: "'Playfair Display', serif", color: '#463f3a', marginBottom: '30px' }}>Happy {currentEvent.label}</h1>
              <div style={{ fontSize: '32px', color: '#8a817c', lineHeight: 1.8 }} className="markdown-content">
                <ReactMarkdown>{config.LOVE_LETTER.substring(0, 250) + '...'}</ReactMarkdown>
              </div>
            </div>
          </div>
        );

      case 'polaroid-stack':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '80px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', fontSize: '14px', letterSpacing: '4px', opacity: 0.4 }}>
              MOMENTS / {dateStr}
            </div>
            <div style={{ position: 'relative', width: '100%', height: '1200px' }}>
              {[mainPhoto, ...photos.slice(0, 2)].map((url, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  padding: '30px 30px 120px 30px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                  transform: `rotate(${[-8, 5, -3][i]}deg) translate(${[-40, 60, 0][i]}px, ${[0, 100, 200][i]}px)`,
                  width: '700px',
                  left: '50%',
                  marginLeft: '-350px',
                  zIndex: 10 - i,
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden' }}>
                    <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
                  </div>
                  <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <p style={{ color: '#333', fontSize: '32px', fontFamily: "'Dancing Script', cursive" }}>
                      {i === 0 ? `To my dearest ${config.GIRLFRIEND_NAME}` : i === 1 ? "Forever & Always" : `Happy ${currentEvent.label}!`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '100px', textAlign: 'center', maxWidth: '800px' }}>
              <h1 style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '-2px' }}>{config.GIRLFRIEND_NAME}</h1>
              <div style={{ fontSize: '28px', opacity: 0.6, lineHeight: 1.6 }} className="markdown-content">
                <ReactMarkdown>{config.LOVE_LETTER.substring(0, 150) + '...'}</ReactMarkdown>
              </div>
            </div>
          </div>
        );

      case 'magazine-cover':
        return (
          <div style={{ height: '100%', position: 'relative', backgroundColor: '#000' }}>
            <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} crossOrigin="anonymous" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 40%, rgba(0,0,0,0.4) 100%)' }} />

            <div style={{ position: 'absolute', top: '60px', left: '60px', right: '60px', display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '20px' }}>
              <span>Special Edition</span>
              <span>{dateStr}</span>
            </div>

            <div style={{ position: 'absolute', top: '140px', width: '100%', textAlign: 'center' }}>
              <h1 style={{ fontSize: '240px', fontWeight: '900', color: 'white', letterSpacing: '-15px', textTransform: 'uppercase', margin: 0, opacity: 0.95 }}>{currentEvent.label.split(' ')[0]}</h1>
              <p style={{ fontSize: '32px', color: primaryColor, letterSpacing: '25px', textTransform: 'uppercase', marginTop: '-20px', fontWeight: 'bold' }}>{currentEvent.label.split(' ')[1] || 'SPECIAL'}</p>
            </div>

            <div style={{ position: 'absolute', bottom: '80px', left: '60px', right: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div style={{ height: '2px', flex: 1, backgroundColor: primaryColor }} />
                <span style={{ color: 'white', fontSize: '18px', letterSpacing: '6px', textTransform: 'uppercase' }}>The Cover Story</span>
                <div style={{ height: '2px', flex: 1, backgroundColor: primaryColor }} />
              </div>
              <h2 style={{ fontSize: '140px', color: 'white', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '-4px' }}>{config.GIRLFRIEND_NAME}</h2>
              <div style={{ fontSize: '36px', color: 'white', opacity: 0.8, lineHeight: 1.5, maxWidth: '800px' }} className="markdown-content">
                <ReactMarkdown>{config.LOVE_LETTER.substring(0, 200) + '...'}</ReactMarkdown>
              </div>
            </div>
          </div>
        );

      case 'minimal-text':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '120px', justifyContent: 'center', textAlign: 'center', backgroundColor: '#fff' }}>
            <div style={{ position: 'absolute', top: '60px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '40px', opacity: 0.3, fontSize: '14px', letterSpacing: '8px', textTransform: 'uppercase' }}>
              <span>{dateStr}</span>
              <span>•</span>
              <span>Happy {currentEvent.label}</span>
            </div>

            <div style={{ width: '240px', height: '240px', margin: '0 auto 80px', borderRadius: '50%', overflow: 'hidden', border: `2px solid #eee`, padding: '10px' }}>
              <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} crossOrigin="anonymous" />
            </div>

            <h1 style={{ fontSize: '160px', fontWeight: '200', letterSpacing: '30px', textTransform: 'uppercase', marginBottom: '60px', color: '#111' }}>{config.GIRLFRIEND_NAME}</h1>
            <div style={{ width: '80px', height: '4px', backgroundColor: primaryColor, margin: '0 auto 60px' }} />
            <div style={{ fontSize: '44px', lineHeight: 1.8, color: '#444', fontWeight: '300', maxWidth: '800px', margin: '0 auto' }} className="markdown-content">
              <ReactMarkdown>{config.LOVE_LETTER.substring(0, 450)}</ReactMarkdown>
            </div>

            <div style={{ position: 'absolute', bottom: '80px', left: '0', right: '0', fontSize: '12px', letterSpacing: '4px', opacity: 0.2, textTransform: 'uppercase' }}>
              Designed with love for the one and only
            </div>
          </div>
        );

      case 'collage-scatter':
        return (
          <div style={{ height: '100%', position: 'relative', backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', fontSize: '400px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}>
              {config.GIRLFRIEND_NAME.substring(0, 1)}
            </div>

            {[mainPhoto, ...photos.slice(0, 4)].map((url, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: i === 0 ? '700px' : '350px',
                height: i === 0 ? '900px' : '450px',
                top: `${[15, 55, 10, 60, 25][i]}%`,
                left: `${[10, 15, 65, 60, 45][i]}%`,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                transform: `rotate(${[-4, 6, 12, -8, 3][i]}deg)`,
                zIndex: 5 - i,
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              </div>
            ))}

            <div style={{ position: 'absolute', bottom: '80px', left: '60px', right: '60px', zIndex: 20 }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: '60px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <span style={{ color: primaryColor, fontSize: '14px', letterSpacing: '6px', textTransform: 'uppercase', fontWeight: 'bold' }}>Happy {currentEvent.label}</span>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                </div>
                <h1 style={{ fontSize: '100px', fontWeight: 'bold', color: 'white', marginBottom: '20px', letterSpacing: '-2px' }}>{config.GIRLFRIEND_NAME}</h1>
                <div style={{ fontSize: '30px', color: 'white', opacity: 0.8, lineHeight: 1.6 }} className="markdown-content">
                  <ReactMarkdown>{config.LOVE_LETTER.substring(0, 180) + '...'}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        );

      case 'film-strip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px', gap: '20px', backgroundColor: '#0a0a0a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444', fontSize: '12px', fontFamily: 'monospace', padding: '0 20px' }}>
              <span>KODAK PORTRA 400</span>
              <span>{dateStr}</span>
              <span>SAFETY FILM</span>
            </div>

            {[mainPhoto, ...photos.slice(0, 2)].map((url, i) => (
              <div key={i} style={{ flex: 1, position: 'relative', overflow: 'hidden', borderTop: '20px solid #000', borderBottom: '20px solid #000' }}>
                <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', opacity: 0.3 }}>
                  {[...Array(8)].map((_, j) => <div key={j} style={{ width: '24px', height: '32px', backgroundColor: '#222', borderRadius: '4px' }} />)}
                </div>
                <div style={{ position: 'absolute', right: '20px', top: '0', bottom: '0', width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', opacity: 0.3 }}>
                  {[...Array(8)].map((_, j) => <div key={j} style={{ width: '24px', height: '32px', backgroundColor: '#222', borderRadius: '4px' }} />)}
                </div>
                <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '0 80px', filter: 'contrast(1.1) saturate(1.1)' }} crossOrigin="anonymous" />
                <div style={{ position: 'absolute', bottom: '20px', right: '100px', color: '#ff6b00', fontFamily: 'monospace', fontSize: '20px', opacity: 0.8 }}>
                  {i + 1}A
                </div>
              </div>
            ))}

            <div style={{ padding: '60px', backgroundColor: '#111', border: '1px solid #222', textAlign: 'center' }}>
              <p style={{ color: primaryColor, fontSize: '14px', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '20px' }}>Happy {currentEvent.label}</p>
              <h1 style={{ fontSize: '80px', color: 'white', fontFamily: 'monospace', marginBottom: '20px', letterSpacing: '-4px' }}>{config.GIRLFRIEND_NAME}</h1>
              <div style={{ color: 'white', opacity: 0.5, fontSize: '28px', lineHeight: 1.6, fontFamily: 'monospace' }} className="markdown-content">
                <ReactMarkdown>{config.LOVE_LETTER.substring(0, 150) + '...'}</ReactMarkdown>
              </div>
            </div>
          </div>
        );

      case 'love-stats':
        return (
          <div style={{ height: '100%', backgroundColor: '#E4E3E0', padding: '60px', display: 'flex', flexDirection: 'column', gap: '40px', color: '#141414', fontFamily: "'JetBrains Mono', monospace" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #141414', paddingBottom: '20px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>RELATIONSHIP_ANALYTICS_V1.0</div>
              <div style={{ fontSize: '24px' }}>{dateStr}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', flex: 1 }}>
              <div style={{ border: '2px solid #141414', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: '20px', textTransform: 'uppercase' }}>// Subject_Identity</p>
                  <h1 style={{ fontSize: '80px', fontWeight: 'bold', lineHeight: 1, marginBottom: '40px' }}>{config.GIRLFRIEND_NAME}</h1>
                  <div style={{ width: '100%', aspectRatio: '1', border: '2px solid #141414', overflow: 'hidden' }}>
                    <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
                  </div>
                </div>
                <div style={{ marginTop: '40px' }}>
                  <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: '10px' }}>// Love_Letter_Snippet</p>
                  <div style={{ fontSize: '20px', lineHeight: 1.4 }} className="markdown-content">
                    <ReactMarkdown>{config.LOVE_LETTER.substring(0, 150) + '...'}</ReactMarkdown>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div style={{ border: '2px solid #141414', padding: '40px', flex: 1 }}>
                  <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: '30px', textTransform: 'uppercase' }}>// Core_Metrics</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {[
                      { label: 'Days Together', value: config.STATS?.DAYS_TOGETHER || 365 },
                      { label: 'Photos Shared', value: config.STATS?.PHOTOS_SHARED || 1240 },
                      { label: 'Date Nights', value: config.STATS?.DATE_NIGHTS || 52 },
                      { label: 'Love Score', value: `${config.STATS?.LOVE_SCORE || 100}%` }
                    ].map((stat, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px dashed #141414', paddingBottom: '10px' }}>
                        <span style={{ fontSize: '24px', opacity: 0.7 }}>{stat.label}</span>
                        <span style={{ fontSize: '48px', fontWeight: 'bold' }}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ border: '2px solid #141414', padding: '40px', backgroundColor: '#141414', color: '#E4E3E0' }}>
                  <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: '20px', textTransform: 'uppercase' }}>// System_Status</p>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#00FF00', borderRadius: '50%', boxShadow: '0 0 10px #00FF00' }} />
                    FOREVER_ACTIVE
                  </div>
                  <p style={{ fontSize: '16px', marginTop: '20px', opacity: 0.7 }}>Connection established. No expiration date detected.</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', opacity: 0.5 }}>
              <span>ENCRYPTED_WITH_AFFECTION</span>
              <span>STORY_ID: {template.id}</span>
              <span>DESIGNED_BY_{config.YOUR_NAME.toUpperCase()}</span>
            </div>
          </div>
        );

      case 'modern-split':
        return (
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: '#f5f5f4', color: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}>
            <div style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #0a0a0a' }}>
              <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.08em', fontSize: '14px', textTransform: 'uppercase', opacity: 0.5, marginBottom: '40px' }}>
                {dateStr} — {currentEvent.label}
              </div>
              <h1 style={{ fontSize: '140px', lineHeight: 0.88, letterSpacing: '-0.02em', fontWeight: '600', marginBottom: '60px' }}>
                {config.GIRLFRIEND_NAME.toUpperCase()}
              </h1>
              <div style={{ fontSize: '32px', lineHeight: 1.6, opacity: 0.7, maxWidth: '500px' }} className="markdown-content">
                <ReactMarkdown>{config.LOVE_LETTER.substring(0, 250) + '...'}</ReactMarkdown>
              </div>
              <div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '1px solid #0a0a0a', display: 'grid', placeItems: 'center', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.14em' }}>
                  Forever
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px' }}>
                  By {config.YOUR_NAME}
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0a0a0a' }}>
              <img src={mainPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} crossOrigin="anonymous" />
              <div style={{ position: 'absolute', top: '40px', right: '40px', padding: '24px', backgroundColor: 'white', border: '1px solid #0a0a0a', borderRadius: '9999px', transform: 'rotate(-6deg)', boxShadow: '20px 20px 0 rgba(0,0,0,0.2)' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Memory_01</p>
              </div>
              <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', padding: '40px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {photos.slice(0, 3).map((p: any, i: number) => (
                    <div key={i} style={{ flex: 1, aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <img src={p.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '80px', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '100px' }}>{config.GIRLFRIEND_NAME}</h1>
            <p>{template.layout} layout coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div style={containerStyle}>
      {renderDecorations()}
      <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        {renderLayout()}
      </div>
    </div>
  );
};

// --- Feature 2: Now Playing Widget ---
const NowPlayingWidget = ({ config, isPlaying, onToggle }: { config: any, isPlaying: boolean, onToggle: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full shadow-2xl border border-white/30 backdrop-blur-xl"
      style={{ background: `linear-gradient(135deg, ${config.THEME?.primary}22, ${config.THEME?.secondary}22)`, borderColor: `${config.THEME?.primary}33` }}
    >
      {/* Vinyl record */}
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0"
        style={{ borderColor: config.THEME?.primary, background: `radial-gradient(circle at 50%, #333 20%, ${config.THEME?.primary}55 60%, #222 100%)` }}
      >
        <div className="w-2 h-2 rounded-full bg-white/80" />
      </motion.div>

      {/* Song info */}
      <div className="flex flex-col min-w-0 max-w-[140px]">
        <p className="text-xs font-bold text-gray-800 truncate">{config.SONG_NAME || 'Our Song'}</p>
        <p className="text-[10px] text-gray-500 truncate">{config.SONG_ARTIST || 'Unknown Artist'}</p>
      </div>

      {/* Play / Pause button */}
      <button
        onClick={onToggle}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md active:scale-90 transition-transform"
        style={{ background: `linear-gradient(135deg, ${config.THEME?.primary}, ${config.THEME?.secondary})` }}
      >
        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
      </button>

      {/* Equalizer bars when playing */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
          {[1, 2, 3, 2].map((h, i) => (
            <motion.div key={i}
              animate={{ scaleY: [h * 0.5, h, h * 0.3, h * 0.8, h * 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              className="w-1 rounded-full origin-bottom"
              style={{ height: `${h * 6}px`, backgroundColor: config.THEME?.primary }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// --- Feature 3: Surprise Envelopes ---
const SurpriseEnvelopesSection = ({ config }: { config: any }) => {
  const envelopes = config.SURPRISE_ENVELOPES || [];
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [revealedAll, setRevealedAll] = useState(false);

  if (!envelopes.length) return null;

  const handleRevealAll = () => {
    setRevealedAll(true);
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, colors: [config.THEME.primary, config.THEME.secondary, '#ffffff'] });
    toast.success('All surprises revealed! 🎉');
  };

  return (
    <section className="py-10 md:py-14 px-6" style={{ background: `linear-gradient(180deg, ${config.THEME.background}, ${config.THEME.primary}11)` }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 rounded-full mb-4" style={{ background: `${config.THEME.primary}15` }}>
            <span className="text-4xl">💌</span>
          </div>
          <h2 className="text-4xl font-heading mb-2" style={{ color: config.THEME.primary }}>Secret Surprises</h2>
          <p className="text-gray-500 text-sm">Tap each envelope to reveal a special message</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {envelopes.map((env: any, i: number) => {
            const isOpen = openedIndex === i || revealedAll;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                onClick={() => setOpenedIndex(isOpen && !revealedAll ? null : i)}
                className="cursor-pointer relative group rounded-3xl overflow-hidden shadow-xl border border-white/40 min-h-[200px] flex flex-col"
                style={{ background: `linear-gradient(135deg, ${config.THEME.primary}22, ${config.THEME.secondary}22)` }}
              >
                {/* Closed state */}
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.div key="closed" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full p-6 text-center flex-1"
                    >
                      <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                        className="text-5xl mb-3">{env.emoji || '💌'}</motion.span>
                      <p className="font-bold text-sm" style={{ color: config.THEME.primary }}>{env.title}</p>
                      <p className="text-xs text-gray-400 mt-2">Tap to open ✨</p>
                    </motion.div>
                  ) : (
                    <motion.div key="open"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center h-full p-6 text-center flex-1"
                      style={{ background: `linear-gradient(135deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}
                    >
                      <p className="text-white text-sm leading-relaxed">{env.message}</p>
                      <p className="text-white/60 text-xs mt-4">— {config.YOUR_NAME} 💕</p>
                      <p className="text-white/40 text-[10px] mt-2">Tap to close</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {!revealedAll && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleRevealAll}
              className="px-8 py-3 rounded-full text-white font-bold shadow-xl transition-all"
              style={{ background: `linear-gradient(135deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}
            >
              🎉 Reveal All Surprises
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Feature 4: Birthday Candles ---
const BirthdayCandlesSection = ({ config }: { config: any }) => {
  const CANDLE_COUNT = 24;
  const [blownOut, setBlownOut] = useState<boolean[]>(Array(CANDLE_COUNT).fill(false));
  const [allOut, setAllOut] = useState(false);

  const blowCandle = (i: number) => {
    if (blownOut[i] || allOut) return;
    const next = [...blownOut];
    next[i] = true;
    setBlownOut(next);
    if (next.every(Boolean)) {
      setAllOut(true);
      confetti({ particleCount: 300, spread: 160, origin: { y: 0.4 }, colors: [config.THEME.primary, config.THEME.secondary, '#ffd700', '#ffffff'] });
      toast.success("🎂 All candles blown! Make a wish! 🌟");
    }
  };

  const blowAll = () => {
    setBlownOut(Array(CANDLE_COUNT).fill(true));
    setAllOut(true);
    confetti({ particleCount: 400, spread: 180, origin: { y: 0.4 }, colors: [config.THEME.primary, config.THEME.secondary, '#ffd700', '#ffffff'] });
    toast.success("🎂 Wish granted! 🌟");
  };

  const reset = () => { setBlownOut(Array(CANDLE_COUNT).fill(false)); setAllOut(false); };
  const remaining = blownOut.filter(Boolean).length;

  return (
    <section className="py-16 md:py-20 px-6 text-center overflow-hidden" style={{ background: `linear-gradient(180deg, #1a0a0a 0%, #2d0e0e 100%)` }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
        <h2 className="text-4xl font-heading text-white mb-2">🎂 Blow Out the Candles!</h2>
        <p className="text-gray-400 text-sm">{allOut ? "🌟 You made a wish! 🌟" : `${CANDLE_COUNT - remaining} candles left — click to blow them out!`}</p>
      </motion.div>

      {/* Cake base */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative mx-auto" style={{ width: 'min(340px, 90vw)' }}>
          {/* Candles grid */}
          <div className="grid grid-cols-8 gap-1.5 mb-2 justify-items-center">
            {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
              <motion.div key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => blowCandle(i)}
                className="cursor-pointer flex flex-col items-center"
                title={blownOut[i] ? "Blown out!" : "Click to blow!"}
              >
                {/* Flame */}
                <AnimatePresence>
                  {!blownOut[i] && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 0.9, 1.1, 1], y: [0, -2, 0] }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-xs mb-0.5"
                    >🔥</motion.div>
                  )}
                </AnimatePresence>
                {blownOut[i] && <div className="text-xs mb-0.5 opacity-20">💨</div>}
                {/* Wax */}
                <div className="rounded-t-full rounded-b-sm"
                  style={{ width: 8, height: 22, background: blownOut[i] ? '#aaa' : `linear-gradient(${config.THEME.primary}, ${config.THEME.secondary})`, transition: 'background 0.3s' }}
                />
              </motion.div>
            ))}
          </div>

          {/* Cake tiers */}
          <div className="relative" style={{ background: 'linear-gradient(135deg, #f9c3cc, #f7a8b6)', borderRadius: '0 0 2rem 2rem', padding: '20px 30px 24px', border: '3px solid rgba(255,255,255,0.3)' }}>
            <div className="absolute inset-x-4 top-0 h-3 rounded-full" style={{ background: config.THEME.primary, opacity: 0.6, transform: 'translateY(-50%)' }} />
            <p className="text-white font-heading text-xl drop-shadow">Happy Birthday, {config.GIRLFRIEND_NAME}! 🎉</p>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              animate={{ width: `${(remaining / CANDLE_COUNT) * 100}%` }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}
            />
          </div>
          <p className="text-gray-400 text-xs mt-1">{remaining}/{CANDLE_COUNT} blown out</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        {!allOut && (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={blowAll}
            className="px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-xl"
            style={{ background: `linear-gradient(135deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}
          >💨 Blow All Out</motion.button>
        )}
        <button onClick={reset} className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-colors">
          🕯️ Relight Candles
        </button>
      </div>
    </section>
  );
};

// --- Feature 5: Polaroid Wall ---
const PolaroidWallSection = ({ config }: { config: any }) => {
  const photos = config.PHOTOS || [];
  if (!photos.length) return null;

  const rotations = [-6, 4, -3, 7, -5, 3, -8, 5, -2, 6];
  return (
    <section className="py-10 md:py-14 px-6" style={{ background: '#ede8df' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
        <div className="inline-block p-4 rounded-full bg-amber-100 mb-4">
          <Camera size={32} className="text-amber-600" />
        </div>
        <h2 className="text-4xl font-heading mb-2 text-amber-900">Our Memory Wall 📸</h2>
        <p className="text-amber-700/60 text-sm italic">Every picture tells our story</p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {photos.map((photo: any, i: number) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ rotate: 0, scale: 1.08, zIndex: 50 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              style={{ rotate: rotations[i % rotations.length] }}
              className="cursor-pointer bg-white shadow-xl flex flex-col group relative"
              title={photo.caption}
            >
              {/* Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-yellow-200/70 border border-yellow-300/50 rotated backdrop-blur-sm z-10 group-hover:bg-yellow-100 transition-colors" style={{ rotate: '-2deg' }} />
              <div className="overflow-hidden" style={{ width: 'min(180px, 45vw)', height: 'min(160px, 40vw)' }}>
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3 pb-4 text-center">
                <p className="text-xs text-gray-600 font-medium" style={{ fontFamily: "'Dancing Script', cursive" }}>{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Feature 6: Star Map Section ---
const StarMapSection = ({ config }: { config: any }) => {
  if (!config.STAR_MAP?.show) return null;

  // Draw a simple SVG star map
  const stars = Array.from({ length: 120 }, (_, i) => ({
    x: (Math.sin(i * 2.4) * 0.5 + 0.5) * 100,
    y: (Math.cos(i * 1.7) * 0.5 + 0.5) * 100,
    r: 0.3 + (i % 5) * 0.25,
    opacity: 0.3 + (i % 3) * 0.25,
  }));

  // Fake constellation lines for visual
  const constellationLines = [
    [0, 12], [12, 24], [24, 36], [36, 48], [48, 0], [24, 60], [60, 72],
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[#060d1f]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="text-5xl mb-4">🌌</div>
          <h2 className="text-4xl font-heading text-white mb-2">{config.STAR_MAP.title || 'The Sky When We Met'}</h2>
          <p className="text-gray-400 text-sm">{config.STAR_MAP.date} · {config.STAR_MAP.location}</p>
          <p className="text-gray-500 text-xs mt-2 italic">{config.STAR_MAP.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative mx-auto rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/20"
          style={{ width: 'min(360px, 90vw)', height: 'min(360px, 90vw)', background: 'radial-gradient(circle at 50%, #0a1628, #060d1f)' }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
            {/* Constellation lines */}
            {constellationLines.map(([a, b], i) => (
              <line key={i}
                x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
                stroke="rgba(255,255,255,0.08)" strokeWidth="0.3"
              />
            ))}
            {/* Stars */}
            {stars.map((s, i) => (
              <motion.circle key={i}
                cx={s.x} cy={s.y} r={s.r}
                fill="white"
                animate={{ opacity: [s.opacity, s.opacity * 0.4, s.opacity] }}
                transition={{ duration: 1.5 + (i % 5) * 0.5, repeat: Infinity, delay: (i % 7) * 0.2 }}
              />
            ))}
          </svg>
          {/* Center bloom */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full opacity-30" style={{ background: config.THEME.primary, filter: 'blur(24px)' }} />
          </div>
          {/* Date badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <span className="text-[10px] text-white/40 tracking-widest uppercase">{config.STAR_MAP.date}</span>
          </div>
        </motion.div>

        <p className="text-gray-500 text-xs mt-6 italic">✨ Stars shimmer like our love — infinite and timeless</p>
      </div>
    </section>
  );
};

// --- Feature 7: Guestbook ---
const GuestbookSection = ({ config }: { config: any }) => {
  if (!config.GUESTBOOK?.enabled) return null;
  const [messages, setMessages] = useState<{ name: string; text: string; time: string }[]>(() => {
    try { return JSON.parse(localStorage.getItem('guestbook_messages') || '[]'); } catch { return []; }
  });
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const msg = { name: name.trim(), text: text.trim(), time: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    const newMessages = [msg, ...messages];
    setMessages(newMessages);
    localStorage.setItem('guestbook_messages', JSON.stringify(newMessages));
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    toast.success("Message saved! 💌");
    setName(''); setText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-10 md:py-14 px-6" style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-block p-4 rounded-full mb-4" style={{ background: `${config.THEME.primary}15` }}>
            <MessageCircle size={32} style={{ color: config.THEME.primary }} />
          </div>
          <h2 className="text-4xl font-heading mb-2" style={{ color: config.THEME.primary }}>{config.GUESTBOOK?.title || 'Leave a Message 💌'}</h2>
          <p className="text-gray-500 text-sm">Write something sweet — it'll be saved here ❤️</p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6 mb-8 shadow-xl border border-white/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input value={name} onChange={e => setName(e.target.value)} required
              placeholder="Your name..." maxLength={50}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-romantic-pink text-sm"
            />
            <div className="text-xs text-gray-400 flex items-center">(This message will be visible to everyone who opens this page)</div>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} required
            placeholder={config.GUESTBOOK?.placeholder || 'Write something sweet here...'} rows={3} maxLength={300}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:border-romantic-pink resize-none text-sm mb-4"
          />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-full text-white font-bold shadow-lg"
            style={{ background: `linear-gradient(135deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}
          >
            {submitted ? '✅ Saved!' : '💌 Leave My Message'}
          </motion.button>
        </motion.form>

        {/* Messages list */}
        {messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-4 border border-white/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}>
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{msg.name}</p>
                    <p className="text-xs text-gray-400">{msg.time}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">"{msg.text}"</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- Feature 8: Enhanced Countdown with Days-Since-Met + Milestones ---
const DaysSinceSection = ({ config }: { config: any }) => {
  const firstMetDate = config.STATS?.FIRST_MET_DATE;
  if (!firstMetDate) return null;

  const metDate = new Date(firstMetDate);
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - metDate.getTime()) / (1000 * 60 * 60 * 24));
  const hoursTogether = daysSince * 24;
  const milestones = [100, 200, 365, 500, 730, 1000];
  const nextMilestone = milestones.find(m => m > daysSince);
  const daysToNext = nextMilestone ? nextMilestone - daysSince : null;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => { if (prev < daysSince) return prev + Math.ceil(daysSince / 60); return daysSince; });
    }, 30);
    return () => clearInterval(timer);
  }, [daysSince]);

  return (
    <section className="py-8 px-6" style={{ background: `linear-gradient(135deg, ${config.THEME.primary}0d, ${config.THEME.secondary}0d)` }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <p className="text-sm uppercase tracking-widest mb-2 font-mono" style={{ color: config.THEME.primary }}>// Since We First Met</p>
          <div className="text-7xl md:text-9xl font-bold mb-2 tabular-nums" style={{ color: config.THEME.primary }}>
            {Math.min(counter, daysSince).toLocaleString()}
          </div>
          <p className="text-2xl font-heading text-gray-600 mb-4">days of us 💕</p>
          <p className="text-sm text-gray-400">{hoursTogether.toLocaleString()} hours · {(daysSince * 24 * 60).toLocaleString()} minutes of memories</p>

          {daysToNext && nextMilestone && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="mt-6 inline-block px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}
            >
              🎯 Only {daysToNext} days to {nextMilestone.toLocaleString()} day milestone!
            </motion.div>
          )}
          {daysSince === 1000 && (
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }}
              className="mt-4 text-4xl">🎊 1000 Days Together! 🎊</motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// --- Feature 9: Wish List Section ---
const WishListSection = ({ config }: { config: any }) => {
  const wishList = config.WISH_LIST || [];
  const [items, setItems] = useState(wishList);
  if (!items.length) return null;

  const toggleGifted = (i: number) => {
    const updated = [...items];
    updated[i] = { ...updated[i], gifted: !updated[i].gifted };
    setItems(updated);
    if (updated[i].gifted) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      toast.success("🎀 Gifted! So sweet!");
    }
  };

  const allGifted = items.every((i: any) => i.gifted);

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden" style={{ background: 'var(--bg-gradient, linear-gradient(135deg, #fff5f7 0%, #fdf2f8 100%))' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-xl shadow-pink-200/50 mb-6 bg-white/80 backdrop-blur-md border border-white"
          >
            <Gift size={40} className="drop-shadow-sm" style={{ color: config.THEME.primary }} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading mb-4 text-gray-800 drop-shadow-sm" style={{ color: config.THEME.primary }}>Wishlist Magic ✨</h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">Little surprises that will make {config.GIRLFRIEND_NAME}'s heart skip a beat.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {items.map((item: any, i: number) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              onClick={() => toggleGifted(i)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`cursor-pointer rounded-[2rem] p-6 relative overflow-hidden transition-all duration-500 shadow-lg border-2
                ${item.gifted
                  ? 'bg-white/90 border-transparent shadow-pink-100/50 grayscale-[10%]'
                  : 'bg-white/60 hover:bg-white/90 border-white hover:shadow-xl hover:shadow-pink-200/40 backdrop-blur-xl'}`}
            >
              {/* Gifted Overlay Pattern */}
              {item.gifted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-[2px] z-0 flex items-center justify-center">
                </motion.div>
              )}

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <motion.div
                  animate={item.gifted ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                  className={`text-6xl mb-4 drop-shadow-xl transition-transform ${item.gifted ? 'opacity-90' : 'group-hover:scale-110'}`}
                >
                  {item.emoji}
                </motion.div>

                <h3 className={`text-xl font-bold mb-6 flex-grow transition-all duration-300 ${item.gifted ? 'text-emerald-800' : 'text-gray-800'}`}>
                  {item.item}
                </h3>

                <div className="mt-auto pt-4 w-full flex-shrink-0 border-t border-black/5 flex items-center justify-center">
                  <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 w-full justify-center
                    ${item.gifted
                      ? 'bg-emerald-100 text-emerald-700 shadow-inner'
                      : 'bg-gray-100/80 text-gray-500 hover:bg-pink-50 hover:text-pink-500'}`}
                  >
                    {item.gifted ? (
                      <>
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={18} strokeWidth={3} /></motion.span>
                        <span>Gifted!</span>
                      </>
                    ) : (
                      <>
                        <Gift size={16} />
                        <span>Mark as gifted</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {allGifted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="mt-12 text-center p-8 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(135deg, ${config.THEME.primary}, ${config.THEME.secondary})` }}></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl mb-6 shadow-2xl bg-white/20 w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-md"
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl md:text-5xl font-heading mb-4 drop-shadow-lg">Mission Accomplished!</h3>
                <p className="text-lg md:text-xl opacity-90 font-medium max-w-lg mx-auto leading-relaxed drop-shadow">
                  You've unlocked all the gifts! {config.GIRLFRIEND_NAME} is incredibly lucky to have someone as thoughtful as you. 💕
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const updated = items.map((i: any) => ({ ...i, gifted: false }));
                    setItems(updated);
                  }}
                  className="mt-8 px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg"
                >
                  <RefreshCw size={18} /> Reset Gifts
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- Feature 11: QR Code Share Modal (appended to ShareModal) ---
const QRCodeModal = ({ url, onClose, config }: { url: string, onClose: () => void, config: any }) => {
  const size = 200;
  // Simple QR-like visual using SVG (just decorative; real QR uses a library)
  // We'll display the link prominently and a WhatsApp button
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`I made something special for you! 💝 Open this surprise: ${url}`)}`;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl w-full max-w-sm p-7 shadow-2xl text-center"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X size={18} /></button>
        <h2 className="text-xl font-heading mb-1" style={{ color: config.THEME.primary }}>Share the Surprise 💝</h2>
        <p className="text-xs text-gray-400 mb-5">Send directly via WhatsApp or copy the link</p>

        {/* Real QR box */}
        <div className="w-40 h-40 mx-auto mb-5 rounded-2xl border-4 flex items-center justify-center bg-gray-50 p-1 overflow-hidden"
          style={{ borderColor: config.THEME.primary }}>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`} alt="Surprise QR Code" className="w-full h-full" />
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 mb-4 text-left">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Your special link</p>
          <p className="text-xs text-gray-600 break-all font-mono">{url.substring(0, 60)}...</p>
        </div>

        <div className="space-y-2">
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-bold shadow-lg"
            style={{ background: '#25D366' }}
          >
            <span className="text-lg">📱</span> Send via WhatsApp
          </a>
          <button onClick={() => { navigator.clipboard.writeText(url); toast.success('Link copied! 🔗'); }}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold border-2 border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
          >
            <Share2 size={16} /> Copy Link
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Feature 14: Scheduled Reveal / Time Lock Screen ---
const TimeLockScreen = ({ config }: { config: any }) => {
  const reveal = config.SCHEDULED_REVEAL;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    const update = () => {
      const now = new Date().getTime();
      const target = new Date(reveal.revealAt).getTime();
      const diff = target - now;
      if (diff <= 0) {
        setUnlocked(true);
        confetti({ particleCount: 300, spread: 160, origin: { y: 0.4 } });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [reveal.revealAt]);

  if (unlocked) return null; // Let main site show

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(circle at 50% 50%, ${config.THEME.primary}22, #050505)` }}>
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <motion.div key={i}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 1 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-md mx-4"
      >
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-6">🎁</motion.div>

        <h1 className="text-4xl font-heading text-white mb-2">{reveal.lockMessage || 'Something special is coming... 🌟'}</h1>
        <p className="text-gray-400 mb-8 text-sm italic">{reveal.lockSubMessage}</p>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {Object.entries(timeLeft).map(([unit, val]) => (
            <div key={unit} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <motion.div key={val} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold text-white">{String(val).padStart(2, '0')}</motion.div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">{unit}</div>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-xs">Made with ❤️ by {config.YOUR_NAME}</p>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [config, setConfig] = useState(BIRTHDAY_CONFIG);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isThemeGalleryOpen, setIsThemeGalleryOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [captureTemplateId, setCaptureTemplateId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSParam, setHasSParam] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('s');
    if (data) {
      setHasSParam(true);
      setIsLoading(true);
      const decoded = decodeConfig(data);
      if (decoded) {
        setConfig(decoded);
      }
      // Set unlocked to false so the receiver MUST interact with the password screen.
      // Mobile browsers strictly block audio from autoplaying unless the user interacts first!
      setIsUnlocked(false); 
      // Romantic delay for the loading animation
      setTimeout(() => setIsLoading(false), 3500);
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
    setIsThemeGalleryOpen(true); // Open themes immediately for sender
    toast.success(`Welcome! Now you can customize the surprise for ${receiver}. ❤️`);
  };

  const handleSurprise = () => {
    confetti({
      particleCount: Math.floor((config.CONFETTI?.particleCount || 100) * (config.CONFETTI?.density || 1)),
      spread: config.CONFETTI?.spread || 70,
      origin: { y: 0.6 },
      colors: config.CONFETTI?.colors || [config.THEME.primary, config.THEME.secondary, '#ffffff']
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  useEffect(() => {
    if (isUnlocked && !isLoading && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Autoplay blocked by browser. User needs to interact first.');
        });
      }
    }
  }, [isUnlocked, isLoading]);

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

  const handleDownloadHTML = () => {
    const currentUrl = window.location.href;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${currentEvent.label} Surprise for ${config.GIRLFRIEND_NAME}</title>
        <meta http-equiv="refresh" content="0; url=${currentUrl}">
        <style>
          body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: ${config.THEME.background}; }
          .card { text-align: center; padding: 2rem; background: white; border-radius: 1.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 400px; }
          h1 { color: ${config.THEME.primary}; margin-bottom: 1rem; font-size: 1.5rem; }
          p { color: ${config.THEME.text}; line-height: 1.6; opacity: 0.8; }
          a { color: ${config.THEME.primary}; text-decoration: none; font-weight: bold; border-bottom: 2px solid ${config.THEME.primary}; }
          .heart { color: ${config.THEME.primary}; font-size: 3rem; margin-bottom: 1rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="heart">❤️</div>
          <h1>Your Surprise is Ready!</h1>
          <p>This file contains the link to your personalized ${currentEvent.label.toLowerCase()} surprise for <strong>${config.GIRLFRIEND_NAME}</strong>.</p>
          <p>If you are not redirected automatically, <a href="${currentUrl}">click here to open it</a>.</p>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `surprise-${config.GIRLFRIEND_NAME.toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('HTML shortcut downloaded!');
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    toast.info('Generating PDF... This may take a moment.');

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: config.THEME.background,
        windowWidth: 1200,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = (pdfHeight * imgWidth) / pdfWidth;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position * (pdfWidth / imgWidth), pdfWidth, (imgHeight * pdfWidth) / imgWidth);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      pdf.save(`${currentEvent.label}_Surprise_${config.GIRLFRIEND_NAME}.pdf`);
      toast.success('PDF downloaded successfully! ❤️');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Try using the print dialog instead.');
      window.print();
    }
  };

  const storyRef = useRef<HTMLDivElement>(null);

  const handleDownloadStory = async (templateId: number = 0) => {
    if (!storyRef.current) return;

    try {
      toast.loading('Generating your Instagram Story card...', { id: 'story-gen' });

      setCaptureTemplateId(templateId);

      // Wait for re-render
      await new Promise(resolve => setTimeout(resolve, 100));

      const originalStyle = storyRef.current.style.cssText;
      storyRef.current.style.position = 'fixed';
      storyRef.current.style.left = '0';
      storyRef.current.style.top = '0';
      storyRef.current.style.zIndex = '-1000';
      storyRef.current.style.opacity = '1';
      storyRef.current.style.visibility = 'visible';

      const canvas = await html2canvas(storyRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: config.THEME.background,
        width: 1080,
        height: 1920,
        windowWidth: 1080,
        windowHeight: 1920,
        onclone: (clonedDoc) => {
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach(s => s.remove());

          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: transparent; }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Restore original style
      storyRef.current.style.cssText = originalStyle;

      const link = document.createElement('a');
      link.download = `IG_Story_${config.GIRLFRIEND_NAME}_Template_${templateId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('Instagram Story card ready! ❤️', { id: 'story-gen' });
    } catch (error) {
      console.error('Story generation error:', error);
      toast.error('Failed to generate Story card.', { id: 'story-gen' });
    }
  };

  const handleEnterCinematicMode = () => {
    setIsCustomizing(false);
    setIsShareModalOpen(false);
    toast.info('Cinematic Mode: UI hidden for 30s. Use your screen recorder now!', {
      duration: 5000,
    });
    document.body.classList.add('cinematic-mode');
    setTimeout(() => {
      document.body.classList.remove('cinematic-mode');
    }, 30000);
  };

  useEffect(() => {
    // Apply theme colors & design vars
    const root = document.documentElement;
    root.style.setProperty('--romantic-pink', config.THEME.primary);
    root.style.setProperty('--romantic-purple', config.THEME.secondary);
    root.style.setProperty('--romantic-accent', config.THEME.accent);
    root.style.setProperty('--romantic-bg', config.THEME.background);
    root.style.setProperty('--romantic-text', config.THEME.text);

    root.style.setProperty('--font-family', config.FONT_FAMILY);

    // New design variables
    root.style.setProperty('--glass-intensity', config.DESIGN?.glassIntensity?.toString() || '0.1');
    root.style.setProperty('--border-radius', config.DESIGN?.borderRadius || '1.5rem');

    // Button Style variables
    let btnRadius = '9999px';
    let btnBorder = '0px';
    if (config.DESIGN?.buttonStyle === 'rounded') btnRadius = '1.25rem';
    if (config.DESIGN?.buttonStyle === 'square') btnRadius = '0.4rem';
    if (config.DESIGN?.buttonStyle === 'outline') {
      btnRadius = '1.25rem';
      btnBorder = '2px';
    }
    root.style.setProperty('--btn-radius', btnRadius);
    root.style.setProperty('--btn-border', btnBorder);

    // Background logic
    if (config.DESIGN?.bgStyle === 'pattern') {
      root.style.setProperty('--bg-gradient', `radial-gradient(circle at 2px 2px, ${config.THEME.primary}22 1px, transparent 0)`);
    } else if (config.DESIGN?.backgroundStyle === 'solid') {
      root.style.setProperty('--bg-gradient', 'none');
    } else {
      root.style.setProperty('--bg-gradient', `linear-gradient(135deg, ${config.THEME.background} 0%, white 100%)`);
    }
  }, [config.THEME, config.DESIGN, config.FONT_FAMILY]);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleSaveConfig = (newConfig: any) => {
    setConfig(newConfig);
    setIsCustomizing(false);
    toast.success('Surprise updated! Now click Share to get your link. ❤️');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const currentEvent = EVENT_TYPES.find(e => e.id === config.EVENT_TYPE) || EVENT_TYPES[0];
  const titlePrefix = currentEvent.titlePrefix;

  if (!isUnlocked) {
    if (!hasSParam) {
      return <WelcomeScreen onStart={handleStart} />;
    }
    return <PasswordLock onUnlock={() => setIsUnlocked(true)} />;
  }

  // Feature 14: Time Lock / Scheduled Reveal
  if (config.SCHEDULED_REVEAL?.enabled) {
    const revealAt = new Date(config.SCHEDULED_REVEAL.revealAt).getTime();
    if (Date.now() < revealAt) {
      return <TimeLockScreen config={config} />;
    }
  }

  return (
    <div className={cn(
      "min-h-screen transition-all duration-1000",
      config.LAYOUT === 'minimal' ? "bg-white" : "bg-romantic-bg"
    )} style={{ fontFamily: 'var(--font-family)' }}>
      <Toaster position="bottom-center" richColors />
      {config.EVENT_TYPE === 'birthday' && <Balloons />}
      <FloatingHearts config={config} />
      {config.DESIGN?.cursorTrail && <CursorTrail config={config} />}

      {/* Feature 2: Now Playing Widget */}
      {/* {config.MUSIC_URL && <NowPlayingWidget config={config} isPlaying={isPlaying} onToggle={toggleMusic} />} */}

      {/* Background Music */}
      {/* <audio ref={audioRef} src={config.MUSIC_URL} loop autoPlay /> */}

      <div className="fixed top-6 right-6 z-40 flex gap-3 no-print">
        {!hasSParam && (
          <>
            <button
              onClick={() => setIsThemeGalleryOpen(true)}
              className="glass p-3 rounded-full text-romantic-pink shadow-lg active:scale-90 transition-all"
              title="Theme Gallery"
            >
              <Palette size={24} />
            </button>
            <button
              onClick={handleShare}
              className="glass p-3 rounded-full text-romantic-pink shadow-lg active:scale-90 transition-all"
              title="Share Surprise"
            >
              <Share2 size={24} />
            </button>
            <button
              onClick={() => setIsCustomizing(true)}
              className="glass p-3 rounded-full text-romantic-pink shadow-lg active:scale-90 transition-all"
              title="Customize Surprise"
            >
              <Edit3 size={24} />
            </button>
          </>
        )}
        {/* <button
          onClick={toggleMusic}
          className="glass p-3 rounded-full text-romantic-pink shadow-lg active:scale-90 transition-all"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button> */}
      </div>

      <AnimatePresence>
        {isThemeGalleryOpen && (
          <ThemeGalleryModal
            isOpen={isThemeGalleryOpen}
            onClose={() => setIsThemeGalleryOpen(false)}
            currentConfig={config}
            onApply={(tplConfig) => setConfig(prev => ({ ...prev, ...tplConfig }))}
          />
        )}
        {isCustomizing && (
          <Customizer
            config={config}
            onSave={handleSaveConfig}
            onClose={() => setIsCustomizing(false)}
            onDownloadHTML={handleDownloadHTML}
            onDownloadPDF={handleDownloadPDF}
            onDownloadStory={handleDownloadStory}
            onEnterCinematicMode={handleEnterCinematicMode}
          />
        )}
        {isShareModalOpen && (
          <ShareModal
            config={config}
            onClose={() => setIsShareModalOpen(false)}
            onDownloadHTML={handleDownloadHTML}
            onDownloadPDF={handleDownloadPDF}
            onDownloadStory={handleDownloadStory}
            onEnterCinematicMode={handleEnterCinematicMode}
          />
        )}
      </AnimatePresence>

      {/* Hidden Story Card for Capture */}
      <div className="fixed -left-[2000px] top-0 pointer-events-none">
        <div ref={storyRef}>
          <StoryCard config={config} templateId={captureTemplateId} />
        </div>
      </div>

      <div
        ref={contentRef}
        className={cn(
          "transition-all duration-1000",
          config.LAYOUT === 'minimal' ? "max-w-6xl mx-auto" : ""
        )}
      >
        {/* Theme Picker Gallery is now a Modal triggered from top bar */}


        {/* Hero Section */}
        {config.LAYOUT === 'modern-split' ? (
          <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#f5f5f4] overflow-hidden">
            <div className="flex flex-col justify-center p-8 md:p-24 border-b md:border-b-0 md:border-r border-black/10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-romantic-pink font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-8">// Special_Edition_2026</p>
                <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-heading leading-[0.85] tracking-tighter mb-8 md:mb-12 break-words">
                  {config.GIRLFRIEND_NAME.toUpperCase()}
                </h1>
                <div className="max-w-md text-lg md:text-xl text-gray-500 italic mb-8 md:mb-12 leading-relaxed">
                  <ReactMarkdown>{config.LOVE_LETTER.split('\n')[0]}</ReactMarkdown>
                </div>
                <div className="flex flex-wrap items-center gap-6 md:gap-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-black/10 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">
                    Forever
                  </div>
                  <div className="hidden sm:block h-px w-16 md:w-24 bg-black/10" />
                  <div className="text-xs md:text-sm font-bold uppercase tracking-widest">By {config.YOUR_NAME}</div>
                </div>
              </motion.div>
            </div>
            <div className="relative h-[60vh] md:h-full">
              <img
                src={config.GIRLFRIEND_PHOTO || config.PHOTOS[0].url}
                className="w-full h-full object-cover"
                alt="Hero"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-romantic-pink/10 mix-blend-overlay" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 glass p-4 md:p-8 rounded-2xl md:rounded-3xl border border-white/20 backdrop-blur-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                    {config.PHOTOS.slice(0, 3).map((p: any, i: number) => (
                      <div key={i} className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden border-2 border-white/50">
                        <img src={p.url} className="w-full h-full object-cover" alt="Thumb" />
                      </div>
                    ))}
                  </div>
                  <div className="text-center sm:text-right w-full sm:w-auto">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Captured</p>
                    <p className="text-white font-mono text-sm md:text-base">{dateStr}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : config.LAYOUT === 'editorial' || config.LAYOUT === 'split' ? (
          <section className="relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden">
            {/* Background Image */}
            {config.HERO_IMAGE && (
              <div className="absolute inset-0 z-0">
                <img
                  src={config.HERO_IMAGE}
                  alt="Background"
                  className="w-full h-full object-cover opacity-20 blur-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-romantic-bg via-romantic-bg/40 to-transparent" />
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-12 items-center z-10 w-full">
              <motion.div
                {...ANIMATION_PRESETS.StaggerContainer}
                initial="initial"
                animate="animate"
                className="text-left"
              >
                <motion.div
                  variants={ANIMATION_PRESETS.StaggerItem}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mb-6 inline-block"
                >
                  <Heart size={48} className="text-romantic-pink" fill="currentColor" />
                </motion.div>
                <motion.h1
                  variants={ANIMATION_PRESETS.StaggerItem}
                  className="text-5xl md:text-8xl font-heading text-gradient mb-6 leading-tight"
                >
                  {titlePrefix} <br /> {config.GIRLFRIEND_NAME}!
                </motion.h1>
                <motion.div
                  variants={ANIMATION_PRESETS.StaggerItem}
                  className="text-xl text-gray-600 mb-10 italic max-w-md markdown-content"
                >
                  <ReactMarkdown>{"\"" + config.LOVE_LETTER.split('\n')[0].substring(0, 100) + "...\""}</ReactMarkdown>
                </motion.div>

                <motion.div variants={ANIMATION_PRESETS.StaggerItem} className="scale-90 origin-left mb-10">
                  <Countdown targetDate={config.BIRTHDAY_DATE} config={config} />
                </motion.div>

                <motion.button
                  variants={ANIMATION_PRESETS.StaggerItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="flex items-center gap-3 text-romantic-pink font-bold text-lg group"
                >
                  Explore Memories
                  <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative hidden md:block"
              >
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50">
                  <img
                    src={config.GIRLFRIEND_PHOTO || config.PHOTOS[0].url}
                    alt="Hero"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-romantic-pink/40 to-transparent" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-romantic-purple/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-romantic-pink/20 rounded-full blur-3xl" />
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-romantic-bg/80 via-transparent to-transparent z-0" />
          </section>
        ) : config.LAYOUT === 'minimal' ? (
          <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
            <motion.div
              {...ANIMATION_PRESETS.StaggerContainer}
              initial="initial"
              animate="animate"
              className="z-10"
            >
              <motion.h1
                variants={ANIMATION_PRESETS.StaggerItem}
                className="text-6xl md:text-9xl font-heading text-gray-900 mb-8 tracking-tighter"
              >
                {config.GIRLFRIEND_NAME}.
              </motion.h1>
              <motion.div variants={ANIMATION_PRESETS.StaggerItem} className="h-px w-24 bg-romantic-pink mx-auto mb-8" />
              <motion.p
                variants={ANIMATION_PRESETS.StaggerItem}
                className="text-lg text-gray-500 mb-12 uppercase tracking-[0.3em] font-light"
              >
                A Celebration of You
              </motion.p>

              <motion.div variants={ANIMATION_PRESETS.StaggerItem} className="mb-12">
                <Countdown targetDate={config.BIRTHDAY_DATE} config={config} />
              </motion.div>

              <motion.button
                variants={ANIMATION_PRESETS.StaggerItem}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="text-sm font-bold uppercase tracking-widest text-romantic-pink hover:opacity-70 transition-opacity"
              >
                Scroll to Begin
              </motion.button>
            </motion.div>
          </section>
        ) : (
          <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
            <motion.div
              {...ANIMATION_PRESETS.StaggerContainer}
              initial="initial"
              animate="animate"
              className="z-10"
            >
              <motion.div
                variants={ANIMATION_PRESETS.StaggerItem}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-6 inline-block"
              >
                <Heart size={64} className="text-romantic-pink" fill="currentColor" />
              </motion.div>
              <motion.h1
                variants={ANIMATION_PRESETS.StaggerItem}
                className="text-5xl md:text-7xl font-heading text-gradient mb-4"
              >
                {titlePrefix} {config.GIRLFRIEND_NAME}!
              </motion.h1>
              <motion.p
                variants={ANIMATION_PRESETS.StaggerItem}
                className="text-xl text-gray-600 mb-8 max-w-md mx-auto italic"
              >
                "This is something special just for you, my love..."
              </motion.p>

              <motion.div variants={ANIMATION_PRESETS.StaggerItem}>
                <Countdown targetDate={config.BIRTHDAY_DATE} config={config} />
              </motion.div>

              <motion.button
                variants={ANIMATION_PRESETS.StaggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="mt-12 flex items-center gap-2 text-romantic-pink font-medium animate-bounce"
              >
                Tap to Begin <ChevronDown size={20} />
              </motion.button>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-romantic-bg" />
          </section>
        )}

        {/* Love Letter Section */}
        <section className={cn(
          "py-20 px-6",
          config.LAYOUT === 'minimal' ? "max-w-4xl mx-auto" : "max-w-2xl mx-auto"
        )}>
          <ParallaxSection offset={30}>
            <motion.div
              {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey] as any}
              whileInView="animate"
              viewport={{ once: true }}
              className={cn(
                "p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500",
                config.LAYOUT === 'scrapbook' ? "bg-[#fdfbf7] rounded-sm border-8 border-white rotate-1 shadow-inner" : "glass rounded-[2rem]",
                config.LAYOUT === 'minimal' ? "border-l-4 border-romantic-pink shadow-none bg-transparent" : ""
              )}
            >
              {config.LAYOUT === 'scrapbook' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-romantic-pink/20 -rotate-2 z-20" />
              )}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageCircle size={100} />
              </div>
              <h2 className={cn(
                "text-3xl font-heading text-romantic-pink mb-8 pb-4",
                config.LAYOUT === 'minimal' ? "text-left border-none" : "border-b border-romantic-pink/20"
              )}>
                A Letter for You
              </h2>
              <div className={cn(
                config.LAYOUT === 'scrapbook' ? "font-serif text-xl leading-loose" : ""
              )}>
                <TypingText text={config.LOVE_LETTER} />
              </div>
            </motion.div>
          </ParallaxSection>
        </section>

        {/* Stats Section */}
        {(config.LAYOUT === 'love-stats' || config.LAYOUT === 'modern-split') && (
          <StatsSection config={config} />
        )}

        {/* Photo Gallery */}
        {config.SECTIONS?.polaroid && (
          <section className={cn(
            "py-20",
            config.LAYOUT === 'minimal' ? "bg-transparent" : "bg-white/30"
          )}>
            <div className="container mx-auto px-4">
              <motion.h2
                {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey] as any}
                whileInView="animate"
                viewport={{ once: true }}
                className={cn(
                  "text-4xl font-heading text-romantic-pink mb-12",
                  config.LAYOUT === 'minimal' ? "text-left" : "text-center"
                )}
              >
                Our Beautiful Memories
              </motion.h2>

              {config.LAYOUT === 'bento' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  {config.PHOTOS.map((photo: any, i: number) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "relative rounded-3xl overflow-hidden shadow-lg group",
                        i === 0 ? "col-span-2 row-span-2 h-[500px]" : "h-[240px]",
                        i === 3 ? "col-span-2 h-[240px]" : ""
                      )}
                    >
                      <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="text-white text-xs italic">{photo.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
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
                      <div className={cn(
                        "relative w-full h-full overflow-hidden shadow-xl group transition-all duration-500",
                        config.LAYOUT === 'scrapbook' ? "bg-white p-3 border-b-8 border-white rounded-none shadow-md -rotate-2" : "rounded-3xl",
                        config.LAYOUT === 'minimal' ? "rounded-none grayscale hover:grayscale-0" : ""
                      )}>
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
              )}
            </div>
          </section>
        )}

        {/* Timeline Section */}
        {config.SECTIONS?.timeline && (
          <section className="py-20 px-6">
            <h2 className={cn(
              "text-4xl font-heading text-romantic-pink mb-16",
              config.LAYOUT === 'minimal' ? "text-left max-w-4xl mx-auto" : "text-center"
            )}>Our Journey Together</h2>
            <motion.div
              {...ANIMATION_PRESETS.StaggerContainer}
              whileInView="animate"
              viewport={{ once: true }}
              className={cn(
                "max-w-lg mx-auto space-y-12",
                config.LAYOUT === 'minimal' ? "max-w-4xl grid md:grid-cols-2 gap-12 space-y-0" : ""
              )}
            >
              {config.TIMELINE.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  variants={ANIMATION_PRESETS.StaggerItem}
                  className={cn(
                    "flex gap-6 items-start",
                    config.LAYOUT === 'minimal' ? "border-b border-gray-100 pb-8" : ""
                  )}
                >
                  <div className={cn(
                    "flex flex-col items-center",
                    config.LAYOUT === 'minimal' ? "hidden" : ""
                  )}>
                    <div className="w-12 h-12 rounded-full bg-romantic-pink text-white flex items-center justify-center shadow-lg">
                      <Calendar size={20} />
                    </div>
                    {i !== config.TIMELINE.length - 1 && (
                      <div className="w-0.5 h-24 bg-romantic-pink/20 mt-2" />
                    )}
                  </div>
                  <div className={cn(
                    "rounded-2xl flex-1",
                    config.LAYOUT === 'minimal' ? "" : "glass p-6"
                  )}>
                    <span className="text-xs font-bold text-romantic-purple uppercase tracking-widest">{item.date}</span>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">{item.event}</h3>
                    <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Map Section */}
        {config.SECTIONS?.map && <MapSection config={config} />}

        {/* Reasons Section */}
        {config.SECTIONS?.reasons && (
          <section className={cn(
            "py-20",
            config.LAYOUT === 'minimal' ? "bg-transparent" : "bg-gradient-to-b from-transparent to-romantic-pink/5"
          )}>
            <div className="container mx-auto px-4">
              <h2 className={cn(
                "text-4xl font-heading text-romantic-pink mb-12",
                config.LAYOUT === 'minimal' ? "text-left max-w-4xl mx-auto" : "text-center"
              )}>Reasons Why I Love You</h2>
              <motion.div
                {...ANIMATION_PRESETS.StaggerContainer}
                whileInView="animate"
                viewport={{ once: true }}
                className={cn(
                  "grid gap-6 max-w-5xl mx-auto",
                  config.LAYOUT === 'bento' ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-3"
                )}
              >
                {config.REASONS_TO_LOVE.map((reason: any, i: number) => (
                  <motion.div
                    key={i}
                    variants={ANIMATION_PRESETS.StaggerItem}
                    whileHover={{ y: -10 }}
                    className={cn(
                      "p-8 rounded-3xl text-center transition-all duration-500",
                      config.LAYOUT === 'bento' && i % 3 === 0 ? "md:col-span-2" : "",
                      config.LAYOUT === 'minimal' ? "border border-gray-100 hover:border-romantic-pink" : "glass hover:bg-white/60 shadow-xl"
                    )}
                  >
                    <div className="text-4xl mb-4">{reason.icon}</div>
                    <p className="text-gray-700 font-medium italic">{reason.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Video Section */}
        {config.SECTIONS?.video && (
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey] as any}
                whileInView="animate"
                viewport={{ once: true }}
                className={cn(
                  "text-4xl font-heading text-romantic-pink mb-12",
                  config.LAYOUT === 'minimal' ? "text-left" : "text-center"
                )}
              >
                A Song for You
              </motion.h2>
              <motion.div
                {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey] as any}
                whileInView="animate"
                viewport={{ once: true }}
                className={cn(
                  "aspect-video overflow-hidden shadow-2xl p-2",
                  config.LAYOUT === 'minimal' ? "rounded-none" : "glass rounded-[2rem]"
                )}
              >
                <iframe width="1013" height="570" src="https://www.youtube.com/embed/OkpIoEC44kk" title="Tenu Sang Rakhna - Jigra | Alia Bhatt | Vedang Raina | Arijit Singh | Achint, Anumita | Varun" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </motion.div>
            </div>
          </section>
        )}

        {/* Fun Section */}
        <section className="py-20 text-center px-6">
          <motion.div
            {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey] as any}
            whileInView="animate"
            viewport={{ once: true }}
            className={cn(
              "p-12 max-w-xl mx-auto relative overflow-hidden transition-all",
              config.LAYOUT === 'minimal' ? "border-2 border-gray-100 rounded-none" : "glass rounded-[3rem]"
            )}
          >
            <h2 className="text-3xl font-heading text-romantic-pink mb-8">Quick Question...</h2>
            <p className="text-2xl font-bold text-gray-800 mb-12">Do you love me? 🥺</p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <motion.button
                {...ANIMATION_PRESETS[config.ANIMATIONS.BUTTONS as AnimationKey] as any}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  confetti({
                    particleCount: Math.floor((config.CONFETTI?.particleCount || 200) * (config.CONFETTI?.density || 1.5)),
                    spread: (config.CONFETTI?.spread || 70) * 1.5,
                    colors: config.CONFETTI?.colors || [config.THEME.primary, config.THEME.secondary, '#ffffff']
                  });
                  toast.success("I KNEW IT! I LOVE YOU TOO! ❤️❤️❤️", {
                    duration: 5000,
                    icon: '❤️'
                  });
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
          </motion.div>
        </section>

        {/* Feature 8: Days Since We Met Counter */}
        {config.SECTIONS?.daysSince && <DaysSinceSection config={config} />}

        {/* Feature 4: Birthday Candles (only for birthday event type) */}
        {config.EVENT_TYPE === 'birthday' && config.SECTIONS?.candles && <BirthdayCandlesSection config={config} />}

        {/* Feature 3: Surprise Envelopes */}
        {config.SECTIONS?.envelopes && <SurpriseEnvelopesSection config={config} />}

        {/* Feature 5: Polaroid Memory Wall */}
        {config.SECTIONS?.polaroid && <PolaroidWallSection config={config} />}

        {/* Feature 6: Star Map */}
        {config.SECTIONS?.starMap && <StarMapSection config={config} />}

        {/* Removed WishList and Guestbook Sections */}

        {/* Final Note */}
        <section className={cn(
          "py-24 text-center px-6",
          config.LAYOUT === 'minimal' ? "bg-transparent" : "bg-gradient-to-t from-romantic-pink/20 to-transparent"
        )}>
          <motion.div
            {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey] as any}
            whileInView="animate"
            viewport={{ once: true }}
            className={cn(config.LAYOUT === 'minimal' ? "max-w-4xl mx-auto" : "")}
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
          <div className="flex items-center justify-center gap-2 mb-2">
            Made with <Heart size={14} className="text-romantic-pink animate-pulse" fill="currentColor" /> by {config.YOUR_NAME}
          </div>
          <p>© 2026 • For My One and Only</p>
        </footer>
      </div>
    </div>
  );
}
