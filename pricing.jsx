import React, { useState } from "react";

const Pricing = () => {
  const [modalPlan, setModalPlan] = useState("");
  const [modalAmount, setModalAmount] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMpesaPopup, setShowMpesaPopup] = useState(false);

  const openModal = (plan, amount) => {
    setModalPlan(plan);
    setModalAmount(amount);
    setShowPaymentModal(true);
  };

  const closeModal = () => setShowPaymentModal(false);
  const closeMpesaPopup = () => setShowMpesaPopup(false);

  const showMpesaNumber = () => {
    setShowPaymentModal(false);
    setShowMpesaPopup(true);
  };

  const copyMpesaNumber = () => {
    navigator.clipboard.writeText("0113554446").then(() => {
      alert("M-Pesa number copied to clipboard!");
    });
  };

  const pay = (method) => {
    if (method === "M-Pesa") {
      showMpesaNumber();
    } else {
      alert(`You chose to pay with ${method}. Integration goes here for live processing.`);
      closeModal();
    }
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-start py-12 px-6" style={{ background: "linear-gradient(135deg, #0e0b1b, #1e1632)", fontFamily: "'Poppins', sans-serif" }}>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center" style={{ color: "#D4AF37", fontFamily: "'Cinzel Display', serif" }}>
        Kairah Studio Plans
      </h1>
      <p className="text-gray-300 mb-8 text-center max-w-2xl">
        Unlock divine cinematic creation. Choose your path to brilliance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl w-full px-2">

        {/* Free Plan */}
        <div className="card bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-2xl backdrop-blur-[15px] flex flex-col items-center p-6 hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
          <div className="badge bg-[#D4AF37] text-black font-bold px-2 py-1 rounded text-sm mb-2">Free</div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#D4AF37" }}>Free</h2>
          <p className="text-gray-400 mb-2">₤0 / month</p>
          <p className="text-sm text-gray-300 mb-4">Duration: 6 seconds</p>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>🎬 1 short teaser video</li>
            <li>💡 Perfect for testing</li>
            <li>🚫 Limited resolution</li>
          </ul>
          <div className="text-[#00FF99] font-semibold mt-2">Kairah Fame Booster: Not included</div>
          <button className="bg-gray-500 text-white px-5 py-2 rounded-lg w-full" disabled>Included</button>
        </div>

        {/* Pro Plan */}
        <div className="card bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-2xl backdrop-blur-[15px] flex flex-col items-center p-6 hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
          <div className="badge bg-[#D4AF37] text-black font-bold px-2 py-1 rounded text-sm mb-2">Pro</div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#D4AF37" }}>Pro</h2>
          <p className="text-gray-400 mb-2">$19 / month</p>
          <p className="text-sm text-gray-300 mb-4">Duration: up to 30 seconds</p>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>🎬 10 full-quality videos per month</li>
            <li>⚡ Faster rendering</li>
            <li>📀 Standard cinematic effects</li>
            <li>🌍 Yearly Plan: $300</li>
          </ul>
          <div className="text-[#00FF99] font-semibold mt-2">Kairah Fame Booster: Free for 30 days</div>
          <button
            className="bg-[#D4AF37] hover:bg-[#b9962f] text-black font-semibold px-5 py-2 rounded-lg w-full"
            onClick={() => openModal("Pro", 19)}
          >
            Subscribe
          </button>
        </div>

        {/* Diamond Plan */}
        <div className="card bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-2xl backdrop-blur-[15px] flex flex-col items-center p-6 hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
          <div className="badge bg-[#D4AF37] text-black font-bold px-2 py-1 rounded text-sm mb-2">Diamond</div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#D4AF37" }}>Diamond</h2>
          <p className="text-gray-400 mb-2">$49 / month</p>
          <p className="text-sm text-gray-300 mb-4">Duration: up to 1 minute</p>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>🎬 Unlimited HD videos</li>
            <li>🚀 Priority rendering</li>
            <li>✨ Premium effects & transitions</li>
            <li>🌍 Yearly Plan: $450</li>
          </ul>
          <div className="text-[#00FF99] font-semibold mt-2">Kairah Fame Booster: Free for 6 months</div>
          <button
            className="bg-[#D4AF37] hover:bg-[#b9962f] text-black font-semibold px-5 py-2 rounded-lg w-full"
            onClick={() => openModal("Diamond", 49)}
          >
            Subscribe
          </button>
        </div>

        {/* Cinematic Plan */}
        <div className="card bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-2xl backdrop-blur-[15px] flex flex-col items-center p-6 hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
          <div className="badge bg-[#D4AF37] text-black font-bold px-2 py-1 rounded text-sm mb-2">Cinematic</div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#D4AF37" }}>Cinematic</h2>
          <p className="text-gray-400 mb-2">$99 / month</p>
          <p className="text-sm text-gray-300 mb-4">Duration: 2–3 minutes</p>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>🎞️ Unlimited ultra-HD videos</li>
            <li>🪄 Advanced cinematic filters</li>
            <li>🎧 Sound-enhanced AI voice scenes</li>
            <li>🌍 Yearly Plan: $600</li>
          </ul>
          <div className="text-[#00FF99] font-semibold mt-2">Kairah Fame Booster: Free permanently</div>
          <button
            className="bg-[#D4AF37] hover:bg-[#b9962f] text-black font-semibold px-5 py-2 rounded-lg w-full"
            onClick={() => openModal("Cinematic", 99)}
          >
            Subscribe
          </button>
        </div>

        {/* Lifetime Plan */}
        <div className="card bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-2xl backdrop-blur-[15px] flex flex-col items-center p-6 hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
          <div className="badge bg-[#D4AF37] text-black font-bold px-2 py-1 rounded text-sm mb-2">Lifetime</div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#D4AF37" }}>Lifetime</h2>
          <p className="text-gray-400 mb-2">$500 / one-time</p>
          <p className="text-sm text-gray-300 mb-4">Duration: Unlimited access forever</p>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>💎 Unlimited cinematic generation</li>
            <li>🪄 All future features included</li>
            <li>🚀 Lifetime priority support</li>
          </ul>
          <div className="text-[#00FF99] font-semibold mt-2">Kairah Fame Booster: Free permanently</div>
          <button
            className="bg-[#D4AF37] hover:bg-[#b9962f] text-black font-semibold px-5 py-2 rounded-lg w-full"
            onClick={() => openModal("Lifetime", 500)}
          >
            Buy Now
          </button>
        </div>

      </div>

      <p className="text-gray-400 mt-10 text-center text-sm">© 2025 Kairah Studio — Divine Cinematics by AI</p>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-backdrop absolute inset-0 bg-[rgba(0,0,0,0.6)]"></div>
          <div className="modal-content bg-[#0b0a0f] rounded-2xl p-8 border border-[rgba(255,255,255,0.2)] max-w-sm w-[90%] text-center">
            <h2 className="text-2xl mb-4" style={{ color: "#D4AF37" }}>Pay for {modalPlan}</h2>
            <p className="text-gray-300 mb-4">Amount: ${modalAmount}</p>

            <button className="flex items-center justify-center gap-2 bg-white p-2 rounded-lg shadow hover:scale-105 transition" onClick={() => pay("Paystack")}>
              Paystack
            </button>
            <button className="flex items-center justify-center gap-2 bg-white p-2 rounded-lg shadow hover:scale-105 transition" onClick={() => pay("Stripe")}>
              Stripe
            </button>
            <button className="flex items-center justify-center gap-2 bg-white p-2 rounded-lg shadow hover:scale-105 transition" onClick={() => pay("PayPal")}>
              PayPal
            </button>
            <button className="flex items-center justify-center gap-2 bg-white p-2 rounded-lg shadow hover:scale-105 transition" onClick={() => pay("Wise")}>
              Wise
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-500 p-2 rounded-lg shadow hover:scale-105 transition" onClick={showMpesaNumber}>
              M-Pesa
            </button>

            <button className="mt-4 bg-gray-600 text-white w-full py-2 rounded-lg" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* M-Pesa Popup */}
      {showMpesaPopup && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-backdrop absolute inset-0 bg-[rgba(0,0,0,0.6)]"></div>
          <div className="modal-content bg-[#0b0a0f] rounded-2xl p-8 border border-[rgba(255,255,255,0.2)] max-w-sm w-[90%] text-center">
            <h2 className="text-2xl mb-4" style={{ color: "#D4AF37" }}>Pay with M-Pesa</h2>
            <p className="text-gray-300 mb-2">Send your payment to this number:</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-white font-bold text-lg">0113554446</span>
              <button className="bg-gray-200 text-black px-3 py-1 rounded" onClick={copyMpesaNumber}>Copy</button>
            </div>
            <div className="text-gray-400 text-sm mb-4">
              <p>Step 1: Open your M-Pesa menu on your phone.</p>
              <p>Step 2: Select “Send Money” and enter <strong>0113554446</strong> as the recipient.</p>
              <p>Step 3: Enter the amount displayed on the pricing plan.</p>
              <p>Step 4: Confirm the transaction with your PIN.</p>
              <p>Step 5: After payment, confirm your email/username to get access.</p>
            </div>
            <button className="mt-4 bg-gray-600 text-white w-full py-2 rounded-lg" onClick={closeMpesaPopup}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Pricing;
