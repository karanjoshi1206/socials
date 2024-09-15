/** @type {import('next').NextConfig} */
const nextConfig = {
  // setup the image domain to https://randomuser.me/
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**"
      },
      {
        pathname:"https",
        hostname:"res.cloudinary.com",
        port:"",
        pathname:"/**"
      }
    ]
  }
};

export default nextConfig;
