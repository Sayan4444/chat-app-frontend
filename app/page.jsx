import { redirect } from "next/navigation";

const Home = () => {
  redirect("/signin");
  return <div>Home</div>;
};

export default Home;
