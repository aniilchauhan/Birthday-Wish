import React from 'react';
import { Palette, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { TEMPLATES } from '../templates';

interface ThemeGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: any;
  onApply: (tplConfig: any) => void;
}

const ThemeGalleryModal = ({ isOpen, onClose, currentConfig, onApply }: ThemeGalleryModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#f8f8f8',
          borderRadius: 3,
          maxHeight: '90vh',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: 'white',
          px: 3,
          py: 2,
          borderBottom: '1px solid #f1f1f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              bgcolor: 'var(--color-romantic-pink, #ec4899)',
              display: 'grid',
              placeItems: 'center',
              color: 'white',
            }}
          >
            <Palette size={16} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
              Theme Library
            </Typography>
            <Typography sx={{ fontSize: 10, color: '#9ca3af', mt: 0.5 }}>
              {TEMPLATES.length} curated designs
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#9ca3af' }}>
          <X size={16} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2.5, overflowY: 'auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
              xl: 'repeat(4, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {TEMPLATES.map((template) => {
            const isActive = currentConfig?.THEME?.primary === template.config.THEME.primary;
            return (
              <Card
                key={template.id}
                square
                elevation={isActive ? 6 : 1}
                sx={{
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-romantic-pink, #ec4899)' : '#e5e7eb',
                  boxShadow: isActive
                    ? '0 10px 24px rgba(236,72,153,0.25)'
                    : '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: isActive ? 'var(--color-romantic-pink, #ec4899)' : '#d1d5db',
                    boxShadow: '0 10px 22px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardActionArea
                  disableRipple
                  disableTouchRipple
                  onClick={() => {
                    onApply(template.config);
                    toast.success(`Applied: ${template.name}`);
                  }}
                  sx={{
                    borderRadius: 0,
                    '& .MuiCardActionArea-focusHighlight': {
                      borderRadius: 0,
                    },
                    '& .MuiTouchRipple-root': {
                      borderRadius: 0,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', height: 96, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: template.config.THEME.background,
                      }}
                    />
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex' }}>
                      <Box sx={{ flex: 1, opacity: 0.8, bgcolor: template.config.THEME.primary }} />
                      <Box sx={{ flex: 1, opacity: 0.6, bgcolor: template.config.THEME.secondary }} />
                      <Box sx={{ flex: 1, opacity: 0.4, bgcolor: template.config.THEME.accent }} />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 40,
                        background:
                          'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 8,
                        top: 8,
                        px: 1,
                        py: 0.25,
                        fontSize: 9,
                        fontWeight: 700,
                        color: 'white',
                        textTransform: 'uppercase',
                        bgcolor: 'rgba(0,0,0,0.35)',
                        backdropFilter: 'blur(3px)',
                        letterSpacing: 0.6,
                        borderRadius: 0,
                      }}
                    >
                      {template.tag}
                    </Box>
                    {isActive && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 24,
                          height: 24,
                          borderRadius: 0,
                          bgcolor: 'var(--color-romantic-pink, #ec4899)',
                          display: 'grid',
                          placeItems: 'center',
                          color: 'white',
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, border: '1px solid #ffffff99', bgcolor: template.config.THEME.primary }} />
                    <Box sx={{ width: 16, height: 16, border: '1px solid #ffffff99', bgcolor: template.config.THEME.secondary }} />
                    <Box sx={{ width: 16, height: 16, border: '1px solid #ffffff99', bgcolor: template.config.THEME.accent }} />
                    <Box sx={{ flex: 1 }} />
                    <Box sx={{ width: 20, height: 20, border: '1px solid #e5e7eb', bgcolor: template.config.THEME.background }} />
                  </Box>

                  <Box sx={{ px: 2, pb: 2, minHeight: 96, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: isActive ? 'var(--color-romantic-pink, #ec4899)' : '#1f2937',
                      }}
                    >
                      {template.name}
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: '#6b7280', mt: 0.75, minHeight: 28 }}>
                      {template.description}
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                      <Chip
                        label={template.config.LAYOUT}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          textTransform: 'uppercase',
                          color: '#6b7280',
                          bgcolor: '#f3f4f6',
                          borderRadius: 0,
                        }}
                      />
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          bgcolor: 'white',
          px: 3,
          py: 1.5,
          borderTop: '1px solid #f1f1f1',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: 10, color: '#9ca3af', fontStyle: 'italic', display: { xs: 'none', sm: 'block' } }}>
          Clicking a card applies the theme instantly
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
          <Button onClick={onClose} variant="outlined" size="small" sx={{ textTransform: 'none', px: 2.5 }}>
            Close
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            size="small"
            sx={{
              textTransform: 'none',
              px: 2.5,
              bgcolor: 'var(--color-romantic-pink, #ec4899)',
              '&:hover': { bgcolor: '#db2777' },
            }}
          >
            Done
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ThemeGalleryModal;
