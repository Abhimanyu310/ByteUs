$('.delete').on('click', function(event) {
    event.preventDefault();
    var applicationId = event.target.dataset['applicationid'];
    console.log(applicationId);
    $.ajax({
            method: 'GET',
            url: '/application/' + applicationId + '/_delete'
        })
        .done(function(obj) {
            location.reload();
        });
});