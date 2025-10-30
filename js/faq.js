// ====== /js/faq.js ======

// Import Framer Motion
import { motion, AnimatePresence } from "https://cdn.skypack.dev/framer-motion";

// Container for FAQ
const faqContainer = document.getElementById('faqContainer');

// State to track opened FAQ
let openIndex = null;

// Fetch FAQ data
async function loadFAQ() {
    try {
        const res = await fetch('/data/faq.json');
        const data = await res.json();

        faqContainer.innerHTML = '';

        data.forEach((item, index) => {
            // Wrapper div
            const faqItem = document.createElement('div');
            faqItem.className = "mb-4 border-b border-gray-300 pb-2";

            // Question button
            const questionBtn = document.createElement('button');
            questionBtn.className = "w-full text-left font-semibold text-lg text-white bg-teal-700 px-4 py-2 rounded-md hover:bg-teal-600 transition-all";
            questionBtn.innerText = item.question;

            // Answer container (Framer Motion)
            const answerDiv = document.createElement('div');
            answerDiv.className = "mt-2 text-gray-200 overflow-hidden";

            // Initial max height = 0
            answerDiv.style.maxHeight = '0px';

            // Toggle answer
            questionBtn.addEventListener('click', () => {
                if(openIndex === index){
                    // Close if already open
                    answerDiv.style.maxHeight = '0px';
                    openIndex = null;
                } else {
                    // Close previously opened
                    if(openIndex !== null){
                        const prev = faqContainer.children[openIndex].querySelector('div');
                        prev.style.maxHeight = '0px';
                    }
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
                    openIndex = index;
                }
            });

            // Insert answer text
            answerDiv.innerHTML = item.answer.replace(/\n/g,'<br>');

            // Wrap elements
            faqItem.appendChild(questionBtn);
            faqItem.appendChild(answerDiv);

            // Add fade-in animation on mount
            faqItem.classList.add('opacity-0', 'transform', 'translate-y-2', 'transition-all', 'duration-700', 'ease-in-out');
            setTimeout(() => faqItem.classList.replace('opacity-0','opacity-100'), 100 + index*100);

            faqContainer.appendChild(faqItem);
        });

    } catch (err) {
        console.error("Error loading FAQ:", err);
        faqContainer.innerHTML = "<p class='text-red-400'>Failed to load FAQ. Please try again later.</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadFAQ);
