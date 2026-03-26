import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Heart, Music, Music2, Volume2, VolumeX, ChevronDown, Play, Pause, Camera, Calendar, MessageCircle, Gift, MapPin, Share2, Edit3, X, Save, Plus, Trash2, Download, FileText, Video, FileCode, Layout, Zap } from 'lucide-react';
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

const Customizer = ({ config, onSave, onClose, onDownloadHTML, onDownloadPDF, onDownloadStory, onEnterCinematicMode }: { 
  config: any, 
  onSave: (newConfig: any) => void, 
  onClose: () => void,
  onDownloadHTML: () => void,
  onDownloadPDF: () => void,
  onDownloadStory: () => void,
  onEnterCinematicMode: () => void
}) => {
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
          {/* Templates Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Layout size={18} className="text-romantic-pink" /> Choose a Template
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setFormData((prev: any) => ({
                      ...prev,
                      ...template.config,
                      // We can also add unique themes here if we had a theme system
                    }));
                    toast.success(`Applied ${template.name} template!`);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all group relative",
                    formData.THEME.primary === template.config.THEME.primary 
                      ? "border-romantic-pink bg-romantic-pink/5 shadow-inner" 
                      : "border-gray-100 hover:border-romantic-pink/30 hover:bg-gray-50"
                  )}
                  title={template.description}
                >
                  <div className={cn(
                    "p-2 rounded-xl transition-colors",
                    formData.THEME.primary === template.config.THEME.primary 
                      ? "bg-romantic-pink text-white" 
                      : "bg-gray-100 text-gray-400 group-hover:bg-romantic-pink/10 group-hover:text-romantic-pink"
                  )}>
                    <template.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">{template.name}</span>
                  {formData.THEME.primary === template.config.THEME.primary && (
                    <motion.div 
                      layoutId="active-template"
                      className="absolute -top-1 -right-1 bg-romantic-pink text-white rounded-full p-0.5 shadow-sm"
                    >
                      <Heart size={8} fill="currentColor" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Plus size={18} className="text-romantic-pink" /> Theme Colors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(formData.THEME).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{key}</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color"
                      value={value as string}
                      onChange={(e) => {
                        const newTheme = { ...formData.THEME, [key]: e.target.value };
                        setFormData((prev: any) => ({
                          ...prev,
                          THEME: newTheme,
                          CONFETTI: {
                            ...prev.CONFETTI,
                            colors: [newTheme.primary, newTheme.secondary, '#ffffff']
                          }
                        }));
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer border-none"
                    />
                    <input 
                      type="text"
                      value={value as string}
                      onChange={(e) => {
                        const newTheme = { ...formData.THEME, [key]: e.target.value };
                        setFormData((prev: any) => ({
                          ...prev,
                          THEME: newTheme,
                          CONFETTI: {
                            ...prev.CONFETTI,
                            colors: [newTheme.primary, newTheme.secondary, '#ffffff']
                          }
                        }));
                      }}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border outline-none focus:border-romantic-pink"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confetti Customization */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Zap size={18} className="text-romantic-pink" /> Confetti Effects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-500 uppercase">Particle Count</label>
                  <span className="text-xs font-bold text-romantic-pink">{formData.CONFETTI?.particleCount || 150}</span>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={formData.CONFETTI?.particleCount || 150}
                  onChange={(e) => handleChange('CONFETTI', { ...formData.CONFETTI, particleCount: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-romantic-pink"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-500 uppercase">Density Multiplier</label>
                  <span className="text-xs font-bold text-romantic-pink">{formData.CONFETTI?.density || 1}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={formData.CONFETTI?.density || 1}
                  onChange={(e) => handleChange('CONFETTI', { ...formData.CONFETTI, density: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-romantic-pink"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-500 uppercase">Spread Angle</label>
                  <span className="text-xs font-bold text-romantic-pink">{formData.CONFETTI?.spread || 70}°</span>
                </div>
                <input 
                  type="range"
                  min="30"
                  max="360"
                  step="10"
                  value={formData.CONFETTI?.spread || 70}
                  onChange={(e) => handleChange('CONFETTI', { ...formData.CONFETTI, spread: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-romantic-pink"
                />
              </div>
              <div className="flex items-center justify-center">
                <button 
                  onClick={() => confetti({
                    particleCount: Math.floor((formData.CONFETTI?.particleCount || 150) * (formData.CONFETTI?.density || 1)),
                    spread: formData.CONFETTI?.spread || 70,
                    colors: formData.CONFETTI?.colors || [formData.THEME.primary, formData.THEME.secondary, '#ffffff']
                  })}
                  className="px-6 py-2 rounded-full bg-white border-2 border-romantic-pink text-romantic-pink text-xs font-bold hover:bg-romantic-pink hover:text-white transition-all shadow-sm"
                >
                  Test Confetti 🎉
                </button>
              </div>
            </div>
          </div>

          {/* Event Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={18} className="text-romantic-pink" /> Event Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {EVENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleChange('EVENT_TYPE', type.id)}
                  className={cn(
                    "p-3 rounded-2xl border-2 text-left transition-all flex flex-col items-center justify-center gap-1 group",
                    formData.EVENT_TYPE === type.id 
                      ? "border-romantic-pink bg-romantic-pink/10 text-romantic-pink shadow-md" 
                      : "border-gray-100 hover:border-gray-200 text-gray-600 bg-white"
                  )}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{type.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-center">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Heart size={18} className="text-romantic-pink" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Recipient Name</label>
                <input 
                  value={formData.GIRLFRIEND_NAME} 
                  onChange={(e) => handleChange('GIRLFRIEND_NAME', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                  placeholder="Enter name..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Your Name</label>
                <input 
                  value={formData.YOUR_NAME} 
                  onChange={(e) => handleChange('YOUR_NAME', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                  placeholder="Your name..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Password to Unlock</label>
                <input 
                  value={formData.PASSWORD} 
                  onChange={(e) => handleChange('PASSWORD', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                  placeholder="Secret password..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Event Date & Time</label>
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

          {/* Animations */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Play size={18} className="text-romantic-pink" /> Creative Animations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.ANIMATIONS).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">{key.replace('_', ' ')}</label>
                  <select 
                    value={value as string}
                    onChange={(e) => handleChange('ANIMATIONS', { ...formData.ANIMATIONS, [key]: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none bg-white"
                  >
                    {Object.keys(ANIMATION_PRESETS).map((preset) => (
                      <option key={preset} value={preset}>{preset}</option>
                    ))}
                  </select>
                </div>
              ))}
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

          {/* Map Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MapPin size={18} className="text-romantic-pink" /> Map Section
              </h3>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Show Map</label>
                <input 
                  type="checkbox"
                  checked={formData.MAP_CONFIG?.show}
                  onChange={(e) => handleChange('MAP_CONFIG', { ...formData.MAP_CONFIG, show: e.target.checked })}
                  className="w-4 h-4 accent-romantic-pink"
                />
              </div>
            </div>
            {formData.MAP_CONFIG?.show && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-2xl">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Section Title</label>
                  <input 
                    value={formData.MAP_CONFIG.title} 
                    onChange={(e) => handleChange('MAP_CONFIG', { ...formData.MAP_CONFIG, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Location (Address or City)</label>
                  <input 
                    value={formData.MAP_CONFIG.location} 
                    onChange={(e) => handleChange('MAP_CONFIG', { ...formData.MAP_CONFIG, location: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                  <textarea 
                    value={formData.MAP_CONFIG.description} 
                    onChange={(e) => handleChange('MAP_CONFIG', { ...formData.MAP_CONFIG, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 rounded-xl border focus:border-romantic-pink outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Download size={18} className="text-romantic-pink" /> Export & Download
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={onDownloadHTML}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group"
              >
                <FileCode size={24} className="text-romantic-pink mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-700">Save as HTML</span>
                <span className="text-[10px] text-gray-400 mt-1">Offline Shortcut</span>
              </button>
              <button 
                onClick={onDownloadStory}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group"
              >
                <Camera size={24} className="text-romantic-pink mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-700">IG Story</span>
                <span className="text-[10px] text-gray-400 mt-1">9:16 Share Card</span>
              </button>
              <button 
                onClick={onDownloadPDF}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group"
              >
                <FileText size={24} className="text-romantic-pink mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-700">Save as PDF</span>
                <span className="text-[10px] text-gray-400 mt-1">Printable Keepsake</span>
              </button>
              <button 
                onClick={onEnterCinematicMode}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-romantic-pink/30 hover:bg-romantic-pink/5 transition-all group"
              >
                <Video size={24} className="text-romantic-pink mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-700">Record Video</span>
                <span className="text-[10px] text-gray-400 mt-1">Cinematic Mode</span>
              </button>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              onClick={() => onSave(formData)}
              className="w-full py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-bold shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Save size={20} /> Save & Apply
            </button>
            <button 
              onClick={() => setFormData(BIRTHDAY_CONFIG)}
              className="w-full py-3 rounded-full border-2 border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all text-sm"
            >
              Reset to Default
            </button>
          </div>
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
  onDownloadStory: () => void,
  onEnterCinematicMode: () => void
}) => {
  const currentEvent = EVENT_TYPES.find(e => e.id === config.EVENT_TYPE) || EVENT_TYPES[0];
  const [showStoryPreview, setShowStoryPreview] = useState(false);

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

  if (showStoryPreview) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-lg flex flex-col items-center gap-4 md:gap-6 my-auto"
        >
          <div className="absolute -top-12 right-0 flex gap-4">
            <button 
              onClick={() => setShowStoryPreview(false)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="text-center text-white">
            <h3 className="text-lg md:text-xl font-heading">Story Preview</h3>
            <p className="text-[10px] md:text-xs opacity-60">This is how your story will look</p>
          </div>

          {/* Scaled Preview of StoryCard - Responsive sizing */}
          <div 
            className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white/20 bg-white/5"
            style={{ 
              width: 'min(260px, 75vw)', 
              height: 'min(462px, 133vw)', // 9:16 ratio
              position: 'relative'
            }}
          >
            <div style={{ transform: `scale(${Math.min(260, window.innerWidth * 0.75) / 1080})`, transformOrigin: 'top left', width: '1080px', height: '1920px' }}>
              <StoryCard config={config} />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 md:gap-3">
            <button 
              onClick={() => {
                onDownloadStory();
                setShowStoryPreview(false);
              }}
              className="w-full py-3 md:py-4 bg-romantic-pink text-white rounded-xl md:rounded-2xl font-bold shadow-lg hover:bg-romantic-pink/90 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Download size={18} /> Download Image
            </button>
            <button 
              onClick={() => setShowStoryPreview(false)}
              className="w-full py-3 md:py-4 bg-white/10 text-white rounded-xl md:rounded-2xl font-bold hover:bg-white/20 transition-all text-sm md:text-base"
            >
              Go Back
            </button>
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

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-romantic-pink/10 backdrop-blur-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink/20 via-white to-romantic-purple/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              y: [null, '-20%']
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute text-romantic-pink/30"
          >
            <Heart fill="currentColor" size={10 + Math.random() * 20} />
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

const MapSection = ({ config }: { config: any }) => {
  if (!config.MAP_CONFIG?.show) return null;

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(config.MAP_CONFIG.location)}`;
  
  // Fallback if no API key is provided - use a standard search embed which is free but less customizable
  const fallbackMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(config.MAP_CONFIG.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey]}
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
          {...ANIMATION_PRESETS[config.ANIMATIONS.CARDS as AnimationKey]}
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

const StoryCard = ({ config }: { config: any }) => {
  const currentEvent = EVENT_TYPES.find(e => e.id === config.EVENT_TYPE) || EVENT_TYPES[0];
  
  // Standard colors to avoid oklab/oklch issues with html2canvas
  const primaryColor = config.THEME.primary;
  const textColor = config.THEME.text;
  const bgColor = config.THEME.background;

  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '1080px', 
        height: '1920px', 
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: 'sans-serif'
      }}
    >
      {/* Background Decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none' }}>
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            style={{ 
              position: 'absolute',
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 2 + 1})`,
              color: primaryColor
            }}
          >
            <Heart fill="currentColor" size={80} />
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', width: '100%', height: '100%' }}>
        {/* Header / Hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
          <div style={{ padding: '30px', borderRadius: '50%', border: '6px solid white', backgroundColor: 'rgba(255, 255, 255, 0.2)', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
            <Heart size={100} style={{ color: primaryColor }} fill="currentColor" />
          </div>
          <h1 style={{ fontSize: '90px', lineHeight: 1.1, color: primaryColor, fontWeight: 'bold', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            {currentEvent.label} Surprise
          </h1>
          <p style={{ fontSize: '44px', fontWeight: 'bold', opacity: 0.8, margin: 0 }}>For {config.GIRLFRIEND_NAME}</p>
        </div>

        {/* Love Letter Snippet */}
        <div style={{ padding: '40px 50px', borderRadius: '50px', backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '100%', border: '3px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
           <p style={{ fontSize: '30px', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
             "{config.LOVE_LETTER.length > 250 ? config.LOVE_LETTER.substring(0, 250) + '...' : config.LOVE_LETTER}"
           </p>
        </div>

        {/* Reasons Section - Top 3 */}
        <div style={{ width: '100%', textAlign: 'left', padding: '0 20px' }}>
          <h3 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '25px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '3px', borderBottom: `3px solid ${primaryColor}`, paddingBottom: '10px', display: 'inline-block' }}>Why I Love You</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
            {config.REASONS_TO_LOVE.slice(0, 3).map((reason: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px', borderRadius: '25px', backgroundColor: 'rgba(255, 255, 255, 0.15)', border: '2px solid rgba(255, 255, 255, 0.2)' }}>
                <div style={{ fontSize: '40px' }}>{reason.icon}</div>
                <p style={{ fontSize: '30px', margin: 0, fontWeight: 600 }}>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section - Top 2 */}
        <div style={{ width: '100%', textAlign: 'left', padding: '0 20px' }}>
          <h3 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '25px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '3px', borderBottom: `3px solid ${primaryColor}`, paddingBottom: '10px', display: 'inline-block' }}>Our Journey</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {config.TIMELINE.slice(0, 2).map((item: any, i: number) => (
              <div key={i} style={{ borderLeft: `6px solid ${primaryColor}`, paddingLeft: '30px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-13px', top: '0', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', border: `4px solid ${primaryColor}` }} />
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor, margin: '0 0 5px 0', textTransform: 'uppercase' }}>{item.date}</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{item.event}</p>
                <p style={{ fontSize: '26px', opacity: 0.8, margin: 0, lineHeight: 1.3 }}>{item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photos Section - Top 4 */}
        <div style={{ width: '100%', padding: '0 20px' }}>
          <h3 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '25px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '3px', borderBottom: `3px solid ${primaryColor}`, paddingBottom: '10px', display: 'inline-block' }}>Memories</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {config.PHOTOS.slice(0, 4).map((photo: any, i: number) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: '30px', overflow: 'hidden', border: '6px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                <img 
                  src={photo.url} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', marginBottom: '60px', padding: '40px', borderTop: '3px solid rgba(255, 255, 255, 0.3)', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
           <p style={{ fontSize: '38px', fontWeight: 'bold', color: primaryColor }}>Scan to see the full surprise!</p>
           <p style={{ fontSize: '28px', opacity: 0.7, fontStyle: 'italic' }}>Created with love by {config.YOUR_NAME || 'Your Love'}</p>
           <div style={{ width: '120px', height: '8px', backgroundColor: primaryColor, margin: '20px auto 0', borderRadius: '10px' }} />
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [config, setConfig] = useState(BIRTHDAY_CONFIG);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSParam, setHasSParam] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

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

  const handleDownloadStory = async () => {
    if (!storyRef.current) return;
    
    toast.info('Generating Instagram Story card...');
    
    try {
      // Temporarily move the hidden card into view but keep it invisible to ensure full rendering
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
      link.download = `IG_Story_${config.GIRLFRIEND_NAME}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.success('Instagram Story card ready! ❤️');
    } catch (error) {
      console.error('Story generation error:', error);
      toast.error('Failed to generate Story card.');
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
    // Apply theme colors
    const root = document.documentElement;
    root.style.setProperty('--romantic-pink', config.THEME.primary);
    root.style.setProperty('--romantic-purple', config.THEME.secondary);
    root.style.setProperty('--romantic-accent', config.THEME.accent);
    root.style.setProperty('--romantic-bg', config.THEME.background);
    root.style.setProperty('--romantic-text', config.THEME.text);
  }, [config.THEME]);

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
    return <PasswordLock password={config.PASSWORD} onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Toaster position="bottom-center" richColors />
      <FloatingHearts />
      
      {/* Background Music */}
      <audio ref={audioRef} src={config.MUSIC_URL} loop />
      
      <div className="fixed top-6 right-6 z-40 flex gap-3 no-print">
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
          <StoryCard config={config} />
        </div>
      </div>

      <div 
        ref={contentRef}
        className={cn(
          "transition-all duration-1000",
          config.LAYOUT === 'minimal' ? "max-w-6xl mx-auto" : ""
        )}
      >
        {/* Hero Section */}
        {config.LAYOUT === 'editorial' || config.LAYOUT === 'split' ? (
          <section className="relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden">
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
                <motion.p 
                  variants={ANIMATION_PRESETS.StaggerItem}
                  className="text-xl text-gray-600 mb-10 italic max-w-md"
                >
                  "{config.LOVE_LETTER.split('\n')[0].substring(0, 100)}..."
                </motion.p>
                
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
                    src={config.PHOTOS[0].url} 
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
              {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey]}
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

        {/* Photo Gallery */}
        <section className={cn(
          "py-20",
          config.LAYOUT === 'minimal' ? "bg-transparent" : "bg-white/30"
        )}>
          <div className="container mx-auto px-4">
            <motion.h2 
              {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey]}
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

        {/* Timeline Section */}
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

        {/* Map Section */}
        <MapSection config={config} />

        {/* Reasons Section */}
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

        {/* Video Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey]}
              whileInView="animate"
              viewport={{ once: true }}
              className={cn(
                "text-4xl font-heading text-romantic-pink mb-12",
                config.LAYOUT === 'minimal' ? "text-left" : "text-center"
              )}
            >
              A Special Memory
            </motion.h2>
            <motion.div 
              {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey]}
              whileInView="animate"
              viewport={{ once: true }}
              className={cn(
                "aspect-video overflow-hidden shadow-2xl p-2",
                config.LAYOUT === 'minimal' ? "rounded-none" : "glass rounded-[2rem]"
              )}
            >
              <iframe
                className={cn(
                  "w-full h-full",
                  config.LAYOUT === 'minimal' ? "" : "rounded-2xl"
                )}
                src={config.VIDEO_URL}
                title="Romantic Memory"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* Fun Section */}
        <section className="py-20 text-center px-6">
          <motion.div 
            {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey]}
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
                {...ANIMATION_PRESETS[config.ANIMATIONS.BUTTONS as AnimationKey]}
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

        {/* Surprise Section */}
        <section className="py-20 text-center">
          <motion.button
            {...ANIMATION_PRESETS[config.ANIMATIONS.BUTTONS as AnimationKey]}
            whileInView="animate"
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSurprise}
            className="group relative inline-block"
          >
            <div className="absolute -inset-4 bg-romantic-pink/20 rounded-full blur-xl group-hover:bg-romantic-pink/40 transition-all" />
            <div className={cn(
              "p-10 relative transition-all",
              config.LAYOUT === 'minimal' ? "rounded-none border-2 border-romantic-pink" : "glass rounded-full"
            )}>
              <Gift size={64} className="text-romantic-pink" />
            </div>
            <p className="mt-6 font-heading text-2xl text-romantic-pink">Click for Surprise 🎁</p>
          </motion.button>
        </section>

        {/* Final Note */}
        <section className={cn(
          "py-40 text-center px-6",
          config.LAYOUT === 'minimal' ? "bg-transparent" : "bg-gradient-to-t from-romantic-pink/20 to-transparent"
        )}>
          <motion.div
            {...ANIMATION_PRESETS[config.ANIMATIONS.SECTIONS as AnimationKey]}
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
          <div className="flex flex-col items-center justify-center gap-4 mb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-romantic-pink text-white font-medium shadow-lg hover:shadow-romantic-pink/50 transition-all no-print"
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
    </div>
  );
}
