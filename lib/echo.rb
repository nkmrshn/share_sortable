#!/usr/bin/env ruby
require 'rubygems'
require 'em-websocket'

connections = Array.new
prevMsgs = Array.new

EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080, :debug => true) do |ws|
  ws.onopen { 
    connections.push(ws) unless connections.index(ws)
    prevMsgs.each {|prevMsg| ws.send(prevMsg)} if ARGV[0] == '--cache'
  }

  ws.onmessage {|msg|
    msgs = msg.split(':')

    if msgs[0] != '' && ARGV[0] == '--cache'
      prevMsgs.delete_if{|prevMsg| msg == prevMsg} 
      prevMsgs.push(msg)
    end

    connections.each {|con| con.send(msg) unless con == ws}
  }

  ws.onclose {
    connections.delete_if{|con| con == ws}
  }
end
