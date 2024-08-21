import dynamic from "next/dynamic";

const SoundButton = dynamic(() =>
  import("@/components/sound-button"),{ ssr: false }
);

const DarkMode = dynamic(() =>
  import("@/components/dark-mode-toggle"),{ ssr: false }
);

export default function Home() {
  return (
    <div className="flex gap-6">
    <DarkMode />
    <SoundButton />
  </div>
  );
}
