export type Social = {
  title: string;
  socialBaseUrl: string;
  socialLogo: string;
  _id: string;
};
export type Socials = Social[];

export type USER_SOCIAL = {
  platform: {
    title: string;
    socialBaseUrl: string;
    socialLogo: string;
    _id: string;
  };
  handle: string;
  _id: string;
};

