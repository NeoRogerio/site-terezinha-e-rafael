export interface AvoidColor {
  colorName: string;
  reason: string;
  hex: string;
  hexSecondary?: string;
  border?: string;
}

export interface DressCode {
  style: string;
  description: string;
  women: {
    rules: string;
    avoid: AvoidColor[];
  };
  men: {
    rules: string;
    avoid: AvoidColor[];
  };
}

export interface GiftItem {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  icon: string;
  image?: string;
}

export interface WeddingData {
  couple: {
    bride: string;
    groom: string;
    title: string;
  };
  event: {
    date: string;
    dateFormatted: string;
    dayOfWeek: string;
    time?: string;
    timeFormatted?: string;
    locationName?: string;
    googleMapsUrl?: string;
    address?: string;
  };
  reception?: {
    locationName: string;
    googleMapsUrl: string;
    address: string;
    timeFormatted?: string;
  };
  rsvp?: {
    whatsappNumber: string;
    whatsappFormatted: string;
    messageTemplate?: string;
  };
  dressCode: DressCode;
  payment: {
    pixKey: string;
    pixKeyType: string;
    pixKeyFormatted?: string;
    recipientName: string;
    qrCodeImage?: string;
    city?: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappFormatted: string;
  };
}
