$(document).ready(function() {
    var users = [
        { id: 1, firstName: 'Ahmetcan', lastName: 'Dinçer', email: 'ahmet@mail.com', phone: '+90 531 331 3131', city: 'Antalya', country: 'Turkey' },
        { id: 2, firstName: 'Rick', lastName: 'Sanchez', email: 'rick@sanchez.com', phone: '234-567-8901', city: 'Los Angeles', country: 'USA' },
        { id: 3, firstName: 'Mert', lastName: 'Onlar', email: 'mert@onlar.com', phone: '+90 506 060 0606', city: 'Ankara', country: 'Turkey' }
    ];

    function populateTable() {
        var tableBody = $('#userTableBody');
        tableBody.empty();

        $.each(users, function(index, user) {
            var row = '<tr>' +
                        '<td>' + user.id + '</td>' +
                        '<td>' + user.firstName + '</td>' +
                        '<td>' + user.lastName + '</td>' +
                        '<td>' + user.email + '</td>' +
                        '<td>' + user.phone + '</td>' +
                        '<td>' + user.city + '</td>' +
                        '<td>' + user.country + '</td>' +
                        '<td><button class="btn btn-danger btn-sm delete-user" data-id="' + user.id + '">Delete</button></td>' +
                      '</tr>';
            tableBody.append(row);
        });
    }

    function addUser(firstName, lastName, email, phone, city, country) {
        var newId = users.length ? users[users.length - 1].id + 1 : 1;
        var newUser = { id: newId, firstName: firstName, lastName: lastName, email: email, phone: phone, city: city, country: country };
        users.push(newUser);
        populateTable();
    }

    populateTable();

    $('#addUserForm').submit(function(event) {
        event.preventDefault();
        var userFirstName = $('#userFirstName').val();
        var userLastName = $('#userLastName').val();
        var userEmail = $('#userEmail').val();
        var userPhone = $('#userPhone').val();
        var userCity = $('#userCity').val();
        var userCountry = $('#userCountry').val();

        var emailExists = users.some(function(user) {
            return user.email === userEmail;
        });

        if (emailExists) {
            alert('User with this email already exists.');
            return;
        }

        addUser(userFirstName, userLastName, userEmail, userPhone, userCity, userCountry);
        this.reset();
    });

    $(document).on('click', '.delete-user', function() {
        var userId = $(this).data('id');
        users = users.filter(function(user) {
            return user.id !== userId;
        });
        populateTable();
    });
});
