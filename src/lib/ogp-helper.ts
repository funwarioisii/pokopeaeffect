/**
 * サブセット化に使用する文字を返す
 */
export function getSubsetGoogleFontsLoadedUrl(chars: string[]) {
  return Array.from(new Set(chars.join(""))).reduce((a, c) => a + c, "");
}

/**
 * Google Fonts から使用する文字を指定してサブセット化した Noto+Sans+JP を取得
 * ref: https://github.com/vercel/satori/blob/2e8dcb486f3dadeb6fc2e8790cb822a72893a21a/playground/pages/api/font.ts#L86-L111
 */
export async function fetchFont(text: string): Promise<ArrayBuffer | null> {
  const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP&text=${encodeURIComponent(
    text,
  )}`;

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (!resource) return null;

  const res = await fetch(resource[1]);

  return res.arrayBuffer();
}
