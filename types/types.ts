export type profileData = {
  first_name: string | null;
  last_name: string | null;
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
