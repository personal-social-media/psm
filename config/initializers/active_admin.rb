# frozen_string_literal: true

ActiveAdmin.setup do |config|
  config.comments = false
  config.batch_actions = false
  config.download_links = false

  config.load_paths = [File.expand_path("app/dashboard", Rails.root)]

  config.default_namespace = :dashboard

  config.namespace :dashboard do |dashboard|
    dashboard.site_title_link = "/dashboard"

    dashboard.build_menu :utility_navigation do |menu|
      ActiveAdminService::UserMenu.new(menu, dashboard).call
    end
  end

  config.logout_link_path = nil

  config.localize_format = :long
end
