Share Sortable
==============

This is an example application to share [jQuery Sortable](http://jqueryui.com/demos/sortable/) by using [em-websocet](https://github.com/igrigorik/em-websocket).

Installation
------------

Run these commands:

    $ git clone git://github.com/nkmrshn/share_sortable.git
    $ cd share_sortable
    $ bundle install

Run
---

You will need to run two servers. One is Ruby on Rails based app and the other is WebSocket Server.

To run the WebSocket server:

    $ lib/echo.rb --cache

If you don't want to cache the previous Sortable result, remove the "--cache" option.

Notice
------

This is only an experimental purpose application to run in your local machine.
