$(document).ready(function (e) {

    $(function () {
        $('#loadBtn').bind("click", GetNews);
    });

    $(function () {
        $('#deleteBtn').bind("click", DeleteNews);
    });

    $('#deleteBtn').attr("disabled", "disabled");
});

function GetNews() {

    $('#load_span').text("Loading news...");
    $('#loadBtn').attr("disabled", "disabled");

    $.get('Home/GetNews',
        null,
        function (data) {
            var newsList = JSON.parse(data);

            $('#count').html(newsList.length);
            if ($('#count').text() != 0)
                $('#deleteBtn').removeAttr("disabled");

            $('#listTitles').html("");
            $('#newsContent').html("");

            var i = 0;
            for (var news in newsList) {
                var elem = $("<div/>").addClass("title_div").attr("id", i).html(newsList[news].title);
                $('#listTitles').append(elem);
                i++;
            }

            $('.title_div').first().addClass("selected");

            // add title and content for first news
            var headerSelectedNews = $("<h2/>").addClass("margin_30").html(newsList[0].title);

            var divWithNews = $("<div/>").append(headerSelectedNews);
            divWithNews = divWithNews.append(newsList[0].content);

            $('#newsContent').append(divWithNews);

            $('#loadBtn').removeAttr("disabled");
            $('#load_span').text("Load News");

            $('.title_div').on('click', function () {
                $('.title_div').removeClass("selected");
                $(this).addClass("selected");
                var idSelected = $(this).attr("id");
                GetSelectedNews(idSelected, $(this).text());

            });
        });
}


function DeleteNews() {

    $('#delete_span').text("Deleting Selected News...");
    $('#deleteBtn').attr("disabled", "disabled");

    var delElement = $('.selected');
    var nextElement = delElement.next().first();
    if (nextElement.length == 0)
    {
        if (delElement.prev().first().length != 0)
        {
            var prevElement = delElement.prev().first();
            var prevElId = prevElement.attr("id");
            GetSelectedNews(prevElId, prevElement.text());
            $('.selected').remove();
            prevElement.addClass("selected");
            var x = $('#count').text();
            $('#count').text(x - 1);
        }
        else
        {
            if (delElement.length != 0)
            {
                $('.selected').remove();
                $('#newsContent').html("");
                var x = $('#count').text();
                $('#count').text(x - 1);
                $('#deleteBtn').attr("disabled", "disabled");
            }
        } 
    }
    else
    {
        var nextElId = nextElement.attr("id");
        GetSelectedNews(nextElId, nextElement.text());
        $('.selected').remove();
        nextElement.addClass("selected");
        var x = $('#count').text();
        $('#count').text(x - 1);
    }

    $('#delete_span').text("Delete Selected News");
    if ($('#count').text() != 0) {
        $('#deleteBtn').removeAttr("disabled");
    }
}

function GetSelectedNews(id, title) {

    $.get('Home/GetNews', null, function (data) {
        var newsList = JSON.parse(data);

        // add title and content for selected news
        var headerSelectedNews = $("<h2/>").addClass("margin_30").html(title);

        var divWithNews = $("<div/>").append(headerSelectedNews);
        var tempContent = newsList[id].content;
        divWithNews = divWithNews.append(tempContent);

        $('#newsContent').html(divWithNews);
    });
}