// ====== app.js ======

// Store selected plan globally
let selectedPlan = null;

// =====================
// Modal Handling
// =====================
export function openPaymentModal(plan) {
    selectedPlan = plan;
    document.getElementById('paymentModal').classList.remove('hidden');
}
export function closePaymentModal() {
    document.getElementById('paymentModal').classList.add('hidden');
}

// =====================
// Payment Methods
// =====================
export function payStripe() {
    fetch(`/api/stripe-checkout?plan=${selectedPlan}`)
        .then(res => res.json())
        .then(data => window.location.href = data.checkout_url)
        .catch(err => console.error("Stripe Error:", err));
}

export function payPayPal() {
    fetch(`/api/paypal-create?plan=${selectedPlan}`)
        .then(res => res.json())
        .then(data => window.location.href = data.approval_url)
        .catch(err => console.error("PayPal Error:", err));
}

export function payPaystack() {
    fetch(`/api/paystack-init?plan=${selectedPlan}`)
        .then(res => res.json())
        .then(data => window.location.href = data.authorization_url)
        .catch(err => console.error("Paystack Error:", err));
}

export function payMpesa() {
    fetch(`/api/mpesa-stkpush?plan=${selectedPlan}`)
        .then(res => res.json())
        .then(data => alert("M-Pesa STK Push sent! Check your phone."))
        .catch(err => console.error("M-Pesa Error:", err));
}

export function payWise() {
    alert("Use the following account to transfer:\nName: Kairah\nAccount: 12345678\nRouting: 020123456");
}

// =====================
// Video Generation
// =====================
export function generateVideo(userEmail, prompt) {
    fetch('/api/generate-video', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({user_email: userEmail, prompt})
    })
    .then(res => res.json())
    .then(data => {
        if(data.video_url){
            // display video
            const videoContainer = document.getElementById('generatedVideo');
            videoContainer.src = data.video_url;
            videoContainer.classList.remove('hidden');
            alert(`Video generated! Length: ${data.message}`);
        }
    })
    .catch(err => console.error("Video Generation Error:", err));
}

// =====================
// Dashboard Tabs / Interactivity
// =====================
export function initDashboard() {
    const tabs = document.querySelectorAll('[data-tab]');
    const contents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            contents.forEach(c => c.classList.add('hidden'));
            document.querySelector(`[data-tab-content="${target}"]`).classList.remove('hidden');

            tabs.forEach(t => t.classList.remove('bg-teal-400', 'text-black'));
            tab.classList.add('bg-teal-400', 'text-black');
        });
    });
}

// =====================
// Settings / Privacy / FAQ
// =====================
export function toggleSection(id) {
    const section = document.getElementById(id);
    section.classList.toggle('hidden');
}

// =====================
// Animations / Effects
// =====================
export function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.classList.add('opacity-0');
        setTimeout(() => el.classList.add('opacity-100'), 500);
    });
}

// =====================
// Google Login / Password
// =====================
export function initAuthUI() {
    // Placeholder: your Firebase / Google login integration
    const googleBtn = document.getElementById('googleLogin');
    if(googleBtn){
        googleBtn.addEventListener('click', async ()=>{
            // call firebase auth popup
            alert('Google login triggered (Firebase integration required)');
        });
    }

    const passwordForm = document.getElementById('passwordLogin');
    if(passwordForm){
        passwordForm.addEventListener('submit', e=>{
            e.preventDefault();
            const email = passwordForm.querySelector('#email').value;
            const password = passwordForm.querySelector('#password').value;
            alert(`Password login triggered for ${email} (Firebase or local verification required)`);
        });
    }
}

// =====================
// Init Function
// =====================
export function initApp() {
    initDashboard();
    initAnimations();
    initAuthUI();
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
