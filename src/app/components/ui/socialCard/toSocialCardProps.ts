export function toSocialCardProps(social: {
  _id?: { toString(): string } | string;
  title?: string;
  socialLogo?: string;
}) {
  return {
    _id: social._id ? String(social._id) : "",
    title: social.title ?? "",
    socialLogo: social.socialLogo ?? ""
  };
}
