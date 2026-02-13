// PCAUX LOGIN - ALERT VERSION (100% WORKS)

alert("✅ Auth.js is loaded and running!");

// Wait for page to load
window.onload = function() {
    alert("✅ Page fully loaded");
    
    const loginBtn = document.getElementById('login-btn');
    
    if (loginBtn) {
        alert("✅ Login button found!");
        
        loginBtn.onclick = function(e) {
            e.preventDefault();
            alert("🟢 Sign In button clicked!");
            
            const email = prompt("Enter your email to sign in:");
            if (email) {
                alert("Email entered: " + email);
                
                // Show user section
                document.getElementById('user-section').style.display = 'block';
                document.getElementById('user-email').textContent = email;
                loginBtn.style.display = 'none';
                
                alert("✅ You are now signed in as: " + email);
            }
        };
    } else {
        alert("❌ ERROR: Login button not found!");
    }
};
