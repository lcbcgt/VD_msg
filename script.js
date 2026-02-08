// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionCard = document.getElementById('questionCard');
const successMessage = document.getElementById('successMessage');

// Track button state
let noClickCount = 0;
let yesGrowthFactor = 1;
const maxNoClicks = 6; // After 6 attempts, "No" button disappears
const shrinkRate = 0.18; // 18% smaller each time
const growthRate = 0.12; // 12% larger each time

// Function to move "No" button to random position
function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe boundaries (keep button within viewport)
    const maxX = window.innerWidth - btnRect.width - 40;
    const maxY = window.innerHeight - btnRect.height - 40;
    const minX = 20;
    const minY = 20;
    
    // Generate random position
    const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
    const randomY = Math.floor(Math.random() * (maxY - minY) + minY);
    
    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Function to handle "No" button interaction
function handleNoButton(e) {
    e.preventDefault();
    
    noClickCount++;
    
    // Shrink the "No" button
    const newScale = 1 - (shrinkRate * noClickCount);
    
    if (noClickCount >= maxNoClicks) {
        // Hide the button completely
        noBtn.classList.add('hidden');
    } else {
        // Shrink and move the button
        noBtn.style.transform = `scale(${newScale})`;
        moveNoButton();
    }
    
    // Grow the "Yes" button
    yesGrowthFactor += growthRate;
    const maxGrowth = 2.2; // Max 220% of original size
    const finalGrowth = Math.min(yesGrowthFactor, maxGrowth);
    yesBtn.style.transform = `scale(${finalGrowth})`;
}

// Event listeners for "No" button
noBtn.addEventListener('mouseenter', handleNoButton);
noBtn.addEventListener('click', handleNoButton);
noBtn.addEventListener('touchstart', (e) => {
    handleNoButton(e);
}, { passive: false });

// Event listener for "Yes" button
yesBtn.addEventListener('click', () => {
    // Hide question card
    questionCard.style.display = 'none';
    
    // Show success message with animation
    successMessage.classList.add('show');
});

// Prevent accidental scrolling on mobile during interaction
document.addEventListener('touchmove', (e) => {
    if (e.target === noBtn) {
        e.preventDefault();
    }
}, { passive: false });
