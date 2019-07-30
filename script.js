
// AJAX function gathering all the JSON information from the API
// Then looping through all of the employees and assigning them to the data
// Creating variables for each property and then replacing it within the gallery div markup
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function (data) {
        jsonData = data.results;
        data.results.forEach(employee => {

            const picture = employee.picture.large;
            const firstName = employee.name.first;
            const lastName = employee.name.last;
            const email = employee.email;
            const state = employee.location.state;
            const city = employee.location.city;

            const galleryCard =
                `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${picture}" alt="Empl picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
                </div>`;

            $('#gallery').append(galleryCard); // appending the gallerycard with the variablels holding the data
        })
    }
});


// function for the modal container (popup window)
// assigning variables to a random index within each property
// replacing each data property within the div markup
// appending the entire modal contaner with replaced varibles, into the body

function modalContainer(i) {
    const picture = jsonData[i].picture.large;
    const firstName = jsonData[i].name.first;
    const lastName = jsonData[i].name.last;
    const email = jsonData[i].email;
    const phone = jsonData[i].phone;
    const street = jsonData[i].location.street;
    const city = jsonData[i].location.city;
    const state = jsonData[i].location.state;
    const zipCode = jsonData[i].location.postcode;

    $("body").append(

        `<div class="modal-container">
               <div class="modal">
                   <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                   <div class="modal-info-container">
                       <img class="modal-img" src="${picture}" alt="Employee Picture">
                       <h3 id="name" class="modal-name cap">${firstName}, ${lastName}</h3>
                       <p class="modal-text">${email}</p>
                       <p class="modal-text cap">${city}</p>
                       <hr>
                       <p class="modal-text">${phone}</p>
                       <p class="modal-text cap">${street}, ${city}, ${state}, ${zipCode}</p>
<p class="modal-text">Birthday: ${jsonData[i].dob.date.slice(5, 7) + '/' + jsonData[i].dob.date.slice(8, 10) + '/' + jsonData[i].dob.date.slice(0, 4)}
</p>
                </div>
        </div>`
    )
    // event listener to closer modal container on click
    $('.modal-close-btn').on('click', function () {
        $('.modal-container').remove();
    });
}

// event listening that calls the modal contaner function 

$('#gallery').on('click', ".card", function () {
    i = ($(this).index());
    modalContainer(i);

});
