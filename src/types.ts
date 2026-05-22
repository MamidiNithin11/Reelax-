export interface Coupon {
  code: string;
  description: string;
  discountPercentage?: number;
  flatDiscount?: number;
}

export interface BillingDetails {
  companyName: string;
  email: string;
  gstNumber: string;
  panNumber: string;
  premise: string;
  street: string;
  state: string;
  city: string;
  country: string;
  pinCode: string;
}

export type BillingCycle = 'monthly' | 'quarterly' | 'annual';

export interface Influencer {
  name: string;
  niche: string;
  followers: string;
}
