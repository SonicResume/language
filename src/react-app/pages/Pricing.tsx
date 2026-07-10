import { useState } from "react";
import { auth } from "../lib/firebase";

const plans = [
  {
    name: "Free",
    planKey: "free",
    price: 0,
    desc: "Perfect for getting started.",
    stripePriceId: null,
    features: [
      "3 translations per day",
      "Basic language support",
      "Text-to-speech",
      "Basic Braille conversion",
    ],
  },
  {
    name: "Pro",
    planKey: "pro",
    price: 19,
    desc: "AI-powered language translation and Braille accessibility tools for everyone.",
    stripePriceId: "price_1TbF9BPE4wCsfg732ScUJfmc",
    features: [
      "Unlimited translations",
      "47 supported languages",
      "Advanced Braille conversion",
      "Voice input and output",
      "Priority processing",
      "Translation history",
    ],
  },
  {
    name: "Business",
    planKey: "business",
    price: 29,
    desc: "AI-powered language translation and Braille accessibility tools for professionals.",
    stripePriceId: "price_1TnzrFPE4wCsfg73xSOMZNuH",
    features: [
      "Everything included",
      "Unlimited AI translation",
      "All supported languages",
      "Advanced Braille systems",
      "Voice AI features",
      "Future accessibility upgrades",
    ],
  },
  {
    name: "Premium",
    planKey: "premium",
    price: 49,
    desc: "Powerful AI tools for translation, communication, and Braille accessibility.",
    stripePriceId: "price_1TGwAJPE4wCsfg73gMQlv8Ph",
    features: [
      "Everything included",
      "Unlimited AI translation",
      "All supported languages",
      "Advanced Braille systems",
      "Voice AI features",
      "Future accessibility upgrades",
    ],
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

 async function checkout(plan: any) {
  if (plan.planKey === "free") {
    window.location.href = "/login";
    return;
  }

  setLoading(plan.planKey);

  try {
    const BILLING_URL = import.meta.env.VITE_BILLING_URL;

    const res = await fetch(BILLING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_id: plan.stripePriceId,
        email: auth.currentUser?.email || "test@example.com",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || data.error || "Checkout failed");
    }

    if (!data.url) {
      throw new Error("No checkout URL returned");
    }

    window.location.href = data.url;

  } catch (err) {
    console.error(err);
    alert("Something went wrong starting checkout.");
  } finally {
    setLoading(null);
  }
}

  return (
    <main className="min-h-screen bg-green-50 text-black">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-green-300/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-20">

          <div className="inline-flex px-4 py-2 rounded-full border border-purple-400/40 bg-purple-100 text-purple-700 text-sm mb-6">
            Plans for Smarter Communication
          </div>

          <h1 className="text-6xl font-black tracking-tight">
            Upgrade Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              AI Accessibility Engine
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto">
            Connect across languages with AI translation, voice technology,
            and accessibility solutions built for a global world.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {plans.map((plan) => {

            const featured = plan.planKey === "business";

            return (
              <div
                key={plan.planKey}
                className={`relative rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                ${
                  featured
                    ? "border-purple-500 bg-white shadow-[0_0_60px_rgba(168,85,247,.25)]"
                    : "border-gray-200 bg-white"
                }`}
              >

                {featured && (
                  <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white text-center py-3 font-bold">
                    ★ MOST POPULAR ★
                  </div>
                )}

                <div className="p-8">

                  <h2 className="text-3xl font-bold">
                    {plan.name}
                  </h2>

                  <p className="text-gray-600 mt-3">
                    {plan.desc}
                  </p>

                  <div className="mt-8">
                    <span className="text-6xl font-black">
                      ${plan.price}
                    </span>

                    <span className="text-gray-500 text-lg">
                      /month
                    </span>
                  </div>

                  <button
                    onClick={() => checkout(plan)}
                    className="mt-8 w-full rounded-xl py-4 font-bold text-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    {loading === plan.planKey
                      ? "Processing..."
                      : plan.planKey === "free"
                      ? "Start Free"
                      : "Upgrade Now"}
                  </button>

                  <div className="mt-10 space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="text-purple-600">
                          ✓
                        </div>

                        <span className="text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        <div className="mt-20 text-center text-gray-500 text-sm">
          Secure payments powered by Stripe • Cancel anytime • No hidden fees
        </div>

      </section>

    </main>
  );
}