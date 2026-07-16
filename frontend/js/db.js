// Database Controller for Tailor Pro (Original Atelier Theme)
// Handles database actions using Render API, Supabase, or LocalStorage fallback

let supabaseClient = null;
let isSupabaseActive = false;
let isRenderActive = false;

// 1. Check if Render Backend URL is defined and configured
if (typeof RENDER_BACKEND_URL !== 'undefined' && RENDER_BACKEND_URL && RENDER_BACKEND_URL.trim() !== "") {
    isRenderActive = true;
    console.log("Tailor Pro: Render Backend Mode Active. Base URL: " + RENDER_BACKEND_URL);
}

// 2. Check if Supabase SDK is loaded and keys are provided (as a fallback)
if (!isRenderActive && typeof supabase !== 'undefined' && typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_ANON_KEY !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        isSupabaseActive = true;
        console.log("Tailor Pro: Supabase Cloud Database Mode Active.");
    } catch (e) {
        console.error("Tailor Pro: Failed to initialize Supabase. Falling back to LocalStorage Mode.", e);
    }
}

if (!isRenderActive && !isSupabaseActive) {
    console.log("Tailor Pro: LocalStorage Offline Mode Active.");
}

// Seed Initial Demo Data in LocalStorage if empty (Only when running local offline mode)
function seedLocalStorageDemoData() {
    if (isRenderActive) return; // Render handles seed/persistent data via PostgreSQL DB
    
    if (!localStorage.getItem("tailorpro_users")) {
        const demoUsers = [
            { id: 1, name: "Julian St. Clair", email: "julian.stclair@heritage.com", password: "password" },
            { id: 2, name: "Eleanor Vance", email: "e.vance@studio.com", password: "password" },
            { id: 3, name: "Admin Studio", email: "admin@tailorpro.com", password: "admin" }
        ];
        localStorage.setItem("tailorpro_users", JSON.stringify(demoUsers));
    }
    if (!localStorage.getItem("tailorpro_orders")) {
        const demoOrders = [
            {
                order_id: 9021,
                customer_name: "Julian St. Clair",
                phone: "8973911995",
                email: "julian.stclair@heritage.com",
                dress_type: "Designer Bridal Blouse with embroidery",
                chest: 36.0,
                waist: 28.0,
                shoulder: 14.5,
                sleeve: 10.5,
                height: 14.0, // Blouse Length
                weight: 55.0,
                requirements: "Fabric: Raw Silk (Kyoto Weave). Notes: Heavy zari border embroidery work with traditional South Indian mango motifs on sleeves.",
                order_status: "Fitting",
                price: 3500.00, // INR
                order_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                estimated_date: "2026-07-25"
            },
            {
                order_id: 9045,
                customer_name: "Julian St. Clair",
                phone: "8973911995",
                email: "julian.stclair@heritage.com",
                dress_type: "Traditional Silk Dhoti & Kurta Set",
                chest: 40.0,
                waist: 34.0,
                shoulder: 18.0,
                sleeve: 24.5,
                height: 28.0, // Kurta Length
                weight: 72.0,
                requirements: "Fabric: Merino Wool (Loro Piana Italy). Notes: Pure white silk kurta with gold border matching dhoti.",
                order_status: "Measuring",
                price: 2500.00, // INR
                order_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                estimated_date: "2026-07-28"
            },
            {
                order_id: 8821,
                customer_name: "Eleanor Vance",
                phone: "8973911995",
                email: "e.vance@studio.com",
                dress_type: "Kanchipuram Silk Saree stitching",
                chest: 38.0,
                waist: 32.0,
                shoulder: 15.0,
                sleeve: 8.0,
                height: 15.0, // Blouse Length
                weight: 60.0,
                requirements: "Fabric: Classic Tweed (Harris Tweed UK). Notes: Saree pleats pre-stitching and designer waist belt.",
                order_status: "Tailoring",
                price: 1800.00, // INR
                order_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                estimated_date: "2026-07-22"
            }
        ];
        localStorage.setItem("tailorpro_orders", JSON.stringify(demoOrders));
    }
    if (!localStorage.getItem("tailorpro_feedback")) {
        const demoFeedback = [
            {
                id: 1,
                name: "Julian St. Clair",
                email: "julian.stclair@heritage.com",
                category: "General Testimonial",
                message: "Excellent stitching and fitting! The gold embroidery on my bridal blouse came out exactly like the reference image.",
                submitted_at: new Date().toISOString()
            }
        ];
        localStorage.setItem("tailorpro_feedback", JSON.stringify(demoFeedback));
    }
}

seedLocalStorageDemoData();

const db = {
    // 1. User Registration
    async signUpUser(name, email, password) {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                return await response.json();
            } catch (err) {
                console.error("Render signup error: ", err);
                return { success: false, message: "Server connection failed: " + err.message };
            }
        } else if (isSupabaseActive) {
            const { data: existingUser } = await supabaseClient
                .from('users')
                .select('*')
                .eq('email', email)
                .single();
            
            if (existingUser) {
                return { success: false, message: "Email already registered." };
            }

            const { data, error } = await supabaseClient
                .from('users')
                .insert([{ name, email, password }])
                .select();
            
            if (error) return { success: false, message: error.message };
            return { success: true, user: data[0] };
        } else {
            let users = JSON.parse(localStorage.getItem("tailorpro_users") || "[]");
            if (users.find(u => u.email === email)) {
                return { success: false, message: "Email already registered." };
            }
            const newUser = { id: Date.now(), name, email, password, created_at: new Date().toISOString() };
            users.push(newUser);
            localStorage.setItem("tailorpro_users", JSON.stringify(users));
            return { success: true, user: newUser };
        }
    },

    // 2. User Login
    async loginUser(email, password) {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                return await response.json();
            } catch (err) {
                console.error("Render login error: ", err);
                return { success: false, message: "Server connection failed: " + err.message };
            }
        } else if (isSupabaseActive) {
            const { data, error } = await supabaseClient
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('password', password)
                .single();
            
            if (error || !data) {
                return { success: false, message: "Invalid email or password." };
            }
            return { success: true, user: data };
        } else {
            let users = JSON.parse(localStorage.getItem("tailorpro_users") || "[]");
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                return { success: false, message: "Invalid email or password." };
            }
            return { success: true, user: user };
        }
    },

    // 3. Create Custom Order
    async createOrder(orderData) {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
                return await response.json();
            } catch (err) {
                console.error("Render createOrder error: ", err);
                return { success: false, message: "Server connection failed: " + err.message };
            }
        }

        const estDate = new Date();
        estDate.setDate(estDate.getDate() + 10); // 10 days for tailoring
        const estimatedDateStr = estDate.toISOString().split('T')[0];

        // Custom Prices in INR (₹)
        let price = 1000;
        const type = orderData.dress_type.toLowerCase();
        if (type.includes("premium black shirt")) price = 1600;
        else if (type.includes("linen shirt") || type.includes("lenin")) price = 1400;
        else if (type.includes("formal shirt")) price = 1100;
        else if (type.includes("t-shirt") || type.includes("t_shirt")) price = 700;
        else if (type.includes("hoodie")) price = 1800;
        else if (type.includes("formal pant")) price = 1500;
        else if (type.includes("baggy pants")) price = 1200;
        else if (type.includes("shorts")) price = 800;

        const newOrder = {
            customer_name: orderData.customer_name,
            phone: orderData.phone,
            email: orderData.email,
            dress_type: orderData.dress_type,
            chest: parseFloat(orderData.chest) || 0,
            waist: parseFloat(orderData.waist) || 0,
            shoulder: parseFloat(orderData.shoulder) || 0,
            sleeve: parseFloat(orderData.sleeve) || 0,
            height: parseFloat(orderData.height) || 0,
            weight: parseFloat(orderData.weight) || 0,
            requirements: orderData.requirements || "",
            order_status: "Measuring",
            price: price,
            estimated_date: estimatedDateStr
        };

        if (isSupabaseActive) {
            const { data, error } = await supabaseClient
                .from('orders')
                .insert([newOrder])
                .select();
            if (error) return { success: false, message: error.message };
            return { success: true, order: data[0] };
        } else {
            let orders = JSON.parse(localStorage.getItem("tailorpro_orders") || "[]");
            const localOrder = {
                order_id: Math.floor(1000 + Math.random() * 9000),
                ...newOrder,
                order_date: new Date().toISOString()
            };
            orders.unshift(localOrder);
            localStorage.setItem("tailorpro_orders", JSON.stringify(orders));
            return { success: true, order: localOrder };
        }
    },

    // 4. Get User Orders
    async getOrders(email) {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/orders?email=${encodeURIComponent(email)}`);
                const data = await response.json();
                return data.orders || [];
            } catch (err) {
                console.error("Render getOrders error: ", err);
                return [];
            }
        } else if (isSupabaseActive) {
            const { data, error } = await supabaseClient
                .from('orders')
                .select('*')
                .eq('email', email)
                .order('order_date', { ascending: false });
            if (error) return [];
            return data;
        } else {
            let orders = JSON.parse(localStorage.getItem("tailorpro_orders") || "[]");
            return orders.filter(o => o.email === email);
        }
    },

    // 5. Get All Orders (Admin Panel)
    async getAllOrders() {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/orders`);
                const data = await response.json();
                return data.orders || [];
            } catch (err) {
                console.error("Render getAllOrders error: ", err);
                return [];
            }
        } else if (isSupabaseActive) {
            const { data, error } = await supabaseClient
                .from('orders')
                .select('*')
                .order('order_date', { ascending: false });
            if (error) return [];
            return data;
        } else {
            return JSON.parse(localStorage.getItem("tailorpro_orders") || "[]");
        }
    },

    // 6. Update Order Status (Admin Panel)
    async updateOrderStatus(orderId, status) {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/orders/${orderId}/status`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ order_status: status })
                });
                return await response.json();
            } catch (err) {
                console.error("Render updateOrderStatus error: ", err);
                return { success: false, message: "Server connection failed: " + err.message };
            }
        } else if (isSupabaseActive) {
            const { data, error } = await supabaseClient
                .from('orders')
                .update({ order_status: status })
                .eq('order_id', orderId)
                .select();
            if (error) return { success: false, message: error.message };
            return { success: true, order: data[0] };
        } else {
            let orders = JSON.parse(localStorage.getItem("tailorpro_orders") || "[]");
            const index = orders.findIndex(o => o.order_id == orderId);
            if (index === -1) return { success: false, message: "Order not found." };
            orders[index].order_status = status;
            localStorage.setItem("tailorpro_orders", JSON.stringify(orders));
            return { success: true, order: orders[index] };
        }
    },

    // 7. Submit Feedback
    async submitFeedback(name, email, category, message) {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/feedback`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, category, message })
                });
                return await response.json();
            } catch (err) {
                console.error("Render submitFeedback error: ", err);
                return { success: false, message: "Server connection failed: " + err.message };
            }
        }

        const feedbackItem = { name, email, category, message };
        if (isSupabaseActive) {
            const { data, error } = await supabaseClient
                .from('feedback')
                .insert([feedbackItem])
                .select();
            if (error) return { success: false, message: error.message };
            return { success: true, feedback: data[0] };
        } else {
            let feedbacks = JSON.parse(localStorage.getItem("tailorpro_feedback") || "[]");
            const localFeedback = {
                id: Date.now(),
                ...feedbackItem,
                submitted_at: new Date().toISOString()
            };
            feedbacks.unshift(localFeedback);
            localStorage.setItem("tailorpro_feedback", JSON.stringify(feedbacks));
            return { success: true, feedback: localFeedback };
        }
    },

    // 8. Get Feedback List
    async getFeedbacks() {
        if (isRenderActive) {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/feedback`);
                const data = await response.json();
                return data.success ? data.feedback : [];
            } catch (err) {
                console.error("Render getFeedbacks error: ", err);
                return [];
            }
        }
        if (isSupabaseActive) {
            const { data, error } = await supabaseClient
                .from('feedback')
                .select('*')
                .order('submitted_at', { ascending: false });
            if (error) return [];
            return data;
        } else {
            return JSON.parse(localStorage.getItem("tailorpro_feedback") || "[]");
        }
    }
};
window.db = db;
