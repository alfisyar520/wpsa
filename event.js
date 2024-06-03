$(document).ready(function () {
    fetch(GRAPHQL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: queryGraphqlEvents
        })
    })
        .then(res => res.json())
        .then(data => {
            fetchAllDataEvents = data.data.events.nodes

            listEventCalender()
            listEvent()
        })

});

function splitDate(date) {
    let day = date.substr(0, 2); // => "Tabs1"
    let month = date.substr(3, 2);
    let year = date.substr(6, 4)

    // console.log(day);
    // console.log(month);
    // console.log(year);
    return [day, month, year]
}

function convertDate(berlangsung, berakhir) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    berlangsung = splitDate(berlangsung)
    berakhir = splitDate(berakhir)

    if (berlangsung[1] != berakhir[1]) {
        return `${berlangsung[0]}th ${months[parseInt(berlangsung[1]) - 1]} ${berlangsung[2]} - ${berakhir[0]}th ${months[parseInt(berakhir[1]) - 1]} ${berakhir[2]}`
    } else if (berlangsung[0] != berakhir[0]) {
        return `${berlangsung[0]} - ${berakhir[0]}th ${months[parseInt(berlangsung[1]) - 1]} ${berlangsung[2]}`
    } else {
        return `${berlangsung[0]}th ${months[parseInt(berlangsung[1]) - 1]} ${berlangsung[2]}`
    }

}

function allEvent() {
    let idUrl = $("#idUrl").val();
    $.each(fetchAllDataEvents, function (indexInArray, valueOfElement) {
        let date = convertDate(valueOfElement.event.tanggalBerlangsung, valueOfElement.event.tanggalBerakhir)
        let konten = valueOfElement.content == '' ? '-' : valueOfElement.content

        $('#loadDataListEvent').append(`
        <div class="col-lg-4 col-md-6 col-sm-12">
            <a class="card card-event-size" style="border: none; padding: 30px; text-decoration: none;" href="#${valueOfElement.id}" id="id_${valueOfElement.id}">
                <div class="card-body">
                    <img src="${valueOfElement.featuredImage.node.sourceUrl}" class="card-img shape-img img-fluid">
                    <span class="caption-date">${date}</span>
                    <h5 class="title-event">${valueOfElement.title}</h5>
                    <div class="row">
                        <div class="col-md-1">
                            <img src="${idUrl}/asset/assets/image/icon/location.png" class="shape-location">
                        </div>
                        <div class="col">
                            <span class="caption-location">${valueOfElement.event.tempat}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `)

        $('#popupClass').append(`
        <div id="${valueOfElement.id}" class="overlay">
            <div class="popup">
            <a class="close" href="#id_${valueOfElement.id}">&times;</a>
            <div class="content" style="text-align: center;">
                <img src="${valueOfElement.featuredImage.node.sourceUrl}" class="card-img shape-img" style="width: 200px; height: 200px;">
                <h5 class="title-event-popup">${valueOfElement.title}</h5>
                <div class="row">
                    <div class="col">
                        <div class="div-border">
                            <div class="row">
                                <div class="col-md-1">
                                    <img src="${idUrl}/asset/assets/image/icon/blueLocation.png" class="shape-location">
                                </div>
                                <div class="col">
                                    <span class="caption-location">${valueOfElement.event.tempat}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="div-border">
                            <div class="row">
                                <div class="col-md-1">
                                    <img src="${idUrl}/asset/assets/image/icon/blueCalender.png" class="shape-location">
                                </div>
                                <div class="col">
                                    <span class="caption-location">${date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style="margin: 30px 0px 30px 0px;"></hr>
                <p class="detail-popup-event"> ${konten} </p>
                <div class="popup-cp-keterangan">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <span class="popup-cp-keterangan-left">Website</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <span class="popup-cp-keterangan-right">${valueOfElement.event.website}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <span class="popup-cp-keterangan-left">Contact Person</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <span class="popup-cp-keterangan-right">${valueOfElement.event.contactPerson}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <span class="popup-cp-keterangan-left">Email</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <span class="popup-cp-keterangan-right">${valueOfElement.event.email}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        `)
    });
}

//list event
function listEvent() {
    let idUrl = $("#idUrl").val();
    let limitEvent = 0
    maxListEvent = 3
    lengthDataEvent = fetchAllDataEvents.length

    // console.log(fetchAllDataEvents);
    if (lengthDataEvent > 0 && lengthDataEvent > maxListEvent) {
        while (limitEvent < maxListEvent) {
            let date = convertDate(fetchAllDataEvents[limitEvent].event.tanggalBerlangsung, fetchAllDataEvents[limitEvent].event.tanggalBerakhir)
            let konten = fetchAllDataEvents[limitEvent].content == null ? '-' : fetchAllDataEvents[limitEvent].content

            $('#loadDataListEvent').append(`
            <div class="col-lg-4 col-md-6 col-sm-12">
                <a class="card card-event-size" style="border: none; padding: 30px; text-decoration: none;" href="#${fetchAllDataEvents[limitEvent].id}" id="id_${fetchAllDataEvents[limitEvent].id}">
                    <div class="card-body">
                        <img src="${fetchAllDataEvents[limitEvent].featuredImage.node.sourceUrl}" class="card-img shape-img img-fluid">
                        <span class="caption-date">${date}</span>
                        <h5 class="title-event">${fetchAllDataEvents[limitEvent].title}</h5>
                        <div class="row">
                            <div class="col-md-1">
                                <img src="${idUrl}/asset/assets/image/icon/location.png" class="shape-location">
                            </div>
                            <div class="col">
                                <span class="caption-location">${fetchAllDataEvents[limitEvent].event.tempat}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            
            `)

            $('#popupClass').append(`
            <div id="${fetchAllDataEvents[limitEvent].id}" class="overlay">
                <div class="popup">
                <a class="close" href="#id_${fetchAllDataEvents[limitEvent].id}">&times;</a>
                <div class="content" style="text-align: center;">
                    <img src="${fetchAllDataEvents[limitEvent].featuredImage.node.sourceUrl}" class="card-img shape-img" style="width: 200px; height: 200px;">
                    <h5 class="title-event-popup">${fetchAllDataEvents[limitEvent].title}</h5>
                    <div class="row">
                        <div class="col">
                            <div class="div-border">
                                <div class="row">
                                    <div class="col-md-1">
                                        <img src="${idUrl}/asset/assets/image/icon/blueLocation.png" class="shape-location">
                                    </div>
                                    <div class="col">
                                        <span class="caption-location">${fetchAllDataEvents[limitEvent].event.tempat}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="div-border">
                                <div class="row">
                                    <div class="col-md-1">
                                        <img src="${idUrl}/asset/assets/image/icon/blueCalender.png" class="shape-location">
                                    </div>
                                    <div class="col">
                                        <span class="caption-location">${date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style="margin: 30px 0px 30px 0px;"></hr>
                    <p class="detail-popup-event"> ${konten} </p>
                    <div class="popup-cp-keterangan">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Website</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${fetchAllDataEvents[limitEvent].event.website}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Contact Person</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${fetchAllDataEvents[limitEvent].event.contactPerson}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Email</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${fetchAllDataEvents[limitEvent].event.email}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            `)



            limitEvent++
        }
        lengthDataNowEvent += limitEvent
        lengthDataEvent -= limitEvent

    } else {
        allEvent()
    }
}

$("#seeMoreEvent").click(function () {
    let idUrl = $("#idUrl").val();
    $('#loadDataListEvent').empty()
    $('#popupClass').empty()

    if (lengthDataEvent > 0 && lengthDataEvent > 3) {
        maxListEvent += 3
        let limitEvent = 0

        while (limitEvent < maxListEvent) {

            let date = convertDate(fetchAllDataEvents[limitEvent].event.tanggalBerlangsung, fetchAllDataEvents[limitEvent].event.tanggalBerakhir)
            let konten = fetchAllDataEvents[limitEvent].content == null ? '-' : fetchAllDataEvents[limitEvent].content

            $('#loadDataListEvent').append(`
            <div class="col-lg-4 col-md-6 col-sm-12">
                <a class="card card-event-size" style="border: none; padding: 30px; text-decoration: none;" href="#${fetchAllDataEvents[limitEvent].id}" id="id_${fetchAllDataEvents[limitEvent].id}">
                    <div class="card-body">
                        <img src="${fetchAllDataEvents[limitEvent].featuredImage.node.sourceUrl}" class="card-img shape-img img-fluid">
                        <span class="caption-date">${date}</span>
                        <h5 class="title-event">${fetchAllDataEvents[limitEvent].title}</h5>
                        <div class="row">
                            <div class="col-md-1">
                                <img src="${idUrl}/asset/assets/image/icon/location.png" class="shape-location">
                            </div>
                            <div class="col">
                                <span class="caption-location">${fetchAllDataEvents[limitEvent].event.tempat}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `)

            $('#popupClass').append(`
            <div id="${fetchAllDataEvents[limitEvent].id}" class="overlay">
                <div class="popup">
                <a class="close" href="#id_${fetchAllDataEvents[limitEvent].id}">&times;</a>
                <div class="content" style="text-align: center;">
                    <img src="${fetchAllDataEvents[limitEvent].featuredImage.node.sourceUrl}" class="card-img shape-img" style="width: 200px; height: 200px;">
                    <h5 class="title-event-popup">${fetchAllDataEvents[limitEvent].title}</h5>
                    <div class="row">
                        <div class="col">
                            <div class="div-border">
                                <div class="row">
                                    <div class="col-md-1">
                                        <img src="${idUrl}/asset/assets/image/icon/blueLocation.png" class="shape-location">
                                    </div>
                                    <div class="col">
                                        <span class="caption-location">${fetchAllDataEvents[limitEvent].event.tempat}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="div-border">
                                <div class="row">
                                    <div class="col-md-1">
                                        <img src="${idUrl}/asset/assets/image/icon/blueCalender.png" class="shape-location">
                                    </div>
                                    <div class="col">
                                        <span class="caption-location">${date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style="margin: 30px 0px 30px 0px;"></hr>
                    <p class="detail-popup-event"> ${konten} </p>
                    <div class="popup-cp-keterangan">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Website</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${fetchAllDataEvents[limitEvent].event.website}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Contact Person</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${fetchAllDataEvents[limitEvent].event.contactPerson}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Email</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${fetchAllDataEvents[limitEvent].event.email}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            `)


            limitEvent++
        }
        lengthDataNowEvent += limitEvent
        lengthDataEvent -= limitEvent

    } else {

        allEvent()


    }

})


//get data search
$("#searchEvent").on("keypress", function (e) {
    let idUrl = $("#idUrl").val();
    if (e.which == 13) {
        let valueWord = $(this).val().toLowerCase();
        $('#loadDataListEvent').empty()
        $('#popupClass').empty()

        $(fetchAllDataEvents).filter(function (i, valueOfElement) {
            let getNamaEvent = valueOfElement.title

            if (getNamaEvent.toLowerCase().indexOf(valueWord) > -1) {
                let date = convertDate(valueOfElement.event.tanggalBerlangsung, valueOfElement.event.tanggalBerakhir)
                let konten = valueOfElement.content == null ? '-' : valueOfElement.content

                $('#loadDataListEvent').append(`
                <div class="col-lg-4 col-md-6 col-sm-12">
                <a class="card card-event-size" style="border: none; padding: 30px; text-decoration: none;" href="#${valueOfElement.id}" id="id_${valueOfElement.id}">
                <div class="card-body">
                    <img src="${valueOfElement.featuredImage.node.sourceUrl}" class="card-img shape-img img-fluid">
                    <span class="caption-date">${date}</span>
                    <h5 class="title-event">${valueOfElement.title}</h5>
                    <div class="row">
                        <div class="col-md-1">
                            <img src="${idUrl}/asset/assets/image/icon/location.png" class="shape-location">
                        </div>
                        <div class="col">
                            <span class="caption-location">${valueOfElement.event.tempat}</span>
                        </div>
                    </div>
                </div>
            </a>
                </div>
            
            `)

                $('#popupClass').append(`
            <div id="${valueOfElement.id}" class="overlay">
                <div class="popup">
                <a class="close" href="#id_${valueOfElement.id}">&times;</a>
                <div class="content" style="text-align: center;">
                    <img src="${valueOfElement.featuredImage.node.sourceUrl}" class="card-img shape-img" style="width: 200px; height: 200px;">
                    <h5 class="title-event-popup">${valueOfElement.title}</h5>
                    <div class="row">
                        <div class="col">
                            <div class="div-border">
                                <div class="row">
                                    <div class="col-md-1">
                                        <img src="${idUrl}/asset/assets/image/icon/blueLocation.png" class="shape-location">
                                    </div>
                                    <div class="col">
                                        <span class="caption-location">${valueOfElement.event.tempat}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="div-border">
                                <div class="row">
                                    <div class="col-md-1">
                                        <img src="${idUrl}/asset/assets/image/icon/blueCalender.png" class="shape-location">
                                    </div>
                                    <div class="col">
                                        <span class="caption-location">${date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style="margin: 30px 0px 30px 0px;"></hr>
                    <p class="detail-popup-event"> ${konten} </p>
                    <div class="popup-cp-keterangan">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Website</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${valueOfElement.event.website}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Contact Person</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${valueOfElement.event.contactPerson}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-left">Email</span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <span class="popup-cp-keterangan-right">${valueOfElement.event.email}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            `)
            }
        });
    }
});

function getDateNow() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = String(today.getFullYear());

    // today = mm + '/' + dd + '/' + yyyy;
    return [dd, mm, yyyy]
}

function getNextEvent(today, dateEvent) {
    // console.log(today, "------------->", dateEvent);
    if (parseInt(dateEvent[2]) > parseInt(today[2])) {
        inNext = true
        return inNext
    } else if (parseInt(dateEvent[1]) > parseInt(today[1])) {
        inNext = true
        return inNext
    } else if (parseInt(dateEvent[0]) > parseInt(today[0])) {
        inNext = true
        return inNext
    } else {
        inNext = false
        return inNext
    }
}

//category
$("#selectCategoryEvent").click(function () {
    let idUrl = $("#idUrl").val();
    let categorySelected = $("#selectCategoryEvent option:selected").text();
    $('#loadDataListEvent').empty()
    $('#popupClass').empty()

    if (categorySelected.toString() == "All Event") {
        listEvent()
    } else {
        $.each(fetchAllDataEvents, function (indexInArray, valueOfElement) {
            let inNext = false
            let next = getNextEvent(getDateNow(), splitDate(valueOfElement.event.tanggalBerlangsung))
            let date = convertDate(valueOfElement.event.tanggalBerlangsung, valueOfElement.event.tanggalBerakhir)
            let konten = valueOfElement.content == null ? '-' : valueOfElement.content

            if (next == true) {
                $('#loadDataListEvent').append(`
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <a class="card" style="border: none; padding: 30px; text-decoration: none;" href="#${valueOfElement.id}" id="id_${valueOfElement.id}">
                        <div class="card-body">
                            <img src="${valueOfElement.featuredImage.node.sourceUrl}" class="card-img shape-img">
                            <span class="caption-date">${date}</span>
                            <h5 class="title-event">${valueOfElement.title}</h5>
                            <div class="row">
                                <div class="col-md-1">
                                    <img src="${idUrl}/asset/assets/image/icon/location.png" class="shape-location">
                                </div>
                                <div class="col">
                                    <span class="caption-location">${valueOfElement.event.tempat}</span>
                                </div>
                            </div>
                        </div>
                     </a>
                </div>
                `)

                $('#popupClass').append(`
                <div id="${valueOfElement.id}" class="overlay">
                    <div class="popup">
                    <a class="close" href="#id_${valueOfElement.id}">&times;</a>
                    <div class="content" style="text-align: center;">
                        <img src="${valueOfElement.featuredImage.node.sourceUrl}" class="card-img shape-img" style="width: 200px; height: 200px;">
                        <h5 class="title-event-popup">${valueOfElement.title}</h5>
                        <div class="row">
                            <div class="col">
                                <div class="div-border">
                                    <div class="row">
                                        <div class="col-md-1">
                                            <img src="${idUrl}/asset/assets/image/icon/blueLocation.png" class="shape-location">
                                        </div>
                                        <div class="col">
                                            <span class="caption-location">${valueOfElement.event.tempat}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="div-border">
                                    <div class="row">
                                        <div class="col-md-1">
                                            <img src="${idUrl}/asset/assets/image/icon/blueCalender.png" class="shape-location">
                                        </div>
                                        <div class="col">
                                            <span class="caption-location">${date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style="margin: 30px 0px 30px 0px;"></hr>
                        <p> ${konten} </p>
                        <div class="popup-cp-keterangan">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <span class="popup-cp-keterangan-left">Website</span>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <span class="popup-cp-keterangan-right">${valueOfElement.event.website}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <span class="popup-cp-keterangan-left">Contact Person</span>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <span class="popup-cp-keterangan-right">${valueOfElement.event.contactPerson}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <span class="popup-cp-keterangan-left">Email</span>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <span class="popup-cp-keterangan-right">${valueOfElement.event.email}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                `)
            }
        })
    }

})

// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }



// khusus calender
!function () {


    var today = moment();


    function Calendar(selector, events, currentFilter = null) {
        this.el = document.querySelector(selector);
        this.events = events;
        if (currentFilter != null) {
            //ada filter
            this.current = moment(today).add(12 * currentFilter, 'M').date(1);;
        }
        else {
            //tanpa filter
            this.current = moment(today).date(1);
        }
        let temp = moment(today).add(12, 'M');
        this.draw();
        var current = document.querySelector('.today');
        if (current) {
            var self = this;
            window.setTimeout(function () {
                self.openDay(current);
            }, 500);
        }
    }

    Calendar.prototype.draw = function () {
        this.drawHeader();
        this.drawHari()
        this.drawMonth();
        this.drawLegend();
        this.dropdown()
    }

    Calendar.prototype.drawHari = function () {
        var self = this;
        if (hariBol == true) {
            var kumpulanHari = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            // var name = createElement('div', 'day-name', day.format('ddd'));
            var table = document.createElement('TABLE');
            table.style.textAlign = 'center'

            var tableBody = document.createElement('TBODY');
            table.appendChild(tableBody);

            for (var i = 0; i < 1; i++) {
                var tr = document.createElement('TR');
                tableBody.appendChild(tr);

                for (var j = 0; j < 7; j++) {
                    var td = createElement('TD', 'day-name');
                    td.width = '75';
                    td.margin = 'auto';
                    td.appendChild(document.createTextNode(kumpulanHari[j]));
                    tr.appendChild(td);
                }
            
            this.el.appendChild(table);
            }
            hariBol = false
        }
    }

    Calendar.prototype.drawDay = function () {
        var self = this;
        this.tbl = document.createElement('row');

        this.tbdy = document.createElement('tbody');

        for (var i = 0; i < 3; i++) {
            this.tr = document.createElement('tr');
            for (var j = 0; j < 2; j++) {
                if (i == 2 && j == 1) {
                    break
                } else {
                    this.td = document.createElement('td');
                    td.appendChild(document.createTextNode('\u0020'))
                    i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                    this.tr.appendChild(td)
                }
            }
            this.tbdy.appendChild(tr);
        }
        this.tbl.appendChild(tbdy);
        this.el.appendChild(tbl)

        // var right = createElement('div', 'right');
        // right.addEventListener('click', function() { self.nextMonth(); });

        // var left = createElement('div', 'left');
        // left.addEventListener('click', function() { self.prevMonth(); });

        // this.legend.appendChild(right);
        // this.legend.appendChild(left);
        // this.el.appendChild(this.legend);
    }

    Calendar.prototype.drawHeader = function () {
        var self = this;
        if (!this.header) {
            //Create the header elements
            this.header = createElement('div', 'header');
            this.header.className = 'header';

            this.title = createElement('h1', 'nama-bulan');

            // var right = createElement('div', 'right');
            // right.addEventListener('click', function() { self.nextMonth(); });

            // var left = createElement('div', 'left');
            // left.addEventListener('click', function() { self.prevMonth(); });

            var drop = createElement('div')
            drop.setAttribute("id", "klik");
            // drop.addEventListener('click', function() { self.dropdown(); });


            //Append the Elements
            this.header.appendChild(this.title);
            // this.header.appendChild(right);
            // this.header.appendChild(left);
            this.header.appendChild(drop);
            this.el.appendChild(this.header);
        }

        //   this.title.innerHTML = this.current.format('MMMM YYYY');
        this.title.innerHTML = this.current.format('MMMM YYYY');
    }

    Calendar.prototype.dropdown = function () {
        var self = this;
        var today = moment();
        const year = moment().format('YYYY');


        $('#klik').append(`
            <div class="select-toggle year-event" style="position: absolute; right: 0px; top: 0px">
                <select class="search-by-year-calender" onchange="changeYear()" aria-label="Default select example" id="asd">
                <option selected disabled>Select Year</option>
                <option value="0" id="${parseInt(year)}">${parseInt(year)}</option>
                <option value="1" id="${parseInt(year) + 1}">${parseInt(year) + 1}</option>
                <option value="2" id="${parseInt(year) + 2}">${parseInt(year) + 2}</option>
                <option value="3" id="${parseInt(year) + 3}">${parseInt(year) + 3}</option>
                <option value="4" id="${parseInt(year) + 4}">${parseInt(year) + 4}</option>
                </select>
            </div>
        `);

        let category_selected = $("#asd option:selected").text();
    }

    // $("#klik").click(function () {
    //     let category_selected = $("#klik option:selected").text();
    //     console.log(category_selected);
    // })


    Calendar.prototype.drawMonth = function () {
        var self = this;
        monthsCalender = this.current.format('MMMM');
        yearCalender = this.current.format('YYYY');
        let monthNow = this.current.format('MMMM');
        let yearNow = this.current.format('YYYY');
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        this.events.forEach(function (ev) {
            if (String(yearNow) == String(ev.eventStart[2]) || String(yearNow) == String(ev.eventEnd[2])) {

                if (String(months[parseInt(ev.eventStart[1]) - 1]) == String(months[parseInt(ev.eventEnd[1]) - 1])) {

                    if (String(monthNow) == String(months[parseInt(ev.eventStart[1]) - 1]) || String(monthNow) == String(months[parseInt(ev.eventEnd[1]) - 1])) {

                        ev.date = self.current.clone().date(ev.calendarNumber);
                    } else {
                        ev.date = self.current.clone().date(0);
                    }
                } else {
                    if (String(monthNow) == String(months[parseInt(ev.eventStart[1]) - 1])) {
                        ev.date = self.current.clone().date(ev.calendarNumber);
                    } else {
                        //sini masih 
                        ev.date = self.current.clone().date(0);
                    }
                }
            } else {
                ev.date = self.current.clone().date(0);
            }
        });

        if (this.month) {
            this.oldMonth = this.month;
            this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
            this.oldMonth.addEventListener('webkitAnimationEnd', function () {
                self.oldMonth.parentNode.removeChild(self.oldMonth);
                self.month = createElement('div', 'month');
                self.backFill();
                self.currentMonth();
                self.fowardFill();
                self.el.appendChild(self.month);
                window.setTimeout(function () {
                    self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
                }, 16);
            });
        } else {
            this.month = createElement('div', 'month');
            this.el.appendChild(this.month);
            this.backFill();
            this.currentMonth();
            this.fowardFill();
            this.month.className = 'month new';
        }
    }

    Calendar.prototype.backFill = function () {
        var clone = this.current.clone();
        var dayOfWeek = clone.day();

        if (!dayOfWeek) { return; }

        clone.subtract('days', dayOfWeek + 1);

        for (var i = dayOfWeek; i > 0; i--) {
            this.drawDay(clone.add('days', 1));
        }
    }

    Calendar.prototype.fowardFill = function () {
        var clone = this.current.clone().add('months', 1).subtract('days', 1);
        var dayOfWeek = clone.day();

        if (dayOfWeek === 6) { return; }

        for (var i = dayOfWeek; i < 6; i++) {
            this.drawDay(clone.add('days', 1));
        }
    }

    Calendar.prototype.currentMonth = function () {
        var clone = this.current.clone();

        while (clone.month() === this.current.month()) {
            this.drawDay(clone);
            clone.add('days', 1);
        }
    }

    Calendar.prototype.getWeek = function (day) {
        if (!this.week || day.day() === 0) {
            this.week = createElement('div', 'week');
            this.month.appendChild(this.week);
        }
    }

    Calendar.prototype.drawDay = function (day) {
        var self = this;
        this.getWeek(day);

        //Outer Day
        var outer = createElement('div', this.getDayClass(day));
        outer.addEventListener('click', function () {
            self.openDay(this);
        });
        //Day Name
        //   var name = createElement('div', 'day-name', day.format('ddd'));
        
        // if (countDateEvent < 7) {
        //     var name = createElement('div', 'day-name', day.format('ddd'));
        //     this.hari.appendChild(name);
        //     countDateEvent += 1
        // }

        //Day Number
        var number = createElement('div', 'day-number', day.format('DD'));


        //Events
        var events = createElement('div', 'day-events');
        this.drawEvents(day, events);

        //   outer.appendChild(name);
        outer.appendChild(number);
        outer.appendChild(events);
        this.week.appendChild(outer);
    }

    Calendar.prototype.drawEvents = function (day, element) {
        if (day.month() === this.current.month()) {
            var todaysEvents = this.events.reduce(function (memo, ev) {
                if (ev.date.isSame(day, 'day')) {
                    memo.push(ev);
                }
                return memo;
            }, []);

            todaysEvents.forEach(function (ev) {
                var evSpan = createElement('span', ev.color);
                element.appendChild(evSpan);
            });
        }
    }

    Calendar.prototype.getDayClass = function (day) {
        classes = ['day'];
        if (day.month() !== this.current.month()) {
            classes.push('other');
        } else if (today.isSame(day, 'day')) {
            classes.push('today');
        }
        return classes.join(' ');
    }

    Calendar.prototype.openDay = function (el) {
        var details, arrow;
        var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
        var day = this.current.clone().date(dayNumber);

        var currentOpened = document.querySelector('.details');

        //Check to see if there is an open detais box on the current row
        if (currentOpened && currentOpened.parentNode === el.parentNode) {
            details = currentOpened;
            arrow = document.querySelector('.arrow');
        } else {
            //Close the open events on differnt week row
            //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
            if (currentOpened) {
                currentOpened.addEventListener('webkitAnimationEnd', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.addEventListener('oanimationend', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.addEventListener('msAnimationEnd', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.addEventListener('animationend', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.className = 'details out';
            }

            //Create the Details Container
            details = createElement('div', 'details in');

            //Create the arrow
            var arrow = createElement('div', 'arrow');

            //Create the event wrapper

            details.appendChild(arrow);
            el.parentNode.appendChild(details);
        }

        var todaysEvents = this.events.reduce(function (memo, ev) {
            if (ev.date.isSame(day, 'day')) {
                memo.push(ev);
            }
            return memo;
        }, []);

        this.renderEvents(todaysEvents, details);

        arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';

        filterEventCalenderByDay(day)
    }

    Calendar.prototype.renderEvents = function (events, ele) {
        //Remove any events in the current details element
        var currentWrapper = ele.querySelector('.events');
        var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

        events.forEach(function (ev) {
            var div = createElement('div', 'event');
            var square = createElement('div', 'event-category ' + ev.color);
            var span = createElement('span', '', ev.eventName);

            div.appendChild(square);
            div.appendChild(span);
            wrapper.appendChild(div);
        });

        if (!events.length) {
            var div = createElement('div', 'event empty');
            var span = createElement('span', '', 'Tidak terdapat event');

            div.appendChild(span);
            wrapper.appendChild(div);
        }

        if (currentWrapper) {
            currentWrapper.className = 'events out';
            currentWrapper.addEventListener('webkitAnimationEnd', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('oanimationend', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('msAnimationEnd', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('animationend', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
        } else {
            ele.appendChild(wrapper);
        }
    }

    Calendar.prototype.drawLegend = function () {
        var self = this;
        this.legend = createElement('div', 'legend');

        var right = createElement('div', 'right');
        right.addEventListener('click', function () { self.nextMonth(); });

        var left = createElement('div', 'left');
        left.addEventListener('click', function () { self.prevMonth(); });

        this.legend.appendChild(right);
        this.legend.appendChild(left);
        this.el.appendChild(this.legend);
    }

    Calendar.prototype.nextMonth = function () {
        this.current.add('months', 1);
        this.next = true;
        this.draw();
        countDateEvent = 0
        // filterEventCalender()
        callEmptyEvent()
    }

    Calendar.prototype.prevMonth = function () {
        this.current.subtract('months', 1);
        this.next = false;
        this.draw();
        countDateEvent = 0
        // filterEventCalender()
        callEmptyEvent()
    }

    window.Calendar = Calendar;

    function createElement(tagName, className, innerText) {
        var ele = document.createElement(tagName);
        if (className) {
            ele.className = className;
        }
        if (innerText) {
            ele.innderText = ele.textContent = innerText;
        }
        return ele;
    }
}();

function distanceCalender(berlangsung, berakhir) {
    berlangsung = splitDate(berlangsung)
    berakhir = splitDate(berakhir)


    let dinstanceDay = parseInt(berakhir[0]) - parseInt(berlangsung[0])
    if (dinstanceDay == 0) {
        return 1
    } else if (dinstanceDay > 0) {
        return dinstanceDay
    } else {
        return 31
    }
}

function listEventCalender() {
    let colorCalenderEvent = ['green', 'orange', 'red', 'orange',]
    let countColorCalender = 0
    $.each(fetchAllDataEvents, function (indexInArray, valueOfElement) {
        if (countColorCalender == 3) {
            countColorCalender = 0
        }

        let daysStart = splitDate(valueOfElement.event.tanggalBerlangsung)
        let daysEnd = splitDate(valueOfElement.event.tanggalBerakhir)
        let jarak = distanceCalender(valueOfElement.event.tanggalBerlangsung, valueOfElement.event.tanggalBerakhir)
        let dayEndNumber = parseInt(daysEnd[0])

        for (let i = 0; i <= jarak; i++) {
            dataSetForCalender.push({ eventName: valueOfElement.title, calendarNumber: parseInt(daysStart[0]) + i, eventStart: daysStart, eventEnd: daysEnd, numberEnd: dayEndNumber, color: colorCalenderEvent[countColorCalender] })
        }
        if (daysStart[1] != daysEnd[1]) {
            let tgl = 1
            for (let j = 0; j < dayEndNumber; j++) {
                dataSetForCalender.push({ eventName: valueOfElement.title, calendarNumber: tgl + j, eventStart: daysStart, eventEnd: daysEnd, numberEnd: dayEndNumber, color: colorCalenderEvent[countColorCalender] })
            }
        }
        countColorCalender += 1
    })
    var calendar = new Calendar('#calendar', dataSetForCalender);
    filterEventCalender()
}

$("#nextEvent").click(function () {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let temp = 0

    let x = 0
    $.each(fetchAllDataEvents, function (indexInArray, valueOfElement) {
        let daysStart = splitDate(valueOfElement.event.tanggalBerlangsung)
        let daysEnd = splitDate(valueOfElement.event.tanggalBerakhir)
        if (String(monthsCalender) == months[parseInt(daysStart[1]) - 1] || String(monthsCalender) == months[parseInt(daysEnd[1]) - 1]) {
            x++
        }
    });

    // console.log('x ', x);
    // console.log('lengthDataNowEventCalender ', lengthDataNowEventCalender);
    // if ((lengthDataNowEventCalender - (maxListEventCalender-1)) > 0 ) {
    if (x > lengthDataNowEventCalender) {

        $('#loadDataEventCalender').empty()
        let idUrl = $("#idUrl").val();
        let limitEvent = 0
        maxListEventCalender = 3
        lengthDataEventCalender = fetchAllDataEvents.length

        let colorListEvent = ['rgba(44, 203, 51, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(222, 1, 24, 0.2);', 'rgba(253, 168, 26, 0.2);']
        let colorListDate = ['#0EA34A;', '#FDA81A;', '#B43845;', '#FDA81A;']
        let colorCalenderEvent = ['green', 'orange', 'red', 'orange']

        // console.log(fetchAllDataEvents[lengthDataNowEventCalender]);

        while (limitEvent < maxListEventCalender) {
            if (fetchAllDataEvents[lengthDataNowEventCalender] != undefined) {
                let daysStart = splitDate(fetchAllDataEvents[lengthDataNowEventCalender].event.tanggalBerlangsung)
                let daysEnd = splitDate(fetchAllDataEvents[lengthDataNowEventCalender].event.tanggalBerakhir)

                if (String(monthsCalender) == months[parseInt(daysStart[1]) - 1] || String(monthsCalender) == months[parseInt(daysEnd[1]) - 1]) {

                    let date = convertDate(fetchAllDataEvents[lengthDataNowEventCalender].event.tanggalBerlangsung, fetchAllDataEvents[lengthDataNowEventCalender].event.tanggalBerakhir)
                    $('#loadDataEventCalender').append(`
                        <div class="card card-highligt" style="border: none; background:${colorListEvent[lengthDataNowEventCalender]}">
                            <div class="card-body">
                            <h5 class="date-calender" style="color:${colorListDate[lengthDataNowEventCalender]}">${date}</h5>
                            <div class="row">
                                <div class="col-md-1">
                                    <span>
                                        <img src="${idUrl}/asset/assets/image/icon/blackLocation.png" class="shape-location">
                                    </span>
                                </div>
                                <div class="col" style="padding:0px">
                                    <span class="location-calender">${fetchAllDataEvents[lengthDataNowEventCalender].event.tempat}</span>
                                </div>
                            </div>
                            <h5 class="title-calender">${fetchAllDataEvents[lengthDataNowEventCalender].title}</h5>
                            </div>
                        </div>
                    `)

                    lengthDataNowEventCalender++
                    temp++
                }


            }
            limitEvent++
        }

    } else {
        alert("Tidak ada event")
    }
    lengthDataNowEventCalender -= temp
});

$("#previousEvent").click(function () {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let x = 0
    $.each(fetchAllDataEvents, function (indexInArray, valueOfElement) {
        let daysStart = splitDate(valueOfElement.event.tanggalBerlangsung)
        let daysEnd = splitDate(valueOfElement.event.tanggalBerakhir)
        if (String(monthsCalender) == months[parseInt(daysStart[1]) - 1] || String(monthsCalender) == months[parseInt(daysEnd[1]) - 1]) {
            x++
        }
    });

    if ((x - maxListEventCalender) > 0) {
        // if ((lengthDataNowEventCalender - maxListEventCalender) > 0 ) {

        $('#loadDataEventCalender').empty()
        let idUrl = $("#idUrl").val();
        let limitEvent = 0
        maxListEventCalender = 3
        lengthDataEventCalender = fetchAllDataEvents.length

        let colorListEvent = ['rgba(44, 203, 51, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(222, 1, 24, 0.2);', 'rgba(253, 168, 26, 0.2);']
        let colorListDate = ['#0EA34A;', '#FDA81A;', '#B43845;', '#FDA81A;']
        let colorCalenderEvent = ['green', 'orange', 'red', 'orange']

        // console.log(fetchAllDataEvents[lengthDataNowEventCalender]);

        while (limitEvent < maxListEventCalender) {
            if (fetchAllDataEvents[limitEvent] != undefined) {

                let daysStart = splitDate(fetchAllDataEvents[limitEvent].event.tanggalBerlangsung)
                let daysEnd = splitDate(fetchAllDataEvents[limitEvent].event.tanggalBerakhir)

                if (String(monthsCalender) == months[parseInt(daysStart[1]) - 1] || String(monthsCalender) == months[parseInt(daysEnd[1]) - 1]) {

                    let date = convertDate(fetchAllDataEvents[limitEvent].event.tanggalBerlangsung, fetchAllDataEvents[limitEvent].event.tanggalBerakhir)
                    $('#loadDataEventCalender').append(`
                        <div class="card card-highligt" style="border: none; background:${colorListEvent[limitEvent]}">
                            <div class="card-body">
                            <h5 class="date-calender" style="color:${colorListDate[limitEvent]}">${date}</h5>
                            <div class="row">
                                <div class="col-md-1">
                                    <span>
                                        <img src="${idUrl}/asset/assets/image/icon/blackLocation.png" class="shape-location">
                                    </span>
                                </div>
                                <div class="col" style="padding:0px">
                                    <span class="location-calender">${fetchAllDataEvents[limitEvent].event.tempat}</span>
                                </div>
                            </div>
                            <h5 class="title-calender">${fetchAllDataEvents[limitEvent].title}</h5>
                            </div>
                        </div>
                    `)
                }

            }
            limitEvent++
        }
        lengthDataEventCalenderFilter -= (lengthDataNowEventCalender - maxListEventCalender)
    } else {
        alert("Tidak ada event")
    }

});

function filterEventCalender() {
    $('#loadDataEventCalender').empty()
    let idUrl = $("#idUrl").val();
    let limitEvent = 0
    maxListEventCalender = 4
    lengthDataEventCalender = fetchAllDataEvents.length
    lengthDataNowEventCalender = 0
    lengthDataEventCalenderFilter = 0
    let countColor = 0

    let colorListEvent = ['rgba(44, 203, 51, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(222, 1, 24, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(44, 203, 51, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(222, 1, 24, 0.2);', 'rgba(253, 168, 26, 0.2);']
    let colorListDate = ['#0EA34A;', '#FDA81A;', '#B43845;', '#FDA81A;', '#0EA34A;', '#FDA81A;', '#B43845;', '#FDA81A;']
    let colorCalenderEvent = ['green', 'orange', 'red', 'orange', 'green', 'orange', 'red', 'orange']

    $.each(fetchAllDataEvents, function (index, value) { 
        if (countColor == 3) {
            countColor = 0
        }
        if (value != undefined) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let daysStart = splitDate(value.event.tanggalBerlangsung)
            let daysEnd = splitDate(value.event.tanggalBerakhir)

            let dateNow = moment().format('D')

            if (yearNow == parseInt(daysEnd[2])) {
                if ((String(monthsCalender) == months[parseInt(daysStart[1]) - 1] || String(monthsCalender) == months[parseInt(daysEnd[1]) - 1]) ) {
                    if(dateNow <= parseInt(daysEnd[0])){
                        let date = convertDate(value.event.tanggalBerlangsung, value.event.tanggalBerakhir)
                        $('#loadDataEventCalender').append(`
                            <div class="card card-highligt" style="border: none; background:${colorListEvent[countColor]}">
                                <div class="card-body">
                                <h5 class="date-calender" style="color:${colorListDate[countColor]}">${date}</h5>
                                <div class="row">
                                    <div class="col-md-1">
                                        <span>
                                            <img src="${idUrl}/asset/assets/image/icon/blackLocation.png" class="shape-location">
                                        </span>
                                    </div>
                                    <div class="col-md-10" style="padding:0px">
                                        <span class="location-calender">${value.event.tempat}</span>
                                    </div>
                                </div>
                                <h5 class="title-calender">${value.title}</h5>
                                </div>
                            </div>
                        `)
                        lengthDataEventCalenderFilter += 1
                    }
                }
            }
            
        }
        limitEvent += 1
        countColor += 1 
        if (lengthDataEventCalenderFilter == 3) {
            return false
        }
    });

    lengthDataNowEventCalender += limitEvent
    lengthDataEventCalender -= limitEvent

    if (lengthDataEventCalenderFilter == 0) {
        callEmptyEvent()
    }
}

function callEmptyEvent(){
    $('#loadDataEventCalender').empty()
    $('#loadDataEventCalender').append(`
        <div class="card card-highligt" style="border: none; background:#cccccc">
            <div class="card-body">
                <h5 class="title-calender" style="color:#858585">Tidak Terdapat Event</h5>
            </div>
        </div>
    `)
}

function splitDateClick(date) {
    let year = date.substr(0, 4); // => "Tabs1"
    let month = date.substr(5, 2);
    let day = date.substr(8, 4)

    return [day, month, year]
}

function bgAfterClick(namaEvent) {
    let colorListEvent = ['rgba(44, 203, 51, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(222, 1, 24, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(44, 203, 51, 0.2);', 'rgba(253, 168, 26, 0.2);', 'rgba(222, 1, 24, 0.2);', 'rgba(253, 168, 26, 0.2);']
    let colorListDate = ['#0EA34A;', '#FDA81A;', '#B43845;', '#FDA81A;', '#0EA34A;', '#FDA81A;', '#B43845;', '#FDA81A;']
    let colorCalenderEvent = ['green', 'orange', 'red', 'orange', 'green', 'orange', 'red', 'orange']

    let warna
    $.each(dataSetForCalender, function (index, value) {
        if (value.eventName == namaEvent) {
            warna = value.color
            return false

        }
    });

    let warnaBgPallete
    let warnaTextPallete
    for (let i = 0; i < colorCalenderEvent.length; i++) {
        if (colorCalenderEvent[i] == warna) {
            warnaBgPallete = colorListEvent[i]
            warnaTextPallete = colorListDate[i]
            break
        }

    }

    return [warnaBgPallete, warnaTextPallete]
}

function filterEventCalenderByDay(dayClick) {

    if (checkFirstEventClick == true) {
        $('#loadDataEventCalender').empty()
        let idUrl = $("#idUrl").val();

        dayClick = dayClick.format("YYYY-MM-DD")

        dayClick = splitDateClick(dayClick)

        $.each(fetchAllDataEvents, function (index, value) {
            if (value != undefined) {
                let daysStart = splitDate(value.event.tanggalBerlangsung)
                let daysEnd = splitDate(value.event.tanggalBerakhir)

                if (parseInt(dayClick[2]) >= parseInt(daysStart[2]) && parseInt(dayClick[2]) <= parseInt(daysEnd[2])) {
                    if (parseInt(dayClick[1]) >= parseInt(daysStart[1]) && parseInt(dayClick[1]) <= parseInt(daysEnd[1])) {
                        if (parseInt(dayClick[0]) >= parseInt(daysStart[0]) && parseInt(dayClick[0]) <= parseInt(daysEnd[0])) {
                            let date = convertDate(value.event.tanggalBerlangsung, value.event.tanggalBerakhir)
                            let warna = bgAfterClick(value.title)
        
                            $('#loadDataEventCalender').append(`
                                <div class="card card-highligt" style="border: none; background:${warna[0]}">
                                    <div class="card-body">
                                    <h5 class="date-calender" style="color:${warna[1]}">${date}</h5>
                                    <div class="row">
                                        <div class="col-md-1">
                                            <span>
                                                <img src="${idUrl}/asset/assets/image/icon/blackLocation.png" class="shape-location">
                                            </span>
                                        </div>
                                        <div class="col-md-10" style="padding:0px">
                                            <span class="location-calender">${value.event.tempat}</span>
                                        </div>
                                    </div>
                                    <h5 class="title-calender">${value.title}</h5>
                                    </div>
                                </div>
                            `)
                        }
                    }
                }
            }
        });

        if ($('#loadDataEventCalender').is(':empty')) {
            $('#loadDataEventCalender').append(`
                <div class="card card-highligt" style="border: none; background:#cccccc">
                    <div class="card-body">
                        <h5 class="title-calender" style="color:#858585">Tidak Terdapat Event</h5>
                    </div>
                </div>
            `)
        }
    } else {
        checkFirstEventClick = true
    }


}



function changeYear() {
    const val = parseInt($('#asd').val())
    const year = parseInt(moment().format('YYYY'))
    let category_selected = val + year
    $(`#${category_selected}`).attr('selected', 'selected')
    countDateEvent = 0

    $('#calendar').html('')
    var calendar = new Calendar('#calendar', dataSetForCalender, val);
    yearNow = category_selected;
    filterEventCalender()
}
