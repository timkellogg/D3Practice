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

get '/inputs_multiple' do
  erb :inputs_multiple
end

get '/multiple_text' do
  erb :multiple_text
end

get '/table_graph' do
  erb :table_graph
end
