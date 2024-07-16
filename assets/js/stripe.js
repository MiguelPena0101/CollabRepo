var cronofy = new Cronofy({
    client_id: '{CLIENT_ID}',
    client_secret: '{CLIENT_SECRET}'
  });
  
  var options = {
    application_calendar_id: "{APPLICATION_CALENDAR_ID}"
  };
  
  cronofy.applicationCalendar(options)
      .then(function (applicationCalendar) {
          var sub = applicationCalendar.sub;
      });

      