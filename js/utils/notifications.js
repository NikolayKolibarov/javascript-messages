$("#infoBox, #errorBox").click(function () {
    $(this).fadeOut();
});

function showInfo(message) {
    let infoBox = $('#infoBox');

    infoBox.text(message);
    infoBox.show();
    setTimeout(function () {
        infoBox.fadeOut();
    }, 2000);
}

function showError(errorMsg) {
    let errorBox = $('#errorBox');
    errorBox.text("Error: " + errorMsg);
    errorBox.show();
    setTimeout(function () {
        errorBox.fadeOut();
    }, 2000);
}

// Using mustache means making ajax calls every time a new template is loaded. Load messages work after uncommenting.
$(document).on({
    ajaxStart: function() { $("#loadingBox").show() },
    ajaxStop: function() { $("#loadingBox").hide() }
});


function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);

    if (response.readyState === 0) {
        errorMsg = "Cannot connect due to network error.";
    }
    if (response.responseJSON && response.responseJSON.description) {
        errorMsg = response.responseJSON.description;
    }

    showError(errorMsg);
}