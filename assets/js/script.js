// Strength of the Infinity Stones footer

const rootMan = $('#root');
const infinity = $('<p>');

infinity.text = ('~Thanos')

infinity.addClass('.footer')
const motto = $('<h4>')

motto.text('Strength of the Infinity Stones')
motto.addClass('power');

console.log(infinity);

motto.append(infinity);

rootMan.append(motto);

// font for header

$("#title").css("fontSize", "60px");


document.addEventListener('DOMContentLoaded', function() {

    // Get the signup button element
const signupBtn = document.getElementById('signup-btn');
// Get the modal element
const modal = document.getElementById('signup');

// Add click event listener to the signup button
signupBtn.addEventListener('click', function() {
    modal.style.display = 'block'; // Display the modal
});

// Get the form element
const form = document.getElementById('signup-form');

// Add submit event listener to the form
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    // Get form data
    const formData = new FormData(form);
    // Convert form data to JSON object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    // Store data in local storage
    localStorage.setItem('signupData', JSON.stringify(data));
    // Reset the form
    form.reset();
});
});

// API used for map and calendar 

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const hereAppId = process.env.HERE_APP_ID;
const hereApiKey = process.env.HERE_API_KEY;



