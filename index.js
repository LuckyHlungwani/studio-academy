document.addEventListener("DOMContentLoaded", function () {
    // Existing elements
    const enrollDjingBtn = document.getElementById('enroll-djing-btn');
    const enrollMusicBtn = document.getElementById('enroll-music-btn');
    const enrollMixingBtn = document.getElementById('enroll-mixing-btn');
    const enrollForm = document.getElementById('enroll-form');
    const contactForm = document.getElementById('contact-us-form');
    const cancelBtn = document.getElementById('cancel-btn');

    const signUpForm = document.getElementById("signUpForm");
    const signInForm = document.getElementById("signInForm");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const displayEmail = document.getElementById("display-email"); // Updated ID for email display
    const signOutBtn = document.getElementById("signOutBtn"); // Updated ID for sign-out button

    // Function to handle sign-up form submission
    async function handleSignUpSubmit(event) {
        event.preventDefault();

        const formData = new FormData(signUpForm);
        const data = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        if (data.password !== formData.get("confirmPassword")) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                welcomeMessage.style.display = "block";
                signUpForm.reset();
                $('#signUpModal').modal('hide');

                // Automatically sign in the user after signup
                await handleSignInAfterSignup(data.email, data.password);
            } else {
                const errorMessage = await response.text();
                alert("Signup failed: " + errorMessage);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Signup failed. Please try again.");
        }
    }

    async function handleSignInAfterSignup(email, password) {
        const data = { email, password };

        try {
            const response = await fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                // Check if result contains email
                if (result.email) {
                    displayEmail.textContent = result.email; // Display user's email
                    displayEmail.style.display = "inline"; // Show email
                } else {
                    alert("No email returned from server.");
                }

                signOutBtn.style.display = "inline"; // Show sign-out button
                welcomeMessage.style.display = "block";
                signInForm.reset(); // Reset sign-in form
            } else {
                const errorMessage = await response.text();
                alert("Sign-in failed: " + errorMessage);
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            alert("Sign-in failed. Please try again.");
        }
    }

    // Function to handle sign-out
    function handleSignOut() {
        // Here, you might want to clear any user session or token if applicable
        displayEmail.style.display = "none"; // Hide email display
        signOutBtn.style.display = "none"; // Hide sign-out button
        welcomeMessage.style.display = "none"; // Hide welcome message
        signUpForm.style.display = "block"; // Show sign-up form again
        signInForm.reset(); // Reset sign-in form
    }

    // Enrollment functions
    function showEnrollForm() {
        enrollForm.style.display = 'block'; // Show the enroll form
    }

    function hideEnrollForm() {
        enrollForm.style.display = 'none'; // Hide the enroll form
        enrollForm.reset(); // Reset the form
    }

    // Attach event listeners
    if (signOutBtn) signOutBtn.addEventListener("click", handleSignOut);
    if (signUpForm) signUpForm.addEventListener("submit", handleSignUpSubmit);
    if (signInForm) signInForm.addEventListener("submit", handleSignInAfterSignup);

    // Add event listeners for enrollment buttons
    enrollDjingBtn.addEventListener('click', showEnrollForm);
    enrollMusicBtn.addEventListener('click', showEnrollForm);
    enrollMixingBtn.addEventListener('click', showEnrollForm);

    // Event listener for cancel button to hide the form
    if (cancelBtn) cancelBtn.addEventListener('click', hideEnrollForm);
    
    // Existing event listeners for contact forms
    if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
});
