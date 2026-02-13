// PCAUX - FULL SUPABASE AUTHENTICATION
console.log('🔥 PCAux Auth Loaded');

// Use the global supabase client
const supabase = window.supabaseClient;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('✅ DOM ready');
    console.log('Supabase client exists:', supabase ? 'YES' : 'NO');
    
    const loginBtn = document.getElementById('login-btn');
    console.log('Login button found:', loginBtn ? 'YES' : 'NO');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    await checkUser();
});

async function handleLogin(e) {
    e.preventDefault();
    console.log('🟢 Login clicked');
    
    const email = prompt('Enter your email to sign in:');
    if (!email) return;
    
    try {
        console.log('Attempting login for:', email);
        
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: window.location.origin + '/dashboard.html'
            }
        });
        
        if (error) throw error;
        
        alert('✨ Magic link sent! Check your email.');
        console.log('✅ Magic link sent');
        
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Login error:', error);
    }
}

// ... rest of your auth.js code (keep everything else the same)
