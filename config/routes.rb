Rails.application.routes.draw do
  get 'feedback', to: "feedback#index"
  get 'feedback/new' => 'homepage#index'
  post 'feedback', to: "feedback#create"
  get 'feedback/:id', to: "feedback#show"
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
