import { motion } from 'motion/react';
import { Template } from '../types/template';

// Image collections from Unsplash
const images = {
  friends: [
    'https://images.unsplash.com/photo-1763951778440-13af353b122a?w=1080',
    'https://images.unsplash.com/photo-1769961982424-d6dc20b70f71?w=1080',
    'https://images.unsplash.com/photo-1758272134263-a658a0d94c2d?w=1080',
    'https://images.unsplash.com/photo-1758275557553-0c46c061d43e?w=1080',
    'https://images.unsplash.com/photo-1769961982398-b3a0068b6c36?w=1080',
    'https://images.unsplash.com/photo-1758275557764-0fc337d4b747?w=1080',
    'https://images.unsplash.com/photo-1760036120428-42742c16a23c?w=1080',
    'https://images.unsplash.com/photo-1758275557598-00d4d4b78ef0?w=1080',
    'https://images.unsplash.com/photo-1758275557668-4da74710e928?w=1080',
    'https://images.unsplash.com/photo-1758275557663-3f43f43d2a45?w=1080',
    'https://images.unsplash.com/photo-1758275557513-241a2a229936?w=1080',
    'https://images.unsplash.com/photo-1763999743312-4c3ed551e481?w=1080',
    'https://images.unsplash.com/photo-1758275557508-5caf0d3e89c0?w=1080',
    'https://images.unsplash.com/photo-1758275557588-12e336174500?w=1080',
    'https://images.unsplash.com/photo-1758275557703-1f01802ec95f?w=1080',
    'https://images.unsplash.com/photo-1758272960157-e7abe8b8a1ec?w=1080',
    'https://images.unsplash.com/photo-1758275557720-37123c8eea5c?w=1080',
    'https://images.unsplash.com/photo-1758272960214-825d8ce6be89?w=1080',
    'https://images.unsplash.com/photo-1765615198082-fcd450b3d687?w=1080',
  ],
  couples: [
    'https://images.unsplash.com/photo-1760669346457-8f1d7e26f6b1?w=1080',
    'https://images.unsplash.com/photo-1765248626449-3e2ad01da3fa?w=1080',
    'https://images.unsplash.com/photo-1765248626522-6ef7a7683968?w=1080',
    'https://images.unsplash.com/photo-1766734865654-dd3dbcd9c6b0?w=1080',
    'https://images.unsplash.com/photo-1768900044120-650653953a6a?w=1080',
    'https://images.unsplash.com/photo-1768900045015-46394d179050?w=1080',
    'https://images.unsplash.com/photo-1765248626663-d8e26767dd48?w=1080',
    'https://images.unsplash.com/photo-1766734864413-e6ed036ad5bb?w=1080',
    'https://images.unsplash.com/photo-1765248628491-f7586db01714?w=1080',
    'https://images.unsplash.com/photo-1768900045126-7b87224a5e27?w=1080',
    'https://images.unsplash.com/photo-1766734865500-034fad860ce0?w=1080',
    'https://images.unsplash.com/photo-1769038954404-310e31c9d588?w=1080',
    'https://images.unsplash.com/photo-1770022056337-a52797c2add0?w=1080',
    'https://images.unsplash.com/photo-1770022006983-6b9c397b20f4?w=1080',
    'https://images.unsplash.com/photo-1774233429558-d31d3b516c7c?w=1080',
    'https://images.unsplash.com/photo-1765248627647-a24fc1e66356?w=1080',
    'https://images.unsplash.com/photo-1758874089276-f55db0fa4b07?w=1080',
    'https://images.unsplash.com/photo-1760669346795-f1779276cfd4?w=1080',
    'https://images.unsplash.com/photo-1766734865407-aaa23bf2f803?w=1080',
    'https://images.unsplash.com/photo-1768467930198-ad16db3e53d4?w=1080',
  ],
  cakes: [
    'https://images.unsplash.com/photo-1594273255015-6d432e36e488?w=1080',
    'https://images.unsplash.com/photo-1714328655091-248ced7a40f2?w=1080',
    'https://images.unsplash.com/photo-1714328655438-18f7b8caaa57?w=1080',
    'https://images.unsplash.com/photo-1617467922183-eee10e02d0db?w=1080',
    'https://images.unsplash.com/photo-1577080415932-2e5a0fbec8e2?w=1080',
    'https://images.unsplash.com/photo-1730406928890-99395b04c0db?w=1080',
    'https://images.unsplash.com/photo-1564638113339-e34a33cce3f2?w=1080',
    'https://images.unsplash.com/photo-1642802031916-875a87c95734?w=1080',
    'https://images.unsplash.com/photo-1729870526122-0de9a7113dc6?w=1080',
    'https://images.unsplash.com/photo-1610670444950-0b29430891b4?w=1080',
    'https://images.unsplash.com/photo-1666125875644-5109656136e1?w=1080',
    'https://images.unsplash.com/photo-1750548546305-31d3480eb2bd?w=1080',
    'https://images.unsplash.com/photo-1585645187768-b6c10786fa14?w=1080',
    'https://images.unsplash.com/photo-1530761017170-1719f93af775?w=1080',
    'https://images.unsplash.com/photo-1638297166240-866903a7190c?w=1080',
    'https://images.unsplash.com/photo-1771070981923-ca7a070a0329?w=1080',
    'https://images.unsplash.com/photo-1617909660121-ee367f2874ef?w=1080',
    'https://images.unsplash.com/photo-1713046976030-22b4b0f0e3c4?w=1080',
    'https://images.unsplash.com/photo-1656237825388-de2a5f3e8d34?w=1080',
    'https://images.unsplash.com/photo-1666126545224-176bc4ae2b77?w=1080',
  ],
  party: [
    'https://images.unsplash.com/photo-1761763159847-6c6f7b7e58d4?w=1080',
    'https://images.unsplash.com/photo-1752857015428-cad7610c25da?w=1080',
    'https://images.unsplash.com/photo-1601676852981-9e04461ddc35?w=1080',
    'https://images.unsplash.com/photo-1651399973942-1721a0de0851?w=1080',
    'https://images.unsplash.com/photo-1699730185428-d11054059c7f?w=1080',
    'https://images.unsplash.com/photo-1501594274184-e8ac81671c76?w=1080',
    'https://images.unsplash.com/photo-1544563422-a46c75a351e5?w=1080',
    'https://images.unsplash.com/photo-1721308303481-1b72cdd51912?w=1080',
    'https://images.unsplash.com/photo-1601676857704-af62e9527567?w=1080',
    'https://images.unsplash.com/photo-1672878316461-e9587d473658?w=1080',
    'https://images.unsplash.com/photo-1607991097055-7ff2829b0d6d?w=1080',
    'https://images.unsplash.com/photo-1698285439446-2ad560e31a17?w=1080',
    'https://images.unsplash.com/photo-1618679186453-2ddbee3f49da?w=1080',
    'https://images.unsplash.com/photo-1542303472-cfd3fa4eb337?w=1080',
    'https://images.unsplash.com/photo-1653564071951-feb5fb297e6b?w=1080',
    'https://images.unsplash.com/photo-1748551204321-845c277c1dba?w=1080',
    'https://images.unsplash.com/photo-1725502082139-495af183ab2d?w=1080',
    'https://images.unsplash.com/photo-1694626007251-8dd2cd25b89c?w=1080',
    'https://images.unsplash.com/photo-1646558583538-624ccabd1fbd?w=1080',
    'https://images.unsplash.com/photo-1724866976329-71fbbc171db2?w=1080',
  ],
  celebration: [
    'https://images.unsplash.com/photo-1771924368572-2ba8c7f6c79d?w=1080',
    'https://images.unsplash.com/photo-1775124848484-556c9b225424?w=1080',
    'https://images.unsplash.com/photo-1764751024357-5cc1b9a6de3a?w=1080',
    'https://images.unsplash.com/photo-1698374178988-9da9609584b8?w=1080',
    'https://images.unsplash.com/photo-1772723246474-60568f39cbd9?w=1080',
    'https://images.unsplash.com/photo-1773040835762-244310bd7bb0?w=1080',
    'https://images.unsplash.com/photo-1769618097064-18657ca12854?w=1080',
    'https://images.unsplash.com/photo-1758525865056-b04843914755?w=1080',
    'https://images.unsplash.com/photo-1771924368620-cd14ac575d45?w=1080',
    'https://images.unsplash.com/photo-1766818437332-5eeb3b17567a?w=1080',
    'https://images.unsplash.com/photo-1759701788457-9e5fecfcefd6?w=1080',
    'https://images.unsplash.com/photo-1764751024362-b69204ab2d04?w=1080',
    'https://images.unsplash.com/photo-1771315022362-fc42a4bd1b66?w=1080',
    'https://images.unsplash.com/photo-1768508947770-bb3eaf08f971?w=1080',
    'https://images.unsplash.com/photo-1772723246325-15a08879f633?w=1080',
    'https://images.unsplash.com/photo-1763651959357-7382188b500f?w=1080',
    'https://images.unsplash.com/photo-1758525865344-bd4e2bfce5ca?w=1080',
    'https://images.unsplash.com/photo-1768244016470-271b210a8407?w=1080',
    'https://images.unsplash.com/photo-1771257808250-fa5fbffa8d54?w=1080',
    'https://images.unsplash.com/photo-1766808982775-f171b60fbb9e?w=1080',
  ],
};

const allImages = [...images.friends, ...images.couples, ...images.cakes, ...images.party, ...images.celebration];

export const storyTemplates: Template[] = [
  // 1-image templates (1-10)
  {
    name: 'Birthday Wish 01',
    imageCount: 1,
    layout: 'single',
    images: [images.friends[0]],
    text: {
      main: 'Happy Birthday',
      sub: 'Make a wish',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
      textColor: '#fff',
      overlay: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Celebration Moment 01',
    imageCount: 1,
    layout: 'single',
    images: [images.couples[0]],
    text: {
      main: 'Celebrating You',
      mainStyle: 'text-5xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: '#1a1a2e',
      textColor: '#FFD700',
      filter: 'brightness(0.9) contrast(1.1)',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Party Vibes 01',
    imageCount: 1,
    layout: 'single',
    images: [images.party[0]],
    text: {
      main: 'PARTY TIME',
      sub: 'Lets go!',
      mainStyle: 'text-7xl font-black',
      subStyle: 'text-3xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00)',
      textColor: '#fff',
      overlay: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.5))',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Sweet Memory 01',
    imageCount: 1,
    layout: 'single',
    images: [images.cakes[0]],
    text: {
      main: 'Make A Wish',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #FFF5EE, #FFE4E1)',
      textColor: '#FF69B4',
      filter: 'saturate(1.2)',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Romantic Celebration',
    imageCount: 1,
    layout: 'single',
    images: [images.couples[1]],
    text: {
      main: 'Forever Together',
      sub: 'Happy Anniversary',
      mainStyle: 'text-5xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Neon Birthday',
    imageCount: 1,
    layout: 'single',
    images: [images.celebration[0]],
    text: {
      main: 'BIRTHDAY',
      sub: 'Vibes Only',
      mainStyle: 'text-8xl font-black',
      subStyle: 'text-2xl',
      fontFamily: 'Arial Black, sans-serif',
    },
    style: {
      background: '#000',
      textColor: '#00F5FF',
      filter: 'brightness(0.8) contrast(1.3)',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Pastel Dream',
    imageCount: 1,
    layout: 'single',
    images: [images.friends[1]],
    text: {
      main: 'Best Day Ever',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
      textColor: '#fff',
      overlay: 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Golden Hour',
    imageCount: 1,
    layout: 'single',
    images: [images.couples[2]],
    text: {
      main: 'Love You More',
      sub: 'Every single day',
      mainStyle: 'text-5xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Bold Statement',
    imageCount: 1,
    layout: 'single',
    images: [images.celebration[1]],
    text: {
      main: 'LETS CELEBRATE',
      mainStyle: 'text-7xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
      textColor: '#fff',
      filter: 'saturate(1.3)',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Minimalist Chic',
    imageCount: 1,
    layout: 'single',
    images: [images.friends[2]],
    text: {
      main: 'You Are Loved',
      mainStyle: 'text-5xl',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: '#f8f9fa',
      textColor: '#2c3e50',
      overlay: 'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(0,0,0,0.1))',
    },
  },

  // 2-image templates (11-20)
  {
    name: 'Split Birthday 01',
    imageCount: 2,
    layout: 'split-2',
    images: [images.friends[3], images.friends[4]],
    text: {
      main: 'Best Friends',
      sub: 'Forever',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #FFB88C, #DE6262)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Double Trouble',
    imageCount: 2,
    layout: 'split-2',
    images: [images.couples[3], images.couples[4]],
    text: {
      main: 'Together',
      mainStyle: 'text-7xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Side by Side',
    imageCount: 2,
    layout: 'split-2',
    images: [images.party[1], images.party[2]],
    text: {
      main: 'Party Duo',
      sub: 'Best night ever',
      mainStyle: 'text-5xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00, #FFD700)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true },
  },
  {
    name: 'Dual Memories',
    imageCount: 2,
    layout: 'split-2',
    images: [images.celebration[2], images.celebration[3]],
    text: {
      main: 'Sweet Moments',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Contrast Vibes',
    imageCount: 2,
    layout: 'split-2',
    images: [images.friends[5], images.cakes[1]],
    text: {
      main: 'Birthday Magic',
      sub: 'Make it count',
      mainStyle: 'text-5xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: '#1a1a2e',
      textColor: '#FFD700',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Two Moods',
    imageCount: 2,
    layout: 'split-2',
    images: [images.couples[5], images.couples[6]],
    text: {
      main: 'Our Story',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Dynamic Split',
    imageCount: 2,
    layout: 'split-2',
    images: [images.party[3], images.party[4]],
    text: {
      main: 'CELEBRATE',
      sub: 'Life is beautiful',
      mainStyle: 'text-7xl font-black',
      subStyle: 'text-2xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #00C9FF, #92FE9D)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Pastel Pair',
    imageCount: 2,
    layout: 'split-2',
    images: [images.friends[6], images.friends[7]],
    text: {
      main: 'BFF Goals',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Bold & Beautiful',
    imageCount: 2,
    layout: 'split-2',
    images: [images.celebration[4], images.celebration[5]],
    text: {
      main: 'Unforgettable',
      sub: 'Moments',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 90%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Love Split',
    imageCount: 2,
    layout: 'split-2',
    images: [images.couples[7], images.couples[8]],
    text: {
      main: 'Forever Us',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },

  // 3-4 image templates (21-35)
  {
    name: 'Birthday Grid 01',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.friends[8], images.friends[9], images.cakes[2], images.party[5]],
    text: {
      main: 'Squad Goals',
      sub: 'Birthday edition',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Four Moments',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.couples[9], images.couples[10], images.couples[11], images.couples[12]],
    text: {
      main: 'Our Journey',
      mainStyle: 'text-5xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #FF9A9E, #FAD0C4)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Party Grid',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.party[6], images.party[7], images.party[8], images.party[9]],
    text: {
      main: 'EPIC NIGHT',
      sub: 'Memories made',
      mainStyle: 'text-7xl font-black',
      subStyle: 'text-2xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00)',
      textColor: '#fff',
    },
    decorations: { balloons: true, confetti: true },
  },
  {
    name: 'Celebration Quad',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.celebration[6], images.celebration[7], images.celebration[8], images.celebration[9]],
    text: {
      main: 'Happy Together',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Sweet Sixteen Grid',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.friends[10], images.cakes[3], images.friends[11], images.cakes[4]],
    text: {
      main: 'Special Day',
      sub: 'Sweet moments',
      mainStyle: 'text-5xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Memory Lane',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.couples[13], images.couples[14], images.couples[15], images.couples[16]],
    text: {
      main: 'Together Forever',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Neon Party Grid',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.party[10], images.party[11], images.party[12], images.party[13]],
    text: {
      main: 'WILD NIGHT',
      mainStyle: 'text-7xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: '#000',
      textColor: '#00F5FF',
      filter: 'brightness(0.9)',
    },
    decorations: { sparkles: true, confetti: true },
  },
  {
    name: 'Pastel Memories',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.friends[12], images.friends[13], images.friends[14], images.friends[15]],
    text: {
      main: 'Best Friends',
      sub: 'Always',
      mainStyle: 'text-6xl',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Golden Memories',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.celebration[10], images.celebration[11], images.celebration[12], images.celebration[13]],
    text: {
      main: 'Cheers',
      sub: 'To amazing times',
      mainStyle: 'text-7xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #f6d365, #fda085)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Vibrant Grid',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.cakes[5], images.friends[16], images.cakes[6], images.party[14]],
    text: {
      main: 'Birthday Bliss',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
      textColor: '#fff',
    },
    decorations: { confetti: true, sparkles: true },
  },
  {
    name: 'Romantic Grid',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.couples[17], images.couples[18], images.couples[19], images.couples[0]],
    text: {
      main: 'Love Story',
      sub: 'Chapter one',
      mainStyle: 'text-5xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Festival Vibes',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.party[15], images.party[16], images.party[17], images.party[18]],
    text: {
      main: 'PARTY MODE',
      mainStyle: 'text-7xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(to right, #FF0080, #FFD700)',
      textColor: '#fff',
    },
    decorations: { balloons: true, confetti: true },
  },
  {
    name: 'Dreamy Grid',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.celebration[14], images.celebration[15], images.celebration[16], images.celebration[17]],
    text: {
      main: 'Dream Team',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Cake & Friends',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.cakes[7], images.friends[17], images.cakes[8], images.friends[18]],
    text: {
      main: 'Sweet Life',
      sub: 'Celebrate everyday',
      mainStyle: 'text-5xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Sunset Celebration',
    imageCount: 4,
    layout: 'grid-4',
    images: [images.couples[1], images.couples[2], images.couples[3], images.couples[4]],
    text: {
      main: 'Golden Hour',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true, sparkles: true },
  },

  // 5-10 image templates - Collage style (36-60)
  {
    name: 'Birthday Collage 01',
    imageCount: 6,
    layout: 'collage-5-10',
    images: [images.friends[0], images.friends[1], images.cakes[0], images.party[0], images.friends[2], images.cakes[1]],
    text: {
      main: 'Best Birthday',
      sub: 'Ever',
      mainStyle: 'text-7xl font-bold',
      subStyle: 'text-3xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #FFB6C1, #FFC0CB, #FFE4E1)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true },
  },
  {
    name: 'Memory Collage 01',
    imageCount: 7,
    layout: 'collage-5-10',
    images: images.couples.slice(0, 7),
    text: {
      main: 'Our Moments',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      textColor: '#fff',
    },
    decorations: { hearts: true, sparkles: true },
  },
  {
    name: 'Party Collage 01',
    imageCount: 8,
    layout: 'collage-5-10',
    images: images.party.slice(0, 8),
    text: {
      main: 'EPIC PARTY',
      sub: 'Legendary night',
      mainStyle: 'text-7xl font-black',
      subStyle: 'text-2xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00, #FFD700)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true },
  },
  {
    name: 'Friendship Collage',
    imageCount: 6,
    layout: 'collage-5-10',
    images: images.friends.slice(5, 11),
    text: {
      main: 'Squad Love',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Celebration Collage 01',
    imageCount: 7,
    layout: 'collage-5-10',
    images: images.celebration.slice(0, 7),
    text: {
      main: 'Good Vibes',
      sub: 'Only',
      mainStyle: 'text-7xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Cake Moments',
    imageCount: 5,
    layout: 'collage-5-10',
    images: images.cakes.slice(0, 5),
    text: {
      main: 'Sweet Dreams',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Love Collage',
    imageCount: 8,
    layout: 'collage-5-10',
    images: images.couples.slice(8, 16),
    text: {
      main: 'Forever',
      sub: 'Together',
      mainStyle: 'text-7xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Neon Memories',
    imageCount: 6,
    layout: 'collage-5-10',
    images: images.party.slice(8, 14),
    text: {
      main: 'UNFORGETTABLE',
      mainStyle: 'text-6xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: '#000',
      textColor: '#00F5FF',
    },
    decorations: { sparkles: true, confetti: true },
  },
  {
    name: 'Pastel Collage',
    imageCount: 7,
    layout: 'collage-5-10',
    images: images.friends.slice(10, 17),
    text: {
      main: 'Besties',
      sub: 'For life',
      mainStyle: 'text-6xl',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Golden Collage',
    imageCount: 8,
    layout: 'collage-5-10',
    images: images.celebration.slice(8, 16),
    text: {
      main: 'Special Day',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #f6d365, #fda085)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Birthday Scrapbook 01',
    imageCount: 9,
    layout: 'scrapbook',
    images: [...images.friends.slice(0, 3), ...images.cakes.slice(0, 3), ...images.party.slice(0, 3)],
    text: {
      main: 'Birthday',
      sub: 'Memories',
      mainStyle: 'text-7xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #FFB88C, #DE6262)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Scrapbook Love',
    imageCount: 10,
    layout: 'scrapbook',
    images: images.couples.slice(0, 10),
    text: {
      main: 'Our Story',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #FF9A9E, #FAD0C4)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Party Scrapbook',
    imageCount: 8,
    layout: 'scrapbook',
    images: images.party.slice(5, 13),
    text: {
      main: 'CRAZY NIGHT',
      mainStyle: 'text-7xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 90%)',
      textColor: '#fff',
    },
    decorations: { balloons: true, confetti: true },
  },
  {
    name: 'Friendship Scrapbook',
    imageCount: 9,
    layout: 'scrapbook',
    images: images.friends.slice(8, 17),
    text: {
      main: 'Friends Forever',
      sub: 'Always',
      mainStyle: 'text-6xl',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Celebration Scrapbook',
    imageCount: 10,
    layout: 'scrapbook',
    images: images.celebration.slice(5, 15),
    text: {
      main: 'Happy Times',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Polaroid Birthday 01',
    imageCount: 5,
    layout: 'polaroid',
    images: [...images.friends.slice(0, 2), ...images.cakes.slice(0, 2), images.party[0]],
    text: {
      main: 'Snapshot',
      sub: 'Birthday moments',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Polaroid Love',
    imageCount: 6,
    layout: 'polaroid',
    images: images.couples.slice(5, 11),
    text: {
      main: 'Us',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Polaroid Party',
    imageCount: 6,
    layout: 'polaroid',
    images: images.party.slice(10, 16),
    text: {
      main: 'Party Pics',
      mainStyle: 'text-6xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FFD700)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Polaroid Memories',
    imageCount: 5,
    layout: 'polaroid',
    images: images.celebration.slice(10, 15),
    text: {
      main: 'Good Times',
      sub: 'Never end',
      mainStyle: 'text-6xl',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Polaroid Celebration',
    imageCount: 6,
    layout: 'polaroid',
    images: [...images.friends.slice(10, 13), ...images.cakes.slice(5, 8)],
    text: {
      main: 'Cheers',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Overlap Birthday',
    imageCount: 5,
    layout: 'overlap',
    images: [...images.friends.slice(0, 2), ...images.cakes.slice(0, 2), images.party[0]],
    text: {
      main: 'Layered Love',
      sub: 'Birthday edition',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Overlap Romance',
    imageCount: 5,
    layout: 'overlap',
    images: images.couples.slice(10, 15),
    text: {
      main: 'Together',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Overlap Party',
    imageCount: 5,
    layout: 'overlap',
    images: images.party.slice(15, 20),
    text: {
      main: 'WILD',
      sub: 'Times',
      mainStyle: 'text-8xl font-black',
      subStyle: 'text-2xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00)',
      textColor: '#fff',
    },
    decorations: { confetti: true, sparkles: true },
  },
  {
    name: 'Overlap Friends',
    imageCount: 5,
    layout: 'overlap',
    images: images.friends.slice(12, 17),
    text: {
      main: 'BFF',
      mainStyle: 'text-7xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Overlap Celebration',
    imageCount: 5,
    layout: 'overlap',
    images: images.celebration.slice(14, 19),
    text: {
      main: 'Celebrate',
      sub: 'Every moment',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #f093fb, #f5576c)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },

  // 10-20 image templates - Dense collage (61-100)
  {
    name: 'Birthday Memory Wall 01',
    imageCount: 12,
    layout: 'collage-dense',
    images: [...images.friends.slice(0, 6), ...images.cakes.slice(0, 3), ...images.party.slice(0, 3)],
    text: {
      main: 'Birthday',
      sub: 'Overload',
      mainStyle: 'text-8xl font-bold',
      subStyle: 'text-3xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true },
  },
  {
    name: 'Love Wall',
    imageCount: 15,
    layout: 'collage-dense',
    images: images.couples.slice(0, 15),
    text: {
      main: 'Our Love',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Party Wall',
    imageCount: 18,
    layout: 'collage-dense',
    images: images.party.slice(0, 18),
    text: {
      main: 'PARTY',
      sub: 'All night',
      mainStyle: 'text-9xl font-black',
      subStyle: 'text-2xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FFD700)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true, sparkles: true },
  },
  {
    name: 'Friendship Wall',
    imageCount: 14,
    layout: 'collage-dense',
    images: images.friends.slice(0, 14),
    text: {
      main: 'Squad',
      mainStyle: 'text-8xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { hearts: true, sparkles: true },
  },
  {
    name: 'Celebration Wall',
    imageCount: 16,
    layout: 'collage-dense',
    images: images.celebration.slice(0, 16),
    text: {
      main: 'Happy',
      sub: 'Together',
      mainStyle: 'text-8xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Cake Gallery',
    imageCount: 10,
    layout: 'collage-dense',
    images: images.cakes.slice(0, 10),
    text: {
      main: 'Sweet',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Romance Gallery',
    imageCount: 20,
    layout: 'collage-dense',
    images: images.couples.slice(0, 20),
    text: {
      main: 'Forever',
      mainStyle: 'text-8xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Neon Night',
    imageCount: 13,
    layout: 'collage-dense',
    images: images.party.slice(5, 18),
    text: {
      main: 'EPIC',
      mainStyle: 'text-9xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: '#000',
      textColor: '#00F5FF',
    },
    decorations: { sparkles: true, confetti: true },
  },
  {
    name: 'Pastel Gallery',
    imageCount: 17,
    layout: 'collage-dense',
    images: [...images.friends.slice(0, 10), ...images.celebration.slice(0, 7)],
    text: {
      main: 'Besties',
      sub: 'Forever',
      mainStyle: 'text-7xl',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Golden Gallery',
    imageCount: 11,
    layout: 'collage-dense',
    images: images.celebration.slice(5, 16),
    text: {
      main: 'Cheers',
      mainStyle: 'text-8xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #f6d365, #fda085)',
      textColor: '#fff',
    },
    decorations: { sparkles: true, confetti: true },
  },
  {
    name: 'Timeline Birthday',
    imageCount: 5,
    layout: 'timeline',
    images: [...images.friends.slice(0, 2), images.cakes[0], images.party[0], images.friends[2]],
    text: {
      main: 'Journey',
      sub: 'Through the years',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Timeline Love',
    imageCount: 5,
    layout: 'timeline',
    images: images.couples.slice(15, 20),
    text: {
      main: 'Our Timeline',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Timeline Party',
    imageCount: 5,
    layout: 'timeline',
    images: images.party.slice(0, 5),
    text: {
      main: 'Night Flow',
      mainStyle: 'text-6xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Timeline Friends',
    imageCount: 5,
    layout: 'timeline',
    images: images.friends.slice(5, 10),
    text: {
      main: 'Friend Path',
      sub: 'Always together',
      mainStyle: 'text-6xl',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Timeline Celebration',
    imageCount: 5,
    layout: 'timeline',
    images: images.celebration.slice(0, 5),
    text: {
      main: 'Moments',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Circle Birthday',
    imageCount: 9,
    layout: 'circle-grid',
    images: [...images.friends.slice(0, 3), ...images.cakes.slice(0, 3), ...images.party.slice(0, 3)],
    text: {
      main: 'Full Circle',
      sub: 'Birthday joy',
      mainStyle: 'text-6xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Circle Love',
    imageCount: 9,
    layout: 'circle-grid',
    images: images.couples.slice(0, 9),
    text: {
      main: 'Circle of Love',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Circle Party',
    imageCount: 9,
    layout: 'circle-grid',
    images: images.party.slice(5, 14),
    text: {
      main: 'PARTY CIRCLE',
      mainStyle: 'text-7xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FFD700)',
      textColor: '#fff',
    },
    decorations: { confetti: true, sparkles: true },
  },
  {
    name: 'Circle Friends',
    imageCount: 9,
    layout: 'circle-grid',
    images: images.friends.slice(8, 17),
    text: {
      main: 'Friend Circle',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Circle Celebration',
    imageCount: 9,
    layout: 'circle-grid',
    images: images.celebration.slice(8, 17),
    text: {
      main: 'Joy Circle',
      sub: 'Complete',
      mainStyle: 'text-7xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #f093fb, #f5576c)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Diagonal Birthday',
    imageCount: 6,
    layout: 'diagonal',
    images: [...images.friends.slice(0, 2), ...images.cakes.slice(0, 2), ...images.party.slice(0, 2)],
    text: {
      main: 'Dynamic',
      sub: 'Birthday vibes',
      mainStyle: 'text-7xl font-bold',
      subStyle: 'text-xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 90%)',
      textColor: '#fff',
    },
    decorations: { balloons: true },
  },
  {
    name: 'Diagonal Love',
    imageCount: 6,
    layout: 'diagonal',
    images: images.couples.slice(8, 14),
    text: {
      main: 'Tilted Love',
      mainStyle: 'text-6xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Diagonal Party',
    imageCount: 6,
    layout: 'diagonal',
    images: images.party.slice(10, 16),
    text: {
      main: 'WILD ANGLE',
      mainStyle: 'text-7xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00)',
      textColor: '#fff',
    },
    decorations: { confetti: true },
  },
  {
    name: 'Diagonal Friends',
    imageCount: 6,
    layout: 'diagonal',
    images: images.friends.slice(10, 16),
    text: {
      main: 'Slanted Squad',
      sub: 'Best crew',
      mainStyle: 'text-6xl',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Diagonal Celebration',
    imageCount: 6,
    layout: 'diagonal',
    images: images.celebration.slice(10, 16),
    text: {
      main: 'Angled Joy',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Heart Birthday',
    imageCount: 7,
    layout: 'heart-shape',
    images: [...images.friends.slice(0, 3), ...images.cakes.slice(0, 2), ...images.party.slice(0, 2)],
    text: {
      main: 'Love',
      sub: 'Your birthday',
      mainStyle: 'text-8xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
      textColor: '#fff',
    },
    decorations: { hearts: true, sparkles: true },
  },
  {
    name: 'Heart Love',
    imageCount: 7,
    layout: 'heart-shape',
    images: images.couples.slice(0, 7),
    text: {
      main: 'My Heart',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Heart Party',
    imageCount: 7,
    layout: 'heart-shape',
    images: images.party.slice(0, 7),
    text: {
      main: 'HEART PARTY',
      mainStyle: 'text-6xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FFD700)',
      textColor: '#fff',
    },
    decorations: { hearts: true, confetti: true },
  },
  {
    name: 'Heart Friends',
    imageCount: 7,
    layout: 'heart-shape',
    images: images.friends.slice(5, 12),
    text: {
      main: 'Heartfelt',
      sub: 'Friendship',
      mainStyle: 'text-6xl',
      subStyle: 'text-xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Heart Celebration',
    imageCount: 7,
    layout: 'heart-shape',
    images: images.celebration.slice(0, 7),
    text: {
      main: 'With Love',
      mainStyle: 'text-7xl font-bold',
      subStyle: '',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #f093fb, #f5576c)',
      textColor: '#fff',
    },
    decorations: { hearts: true, sparkles: true },
  },
  {
    name: 'Mega Birthday Collage',
    imageCount: 20,
    layout: 'collage-dense',
    images: [...images.friends.slice(0, 10), ...images.cakes.slice(0, 5), ...images.party.slice(0, 5)],
    text: {
      main: 'BIRTHDAY',
      sub: 'Extravaganza',
      mainStyle: 'text-9xl font-black',
      subStyle: 'text-3xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true, sparkles: true, hearts: true },
  },
  {
    name: 'Rainbow Birthday',
    imageCount: 12,
    layout: 'collage-dense',
    images: [...images.friends.slice(0, 6), ...images.party.slice(0, 6)],
    text: {
      main: 'Colorful',
      sub: 'Birthday',
      mainStyle: 'text-8xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #FF0080, #FF8C00, #FFD700, #00F5FF, #667eea)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true },
  },
  {
    name: 'Vintage Birthday',
    imageCount: 10,
    layout: 'scrapbook',
    images: [...images.friends.slice(0, 5), ...images.cakes.slice(0, 5)],
    text: {
      main: 'Memories',
      sub: 'To treasure',
      mainStyle: 'text-6xl',
      subStyle: 'text-xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to bottom, #f6d365, #fda085)',
      textColor: '#fff',
      filter: 'sepia(0.2) contrast(1.1)',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Minimalist Grid',
    imageCount: 9,
    layout: 'circle-grid',
    images: images.celebration.slice(0, 9),
    text: {
      main: 'Simple Joy',
      mainStyle: 'text-6xl',
      subStyle: '',
      fontFamily: 'Arial, sans-serif',
    },
    style: {
      background: '#f8f9fa',
      textColor: '#2c3e50',
    },
  },
  {
    name: 'Neon Birthday Grid',
    imageCount: 16,
    layout: 'collage-dense',
    images: [...images.party.slice(0, 8), ...images.friends.slice(0, 8)],
    text: {
      main: 'NEON NIGHT',
      mainStyle: 'text-9xl font-black',
      subStyle: '',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: '#000',
      textColor: '#00F5FF',
      filter: 'brightness(0.9) contrast(1.2)',
    },
    decorations: { sparkles: true, confetti: true },
  },
  {
    name: 'Pastel Heaven',
    imageCount: 15,
    layout: 'collage-dense',
    images: images.friends.slice(0, 15),
    text: {
      main: 'Dream Team',
      sub: 'Forever',
      mainStyle: 'text-7xl',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#fff',
    },
    decorations: { hearts: true, balloons: true },
  },
  {
    name: 'Golden Moments',
    imageCount: 14,
    layout: 'collage-dense',
    images: [...images.couples.slice(0, 7), ...images.celebration.slice(0, 7)],
    text: {
      main: 'Golden',
      sub: 'Memories',
      mainStyle: 'text-8xl font-bold',
      subStyle: 'text-2xl',
      fontFamily: 'Georgia, serif',
    },
    style: {
      background: 'linear-gradient(to right, #f6d365, #fda085)',
      textColor: '#fff',
    },
    decorations: { sparkles: true },
  },
  {
    name: 'Party Overload',
    imageCount: 19,
    layout: 'collage-dense',
    images: [...images.party.slice(0, 19)],
    text: {
      main: 'PARTY',
      sub: 'Never stops',
      mainStyle: 'text-10xl font-black',
      subStyle: 'text-3xl',
      fontFamily: 'Impact, sans-serif',
    },
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00, #FFD700)',
      textColor: '#fff',
    },
    decorations: { confetti: true, balloons: true, sparkles: true },
  },
  {
    name: 'Romantic Collage',
    imageCount: 18,
    layout: 'collage-dense',
    images: images.couples.slice(0, 18),
    text: {
      main: 'Us',
      mainStyle: 'text-9xl font-bold',
      subStyle: '',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to right, #e96443, #904e95)',
      textColor: '#fff',
    },
    decorations: { hearts: true },
  },
  {
    name: 'Friendship Mega Wall',
    imageCount: 20,
    layout: 'collage-dense',
    images: [...images.friends.slice(0, 15), ...images.celebration.slice(0, 5)],
    text: {
      main: 'Friends',
      sub: 'For life',
      mainStyle: 'text-8xl',
      subStyle: 'text-2xl',
      fontFamily: 'cursive',
    },
    style: {
      background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)',
      textColor: '#fff',
    },
    decorations: { hearts: true, sparkles: true },
  },
];

interface StoryTemplateProps {
  template: Template;
  isPreview: boolean;
  config?: any;
}

export function StoryTemplate({ template, isPreview, config }: StoryTemplateProps) {
  const { layout, text, style, decorations } = template;
  
  // Use config's photos if available, else fallback to template images
  let finalImages = template.images;
  if (config && config.PHOTOS && config.PHOTOS.length > 0) {
    const customPhotos = config.PHOTOS.map((p: any) => p.url);
    if (config.GIRLFRIEND_PHOTO) {
        customPhotos.unshift(config.GIRLFRIEND_PHOTO);
    }
    // Repeat custom photos to fill the required count
    finalImages = Array.from({ length: template.images.length }, (_, i) => customPhotos[i % customPhotos.length]);
  }
  
  // Try to blend user config into text
  let finalMainText = text.main;
  if (config && config.GIRLFRIEND_NAME && finalMainText && finalMainText.includes('Happy')) {
      finalMainText = `Happy Birthday ${config.GIRLFRIEND_NAME}`;
  }

  return (
    <div
      className="relative w-[1080px] h-[1920px] overflow-hidden"
      style={{
        background: style.background,
      }}
    >
      {/* Images Layer */}
      <div className="absolute inset-0">
        {layout === 'single' && <SingleImageLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'split-2' && <SplitTwoLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'grid-4' && <GridFourLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'collage-5-10' && <CollageMediumLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'collage-dense' && <CollageDenseLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'polaroid' && <PolaroidLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'overlap' && <OverlapLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'scrapbook' && <ScrapbookLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'timeline' && <TimelineLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'circle-grid' && <CircleGridLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'diagonal' && <DiagonalLayout images={finalImages} style={style} isPreview={isPreview} />}
        {layout === 'heart-shape' && <HeartShapeLayout images={finalImages} style={style} isPreview={isPreview} />}
      </div>

      {/* Decorations Layer */}
      {decorations && !isPreview && (
        <div className="absolute inset-0 pointer-events-none">
          {decorations.confetti && <ConfettiDecoration />}
          {decorations.balloons && <BalloonsDecoration />}
          {decorations.sparkles && <SparklesDecoration />}
          {decorations.hearts && <HeartsDecoration />}
        </div>
      )}

      {/* Text Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none z-50">
        {finalMainText && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: isPreview ? 0 : 0.3 }}
            className={`${text.mainStyle} text-center mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]`}
            style={{
              color: style.textColor,
              fontFamily: text.fontFamily,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            {finalMainText}
          </motion.h1>
        )}
        {text.sub && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isPreview ? 0 : 0.5 }}
            className={`${text.subStyle} text-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] bg-black/20 px-8 py-4 rounded-full backdrop-blur-md`}
            style={{
              color: style.textColor,
              fontFamily: text.subFont || text.fontFamily,
            }}
          >
            {text.sub}
          </motion.p>
        )}
      </div>

      {/* Overlay */}
      {style.overlay && (
        <div
          className="absolute inset-0 pointer-events-none z-40"
          style={{ background: style.overlay }}
        />
      )}
    </div>
  );
}

// Layout Components
function SingleImageLayout({ images, style, isPreview }: any) {
  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: isPreview ? 0 : 0.8 }}
      className="w-full h-full"
    >
      <img
        src={images[0]}
        alt=""
        crossOrigin="anonymous"
        className="w-full h-full object-cover"
        style={{ filter: style.filter }}
      />
    </motion.div>
  );
}

function SplitTwoLayout({ images, style, isPreview }: any) {
  return (
    <div className="w-full h-full flex flex-col">
      {images.slice(0, 2).map((img: string, i: number) => (
        <motion.div
          key={i}
          initial={{ y: i === 0 ? -100 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: isPreview ? 0 : i * 0.2 }}
          className="flex-1"
        >
          <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
        </motion.div>
      ))}
    </div>
  );
}

function GridFourLayout({ images, style, isPreview }: any) {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-4 p-8">
      {images.slice(0, 4).map((img: string, i: number) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: isPreview ? 0 : i * 0.15 }}
          className="rounded-[40px] overflow-hidden shadow-2xl"
        >
          <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
        </motion.div>
      ))}
    </div>
  );
}

function CollageMediumLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 8);
  return (
    <div className="w-full h-full p-12 flex flex-wrap gap-8 items-center justify-center pt-32">
      {images.slice(0, count).map((img: string, i: number) => {
        const sizes = ['w-[400px] h-[400px]', 'w-[450px] h-[350px]', 'w-[350px] h-[450px]', 'w-[500px] h-[400px]', 'w-[400px] h-[500px]'];
        const rotations = ['rotate-2', '-rotate-3', 'rotate-1', '-rotate-6', 'rotate-6'];
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ scale: 1, rotate: parseInt(rotations[i % 5].replace(/[^0-9-]/g, '')), opacity: 1 }}
            transition={{ delay: isPreview ? 0 : i * 0.1 }}
            className={`${sizes[i % 5]} ${rotations[i % 5]} rounded-[40px] overflow-hidden shadow-2xl border-8 border-white`}
          >
            <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function CollageDenseLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 20);
  return (
    <div className="w-full h-full p-8 pt-40">
      <div className="w-full h-full grid grid-cols-4 gap-4">
        {images.slice(0, count).map((img: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: isPreview ? 0 : i * 0.05 }}
            className="rounded-2xl overflow-hidden shadow-md"
            style={{ gridColumn: i % 7 === 0 ? 'span 2' : 'span 1', gridRow: i % 5 === 0 ? 'span 2' : 'span 1' }}
          >
            <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PolaroidLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 6);
  return (
    <div className="w-full h-full p-16 flex flex-wrap gap-8 items-center justify-center pt-40">
      {images.slice(0, count).map((img: string, i: number) => {
        const rotations = ['-rotate-6', 'rotate-4', '-rotate-3', 'rotate-5', '-rotate-4', 'rotate-6'];
        return (
          <motion.div
            key={i}
            initial={{ y: -200, rotate: 0, opacity: 0 }}
            animate={{ y: 0, rotate: parseInt(rotations[i].replace(/[^0-9-]/g, '')), opacity: 1 }}
            transition={{ delay: isPreview ? 0 : i * 0.15, type: 'spring' }}
            className={`bg-white p-6 pb-24 shadow-2xl ${rotations[i]}`}
            style={{ width: '400px' }}
          >
            <img src={img} alt="" crossOrigin="anonymous" className="w-full h-[400px] object-cover" style={{ filter: style.filter }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function OverlapLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 5);
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full h-[1200px] max-w-[800px]">
        {images.slice(0, count).map((img: string, i: number) => (
          <motion.div
            key={i}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: isPreview ? 0 : i * 0.2 }}
            className="absolute rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white"
            style={{
              width: '600px',
              height: '800px',
              top: `${i * 120}px`,
              left: `${i * 60}px`,
              zIndex: count - i,
            }}
          >
            <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScrapbookLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 12);
  return (
    <div className="w-full h-full p-12 relative pt-32">
      {images.slice(0, count).map((img: string, i: number) => {
        const positions = [
          { top: '5%', left: '5%', width: '35%', rotate: -5 },
          { top: '8%', right: '8%', width: '40%', rotate: 4 },
          { top: '25%', left: '10%', width: '38%', rotate: 2 },
          { top: '40%', right: '5%', width: '45%', rotate: -3 },
          { top: '50%', left: '8%', width: '42%', rotate: 5 },
          { top: '62%', right: '10%', width: '40%', rotate: -4 },
          { top: '70%', left: '5%', width: '46%', rotate: 3 },
          { top: '88%', right: '8%', width: '38%', rotate: -2 },
        ];
        const pos = positions[i % positions.length];
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ scale: 1, rotate: pos.rotate, opacity: 1 }}
            transition={{ delay: isPreview ? 0 : i * 0.1 }}
            className="absolute bg-white p-4 shadow-2xl"
            style={{
              ...pos,
              width: pos.width,
            }}
          >
            <img src={img} alt="" crossOrigin="anonymous" className="w-full aspect-square object-cover" style={{ filter: style.filter }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function TimelineLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 5);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-16 pt-40">
      {images.slice(0, count).map((img: string, i: number) => (
        <motion.div
          key={i}
          initial={{ x: i % 2 === 0 ? -200 : 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: isPreview ? 0 : i * 0.2 }}
          className="flex items-center gap-8 w-full"
          style={{ flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}
        >
          <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-8 border-white flex-shrink-0">
            <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
          </div>
          <div className="flex-1 h-3 bg-white/50 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}

function CircleGridLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 9);
  return (
    <div className="w-full h-full grid grid-cols-3 gap-8 p-16 pt-40 align-middle">
      {images.slice(0, count).map((img: string, i: number) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: isPreview ? 0 : i * 0.1 }}
          className="aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white flex items-center justify-center w-full"
        >
          <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
        </motion.div>
      ))}
    </div>
  );
}

function DiagonalLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 6);
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full h-[1200px]">
        {images.slice(0, count).map((img: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: -15 }}
            transition={{ delay: isPreview ? 0 : i * 0.15 }}
            className="absolute rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white"
            style={{
              width: '550px',
              height: '400px',
              top: `${100 + i * 160}px`,
              left: `${50 + i * 80}px`,
              transform: `rotate(-15deg)`,
            }}
          >
            <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HeartShapeLayout({ images, style, isPreview }: any) {
  const count = Math.min(images.length, 7);
  const heartPositions = [
    { top: '25%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '40%', left: '30%', transform: 'translate(-50%, 0)' },
    { top: '40%', left: '70%', transform: 'translate(-50%, 0)' },
    { top: '60%', left: '20%', transform: 'translate(-50%, 0)' },
    { top: '60%', left: '80%', transform: 'translate(-50%, 0)' },
    { top: '80%', left: '40%', transform: 'translate(-50%, 0)' },
    { top: '80%', left: '60%', transform: 'translate(-50%, 0)' },
  ];

  return (
    <div className="w-full h-full relative p-8 mt-20">
      {images.slice(0, count).map((img: string, i: number) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: isPreview ? 0 : i * 0.15 }}
          className="absolute rounded-full overflow-hidden shadow-2xl border-[12px] border-white"
          style={{
            ...heartPositions[i],
            width: '280px',
            height: '280px',
          }}
        >
          <img src={img} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" style={{ filter: style.filter }} />
        </motion.div>
      ))}
    </div>
  );
}

// Decoration Components (same, just scaling up a bit)
function ConfettiDecoration() {
  return (
    <div className="absolute inset-0 z-40 overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
          className="absolute w-4 h-4 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#FF69B4', '#FFD700', '#87CEEB', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  );
}

function BalloonsDecoration() {
  return (
    <div className="absolute inset-0 z-40 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '-20%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute w-24 h-32 rounded-full"
          style={{
            left: `${5 + i * 12}%`,
            backgroundColor: ['#FF69B4', '#FFD700', '#87CEEB', '#FF6B6B', '#B19CD9'][i % 5],
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))',
          }}
        >
          <div className="absolute bottom-0 left-1/2 w-1 h-16 bg-white/50 -translate-x-1/2 translate-y-full" />
        </motion.div>
      ))}
    </div>
  );
}

function SparklesDecoration() {
  return (
    <div className="absolute inset-0 z-40 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <span className="text-6xl filter drop-shadow-[0_0_10px_white]">✨</span>
        </motion.div>
      ))}
    </div>
  );
}

function HeartsDecoration() {
  return (
    <div className="absolute inset-0 z-40 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110%', opacity: 0, scale: 0.5 }}
          animate={{ y: '-10%', opacity: [0, 1, 0], scale: [1, 2, 1] }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
          className="absolute text-7xl"
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
}
