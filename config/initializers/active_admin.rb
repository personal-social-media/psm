ActiveAdmin.setup do |config|
  config.comments = false
  config.batch_actions = false
  config.download_links = false

  config.load_paths = [File.expand_path("app/dashboard", Rails.root)]

  config.default_namespace = :dashboard

  config.namespace :dashboard do |dashboard|
    dashboard.site_title_link = "/dashboard"
  end

  config.logout_link_path = nil

  config.localize_format = :long

  # config.footer = ->(_) { render "admin/footer" }
end

ActiveAdminService::LayoutExtension.initial_load