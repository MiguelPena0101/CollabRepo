document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const modal = document.getElementById('signup');
    const form = document.getElementById('signup-form');
    const closeModal = document.getElementById('close-modal');
    const classTypeSelect = document.getElementById('class-type');
    const classScheduleSelect = document.getElementById('class-schedule');
    const Cronofy = require('cronofy');
    


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

    // Initialize Cronofy with your credentials
    const cronofyClient = new Cronofy({
        client_id: 'XT8CKYdAQKLd6ilwOZwKcc5R4vpCGULp',
        client_secret: 'CRN_x66lk29yRcXtLSBOYy1T45K7ulGqseBZb7YAuZ',
      });
      
      // Example function to fetch calendars
      async function fetchCalendars() {
        try {
          const response = await cronofyClient.listCalendars();
          console.log('Calendars:', response);
          return response.calendars;
        } catch (error) {
          console.error('Error fetching calendars:', error);
          throw error;
        }
      }
      
      // Example function to create an event
      async function createEvent(eventData) {
        try {
          const response = await cronofyClient.createEvent(eventData);
          console.log('Event created:', response);
          return response;
        } catch (error) {
          console.error('Error creating event:', error);
          throw error;
        }
      }
      
      // Example usage
      fetchCalendars();

    const classSchedules = {
       'bjj': [
            { day: 'Monday', time: '5pm-6pm Beginner' },
            { day: 'Monday', time: '7pm-8pm Advanced' },
            { day: 'Tuesday', time: 'No Class' },
            { day: 'Wednesday', time: '5pm-6pm Beginner' },
            { day: 'Wednesday', time: '7pm-8pm Advanced' },
            { day: 'Thursday', time: 'No Class' },
            { day: 'Friday', time: '5pm-6pm Beginner' },
            { day: 'Friday', time: '7pm-8pm Advanced' },
            { day: 'Saturday', time: '5pm-6pm Beginner' },
            { day: 'Saturday', time: '7pm-8pm Advanced' },
            { day: 'Sunday', time: '12pm-2pm Yoga/Workshop' },
        ],
        'muay-thai': [
            { day: 'Monday', time: '5pm-6pm Striking Fundamentals' },
            { day: 'Monday', time: '7pm-8pm Advanced' },
            { day: 'Tuesday', time: '5pm-6pm Striking Fundamentals' },
            { day: 'Tuesday', time: '7pm-8pm Advanced' },
            { day: 'Wednesday', time: '6pm-8pm Sparring Day' },
            { day: 'Thursday', time: '5pm-6pm Striking Fundamentals' },
            { day: 'Thursday', time: '7pm-8pm Advanced' },
            { day: 'Friday', time: '6pm-8pm Sparring Day' },
            { day: 'Saturday', time: '1pm-3pm Advanced Sparring' },
            { day: 'Sunday', time: 'No Class' },
        ],
        'wrestling': [
            { day: 'Monday', time: '5pm-6pm Beginner' },
            { day: 'Monday', time: '7pm-8pm Advanced' },
            { day: 'Tuesday', time: '5pm-6pm Beginner' },
            { day: 'Tuesday', time: '7pm-8pm Advanced' },
            { day: 'Wednesday', time: '5pm-6pm Beginner' },
            { day: 'Wednesday', time: '7pm-8pm Advanced' },
            { day: 'Thursday', time: '5pm-6pm Beginner' },
            { day: 'Thursday', time: '7pm-8pm Advanced' },
            { day: 'Friday', time: '5pm-6pm Beginner' },
            { day: 'Friday', time: '7pm-8pm Advanced' },
            { day: 'Saturday', time: 'No Class' },
            { day: 'Sunday', time: 'No Class' },
        ],
        'kickboxing': [
            { day: 'Monday', time: '5pm-6pm Beginner' },
            { day: 'Monday', time: '7pm-8pm Advanced' },
            { day: 'Tuesday', time: '5pm-6pm Beginner' },
            { day: 'Tuesday', time: '7pm-8pm Advanced' },
            { day: 'Wednesday', time: '5pm-6pm Beginner' },
            { day: 'Wednesday', time: '7pm-8pm Advanced' },
            { day: 'Thursday', time: '6pm-8pm Sparring Day' },
            { day: 'Friday', time: '6pm-8pm Sparring Day' },
            { day: 'Saturday', time: '1pm-3pm Advanced Sparring' },
            { day: 'Sunday', time: 'No Class' },
        ],
    
    };

    function populateClassSchedule(classType) {
        classScheduleSelect.innerHTML = '';
        classSchedules[classType].forEach(schedule => {
            const option = document.createElement('option');
            option.value = `${schedule.day} ${schedule.time}`;
            option.textContent = `${schedule.day} ${schedule.time}`;
            classScheduleSelect.appendChild(option);
        });
    }

    classTypeSelect.addEventListener('change', function() {
        populateClassSchedule(this.value);
    });

    signupBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const formData = new FormData(form);
        const classType = formData.get('class-type');
        const schedule = formData.get('class-schedule').split(' ');
        const selectedSchedule = classSchedules[classType].find(s => `${s.day} ${s.time}` === formData.get('class-schedule'));
    
        if (selectedSchedule) {
            try {
                await createEventFromSchedule(classType, selectedSchedule);
                console.log('Event created successfully!');
            } catch (error) {
                console.error('Error creating event:', error);
            }
        } else {
            console.error('Selected class schedule not found.');
        }
    
        // Store form data in localStorage for future use if needed
        localStorage.setItem('signupData', JSON.stringify(data));
    
        // Reset form fields and close modal
        form.reset();
        modal.style.display = 'none';
    });
})

// Example function to create an event based on class schedule
async function createEventFromSchedule(classType, schedule) {
    const eventData = {
        calendar_id: 'your_calendar_id', // Specify the calendar ID where the event will be created
        event_id: 'class-type', // Unique identifier for the event
        summary: `${classType} Class - ${schedule.day} ${schedule.time}`, // Event summary
        start: new Date('2023-01-01T' + schedule.time.split('-')[0]), // Start time of the event
        end: new Date('2023-01-01T' + schedule.time.split('-')[1]), // End time of the event
        description: 'Description of the event', // Event description
        location: '3828 Piermont Dr, Albuquerque, NM.', // Event location
    };

    try {
        const response = await cronofyClient.createEvent(eventData);
        console.log('Event created:', response);
        return response;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

// Styling for page via jQuery
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
