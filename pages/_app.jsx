import "@/styles/globals.css";
import Store from "@/Context/Store";
import Head from "next/head";
import ProgressBar from "@/components/ProgressBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta
          name='description'
          content='A messeging app to talk to your friends'
        />
        <link rel='shortcut icon' href='/icon.svg' />
      </Head>
      <ProgressBar />
      <Store>
        <Component {...pageProps} />
      </Store>
    </>
  );
}
