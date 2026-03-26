import React from 'react';
import { colors } from '../styles/tokens';

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '16px',
  paddingBottom: '8px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Courier New', 'Courier', monospace",
  fontSize: '20px',
  fontWeight: 700,
  color: colors.headerText,
  textTransform: 'uppercase',
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: "'Courier New', 'Courier', monospace",
  fontSize: '10px',
  fontWeight: 700,
  color: colors.subtitleText,
  textTransform: 'uppercase',
  marginTop: '0px',
};

export const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Bingo Bud</h1>
      <p style={subtitleStyle}>Scanner + Marker</p>
    </header>
  );
};

export default Header;
