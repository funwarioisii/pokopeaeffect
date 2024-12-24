import { peanutskunColor } from "@/lib/color";
import generateOgImage from "@/lib/generate-og-image";
import { NextRequest } from "next/server";
import { ogpDefaultMessages } from "@/lib/resource";
export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const effect1 = searchParams.get("effect1") || ogpDefaultMessages.effect1;
  const effect2 = searchParams.get("effect2") || ogpDefaultMessages.effect2;
  const effect3 = searchParams.get("effect3") || ogpDefaultMessages.effect3;
  const bgColor = searchParams.get("bgColor") || peanutskunColor.color;

  return generateOgImage(effect1, effect2, effect3, bgColor);
}
