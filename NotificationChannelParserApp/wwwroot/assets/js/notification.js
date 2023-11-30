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
        "showMethod": "slideDown",
    }
    toastr.info(message, title);
}

function displayPersonalNotification(message, title) {
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "6000",
        "showMethod": "slideDown",
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
    displayPersonalNotification(message, `hey ${username}`);
    getNotificationPerson(username);
});

// Initial variables
let listNotification = $("#listNotification");

// Get Today Notification
function getTodayNotification() {
    $.ajax({
        url: '/Notification/GetTodayNotification/',
        method: 'get',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            listNotification.empty();
            $.each(response, function (key, value) {
                listNotification.append(`
                    <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                        <div class="d-flex align-items-center gap-2">
                            <div class="flex-shrink-0">
                                <div class="avatar me-1">
                                    <span class="avatar-initial rounded-circle bg-label-warning">
                                        <i class="mdi mdi-bell-alert-outline"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex flex-column flex-grow-1 overflow-hidden w-px-250">
                                <h6 class="mb-1">${value.username}</h6>
                                <small class="text-truncate text-body">${value.message}</small>
                            </div>
                            <div class="flex-shrink-0 dropdown-notifications-actions">
                                <small class="text-muted">5 days ago</small>
                            </div>
                        </div>
                    </li>
                `);
            });
        },
        error: function (err) {
            console.log(err.toString());
        }
    });
}
getTodayNotification();

// Get Notification Personal
function getNotificationPerson(username) {
    $.ajax({
        url: '/Notification/GetNotificationByUsername/',
        method: 'get',
        dataType: 'json',
        data: {username:username},
        success: function (response) {
            listNotification.empty();
            $.each(response, function (key, value) {
                listNotification.append(`
                    <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                        <div class="d-flex align-items-center gap-2">
                            <div class="flex-shrink-0">
                                <div class="avatar me-1">
                                    <span class="avatar-initial rounded-circle bg-label-warning">
                                        <i class="mdi mdi-bell-alert-outline"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex flex-column flex-grow-1 overflow-hidden w-px-250">
                                <h6 class="mb-1">${value.username}</h6>
                                <small class="text-truncate text-body">${value.message}</small>
                            </div>
                            <div class="flex-shrink-0 dropdown-notifications-actions">
                                <small class="text-muted">5 days ago</small>
                            </div>
                        </div>
                    </li>
                `);
            });
        },
        error: function (err) {
            console.log(err.toString());
        }
    });
}