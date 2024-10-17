
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    setTimeout(() => {
        document.getElementById(modalId).style.opacity = 1;
    }, 10);
}
function closeModal(modalId) {
    document.getElementById(modalId).style.opacity = 0;
    setTimeout(() => {
        document.getElementById(modalId).style.display = "none";
    }, 300);
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

