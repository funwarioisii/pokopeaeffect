import type { Metadata } from "next";
import { peanutskunColor } from "@/lib/color";

import PagePresentation from "./page.presentation";
import { ogpDefaultMessages } from "@/lib/resource";

export const generateMetadata = async (params: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await params.searchParams;
  const effect1 = Array.isArray(searchParams?.effect1)
    ? searchParams.effect1[0]
    : searchParams?.effect1 || ogpDefaultMessages.effect1;
  const effect2 = Array.isArray(searchParams?.effect2)
    ? searchParams?.effect2[0]
    : searchParams?.effect2 || ogpDefaultMessages.effect2;
  const effect3 = Array.isArray(searchParams?.effect3)
    ? searchParams?.effect3[0]
    : searchParams?.effect3 || ogpDefaultMessages.effect3;
  const bgColor = Array.isArray(searchParams?.bgColor)
    ? searchParams?.bgColor[0]
    : searchParams?.bgColor || peanutskunColor.color;
  const ogImageUrl = `/api/og?effect1=${encodeURIComponent(effect1)}&effect2=${encodeURIComponent(effect2)}&effect3=${encodeURIComponent(effect3)}&bgColor=${encodeURIComponent(bgColor)}`;

  const metadata: Metadata = {
    title: "#pokopeaeffect",
    openGraph: {
      images: [ogImageUrl],
    },
  };

  return metadata;
};

export default async function Home() {
  return <PagePresentation />;
}
