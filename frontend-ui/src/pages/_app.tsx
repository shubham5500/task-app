import '../styles/globals.css';
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import { Provider } from 'react-redux';
import {store} from "../store";

export default function App({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDarkModeEnabled);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return <Provider store={store}>
    <Layout classes={`app ${isDarkMode ? 'dark' : ''}`}>
      <Component {...pageProps} />
    </Layout>
  </Provider>
}
