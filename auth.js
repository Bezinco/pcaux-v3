// PCAUX Authentication
console.log('🔥 Auth.js loaded');

// Use the global supabase client
const supabase = window.supabase;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM ready');
    console.log('Supabase exists:', !!supabase);
    
    const loginBtn = document.getElementById('login-btn');
    console.log('Login button:', loginBtn ? 'FOUND' : 'NOT FOUND');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log('🟢 Login clicked');
            
            const email = prompt('Enter your email:');
            if (!email) return;
            
            try {
                const { error } = await supabase.auth.signInWithOtp({
                    email: email,
                    options: { shouldCreateUser: true }
                });
                
                if (error) throw error;
                alert('✅ Magic link sent! Check your email.');
            } catch (err) {
                alert('Error: ' + err.message);
                console.error(err);
            }
        });
    }
});
