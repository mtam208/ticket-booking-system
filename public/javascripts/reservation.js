$(document).ready(function () {
    // get id form Url
    const queryString = window.location.href.split('/');
    var id = queryString[queryString.length-2]
    //
      $.ajax({
        url:'/cart/'+id, 
        type: 'GET'
    })
          .then(data => {
              console.log(data);
              var seat = data.seat;
              var pos = [];
              $('#movie').append(`${data.movie}`);
              $('#cinema').append(`${data.cinema}`);
              $('#hall').append(`${data.hall}`);
              $('#showDate').append(`${data.showDate}`);
              $('#showTime').append(`${data.showTime}`);
            // Render seat are selected or not
                for (let i = 0; i <= 5; i++){
                    for (let j = 0; j <= 8; j++){
                        if (seat[i][j]==1){$('.seat--'+i+'--'+j+'--').addClass('selected fixed')}
                    }
                }

                let count = $('#count').text();
            // Click to choose the seats
              $('.seat').click(function () {
                  let x = parseInt($(this).attr('class').split('--')[1],10);
                  let y = parseInt($(this).attr('class').split('--')[2], 10);
                  
                  if ($(this).hasClass('fixed')) { return true }
                  
                if ($(this).hasClass('occupied')) {
                    $(this).removeClass('occupied');
                    seat[x][y] = 0;
                    count--;
                    loaddata(count, 45000)
                    pos.splice(pos.indexOf({ x: x, y: y }), 1);
                } else {
                    $(this).addClass('occupied');
                    seat[x][y] = 1;
                    count++;
                    loaddata(count, 45000);
                    pos.push({ x: x, y: y });
                }
            })
            // Confirm               
              $('.btn').click(function () {
                  if (pos.length == 0) { alert('CHUA CHON GHE'); return false}
                $.ajax({
                    url: '/cart/'+id, 
                    type: 'POST',
                    data: { seat: seat, pos:pos },
                    
                })
                    .then(data => {
                        if (data=='PICKED'){alert('GHE DA DUOC CHON')}
                       else alert('DAT THANH CONG')
                    })
            })
        })
          .catch(err => {
              alert(err);
          })
    
    
    function loaddata(count,price) {
        $('#count').text(count);
        $('#price').text(count*price);
    }
// 
})