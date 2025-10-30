// ====== /js/video.js ======

// Import environment variables (API keys, endpoints)
import { VIDEO_API } from '/config/env.js';

// Dashboard elements
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const videosContainer = document.getElementById('videosContainer');
const messageBox = document.getElementById('messageBox');

// Track user data (to be set after login)
let currentUser = null;

// ------------------------
// Utility functions
// ------------------------
function showMessage(msg, type = 'info') {
    messageBox.innerText = msg;
    messageBox.className = type === 'error'
        ? 'text-red-500 font-semibold my-2'
        : 'text-green-400 font-semibold my-2';
}

// Create video card
function createVideoCard(video) {
    const div = document.createElement('div');
    div.className = "bg-gray-900 p-4 rounded-xl shadow-lg mb-4 flex flex-col items-center animate-fadeIn";

    const vid = document.createElement('video');
    vid.src = video.url;
    vid.controls = true;
    vid.className = "rounded-lg max-w-full";

    const desc = document.createElement('p');
    desc.className = "text-gray-200 mt-2 text-center";
    desc.innerText = `Prompt: ${video.prompt} | Length: ${video.length}s`;

    div.appendChild(vid);
    div.appendChild(desc);
    videosContainer.prepend(div);
}

// ------------------------
// Generate Video
// ------------------------
async function generateVideo() {
    if (!currentUser) {
        showMessage("Please login or sign up to generate videos.", "error");
        return;
    }

    const prompt = promptInput.value.trim();
    if (!prompt) {
        showMessage("Please enter a prompt.", "error");
        return;
    }

    // Determine plan limits
    let lengthSeconds = 6; // default Free
    let plan = currentUser.plan || 'Free';
    let userVideos = currentUser.videos || 0;

    switch (plan) {
        case 'Free': 
            if (userVideos >= 1) {
                showMessage("Free plan allows only 1 video. Upgrade to generate more.", "error");
                return;
            }
            lengthSeconds = 6; break;
        case 'Pro': lengthSeconds = 30; break;
        case 'Diamond': lengthSeconds = 30; break;
        case 'Cinematic': lengthSeconds = 180; break; // 2-3 minutes
        case 'Lifetime': lengthSeconds = 180; break;
    }

    // Show loading animation
    generateBtn.disabled = true;
    generateBtn.innerText = "Generating...";
    showMessage(`Generating ${plan} video...`, "info");

    try {
        const res = await fetch('/api/generate-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_email: currentUser.email,
                prompt: prompt
            })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.detail || "Video generation failed");

        // Update user video count
        currentUser.videos = (currentUser.videos || 0) + 1;

        // Show generated video
        createVideoCard({ url: data.video_url, prompt: prompt, length: lengthSeconds });

        showMessage(`Video generated successfully! (${lengthSeconds}s)`);

    } catch (err) {
        console.error(err);
        showMessage(`Error: ${err.message}`, "error");
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerText = "Generate Video";
        promptInput.value = '';
    }
}

// ------------------------
// Event Listeners
// ------------------------
generateBtn.addEventListener('click', generateVideo);

// ------------------------
// Initialize dashboard with current user info
// ------------------------
export function setCurrentUser(user) {
    currentUser = user;
    if (!currentUser.videos) currentUser.videos = 0;
    showMessage(`Welcome ${currentUser.display_name || currentUser.email}! Your plan: ${currentUser.plan || 'Free'}`);
}

// ------------------------
// Animation (Tailwind + simple fadeIn)
// ------------------------
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn { from {opacity:0; transform: translateY(10px);} to {opacity:1; transform: translateY(0);} }
.animate-fadeIn { animation: fadeIn 0.8s ease-out; }
`;
document.head.appendChild(style);
