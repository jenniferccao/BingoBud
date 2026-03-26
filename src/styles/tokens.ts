export const colors = {
  background: '#0a0a14',
  surface: 'rgba(30, 30, 60, 0.6)',
  surfaceSolid: '#1e1e3c',
  surfaceLight: 'rgba(40, 40, 75, 0.5)',
  surfaceBorder: 'rgba(80, 80, 140, 0.35)',
  surfaceBorderLight: 'rgba(100, 100, 170, 0.25)',
  headerText: '#86C17F',
  subtitleText: '#4a9a5e',
  bodyText: '#c8c8e8',
  bodyTextMuted: '#7878a8',
  accent: '#7c6cf0',
  accentLight: '#9b8cff',
  accentMuted: '#5a4abf',
  marked: '#7c6cf0',
  markedGreen: '#66d9a0',
  nearBingo: '#f06292',
  completedBingo: '#86C17F',
  freeCell: '#8878cc',
  transparent: 'transparent',
  glass: 'rgba(25, 25, 55, 0.65)',
  glassBorder: 'rgba(90, 90, 160, 0.3)',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  pill: '9999px',
} as const;

export const fontSize = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '18px',
  xl: '22px',
  xxl: '28px',
  title: '32px',
} as const;

export const fontFamily = {
  primary: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  display: "'Courier New', 'Courier', monospace",
} as const;

export const glassEffect = {
  background: 'rgba(25, 25, 55, 0.55)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(90, 90, 160, 0.3)',
} as const;
