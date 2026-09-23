export interface UserAddress {
  address: string;
  city: string;
  state?: string;
  stateCode?: string;
  postalCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserCompany {
  name: string;
  department: string;
  title: string;
  address?: UserAddress;
}

export interface UserBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface UserHair {
  color: string;
  type: string;
}

export interface UserCrypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | string;
  birthDate: string;
  image: string;
  role: 'admin' | 'user' | string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: UserHair;
  ip?: string;
  macAddress?: string;
  university?: string;
  bank?: UserBank;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: UserCrypto;
  address?: UserAddress;
  company?: UserCompany;
}