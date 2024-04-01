import { useContext } from "react";

import BuyerHome from "@/components/Buyer/Home";
import SetupAccount from "@/components/SetupAccount";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function App() {
  const { user, userLoading } = useContext(AuthContext);

  const router = useRouter();

  if (!userLoading && user?.setup === false) return <SetupAccount />;

  if (!userLoading && user && user?.type === "Freelancer")
    return <div className="">freelancer..</div>;
  if (!userLoading && user && user?.type === "Buyer") return <BuyerHome />;

  if (!userLoading && !user) return <div className="">No user</div>;
}
