export type profileData = {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  age: number | null;
  bio: string | null;
  drinker: string | null;
  smoker: boolean;
  avatar_url: string | null;
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
  onSmokeAlarmChange: (value: boolean | null) => void;
  onPetsChange: (value: boolean | null) => void;
  onPoolChange: (value: boolean | null) => void;
  onWifiChange: (value: boolean | null) => void;
  onParkingChange: (value: boolean | null) => void;
  onKitchenChange: (value: boolean | null) => void;
  onAirconChange: (value: boolean | null) => void;
  onTvChange: (value: boolean | null) => void;
  onDeskChange: (value: boolean | null) => void;
  onWasherChange: (value: boolean | null) => void;
  priceRange: number[];
  bedRange: number[];
  bathRange: number[];
  smokeAlarm: boolean | null;
  pets: boolean | null;
  pool: boolean | null;
  wifi: boolean | null;
  parking: boolean | null;
  kitchen: boolean | null;
  aircon: boolean | null;
  tv: boolean | null;
  desk: boolean | null;
  washer: boolean | null;
}

export type FooterProps = {
  pathnameUrl: string;
};
