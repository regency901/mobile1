var EmployeeView = function(employee) {
 
    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
    };
 
    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.onSuccess = function(contact) {
        app.showAlert("Save Success", "Success");
    };

    this.onError = function(contactError) {
        app.showAlert("Error = " + contactError.code, "Error");
    };

    this.addToContacts = function(event) {
        event.preventDefault();
        console.log('addToContacts');

        app.showAlert("About to add a contact", "Debug");

//        if (!navigator.contacts) {
//            app.showAlert("Contacts API not supported", "Error");
//            return;
//        }
        var contact = navigator.contacts.create();
        app.showAlert("contacts.create() called", "Debug");
        contact.name = {givenName: employee.firstName, familyName: employee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save(this.onSuccess, this.onError);
        return false;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    };

    this.initialize();

 
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());

