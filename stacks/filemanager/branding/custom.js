// Wait for Filebrowser SPA to mount the login form
const injectUploadButton = () => {
    // Only execute on the login page
    if (window.location.pathname !== "/login") return;
    
    // Check if form exists and button is not already there
    const loginForm = document.querySelector('form');
    if (loginForm && !document.querySelector('#custom-upload-btn')) {
        const uploadBtnContainer = document.createElement('div');
        uploadBtnContainer.style.marginTop = '20px';
        uploadBtnContainer.style.textAlign = 'center';

        const uploadBtn = document.createElement('a');
        uploadBtn.id = 'custom-upload-btn';
        uploadBtn.innerText = 'UPLOAD FILE';
        
        // IMPORTANT: Admin needs to open /srv/uploads in the web UI, 
        // click 'Share', grant Upload permissions, and copy the hash here.
        // Replace YOUR_SHARE_LINK_HERE with the hash.
        uploadBtn.href = '/share/YOUR_SHARE_LINK_HERE';
        
        // Professional button styling
        uploadBtn.style.display = 'block';
        uploadBtn.style.padding = '12px 24px';
        uploadBtn.style.backgroundColor = '#2563eb';
        uploadBtn.style.color = '#ffffff';
        uploadBtn.style.textDecoration = 'none';
        uploadBtn.style.borderRadius = '6px';
        uploadBtn.style.fontWeight = 'bold';
        uploadBtn.style.fontSize = '16px';
        uploadBtn.style.transition = 'background-color 0.2s';
        uploadBtn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        
        // Hover effect
        uploadBtn.onmouseover = () => { uploadBtn.style.backgroundColor = '#1d4ed8'; };
        uploadBtn.onmouseout = () => { uploadBtn.style.backgroundColor = '#2563eb'; };

        uploadBtnContainer.appendChild(uploadBtn);
        loginForm.parentNode.insertBefore(uploadBtnContainer, loginForm.nextSibling);
    }
};

// Use MutationObserver to watch for route changes in Vue SPA logic
const observer = new MutationObserver(injectUploadButton);
observer.observe(document.body, { childList: true, subtree: true });

// Initial check when script loads
injectUploadButton();
