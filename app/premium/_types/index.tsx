export interface DiscordGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: string[];
}

export type PricingData = {
  price: { monthly: number; yearly: number };
  premium: {
    "All Freemium Features": boolean;
    "Unlimited Custom Questions": boolean;
    "Customized Webhook Branding": boolean;
    "No More Invite Button Ads": boolean;
    "Auto Pin Daily Messages": boolean;
  };
};
