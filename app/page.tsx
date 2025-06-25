import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CatchyText from "./components/catchy-description";

export default function Home() {
  return (
    <div className="flex items-center justify-center text-center" style={{ height: 'calc(100vh - 200px)' }}>
      <CatchyText />
    </div>
  );
}