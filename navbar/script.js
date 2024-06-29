// script.js

document.getElementById('show-more-button').addEventListener('click', function() {
    const menuItems = document.querySelectorAll('#menu li');
    menuItems.forEach(item => {
        if (item.style.display === 'block' || item.style.display === '') {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });
});
