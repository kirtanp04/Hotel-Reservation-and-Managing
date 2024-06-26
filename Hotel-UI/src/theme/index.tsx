import { ReactNode, useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
  ThemeOptions,
  createTheme,
} from "@mui/material/styles";
// hooks
// import useSettings from '../hooks/useSettings';
//
import useThemeSetting from "../hooks/useThemesetting";
import breakpoints from "./breakpoints";
import componentsOverride from "./overrides";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { mode } = useThemeSetting();

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: mode === "light" ? palette.light : palette.dark,
      // typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: mode === "light" ? shadows.light : shadows.dark,
      customShadows:
        mode === "light" ? customShadows.light : customShadows.dark,
    }),
    [mode]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
