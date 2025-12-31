const holdBtn = document.getElementById('hold-btn');
const music = document.getElementById('bg-music');
const giftIcon = document.getElementById('gift-icon');

// 1. Generate Petals
function createPetals() {
    const container = document.getElementById('petals');
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const size = Math.random() * 15 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 5 + 5 + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(petal);
    }
}
createPetals();

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// 2. Start Hold
let holdTimer;
const startHold = () => {
    if (music) music.play().catch(() => {});
    holdBtn.style.transform = "scale(0.9)";
    holdTimer = setTimeout(() => showScreen('screen2'), 1500);
};
const cancelHold = () => { clearTimeout(holdTimer); holdBtn.style.transform = "scale(1)"; };

holdBtn.onmousedown = startHold;
holdBtn.ontouchstart = startHold;
holdBtn.onmouseup = cancelHold;
holdBtn.ontouchend = cancelHold;

// 3. Card Logic
let cardsRemoved = 0;
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.onclick = () => {
        const dir = index % 2 === 0 ? -1 : 1;
        card.style.transform = `translate(${dir * 450}px, -150px) rotate(${dir * 90}deg)`;
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        cardsRemoved++;
        if (cardsRemoved === cards.length) {
            setTimeout(() => {
                giftIcon.style.opacity = '1';
                giftIcon.style.pointerEvents = 'auto';
                giftIcon.onclick = () => {
                    showScreen('screen3');
                    confetti({ particleCount: 100, colors: ['#4a0404', '#ff4d6d'] });
                };
            }, 600);
        }
    };
});

// 4. Ticket -> Gallery
document.getElementById('claim-btn').onclick = () => showScreen('screen4');

// 5. Gallery Logic
let currentPhoto = 0;
const photos = document.querySelectorAll('.gallery-img');
document.getElementById('photo-frame').onclick = () => {
    photos[currentPhoto].classList.remove('active');
    currentPhoto++;
    if (currentPhoto < photos.length) {
        photos[currentPhoto].classList.add('active');
    } else {
        showScreen('screen5');
    }
};

// 6. Book Logic
const pages = document.querySelectorAll('.page');
pages.forEach((page, index) => {
    page.onclick = (e) => {
        e.stopPropagation();
        if (!page.classList.contains('flipped')) {
            page.classList.add('flipped');
            // Dynamically set z-index so layers stack correctly as they flip
            setTimeout(() => { page.style.zIndex = index; }, 500);
            if (index === pages.length - 1) {
                confetti({ particleCount: 150, spread: 70 });
            }
        }
    };
});