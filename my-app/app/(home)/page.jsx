import HomeLayout from "../layouts/HomeLayout/layout";
import Banner from "./Banner";
import MessageWrapper from "./MessageWrapper";
import NewsSection from "./NewsSection";

export default function Home() {
  return (
    <HomeLayout>
      <Banner />
      <MessageWrapper />
      <NewsSection />
    </HomeLayout>
  );
}
