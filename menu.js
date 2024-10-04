// Function to toggle the dropdown menu
function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    menuIcon.classList.toggle('active');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}