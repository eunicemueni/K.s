// ====== /js/app.js ======

// ---------------------------
// Firebase Initialization
// ---------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ---------------------------
// Global variables
// ---------------------------
let selectedPlan = null;
let currentUser = null;

// ---------------------------
// Payment Modals & Methods
// ---------------------------
export function openPaymentModal(plan) {
    selectedPlan = plan;
    document.getElementById('paymentModal').classList.remove('hidden');
}

export function closePaymentModal() {
    document.getElementById('paymentModal').classList.add('hidden');
}

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
        .then(() => alert("M-Pesa STK Push sent! Check your phone."))
        .catch(err => console.error("M-Pesa Error:", err));
}

export function payWise() {
    alert("Transfer to:\nName: Kairah\nAccount: 12345678\nRouting: 020123456");
}

// ---------------------------
// Video Generation
// ---------------------------
export function generateVideo(userEmail, prompt) {
    fetch('/api/generate-video', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({user_email: userEmail, prompt})
    })
    .then(res => res.json())
    .then(data => {
        if(data.video_url){
            const videoContainer = document.getElementById('generatedVideo');
            videoContainer.src = data.video_url;
            videoContainer.classList.remove('hidden');
            alert(`Video generated! Length: ${data.message}`);
        }
    })
    .catch(err => console.error("Video Generation Error:", err));
}

// ---------------------------
// Dashboard Tabs
// ---------------------------
export function initDashboard() {
    const tabs = document.querySelectorAll('[data-tab]');
    const contents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            contents.forEach(c => c.classList.add('hidden'));
            document.querySelector(`[data-tab-content="${target}"]`).classList.remove('hidden');

            tabs.forEach(t => t.classList.remove('bg-teal-400','text-black'));
            tab.classList.add('bg-teal-400','text-black');
        });
    });
}

// ---------------------------
// Settings / Privacy / FAQ
// ---------------------------
export function toggleSection(id) {
    const section = document.getElementById(id);
    section.classList.toggle('hidden');
}

// ---------------------------
// Animations / Cinematic Effects
// ---------------------------
export function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.classList.add('opacity-0');
        setTimeout(() => el.classList.add('opacity-100'), 500);
    });
}

// ---------------------------
// Firebase Authentication
// ---------------------------

// Email/Password Sign Up
export function signUpWithEmail(email, password, displayName) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            if(displayName) currentUser.displayName = displayName;
            alert(`Sign-up successful! Welcome ${email}`);
            updateDashboardUI();
        })
        .catch(error => alert(error.message));
}

// Email/Password Login
export function loginWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            alert(`Login successful! Welcome ${email}`);
            updateDashboardUI();
        })
        .catch(error => alert(error.message));
}

// Google Login
export function loginWithGoogle() {
    signInWithPopup(auth, provider)
        .then(result => {
            currentUser = result.user;
            alert(`Google login successful! Welcome ${currentUser.email}`);
            updateDashboardUI();
        })
        .catch(error => alert(error.message));
}

// Logout
export function logout() {
    signOut(auth)
        .then(() => {
            currentUser = null;
            alert("Logged out successfully!");
            updateDashboardUI();
        })
        .catch(error => console.error(error));
}

// Listen to Auth State
onAuthStateChanged(auth, user => {
    currentUser = user;
    updateDashboardUI();
});

// Update Dashboard UI based on login state
function updateDashboardUI() {
    const dashboard = document.getElementById('dashboardContent');
    const loginSection = document.getElementById('loginSection');

    if(currentUser){
        dashboard.classList.remove('hidden');
        loginSection.classList.add('hidden');
    } else {
        dashboard.classList.add('hidden');
        loginSection.classList.remove('hidden');
    }
}

// ---------------------------
// Initialize App
// ---------------------------
export function initApp() {
    initDashboard();
    initAnimations();

    // Attach auth buttons
    const googleBtn = document.getElementById('googleLogin');
    if(googleBtn) googleBtn.addEventListener('click', loginWithGoogle);

    const passwordForm = document.getElementById('passwordLogin');
    if(passwordForm){
        passwordForm.addEventListener('submit', e=>{
            e.preventDefault();
            const email = passwordForm.querySelector('#email').value;
            const password = passwordForm.querySelector('#password').value;
            loginWithEmail(email, password);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
