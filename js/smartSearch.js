$(document).ready(function() {

    $('input.city').typeahead({
        name: 'city',
        remote: './server/selectCity.php?query=%QUERY'

    });

})