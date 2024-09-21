import { authConfig } from "@/auth";
import HomePageLoggedIn from "./components/layout/homePage/homePageLoggedIn/homePageLoggedIn";
import { getServerSession } from "next-auth";
import HomePageLoggedOut from "./components/layout/homePage/homePageLoggedOut/homePageLoggedOut";

export default async function Home() {
  // check if user logged in or not

  const session = await getServerSession(authConfig);

  if (!session) {
    return <HomePageLoggedOut />;
  } else {
    return <HomePageLoggedIn />;
  }
}
