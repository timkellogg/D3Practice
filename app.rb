require 'sinatra'

get '/' do
  erb :index
end

get '/circle' do
  erb :circle
end

get '/inputs' do
  erb :inputs
end
