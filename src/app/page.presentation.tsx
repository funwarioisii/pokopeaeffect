"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageIcon, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import type { PokopeaColor } from "@/lib/color";
import { ponpokosanColor, peanutskunColor } from "@/lib/color";
import Image from "next/image";

const defaultEffects = [
  "カフェラテをよく飲むようになった",
  "自転車に乗りはじめた",
  "根性で解決！が手札に加わった",
];

const PagePresentation = () => {
  const [effect1, setEffect1] = useState(defaultEffects[0]);
  const [effect2, setEffect2] = useState(defaultEffects[1]);
  const [effect3, setEffect3] = useState(defaultEffects[2]);
  const [bgColor, setBgColor] = useState<PokopeaColor>(ponpokosanColor);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );

  const resetState = () => {
    setEffect1(defaultEffects[0]);
    setEffect2(defaultEffects[1]);
    setEffect3(defaultEffects[2]);
    setBgColor(ponpokosanColor);
    setGeneratedImageUrl(null);
  };

  const generateImage = () => {
    const url = `/api/og?effect1=${encodeURIComponent(effect1)}&effect2=${encodeURIComponent(effect2)}&effect3=${encodeURIComponent(effect3)}&bgColor=${encodeURIComponent(bgColor.color)}`;
    setGeneratedImageUrl(url);
  };

  const shareOnX = () => {
    if (!generatedImageUrl) return;
    const text = encodeURIComponent(
      `私が受けた #pokopeaeffect🍃🥜:\n1. ${effect1}\n2. ${effect2}\n3. ${effect3}\n\n`,
    );
    const url = encodeURIComponent(
      `${window.location.origin}?effect1=${encodeURIComponent(effect1)}&effect2=${encodeURIComponent(effect2)}&effect3=${encodeURIComponent(effect3)}&bgColor=${encodeURIComponent(bgColor.color)}`,
    );
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto mb-4 sm:mb-8">
          <CardHeader className="space-y-2 sm:space-y-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
              #pokopeaeffect🍃🥜
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              ぽこピーのお二人から受けた影響をカードにできるページです。
              <br />
              Generate を押すとカードが作られます。
              <br />
              Share on X
              を押すとXでシェアできます。(画像を貼り付ける必要はないです)
              <br />
              <br />
              ページ内での画像表示もXでの画像表示も5秒くらいかかることがあります。ご迷惑おかけしますが気長にお待ち下さい。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {[effect1, effect2, effect3].map((effect, index) => (
              <div key={index} className="space-y-2">
                <Label
                  htmlFor={`effect${index + 1}`}
                  className="text-lg font-semibold"
                >
                  Effect {index + 1}
                </Label>
                <Input
                  id={`effect${index + 1}`}
                  placeholder={`Enter effect ${index + 1}`}
                  value={effect}
                  onChange={(e) => {
                    if (index === 0) setEffect1(e.target.value);
                    if (index === 1) setEffect2(e.target.value);
                    if (index === 2) setEffect3(e.target.value);
                  }}
                  className="text-base sm:text-lg p-2 sm:p-3"
                />
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="bgColor" className="text-lg font-semibold">
                背景
              </Label>
              <div className="flex gap-4">
                <Button
                  onClick={() => setBgColor(ponpokosanColor)}
                  className={`flex-1 h-12 transition-all ${bgColor === ponpokosanColor ? "scale-105 shadow-lg" : "opacity-75"}`}
                  style={{ backgroundColor: ponpokosanColor.color }}
                >
                  🍃
                </Button>
                <Button
                  onClick={() => setBgColor(peanutskunColor)}
                  className={`flex-1 h-12 transition-all ${bgColor === peanutskunColor ? "scale-105 shadow-lg" : "opacity-75"}`}
                  style={{ backgroundColor: peanutskunColor.color }}
                >
                  🥜
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={resetState}
                variant="outline"
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <RefreshCw className="w-4 h-4" /> Reset
              </Button>
              <Button
                onClick={generateImage}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <ImageIcon className="w-4 h-4" /> Generate
              </Button>
            </div>
            <Button
              onClick={shareOnX}
              className="bg-black hover:bg-gray-800 flex items-center gap-2 w-full sm:w-auto"
              disabled={!generatedImageUrl}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
              Share on X
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {generatedImageUrl && (
        <motion.div
          initial={{ opacity: 0, y: -100, scaleY: 0 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            opacity: { duration: 0.3 },
            y: { duration: 1 },
            scaleY: { duration: 1 },
          }}
          className="w-full max-w-[1200px] mx-auto rounded-lg shadow-2xl overflow-hidden origin-top"
        >
          <Image
            src={generatedImageUrl}
            alt="Generated #pokopeaeffect"
            className="w-full h-auto"
            width={1200}
            height={630}
          />
        </motion.div>
      )}
    </div>
  );
};

export default PagePresentation;
