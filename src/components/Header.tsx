import React from 'react';
import { colors, fontFamily } from '../styles/tokens';

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '8px',
  paddingBottom: '8px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: fontFamily.display,
  fontSize: '30px',
  fontWeight: 400,
  color: colors.headerText,
  textTransform: 'uppercase',
  lineHeight: 0.5,
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: fontFamily.display,
  fontSize: '16px',
  fontWeight: 400,
  color: colors.headerText,
  textTransform: 'uppercase',
  marginBottom: 0,
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
