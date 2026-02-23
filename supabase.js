// ===== Supabase Configuration =====
const supabaseUrl = "https://zyeyeulgwkeoitqcwhej.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5ZXlldWxnd2tlb2l0cWN3aGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTc1NjcsImV4cCI6MjA4NzIzMzU2N30.eZNkNf6GWzHI2kkEtOqTA9Z-6fA6e52gv1xQXL9PP8k";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

console.log("Supabase JS Loaded");

// ===== Form Submission Logic =====
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Form submitted");

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;

            try {
                const { data, error } = await client
                    .from("Registration")   // EXACT table name
                    .insert([
                        {
                            "Full Name": name,
                            "Email Address": email,
                            "Phone Number": phone
                        }
                    ]);

                if (error) {
                    console.error("Supabase Error FULL:", error);
                    alert("Error: " + error.message);
                }
                else {
                    alert("✅ Message Sent Successfully!");
                    form.reset();
                }

            } catch (err) {
                console.error("Unexpected Error:", err);
                alert("❌ Something went wrong!");
            }
        });
    }
});