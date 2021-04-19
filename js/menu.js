'use strict';

var isMenuOpen = false;

// Define menuToggle() - toggle menu open/close
function menuToggle() {
    const elMenu = document.querySelector('.nav-menu ul');

    if (!isMenuOpen) elMenu.style.display = 'block';
    else elMenu.style.display = 'none';

    isMenuOpen = !isMenuOpen;
    return;
}