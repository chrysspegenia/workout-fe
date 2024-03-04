import Link from "next/link";
import CategorySlider from "@/app/components/CategorySlider";
import Navbar from "@/app/components/Navbar";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      {/* <header>
        <Link href="./dashboard">
          <div>Logo</div>
        </Link>
        <menu>
          <li>
            <Link href="./categories">Categories</Link>
          </li>
        </menu>
      </header> */}
      <Navbar></Navbar>
      <div className="bg=[#e2e2e2]">
        <CategorySlider></CategorySlider>
      </div>
    </div>
  );
}

export default Dashboard;
