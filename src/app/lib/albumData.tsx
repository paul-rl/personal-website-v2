export type Album = {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  link: string;
}

export type TierDefinition = {
  name: string;
  color?: string;
}

export type AlbumTierList = {
  owner: string;
  tierOrder: TierDefinition[];
  tiers: Record<string, Album[]>;
}