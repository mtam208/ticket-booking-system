/* SrollIntoView method - START here */

// Define selector for selecting anchor links with the hash 
let anchorSelector = 'a[href^="#"]'; 

// Collect all such anchor links 
let anchorList = document.querySelectorAll(anchorSelector); 
    
// Iterate through each of the links 
anchorList.forEach(link => { 
    link.onclick = function (e) { 
        // Prevent scrolling if the hash value is blank 
        e.preventDefault(); 
    
        // Get the destination to scroll to using the hash property 
        let destination = document.querySelector(this.hash); 
    
        // Scroll to the destination using scrollIntoView method 
        destination.scrollIntoView({behavior: 'smooth'}); 
    } 
}); 
/* SrollIntoView method - END here*/
/* =========================================================================*/

/* Movie Select Box - START here */

// Select Movie

$(document).ready(()=>{
    $.ajax({
        url: '/movie/showing',
        type: 'GET'
    })
    .then(data=>{
        data.forEach(movie => {
            let movieItem = $(`<option class="val" value="${movie._id}">${movie.title}</option>`)
            $('#movieSelection').append(movieItem)
        })
    })
    .catch(err=>console.log(err))
})

// Select Cinema

$('#movieSelection').change(()=>{
    $("#cinemaSelection option[class='val']").remove()
    $("#showDateSelection option[class='val']").remove()
    $("#showTimeSelection option[class='val']").remove()
    let movieId = $('#movieSelection').val()
    $.ajax({
        url: '/movie/' + movieId + '/cinema',
        type: 'GET'
    })
    .then(data=>{
        data.forEach(cinema => {
            let item = $(`<option class="val" value="${cinema}">${cinema}</option>`)
            $('#cinemaSelection').append(item)
        })
    })
    .catch(err=>console.log(err))
})

// Select ShowDate

$('#cinemaSelection').change(()=>{
    $("#showDateSelection option[class='val']").remove()
    $("#showTimeSelection option[class='val']").remove()
    let movieId = $('#movieSelection').val()
    let cinema = $('#cinemaSelection').val()
    let cinemaId = encodeURI(cinema)
    $.ajax({
        url: '/movie/' + movieId + '/cinema/' + cinemaId + '/showDate',
        type: 'GET'
    })
    .then(data=>{
        data.forEach(showDate => {
            let item = $(`<option class="val" value="${showDate}">${showDate}</option>`)
            $('#showDateSelection').append(item)
        })
    })
    .catch(err=>console.log(err))
})

// Select ShowTime

$('#showDateSelection').change(()=>{
    $("#showTimeSelection option[class='val']").remove()
    let movieId = $('#movieSelection').val()
    let cinema = $('#cinemaSelection').val()
    let showDateId = $('#showDateSelection').val()
    let cinemaId = encodeURI(cinema)
    $.ajax({
        url: '/movie/' + movieId + '/cinema/' + cinemaId + '/showDate/' + showDateId + '/showTime',
        type: 'GET'
    })
    .then(data=>{
        console.log(data);
        data.forEach(showTime => {
            let item = $(`<option class="val" value="${showTime}">${showTime}</option>`)
            $('#showTimeSelection').append(item)
        })
    })
    .catch(err=>console.log(err))
})