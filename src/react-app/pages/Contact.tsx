import { Mail, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/40 px-4 text-slate-900 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="p-2.5 bg-green-50 text-green-600 rounded-xl border border-green-100 inline-flex">
            <Mail size={20} />
          </div>

          <h2 className="text-2xl font-extrabold mt-3 text-slate-900">
            Contact
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Choose how to reach us
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">

          <a
            href="https://www.sonicresume.com/contact"
            className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold text-sm p-3 rounded-xl transition"
          >
            Contact Business
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61585916721060"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm p-3 rounded-xl transition"
          >
            <Facebook size={16} />
            Facebook
          </a>

        </div>

      </div>
    </div>
  );
}