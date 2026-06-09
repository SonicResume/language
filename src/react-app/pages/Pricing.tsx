// 🛠️ Change this line:
import { auth } from "@/firebase";

export default function PricingPage() {

  const handlePay = async () => {
    const user = auth.currentUser;

    // 🔐 Require login (recommended)
    if (!user) {
      alert("Please sign in to upgrade");
      window.location.href = "/login";
      return;
    }

    const email = user.email;

    try {
const res = await fetch("http://localhost:3003/api/pay", {     
   method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "pro",
          email, // ✅ always valid now
        }),
      });

      const data = await res.json();

      if (data.url) {
        // 🚀 Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert("Payment failed");
      }

    } catch (err) {
      console.error(err);
      alert("Error starting payment");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 text-gray-900">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Simple Pricing
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Start free. Upgrade when you’re ready.
      </p>

      {/* PLANS */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {/* FREE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Free</h2>

          <p className="text-3xl font-bold mt-2">
            $0
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>✅ 20 free credits</li>
            <li>✅ All AI tools</li>
            <li>❌ Stops when credits end</li>
          </ul>

          <button
            onClick={() => (window.location.href = "/signup")}
            className="mt-6 w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
          >
            Get Started
          </button>
        </div>

        {/* PRO */}
        <div className="bg-white p-6 rounded-xl shadow border-2 border-black">

          <p className="text-xs text-green-600 font-semibold mb-2">
            MOST POPULAR
          </p>

          <h2 className="text-xl font-semibold">Pro</h2>

          <p className="text-3xl font-bold mt-2">
            $9<span className="text-sm">/month</span>
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>✅ Unlimited writing</li>
            <li>✅ All AI tools</li>
            <li>✅ Faster processing</li>
          </ul>

          <button
            onClick={handlePay}
            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
          >
            Upgrade to Pro
          </button>

        </div>

      </div>

      {/* FOOTER */}
      <p className="text-center text-gray-500 text-sm mt-12">
        No credit card required to start. Cancel anytime.
      </p>

    </div>
  );
}