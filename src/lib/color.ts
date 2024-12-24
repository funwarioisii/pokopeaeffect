export const ponpokosanColor = {
  __kind: "ponpokosan",
  color: "#88AF69",
};

export const peanutskunColor = {
  __kind: "peanutskun",
  color: "#e5d967",
};

export const colors = [ponpokosanColor, peanutskunColor] as const;

export type PokopeaColor = (typeof colors)[number];
