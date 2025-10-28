// Dropdown when you click "Learn more"
document.addEventListener('DOMContentLoaded', function() {
  const aboutLink = document.getElementById('about-link');
  const aboutDropdown = document.getElementById('about-dropdown');

  aboutLink.addEventListener('click', function(e) {
    e.preventDefault();
    const isHidden = aboutDropdown.hasAttribute('hidden');
    if (isHidden) {
      aboutDropdown.removeAttribute('hidden');
      setTimeout(() => {
        aboutDropdown.classList.add('show');
      }, 10);
    } else {
      aboutDropdown.classList.remove('show');
      setTimeout(() => {
        aboutDropdown.setAttribute('hidden', '');
      }, 300);
    }
  });

  // Close the dropdown when you click somewhere else
  document.addEventListener('click', function(e) {
    if (!aboutLink.contains(e.target) && !aboutDropdown.contains(e.target)) {
      if (!aboutDropdown.hasAttribute('hidden')) {
        aboutDropdown.classList.remove('show');
        setTimeout(() => {
          aboutDropdown.setAttribute('hidden', '');
        }, 300);
      }
    }
  });
});
