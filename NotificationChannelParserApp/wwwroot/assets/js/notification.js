"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();

connection.start().then(function () {
    console.log('connected to hub')
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("OnConnected", function () {
    onConnected();
});

function onConnected() {
    const username = $("#hfUsername").val();
    
    connection.invoke("SaveUserConnection", username)
        .catch(function (err) {
            return console.error(err.toString());
        });
}

function displayGeneralNotification(message, title) {
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "8000",
        "showMethod": "fadeIn",
    }
    toastr.info(message, title);
}

function displayPersonalNotification(message, title) {
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "6000",
        "showMethod": "fadeIn",
    }
    toastr.success(message, title);
}

// Received All Notification
connection.on("ReceivedNotification", function (message) {
    displayGeneralNotification(message, 'General Message');
    getTodayNotification();
});

// Received Personal Notification
connection.on("ReceivedPersonalNotification", function (message, username) {
    displayPersonalNotification(message, `Hey ${username}`);
});

// Initial variables
let listNotification = $("#listNotification");

// Convert Datetime
function timeAgo(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const timeDiff = Math.abs(currentDate - inputDate);

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
        return `${years} year${years === 1 ? '' : 's'} ago`;
    } else if (months > 0) {
        return `${months} month${months === 1 ? '' : 's'} ago`;
    } else if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
}

// Get Today Notification
function getTodayNotification() {
    $.ajax({
        url: '/Notification/GetTodayNotification/',
        method: 'get',
        dataType: 'json',
        success: function (response) {
            listNotification.empty();
            if (response == null || response == undefined || response.length == 0) {
                listNotification.append(`
                    <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                        <small class="d-flex justify-content-center text-center">No notification</small>
                    </li>
                `);
            } else {
                $.each(response, function (key, value) {
                    $('#notificationCount').text(`${++key} New`);
                    listNotification.append(`
                        <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                            <div class="d-flex align-items-center gap-2">
                                <div class="flex-shrink-0">
                                    <div class="avatar me-1">
                                        <span class="avatar-initial rounded-circle bg-label-info">
                                            <i class="mdi mdi-bell-ring-outline"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex flex-column flex-grow-1 overflow-hidden w-px-250">
                                    <h6 class="mb-1">${value.messageType === 'All' ? 'General Message' : value.messageType}</h6>
                                    <small class="text-truncate text-body">${value.message}</small>
                                </div>
                                <div class="flex-shrink-0 dropdown-notifications-actions">
                                    <small class="text-muted">${timeAgo(value.notificationDateTime)}</small>
                                </div>
                            </div>
                        </li>
                    `);
                });
            }
        },
        error: function (err) {
            console.log(err.toString());
        }
    });
}
getTodayNotification();