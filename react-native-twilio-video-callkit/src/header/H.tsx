import React, { ReactNode } from 'react';

import { StyleSheet, Text, TextStyle, Platform } from 'react-native';
// import theme from '../theme';
type props = {
  title?: string;
  children?: ReactNode;
  type?: 'primary' | 'secondary' | 'tertiary' | 'bold';
  color?: string;
  textAlign?: TextStyle['textAlign'];
  style?: TextStyle;
};
function combinedStyle(
  textStyle?: TextStyle,
  type?: string,
  color?: string,
  textAlign?: TextStyle['textAlign'],
  style?: TextStyle,
) {
  const newStyle: TextStyle = {};
  if (type === 'secondary') {
    newStyle.color = "#2F353B";
  } else if (type === 'tertiary') {
    newStyle.color = "black";
  }
  if (color) {
    newStyle.color = color;
  }
  if (textAlign) {
    newStyle.textAlign = textAlign;
  }
  return Object.assign({}, textStyle, style, newStyle);
}


export const H3 = ({ title, children, type, color, textAlign, style }: props) => {
  const textStyle = combinedStyle(styles.h3, type, color, textAlign, style);
  return <Text style={textStyle}>{title || children}</Text>;
};


const styles = StyleSheet.create({
  h3: {
    fontSize: 20,
    color: "black",
    fontFamily: Platform.OS === 'ios' ? 'Source Sans Pro' : 'SourceSansPro-Regular'
  },

});

export default {
  H3
};
