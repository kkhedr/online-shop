$(document).ready(function() {
    var table = $('#example').DataTable( {
       // responsive: true
    } );

 
    $('.delete').click(function (e) {

        var that = $(this)
        
        e.preventDefault();
        
        var n = new Noty({
            text: "Confirm Delete",
            type: "warning",
            killer: true,
            buttons: [
                Noty.button("yes", 'btn btn-success mr-2', function () {
                    that.closest('form').submit();
                }),
        
                Noty.button("no", 'btn btn-primary mr-2', function () {
                    n.close();
                })
            ]
        });
        
        n.show();
        
        });//end of delete

    //new $.fn.dataTable.FixedHeader( table );

} );
