document.addEventListener('DOMContentLoaded', () => {
    const storyWrapper = document.querySelector('.story-wrapper');
    const stories = document.querySelectorAll('.story');
    const progressBar = document.querySelector('.progress-bar');
    const actionButton = document.querySelector('.action-button');
    const dmInput = document.querySelector('.dm-input');
    const dmSendButton = document.querySelector('.dm-send-button');

    let currentIndex = 0;
    let interval;

    const updateProgressBar = () => {
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 50);
    };

    const showStory = (index) => {
        storyWrapper.style.transform = `translateX(-${index * 100}%)`;
        updateProgressBar();
    };

    const startAutoSlide = () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % stories.length;
            showStory(currentIndex);
        }, 5000);
    };

    const stopAutoSlide = () => {
        clearInterval(interval);
    };

    actionButton.addEventListener('click', () => {
        if (actionButton.classList.contains('pause-button')) {
            actionButton.textContent = '미트볼';
            actionButton.classList.replace('pause-button', 'meatball-button');
        } else if (actionButton.classList.contains('meatball-button')) {
            actionButton.textContent = '엑스';
            actionButton.classList.replace('meatball-button', 'close-button');
        } else if (actionButton.classList.contains('close-button')) {
            window.location.href = '/';
        }
    });

    storyWrapper.addEventListener('click', (e) => {
        const clickX = e.clientX;
        const containerWidth = storyWrapper.offsetWidth;

        if (clickX < containerWidth / 5) {
            currentIndex = (currentIndex - 1 + stories.length) % stories.length;
        } else if (clickX > containerWidth * 4 / 5) {
            currentIndex = (currentIndex + 1) % stories.length;
        }
        showStory(currentIndex);
    });

    dmSendButton.addEventListener('click', () => {
        const message = dmInput.value.trim();
        if (message) {
            alert(`메시지 전송: ${message}`);
            dmInput.value = '';
        }
    });

    updateProgressBar();
    startAutoSlide();
});
