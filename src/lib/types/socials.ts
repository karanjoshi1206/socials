export type TSocial = {
  id: string;
  title: string;
  handle: string;
  socialLogo: string;
  socialBaseUrl?: string;
  socialId?: string;
};

export type TNewSocial = {
  title: string;
  socialLogo: string;
  socialBaseUrl: string;
  socialId?: string;
};
