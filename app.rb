require 'sinatra/base'
require 'sinatra/reloader' if development?
require 'chronic'
require 'json'

class UnixTime < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
  end

  get "/" do
    erb :index
  end

  get "/date" do
    response = Hash.new
    begin
      if params[:value] && params[:value] != ""
        if /^\d+$/.match( params[:value] )
          date = Time.at(params[:value].to_i)
        elsif
          date = Chronic.parse(params[:value])
        end
        if date.to_i > 0
          if params[:localtime]
            date = date.localtime(params[:localtime])
          end
          response[:unixtime] = date.to_i
          response[:date] = date.to_s
        else
          response[:error] = "Error parsing the input"
        end
      else
        response[:error] = "Request parameter is missing, try adding a 'value'."
      end
    rescue Exception => e
        response[:error] = e.message
    end
    response.to_json
  end
end
