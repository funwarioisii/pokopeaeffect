import { ImageResponse } from "@vercel/og";
import { peanutskunColor } from "./color";
import { getSubsetGoogleFontsLoadedUrl, fetchFont } from "./ogp-helper";

async function generateOgImage(
  effect1: string,
  effect2: string,
  effect3: string,
  bgColor: string,
) {
  const charSubset = getSubsetGoogleFontsLoadedUrl([effect1, effect2, effect3]);
  const fontData = await fetchFont(charSubset);
  if (!fontData) {
    throw new Error("Failed to fetch font data");
  }
  const isPeanutskunTheme = bgColor === peanutskunColor.color;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: isPeanutskunTheme
            ? "linear-gradient(135deg, #e5d967 0%, #f2e980 50%, #e5d967 100%)"
            : "linear-gradient(135deg, #88AF69 0%, #9FCA7C 50%, #88AF69 100%)",
          padding: "32px",
          position: "relative",
          color: isPeanutskunTheme ? "#2c2c2c" : "white",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "160px",
            height: "160px",
            background: isPeanutskunTheme
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        />

        {/* Main content */}
        <div
          style={{
            background: isPeanutskunTheme
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            borderRadius: "32px",
            padding: "48px",
            width: "90%",
            maxWidth: "900px",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
            boxShadow: isPeanutskunTheme
              ? "0 8px 32px rgba(0, 0, 0, 0.07)"
              : "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              gap: "48px",
              width: "100%",
            }}
          >
            {[effect1, effect2, effect3].map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  borderBottom: isPeanutskunTheme
                    ? "2px solid rgba(0, 0, 0, 0.2)"
                    : "2px solid rgba(255, 255, 255, 0.5)",
                  paddingBottom: "16px",
                  textShadow: isPeanutskunTheme
                    ? "0 2px 4px rgba(0, 0, 0, 0.05)"
                    : "0 2px 4px rgba(0, 0, 0, 0.1)",
                  gap: "24px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    background: isPeanutskunTheme
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    minWidth: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: isPeanutskunTheme
                      ? "2px solid rgba(0, 0, 0, 0.2)"
                      : "2px solid rgba(255, 255, 255, 0.5)",
                    marginTop: "4px",
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    flex: 1,
                    lineHeight: "1.4",
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hashtag with emojis */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "40px",
            fontSize: "32px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            background: isPeanutskunTheme
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255, 255, 255, 0.2)",
            padding: "12px 24px",
            borderRadius: "24px",
            boxShadow: isPeanutskunTheme
              ? "0 4px 12px rgba(0, 0, 0, 0.07)"
              : "0 4px 12px rgba(0, 0, 0, 0.1)",
            textShadow: isPeanutskunTheme
              ? "0 2px 4px rgba(0, 0, 0, 0.05)"
              : "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            #pokopeaeffect
            <span style={{ fontSize: "28px" }}>🍃</span>
            <span style={{ fontSize: "28px" }}>🥜</span>
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}

export default generateOgImage;
