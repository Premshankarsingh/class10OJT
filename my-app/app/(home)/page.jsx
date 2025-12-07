
import HomeLayout from "../layouts/HomeLayout/layout";
import Banner from "./Banner";
import Buyers from "./Buyers";
import TestingPage from "./TestingPage";

export default function Home() {
  return (
  
    <>
        <HomeLayout>
            <Banner />
            <Buyers />
            <TestingPage/>
        </HomeLayout>
        
    </>
  );
}

