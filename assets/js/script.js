document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const modal = document.getElementById('signup');
    const form = document.getElementById('signup-form');
    const closeModal = document.getElementById('close-modal');
    const classTypeSelect = document.getElementById('class-type');
    const classScheduleSelect = document.getElementById('class-schedule');

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
        ]
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

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        localStorage.setItem('signupData', JSON.stringify(data));
        form.reset();
        modal.style.display = 'none';

        // Call function to create event on Google Calendar
        createEventOnCalendar(data);
    });
});


const googleClientId = process.env.GOOGLE_CLIENT_ID;
const hereAppId = process.env.HERE_APP_ID;
const hereApiKey = process.env.HERE_API_KEY;



