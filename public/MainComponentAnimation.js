document.addEventListener('DOMContentLoaded', function() {
    const panel = document.querySelector('.panel');
    const mapIcon = document.querySelector('.side-navbar_links a:nth-child(2)'); // Adjust the nth-child index if the map/route icon is in a different position

    // Function to toggle the panel visibility
    function togglePanel() {
        panel.classList.toggle('is-expanded'); // This should match the class used in your CSS
    }

    // Adding click event listener to map/route icon only
    mapIcon.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link action
        togglePanel(); // Call the function to toggle the panel
    });

    // Your existing code for expanding the user details inside the panel
    const shotInfo = document.querySelector('.shot-info');
    const driverUserBig = document.querySelector('.driver-user-BIG');
    const timer = document.querySelector('.time');

    shotInfo.addEventListener('click', function() {
        driverUserBig.classList.toggle('expanded');
        shotInfo.classList.toggle('expanded');
        timer.classList.toggle('expanded');

        if (driverUserBig.classList.contains('expanded')) {
            driverUserBig.style.maxHeight = driverUserBig.scrollHeight + "px";
        } else {
            driverUserBig.style.maxHeight = null;
        }
    });
});


$(document).ready(function() {
    var $sidebar = $('#sidebar'), // Your sidebar ID or class
        $panel = $('#panel'), // The panel inside the sidebar that you want to slide
        $trackingCard = $('.tracking-card'); // The tracking card you want to show/hide

    // Initially hide the panel by setting its right position to negative of its width
    $panel.css({'right': '-' + $panel.outerWidth() + 'px', 'display': 'block'});

    // Function to slide the panel in and out and reset tracking card display
    function togglePanel() {
        if ($panel.hasClass('expanded')) {
            // Slide in and reset tracking card
            $panel.animate({'right': '-' + $panel.outerWidth() + 'px'}, 500, function() {
                $panel.removeClass('expanded');
                $trackingCard.hide(); // Hide the tracking card when panel slides in
            });
        } else {
            // Slide out
            $panel.animate({'right': '0px'}, 500, function() {
                $panel.addClass('expanded');
            });
        }
    }

    // Event listener for your toggle button
    $('#toggle-button').click(function() {
        togglePanel();
    });

    // For the driver user to toggle tracking card
    $('.driver-user').on('click', function () {
        // Toggle the display style of tracking card
        $trackingCard.toggle();
    });

    // Reset tracking card when panel is closed
    $('#close-panel').on('click', function() {
        $trackingCard.hide();
    });

    // If you have an overlay or a close button for the tracking card, make sure it closes the tracking card
    $('.tracking-card-close').on('click', function() {
        $trackingCard.hide();
    });
});

// Get the feedback button and popup elements
const feedbackButton = document.getElementById('feedbackButton');
const feedbackPopup = document.getElementById('feedbackPopup');

// Function to toggle the feedback popup
function toggleFeedbackPopup() {
    feedbackPopup.style.display = feedbackPopup.style.display === 'flex' ? 'none' : 'flex';
}

// Add click event listener to the feedback button
feedbackButton.addEventListener('click', toggleFeedbackPopup);

// Close the feedback popup when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === feedbackPopup) {
        feedbackPopup.style.display = 'none';
    }
});
