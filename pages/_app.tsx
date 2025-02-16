import Generate from "@/components/Generate";
import "@/styles/globals.css";
import Head from "next/head";

export default function App() {
  return <>
    <Head>
      <title>Git-Receipt</title>
      <link
        rel="icon"
        href="/icon.svg"
        type="image/svg"
        sizes="32x32"
      />
    </Head>
    <div className="pt-10 min-h-screen max-w-2xl mx-auto px-4 py-8 sm:py-16">
      <div className="items-center justify-between text-center  pb-9">
        <div className="text-4xl font-bold text-slate-900 pb-2">GitHub Receipt</div>
        <div className="p-0 text-slate-500">Generate a receipt-style summary of your GitHub profile</div>
        <div className="p-0 mt-2 text-slate-500 text-sm">made by rajat | bored at work</div>
      </div>
      <Generate />
    </div>
  </>;
}
