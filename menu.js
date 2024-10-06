// Function to toggle the dropdown menu
function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    menuIcon.classList.toggle('active');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Function to close the dropdown menu if clicked outside
window.onclick = function(event) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const menuIcon = document.querySelector('.menu-icon');
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
        menuIcon.classList.remove('active');
    }
}