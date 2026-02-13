// PCAUX - FULL SUPABASE AUTHENTICATION
console.log('🔥 PCAux Auth Loaded');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('✅ DOM ready');
    
    const loginBtn = document.getElementById('login-btn');
    console.log('Login button found:', loginBtn ? 'YES' : 'NO');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    // Check if user is already logged in
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

async function checkUser() {
    console.log('Checking for existing user...');
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        console.log('✅ User logged in:', user.email);
        
        // Show user section
        const userSection = document.getElementById('user-section');
        if (userSection) {
            userSection.style.display = 'block';
            document.getElementById('user-email').textContent = user.email;
        }
        
        // Hide login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) loginBtn.style.display = 'none';
        
        // Create or update profile
        await ensureProfile(user);
        
        // Add dashboard link
        addDashboardLink();
    }
}

async function ensureProfile(user) {
    try {
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
        }
    } catch (error) {
        console.error('Profile check error:', error);
    }
}

function addDashboardLink() {
    if (!document.getElementById('dashboard-link')) {
        const dashboardLink = document.createElement('a');
        dashboardLink.id = 'dashboard-link';
        dashboardLink.href = 'dashboard.html';
        dashboardLink.textContent = 'Enter Auction Arena →';
        dashboardLink.style.display = 'inline-block';
        dashboardLink.style.background = 'var(--accent)';
        dashboardLink.style.color = '#020617';
        dashboardLink.style.padding = '12px 24px';
        dashboardLink.style.borderRadius = '4px';
        dashboardLink.style.marginTop = '10px';
        dashboardLink.style.fontWeight = '600';
        dashboardLink.style.textDecoration = 'none';
        
        document.getElementById('user-section').appendChild(dashboardLink);
    }
}
