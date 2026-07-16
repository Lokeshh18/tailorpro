// Common Application Logic for Tailor Pro (Bootstrap 5 - Original Theme)
// Handles session checks, navbar rendering, active pages, and logouts

document.addEventListener("DOMContentLoaded", function() {
    // 1. Render responsive Bootstrap navbar links
    renderNavbarUI();

    // 2. Route protection for user account pages
    protectRestrictedPages();
});

// Helper: Get current page filename
function getCurrentPage() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
}

// Helper: Get current logged-in user session
function getLoggedInUser() {
    const userStr = localStorage.getItem("tailorpro_current_user");
    return userStr ? JSON.parse(userStr) : null;
}

// Helper: Verify if user session exists
function isLoggedIn() {
    return getLoggedInUser() !== null;
}

// Protect pages (redirect to login if not authenticated)
function protectRestrictedPages() {
    const currentPage = getCurrentPage();
    const restrictedPages = ['dashboard.html', 'orders.html'];
    
    if (restrictedPages.includes(currentPage) && !isLoggedIn()) {
        alert("Please log in to access this page.");
        window.location.href = "login.html";
    }
}

// Dynamically generate navbar links matching the Bootstrap 5 responsive collapse structure
function renderNavbarUI() {
    const navList = document.querySelector(".navbar-custom .navbar-nav");
    const currentPage = getCurrentPage();

    if (!navList) return;

    // Define standard pages
    const links = [
        { name: "Home", url: "index.html" },
        { name: "Gallery", url: "gallery.html" },
        { name: "Orders", url: "orders.html" },
        { name: "Feedback", url: "feedback.html" }
    ];

    // If logged in, add Dashboard, otherwise they see standard pages
    if (isLoggedIn()) {
        links.push({ name: "Dashboard", url: "dashboard.html" });
    }

    // Check if the user is the Admin
    const currentUser = getLoggedInUser();
    if (currentUser && currentUser.email === "admin@tailorpro.com") {
        links.push({ name: "Admin Panel", url: "admin.html" });
    }

    // Generate link elements
    let navItemsHtml = "";
    links.forEach(link => {
        const isActive = currentPage === link.url;
        const activeClass = isActive ? "active" : "";
        navItemsHtml += `
            <li class="nav-item">
                <a class="nav-link ${activeClass} px-3 text-uppercase font-semibold text-xs tracking-wider" href="${link.url}">${link.name}</a>
            </li>
        `;
    });

    // Generate Auth Button at the end of the navbar
    if (isLoggedIn()) {
        navItemsHtml += `
            <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
                <div class="d-flex align-items-center">
                    <span class="text-dark me-3 font-semibold text-xs text-uppercase tracking-wider d-none d-lg-inline">Welcome, ${currentUser.name.split(' ')[0]}</span>
                    <button onclick="logoutUser()" class="btn btn-outline-dark btn-sm px-3 py-1.5 rounded-0 font-semibold text-xs tracking-wider">Logout</button>
                </div>
            </li>
        `;
    } else {
        navItemsHtml += `
            <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
                <a href="login.html" class="btn btn-dark-atelier btn-sm px-4 py-1.5 rounded-0 font-semibold text-xs tracking-wider">Sign In</a>
            </li>
        `;
    }

    navList.innerHTML = navItemsHtml;
}

// User logout handler
window.logoutUser = function() {
    localStorage.removeItem("tailorpro_current_user");
    alert("You have been logged out successfully.");
    window.location.href = "index.html";
};
