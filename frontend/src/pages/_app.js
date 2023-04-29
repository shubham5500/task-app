import '../styles/globals.css';
import {useEffect, useState} from "react";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDarkModeEnabled);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return <Layout classes={`app ${isDarkMode ? 'dark' : ''}`}>
    <Component {...pageProps} />
  </Layout>
}
