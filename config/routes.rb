# frozen_string_literal: true

Rails.application.routes.draw do
  root "static#home"

  ActiveAdmin.routes(self)

  match "/*match", to: "static#not_signed_in_404", via: :all, constraints: ->(req) do
    req.path.exclude?("packs") &&
    req.path.exclude?("rails")
  end
end
