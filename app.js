// Login logic for PCAux
document.addEventListener('DOMContentLoaded', () => {
    console.log('PCAux app loaded');
    checkUser();
    
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        console.log('Login button found');
        loginBtn.addEventListener('click', handleLogin);
    } else {
        console.error('Login button not found!');
    }
});

async function handleLogin(e) {
    e.preventDefault();
    const email = prompt('Enter your email to sign in:');
    if (!email) return;
    
    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: { 
                shouldCreateUser: true,
                emailRedirectTo: window.location.origin + '/dashboard.html'
            }
        });
        
        if (error) throw error;
        alert('✨ Magic link sent! Check your email.');
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Login error:', error);
    }
}

async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        console.log('User logged in:', user.email);
        document.getElementById('user-section').style.display = 'block';
        document.getElementById('user-email').textContent = user.email;
        
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) loginBtn.style.display = 'none';
        
        await ensureProfile(user);
    }
}

async function ensureProfile(user) {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
    
    if (!profile) {
        console.log('Creating profile for:', user.email);
        const { error } = await supabase
            .from('profiles')
            .insert([{ 
                id: user.id, 
                email: user.email,
                treasury_cents: 25000,
                treasury_max_cents: 15000
            }]);
        
        if (error) console.error('Profile creation error:', error);
    } else {
        console.log('Profile exists:', profile);
    }
}
