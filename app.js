$(document).ready(function() {
    var users = [
        { id: 1, name: 'Ahmet', email: 'ahmet@mail.com' },
        { id: 2, name: 'Rick', email: 'rick@mail.com' },
        { id: 3, name: 'Batuhan', email: 'batuhan@mail.com' }
    ];

    function populateTable() {
        var tableBody = $('#usersTable tbody');
        tableBody.empty();

        $.each(users, function(index, user) {
            var row = '<tr>' +
                        '<td>' + user.id + '</td>' +
                        '<td>' + user.name + '</td>' +
                        '<td>' + user.email + '</td>' +
                        '<td><button class="btn btn-danger btn-sm delete-user" data-id="' + user.id + '">Delete</button></td>' +
                      '</tr>';
            tableBody.append(row);
        });
    }

    function addUser(name, email) {
        var newId = users.length ? users[users.length - 1].id + 1 : 1;
        var newUser = { id: newId, name: name, email: email };
        users.push(newUser);
        populateTable();
    }

    populateTable();

    $('#addUserForm').submit(function(event) {
        event.preventDefault();
        var userName = $('#userName').val();
        var userEmail = $('#userEmail').val();

        var emailExists = users.some(function(user) {
            return user.email === userEmail;
        });

        if (emailExists) {
            alert('User with this email already exists.');
            return;
        }

        addUser(userName, userEmail);
        this.reset();
    });

    // Event listener for delete buttons
    $(document).on('click', '.delete-user', function() {
        var userId = $(this).data('id');
        users = users.filter(function(user) {
            return user.id !== userId;
        });
        populateTable();
    });
});
