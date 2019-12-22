import color from 'color';
import { configureFonts } from 'react-native-paper';
import colors from './Colors';

const fontConfig = {
	default: {
		regular: {
			fontFamily: 'montserrat',
			fontWeight: 'normal'
		},
		medium: {
			fontFamily: 'roboto-mono-bold',
			fontWeight: 'normal'
		},
		light: {
			fontFamily: 'sans-serif-light',
			fontWeight: 'normal'
		},
		thin: {
			fontFamily: 'sans-serif-thin',
			fontWeight: 'normal'
		}
	}
};

const defaultTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: "#DD550C",
    accent: "#03dac4",
    background: "#03244d",
    surface: "#181818",
    error: "#B00020",
    text: "#fff",
    onBackground: "#000000",
    onSurface: "#000000",
    disabled: color(colors.black)
      .alpha(0.26)
      .rgb()
      .string(),
    placeholder: color(colors.white)
      .alpha(0.54)
      .rgb()
      .string(),
    backdrop: color(colors.black)
      .alpha(0.5)
      .rgb()
      .string(),
    notification: "pink"
  },
  fonts: configureFonts(fontConfig),
  animation: {
    scale: 1.0
  }
};

const darkTheme = {
	...defaultTheme,
	dark: true,
	mode: 'adaptive',
	colors: {
		...defaultTheme.colors,
		primary: '#BB86FC',
		accent: '#03dac6',
		background: '#121212',
		surface: '#121212',
		error: '#CF6679',
		onBackground: '#FFFFFF',
		onSurface: '#FFFFFF',
		text: colors.white,
		disabled: color(colors.white)
			.alpha(0.38)
			.rgb()
			.string(),
		placeholder: color(colors.white)
			.alpha(0.54)
			.rgb()
			.string(),
		backdrop: color(colors.black)
			.alpha(0.5)
			.rgb()
			.string(),
		notification: 'lightpink'
	}
};

export { defaultTheme, darkTheme };
