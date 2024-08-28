// Event listener that triggers when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('West Virginia Tourism website is ready!'); // Log message indicating the website is ready

    // Form validation
    const form = document.querySelector('form'); // Select the form element
    form.addEventListener('submit', function(event) {
        // Get the values from the form fields and trim any leading/trailing whitespace
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate that the name field is not empty
        if (name === '') {
            alert('Please enter your name.'); // Alert the user if the name field is empty
            event.preventDefault(); // Prevent the form from submitting
            return; // Exit the function
        }

        // Validate that the email field is not empty
        if (email === '') {
            alert('Please enter your email.'); // Alert the user if the email field is empty
            event.preventDefault(); // Prevent the form from submitting
            return; // Exit the function
        }

        // Regular expression pattern to validate the email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.'); // Alert the user if the email is not valid
            event.preventDefault(); // Prevent the form from submitting
            return; // Exit the function
        }

        // Validate that the message field is not empty
        if (message === '') {
            alert('Please enter your message.'); // Alert the user if the message field is empty
            event.preventDefault(); // Prevent the form from submitting
            return; // Exit the function
        }

        // If all validations pass, alert the user that the form was submitted successfully
        alert('Form submitted successfully!');
    });
});
