import '../styles/globals.css';
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import { ApolloProvider } from '@apollo/client';
import { client } from '@/graphql';

export default function App({ Component, pageProps }: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDarkModeEnabled);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return <ApolloProvider client={client}>
    <Layout classes={`app ${isDarkMode ? 'dark' : ''}`}>
      <Component {...pageProps} />
    </Layout>
  </ApolloProvider>
}
