document.addEventListener("DOMContentLoaded", function () {
  const signupBtn = document.getElementById("signup-btn");
  const modal = document.getElementById("signup");
  const form = document.getElementById("signup-form");
  const closeModal = document.getElementById("close-modal");
  const classTypeSelect = document.getElementById("class-type");
  const classScheduleSelect = document.getElementById("class-schedule");

  // Add click event listener to the signup button
  signupBtn.addEventListener("click", function () {
    modal.style.display = "block"; // Display the modal
  });

  // Add submit event listener to the form
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    // Get form data
    const formData = new FormData(form);
    // Convert form data to JSON object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    // Store data in local storage
    localStorage.setItem("signupData", JSON.stringify(data));
    // Reset the form
    form.reset();
  });

  const classSchedules = {
    bjj: [
      { day: "Monday", time: "5pm-6pm Beginner" },
      { day: "Monday", time: "7pm-8pm Advanced" },
      { day: "Tuesday", time: "No Class" },
      { day: "Wednesday", time: "5pm-6pm Beginner" },
      { day: "Wednesday", time: "7pm-8pm Advanced" },
      { day: "Thursday", time: "No Class" },
      { day: "Friday", time: "5pm-6pm Beginner" },
      { day: "Friday", time: "7pm-8pm Advanced" },
      { day: "Saturday", time: "5pm-6pm Beginner" },
      { day: "Saturday", time: "7pm-8pm Advanced" },
      { day: "Sunday", time: "12pm-2pm Yoga/Workshop" },
    ],
    "muay-thai": [
      { day: "Monday", time: "5pm-6pm Striking Fundamentals" },
      { day: "Monday", time: "7pm-8pm Advanced" },
      { day: "Tuesday", time: "5pm-6pm Striking Fundamentals" },
      { day: "Tuesday", time: "7pm-8pm Advanced" },
      { day: "Wednesday", time: "6pm-8pm Sparring Day" },
      { day: "Thursday", time: "5pm-6pm Striking Fundamentals" },
      { day: "Thursday", time: "7pm-8pm Advanced" },
      { day: "Friday", time: "6pm-8pm Sparring Day" },
      { day: "Saturday", time: "1pm-3pm Advanced Sparring" },
      { day: "Sunday", time: "No Class" },
    ],
    wrestling: [
      { day: "Monday", time: "5pm-6pm Beginner" },
      { day: "Monday", time: "7pm-8pm Advanced" },
      { day: "Tuesday", time: "5pm-6pm Beginner" },
      { day: "Tuesday", time: "7pm-8pm Advanced" },
      { day: "Wednesday", time: "5pm-6pm Beginner" },
      { day: "Wednesday", time: "7pm-8pm Advanced" },
      { day: "Thursday", time: "5pm-6pm Beginner" },
      { day: "Thursday", time: "7pm-8pm Advanced" },
      { day: "Friday", time: "5pm-6pm Beginner" },
      { day: "Friday", time: "7pm-8pm Advanced" },
      { day: "Saturday", time: "No Class" },
      { day: "Sunday", time: "No Class" },
    ],
    kickboxing: [
      { day: "Monday", time: "5pm-6pm Beginner" },
      { day: "Monday", time: "7pm-8pm Advanced" },
      { day: "Tuesday", time: "5pm-6pm Beginner" },
      { day: "Tuesday", time: "7pm-8pm Advanced" },
      { day: "Wednesday", time: "5pm-6pm Beginner" },
      { day: "Wednesday", time: "7pm-8pm Advanced" },
      { day: "Thursday", time: "6pm-8pm Sparring Day" },
      { day: "Friday", time: "6pm-8pm Sparring Day" },
      { day: "Saturday", time: "1pm-3pm Advanced Sparring" },
      { day: "Sunday", time: "No Class" },
    ],
  };

  function populateClassSchedule(classType) {
    classScheduleSelect.innerHTML = "";
    classSchedules[classType].forEach((schedule) => {
      const option = document.createElement("option");
      option.value = `${schedule.day} ${schedule.time}`;
      option.textContent = `${schedule.day} ${schedule.time}`;
      classScheduleSelect.appendChild(option);
    });
  }

  classTypeSelect.addEventListener("change", function () {
    populateClassSchedule(this.value);
  });

  signupBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      await createClassSchedule(data);
      console.log("Class schedule created successfully!");
    } catch (error) {
      console.error("Error creating class schedule:", error);
    }

    // Store form data in localStorage for future use if needed
    localStorage.setItem("signupData", JSON.stringify(data));

    // Reset form fields and close modal
    form.reset();
    modal.style.display = "none";
  });

  async function createClassSchedule(classData) {
    const response = await fetch("http://localhost:3000/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });
    if (!response.ok) {
      throw new Error("Failed to create class schedule");
    }
    return response.json();
  }
});
// Styling for page via jQuery
const rootMan = $("#root");
const infinity = $("<p>");

infinity.text = "~Thanos";

infinity.addClass(".footer");
const motto = $("<h4>");

motto.text("Strength of the Infinity Stones");
motto.addClass("power");

console.log(infinity);

motto.append(infinity);

rootMan.append(motto);

// font for header

$("#title").css("fontSize", "60px");

// GOOGLE MAP WITH MARKER, CENTERED ON TOWN OUR DOJO IS IN
// const apiKey = AIzaSyD6auwzkYcGBkLlneMZNwaSE2hUO8FUtAU;
let map;

async function initMap() {
  // LOCATION OF OUR DOJO
  const dojoLocation = { lat: 35.096699, lng: -106.682968 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // CENTERING MAP IN ALBUQUERQUE, NM AND DEFAULT ZOOMED VIEW
  map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: dojoLocation,
    mapId: "13ad612c8a486f94",
  });
  // ADDING DOJO MARKER
  const dojoMarker = new AdvancedMarkerElement({
    map: map,
    position: { lat: 35.096699, lng: -106.682968 },
    title: "Avenger's Dojo",
  });
}

initMap();
