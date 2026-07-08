"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ShieldAlert,
  LogOut,
  Trash2,
  Sparkles,
  Check,
} from "lucide-react";

import { auth, db } from "../lib/firebase";
import {
  deleteUser,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";


const STRIPE_PRO_MONTHLY_LINK =
  "https://buy.stripe.com/bJe6oJ3zke4y3Vq8rR8k80j";

const STRIPE_BUSINESS_MONTHLY_LINK =
  "https://buy.stripe.com/8x2dRb1rc0dIfE8dMb8k809";

const STRIPE_PREMIUM_MONTHLY_LINK =
  "https://buy.stripe.com/8x228t8TEbWq9fK23t8k80k";


export default function AccountPage() {

  const navigate = useNavigate();

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [plan, setPlan] = useState("free");
  const [credits, setCredits] = useState(20);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);


  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(
      async (currentUser) => {

        setUser(currentUser);

        if (currentUser) {

          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const snap = await getDoc(userRef);

          if (snap.exists()) {

            const data = snap.data();

            setPlan(data.plan || "free");
            setCredits(
              data.credits ?? 20
            );

          }

        }

        setLoading(false);
      }
    );


    return () => unsubscribe();

  }, []);



  const openDashboard = () => {

    if (
      plan === "free" &&
      credits <= 0
    ) {
      navigate("/pricing");
      return;
    }

    navigate("/dashboard");
  };



  const handleLogout = async () => {

    await signOut(auth);

    navigate("/login");

  };



  const handleDeleteAccount = async () => {

    if (!user) return;


    const ok = window.confirm(
      "Delete your account permanently?"
    );


    if (!ok) return;


    setActionLoading(true);


    try {

      await deleteUser(user);

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        "Please login again before deleting your account."
      );

    }


    setActionLoading(false);

  };



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading account...

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-slate-50 p-6">


      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-8">


        <div className="flex justify-between items-center border-b pb-5">

         <button
           onClick={() => navigate("/dashboard")}
           className="text-sm font-bold text-emerald-600"
         >
           Dashboard
         </button>

          <h1 className="font-black">

            NOAH Account

          </h1>


        </div>



        <div className="flex items-center gap-4 bg-slate-100 p-5 rounded-2xl">


          <User className="text-emerald-600"/>


          <div>

            <p className="text-xs text-gray-400">
              EMAIL
            </p>

            <p className="font-bold">
              {user?.email}
            </p>

          </div>


        </div>




        <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-5">


          <div className="flex gap-2 items-center">

            <Sparkles className="text-yellow-400"/>

            <h2 className="font-black">
              {plan.toUpperCase()} PLAN
            </h2>

          </div>



          <p className="text-sm text-slate-300">

            Credits remaining:
            {" "}
            {plan === "free"
              ? credits
              : "Unlimited"}

          </p>



          <div className="space-y-2 text-sm">

            {[
              "AI Translation",
              "Language Tools",
              "Audio Features",
              "Premium Modules"

            ].map(item => (

              <div
                key={item}
                className="flex gap-2"
              >

                <Check
                  size={16}
                  className="text-green-400"
                />

                {item}

              </div>

            ))}

          </div>




          <button

            onClick={openDashboard}

            className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-bold"

          >

            Open Dashboard

          </button>




          {plan === "free" && (

            <p className="text-xs text-yellow-300">

              Free accounts include 20 credits.
              Upgrade when credits run out.

            </p>

          )}



          <div className="grid grid-cols-1 gap-3 pt-4">


            <a
              href={STRIPE_PRO_MONTHLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-center py-3 rounded-xl font-bold"
            >

              Upgrade Pro $15/mo

            </a>



            <a
              href={STRIPE_BUSINESS_MONTHLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-center py-3 rounded-xl font-bold"
            >

              Business $29/mo

            </a>



            <a
              href={STRIPE_PREMIUM_MONTHLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-center py-3 rounded-xl font-bold"
            >

              Premium $49/mo

            </a>


          </div>


        </div>




        <div className="grid grid-cols-2 gap-3">


          <button
            onClick={handleLogout}
            className="border p-4 rounded-xl flex justify-center gap-2"
          >

            <LogOut size={16}/>
            Logout

          </button>



          <button
            disabled={actionLoading}
            onClick={handleDeleteAccount}
            className="border border-red-300 text-red-500 p-4 rounded-xl flex justify-center gap-2"
          >

            <Trash2 size={16}/>
            Delete

          </button>


        </div>



        <div className="text-xs text-center text-gray-400 flex justify-center gap-2">

          <ShieldAlert size={14}/>

          Firebase secured account access

        </div>



      </div>


    </div>

  );

}