// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

//
// // ALL-ADRESSES
// function AllAddresses() {
  //   this.allAddresses = []
  // }
// var inputtedPhysicalAddress = "Ugh!"


  // AddressBook.prototype.addAddress = function(inputtedPhysicalAddress) {
  //   return {
  //     physicalAddress : inputtedPhysicalAddress,
  //     mailingAddress : "mTest"
  //   }
  // }

  AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts.push(contact);
    // contact.allAddresses = this.addAddress(contact.allAddresses.physicalAddress);
    // console.log(contact);
  }


  AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
  }

  AddressBook.prototype.findContact = function(id) {
    for (var i=0; i< this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          return this.contacts[i];
        }
      }
    };
    return false;
  }

  AddressBook.prototype.deleteContact = function(id) {
    for (var i=0; i< this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          delete this.contacts[i];
          return true;
        }
      }
    };
    return false;
  }

  // Business Logic for Contacts ---------
  function Contact(firstName, lastName, phoneNumber, inputtedEMailAddress, inputtedPhysicalAddress) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.phoneNumber = phoneNumber,
    this.eMailAddress = inputtedEMailAddress,
    this.allAddresses = {other: inputtedPhysicalAddress}

  }

  // function Address(inputtedPhysicalAddress, mailingAddress, workAddress) {
    //   this.physicalAddress = inputtedPhysicalAddress,
    //   this.mailingAddress = mailingAddress,
    //   this.workAddress = workAddress
    // }

    Contact.prototype.fullName = function() {
      return this.firstName + " " + this.lastName;
    }

    // User Interface Logic ---------
    var addressBook = new AddressBook();

    // var allAddresses = new AllAddresses();


    function displayContactDetails(addressBookToDisplay) {
      var contactsList = $("ul#contacts");
      var htmlForContactInfo = "";
      addressBookToDisplay.contacts.forEach(function(contact) {
        htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
      });
      contactsList.html(htmlForContactInfo);
    };

    function showContact(contactId) {
      var contact = addressBook.findContact(contactId);
      $("#show-contact").show();
      $(".first-name").html(contact.firstName);
      $(".last-name").html(contact.lastName);
      $(".phone-number").html(contact.phoneNumber);
      $(".new-e-mail-address").html(contact.inputtedEMailAddress)
      $(".new-physical-address").html(contact.allAddresses)
      var buttons = $("#buttons");
      buttons.empty();
      buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
    }

    function attachContactListeners() {
      $("ul#contacts").on("click", "li", function() {
        showContact(this.id);
      });
      $("#buttons").on("click", ".deleteButton", function() {
        addressBook.deleteContact(this.id);
        $("#show-contact").hide();
        displayContactDetails(addressBook);
      });
    };

    $(document).ready(function() {
      attachContactListeners();
      $("form#new-contact").submit(function(event) {
        event.preventDefault();
        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();
        var inputtedPhoneNumber = $("input#new-phone-number").val();
        var inputtedEMailAddress = $("#new-e-mail-address").val();
        var inputtedPhysicalAddress = $("input#new-physical-address").val();

        $("input#new-first-name").val("");
        $("input#new-last-name").val("");
        $("input#new-phone-number").val("");
        $("input#new-e-mail-address").val("");
        $("input#new-physical-address").val("");
        var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEMailAddress, inputtedPhysicalAddress);
        addressBook.addContact(newContact);


        // ALL ADDRESSES
        // var newAddress = new Address(inputtedPhysicalAddress);
        // addressBook.addAddress(newAddress);



        displayContactDetails(addressBook);

        // console.log(addressBook);
        // var test = Object.assign(addressBook.contact, addressBook.address);
        // console.log(test);
        console.log(addressBook.contacts);
        console.log(inputtedPhysicalAddress);

      })
    })
