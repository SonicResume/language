import { useState, FormEvent, useRef } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      // 🛠️ REPLACE THESE 3 STRINGS WITH YOUR COPIED EMAILJS DASHBOARD KEYS:
      const SERVICE_ID = "YOUR_GMAIL_SERVICE_ID";
      const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
      const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";

      // Sends form contents directly to your Gmail from the frontend client
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current!,
        PUBLIC_KEY
      );

      setSuccess("Message sent to Gmail successfully ✅");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS sending error:", error);
      alert("Something went wrong routing message to Gmail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50/40 px-4 text-sky-950 font-sans antialiased">
      <div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-8 shadow-sm">

        {/* Logo */}
        <div className="mb-2 text-center flex flex-col items-center justify-center gap-1">
          <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-100/50">
            <Mail size={20} />
          </div>
          <h1 className="text-sm font-bold tracking-tight text-sky-900/60 uppercase">NOAH Commerce</h1>
        </div>

        <h2 className="text-2xl font-extrabold text-center mb-6 tracking-tight text-sky-950">
          Contact Us
        </h2>

        {/* Form ref added for direct DOM serializing */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="user_name" // Links directly to your EmailJS email template parameter
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-sky-200/80 rounded-xl p-3 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 text-sky-950 placeholder:text-sky-300 transition-all shadow-sm"
            />
          </div>

          <div>
            <input
              type="email"
              name="user_email" // Links directly to your EmailJS email template parameter
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-sky-200/80 rounded-xl p-3 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 text-sky-950 placeholder:text-sky-300 transition-all shadow-sm"
            />
          </div>

          <div>
            <textarea
              name="message" // Links directly to your EmailJS email template parameter
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-sky-200/80 rounded-xl p-3 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 text-sky-950 placeholder:text-sky-300 h-32 resize-none transition-all shadow-sm custom-scrollbar"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-sky-100 text-white disabled:text-sky-400 p-3 font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-100 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {success && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-center text-xs font-bold animate-in fade-in duration-200">
            {success}
          </div>
        )}

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-950 transition-colors"
          >
            <ArrowLeft size={13} /> Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
