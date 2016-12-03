$('.delete').on('click', function(event) {
    event.preventDefault();
    var projectId = event.target.dataset['projectid'];
    console.log(projectId);
    $.ajax({
            method: 'GET',
            url: '/project/' + projectId + '/_delete',
        })
        .done(function(obj) {
            location.reload();
        });
});