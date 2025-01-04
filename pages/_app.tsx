import Search from "@/components/Search";
import "@/styles/globals.css";

export default function App() {
  return <>
    <div>
      {/* search criteria */}
      {/* receipt */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Github Receipt</h1>
        <div>Generate a receipt-style summary of your Github profile</div>
        <div>made by rajat | bored at work</div>
      </div>
      <Search />
    </div>
  </>;
}
