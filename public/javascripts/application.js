$(function() {
    var ws = new WebSocket("ws://localhost:8080/");
    ws.onmessage = function(event) { 
      var data = event.data.split(':');
      if(data[0]) {
        var ids = data[1].split(',');
        for(var i = 0; i < ids.length; i++){
          $("#" + ids[i]).appendTo(data[0]);
        }
      } else {
        var alertIcon = $("#" + data[1] + " > span.ui-icon-alert");
        if(alertIcon.length == 0) {
          $('<span class="ui-icon ui-icon-alert"></span>').appendTo($("#" + data[1]));
        } else {
          $(alertIcon).remove();
        }
      }
    };

    $("#table1, #table2").sortable({
      connectWith: 'ul',
      placeholder: 'ui-state-highlight',
      containment: $("#content")
    }).disableSelection();

    $("#table1, #table2").bind('sortstart', function(event, ui) {
      ws.send(":" + ui.item.attr('id'));
    });

    $("#table1, #table2").bind('sortstop', function(event, ui) {
      ws.send(":" + ui.item.attr('id'));
    });

    $("#table1, #table2").bind('sortupdate', function(event, ui) {
      var id = ui.item.parent().attr('id');
      ws.send("#" + id + ":" + $("#" + id).sortable('toArray').join(','));
    });
});
