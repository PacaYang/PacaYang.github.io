// Main JavaScript file for Allergy Health Daily


// Head Component - Insert favicon and stylesheets
function insertHeadElements(pageType = 'root') {
    // Check if head elements already exist to prevent duplicates
    if (document.querySelector('link[rel="icon"]')) {
        return; // Already inserted
    }
    
    // Determine the correct path based on page type
    const assetPath = pageType === 'blog' ? '../assets' : 'assets';
    
    // Create the head elements
    const headElements = `
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="${assetPath}/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetPath}/images/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetPath}/images/favicon-32x32.png">
        <link rel="apple-touch-icon" sizes="180x180" href="${assetPath}/images/apple-touch-icon.png">
        <link rel="manifest" href="${assetPath}/images/site.webmanifest">

        <!-- Additional Meta Tags -->
        <meta name="theme-color" content="#2c5aa0">
        <meta name="msapplication-TileColor" content="#2c5aa0">
    `;
    
    // Insert the elements into the head
    document.head.insertAdjacentHTML('beforeend', headElements);
    
    // Load stylesheets with proper loading detection
    loadStylesheets(assetPath);
}


// Load stylesheets and show content when ready
function loadStylesheets(assetPath) {
    let stylesheetsLoaded = 0;
    const totalStylesheets = 2;
    let contentShown = false;
    
    function showContent() {
        if (!contentShown) {
            contentShown = true;
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        }
    }
    
    function onStylesheetLoad() {
        stylesheetsLoaded++;
        if (stylesheetsLoaded === totalStylesheets) {
            // All stylesheets loaded, show the content
            showContent();
        }
    }
    
    // Fallback: Show content after 2 seconds even if CSS doesn't load
    setTimeout(showContent, 2000);
    
    
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css';
    bootstrapCSS.integrity = 'sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr';
    bootstrapCSS.crossOrigin = 'anonymous';
    bootstrapCSS.onload = onStylesheetLoad;
    bootstrapCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(bootstrapCSS);

    // Load main stylesheet
    const mainCSS = document.createElement('link');
    mainCSS.rel = 'stylesheet';
    mainCSS.href = `${assetPath}/css/style.css`;
    mainCSS.onload = onStylesheetLoad;
    mainCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(mainCSS);
}

// Navigation Component - Insert navigation HTML
function insertNavigation(pageType = 'root', currentPage = '') {
    // Determine the correct paths based on page type
    const homePath = pageType === 'blog' ? '../index.html' : 'index.html';
    const logoPath = pageType === 'blog' ? '../assets/images/GTSLogo.png' : 'assets/images/GTSLogo.png';
  
    // Define the header HTML (now actually using the paths)
    const navHTML = `
        <nav id="mainHeader" class="navbar navbar-expand-lg border-bottom fixed-top">
            <div class="container justify-content-center">
                <a class="navbar-brand mx-auto" href="https://glowthriveshine.com">
                    <img src="${logoPath}" alt="Logo">
                </a>
            </div>
        </nav>
    `;
  
    // Insert at the very beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  

// Footer Component - Insert footer HTML
function insertFooter(pageType = 'root') {
    // Determine the correct paths based on page type
    const privacyPath = pageType === 'blog' ? '../privacy-policy.html' : 'privacy-policy.html';
    const termsPath = pageType === 'blog' ? '../terms-of-service.html' : 'terms-of-service.html';
    
    // Create footer HTML
    const footerHTML = `
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <p>&copy; 2025 GlowThriveShine. All rights reserved.</p>
                        <p>
                            <a href="${privacyPath}">Privacy Policy</a> | 
                            <a href="${termsPath}">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Insert footer at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Load components immediately when script loads (before DOM ready)
(function() {
    // Check if we're in a blog subdirectory
    const isInBlog = window.location.pathname.includes('/blog/');
    const pageType = isInBlog ? 'blog' : 'root';
    
    // Determine current page for active state
    let currentPage = '';
    if (window.location.pathname.includes('/blog/')) {
        currentPage = 'blog';
    } else if (window.location.pathname.includes('quiz.html')) {
        currentPage = 'quiz';
    }
    
    // Insert head elements immediately
    insertHeadElements(pageType);
    
    // Insert navigation and footer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (!document.querySelector('nav')) {
                insertNavigation(pageType, currentPage);
            }
            if (!document.querySelector('footer')) {
                insertFooter(pageType);
            }
        });
    } else {
        // DOM already loaded
        if (!document.querySelector('nav')) {
            insertNavigation(pageType, currentPage);
        }
        if (!document.querySelector('footer')) {
            insertFooter(pageType);
        }
    }
})();


// Wait for DOM to be fully loaded for additional functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// control header to hide when scroll down

let lastScrollTop = 0;
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.style.top = "-100%";
  } else {
    // Scrolling up
    header.style.top = "0";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative values
}, false);

// used for sharing buttons
document.addEventListener('DOMContentLoaded', function () {
  const pageUrl = window.location.href;
  const encodedUrl = encodeURIComponent(pageUrl);
  const pageTitle = document.title || 'Check this out';
  const encodedTitle = encodeURIComponent(pageTitle);
  const defaultText = encodeURIComponent('Check this out!');

  // Optional: Use native share on mobile if available
  function tryNativeShare(textLabel) {
    if (navigator.share) {
      navigator.share({ title: pageTitle, text: textLabel || pageTitle, url: pageUrl })
        .catch(() => {}); // user canceled or not supported by target app
      return true;
    }
    return false;
  }

  // Assign URLs / handlers
  document.querySelectorAll('[aria-label]').forEach(el => {
    const type = el.getAttribute('aria-label');

    if (type === 'X') {
      // X (Twitter)
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${defaultText}`;
      el.setAttribute('href', shareUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.addEventListener('click', e => {
        // try native share first
        if (tryNativeShare('Check this out!')) { e.preventDefault(); }
      });
    }

    if (type === 'LinkedIn') {
      // LinkedIn
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      el.setAttribute('href', shareUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.addEventListener('click', e => {
        if (tryNativeShare()) { e.preventDefault(); }
      });
    }

    if (type === 'Email') {
      // Email
      const subject = encodedTitle;
      const body = encodeURIComponent(`${pageTitle}\n\n${pageUrl}`);
      const mailto = `mailto:?subject=${subject}&body=${body}`;
      el.setAttribute('href', mailto);
      // mailto should open the client; no native share override
    }

    if (type === 'Instagram') {
      // No web share URL for Instagram posts. Best we can do is copy the link.
      const shareUrl = `https://www.instagram.com/glowthriveshine/`;
      el.setAttribute('href', shareUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.addEventListener('click', e => {
        if (tryNativeShare()) { e.preventDefault(); }
      });
    }
  });
});

// copy button function
const copyBtn = document.getElementById("copyBtn");
const popup = document.getElementById("popup");

copyBtn.addEventListener("click", () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    // Show popup
    popup.classList.add("show");

    // Hide after 2 seconds
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  });
});