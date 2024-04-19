import {
  CssBaseline,
  Container,
  Typography,
  ThemeProvider
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tiptap } from "./components";
import { useMemo, StrictMode } from "react";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );
  const content = `<p>Hello World!</p>
  <p>Hmm...</p>
  <p>What to add next?</p>

  <ul>
    <li>Add image support with resize and alignment</li>
    <li>Do not use #f00 color</li>
    <li>:-D But can use smilie replacer</li>
  </ul>

  <h3>Add Some images as well</h3>

  <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
  
  <h3>YouTube video embed example</h3>
  <div data-youtube-video>
    <iframe src="https://www.youtube.com/watch?v=EDYzlK9LsMQ"></iframe>
  </div>
  `;

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Smart Web Editor for all applications!
          </Typography>
          <Typography gutterBottom>
            An example to use TipTap editor to own project with MUI theme and
            components.
          </Typography>
          <Tiptap content={content} showCounts />
        </Container>
      </ThemeProvider>
    </StrictMode>
  );
}
