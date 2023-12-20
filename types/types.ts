import { Dispatch, SetStateAction } from "react";

export type profileData = {
  map(arg0: (profile: any) => import("react").JSX.Element): unknown;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  age: number | null;
  bio: string | null;
  drinker: string | null;
  smoker: boolean;
  avatar_url: string | null;
  occupation: string | null;
  languages: string[] | null;
  personality_type: string | null;
  star_sign: string | null;
  location: string | null;
  nationality: string | null;
  hobbies: string[] | null;
};

export interface InputElementProps {
  id: string;
  placeholder: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  onError?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface TextareaElementProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface SelectElementProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export interface FilterSheetProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: React.MouseEventHandler<HTMLButtonElement>;
  onPriceRangeChange: (value: number[]) => void;
  onBedRangeChange: (value: number[]) => void;
  onBathRangeChange: (value: number[]) => void;
  onSmokeAlarmChange: (value: boolean) => void;
  onPetsChange: (value: boolean) => void;
  onPoolChange: (value: boolean) => void;
  onWifiChange: (value: boolean) => void;
  onParkingChange: (value: boolean) => void;
  onKitchenChange: (value: boolean) => void;
  onAirconChange: (value: boolean) => void;
  onTvChange: (value: boolean) => void;
  onDeskChange: (value: boolean) => void;
  onWasherChange: (value: boolean) => void;
  priceRange: number[];
  bedRange: number[];
  bathRange: number[];
  smokeAlarm: boolean;
  pets: boolean;
  pool: boolean;
  wifi: boolean;
  parking: boolean;
  kitchen: boolean;
  aircon: boolean;
  tv: boolean;
  desk: boolean;
  washer: boolean;
}

export type FooterProps = {
  pathnameUrl: string;
};

export type Profile = {
  id: string;
  username: string;
};

export type Message = {
  id: string;
  created_at: string;
  content: string;
  profile_id: string;
  profile?: Profile;
};

export type MessagesProps = {
  roomId: string;
  profileCache: ProfileCache;
  setProfileCache: Dispatch<SetStateAction<ProfileCache>>;
  pathname: string;
};

export type ProfileCache = {
  [userId: string]: Profile;
};
