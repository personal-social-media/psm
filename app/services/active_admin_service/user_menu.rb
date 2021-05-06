# frozen_string_literal: true

module ActiveAdminService
  class UserMenu
    delegate :url_helpers, to: "Rails.application.routes"
    attr_reader :menu, :dashboard

    def initialize(menu, dashboard)
      @menu = menu
      @dashboard = dashboard
    end

    def call
      return if Profile.current_controller.blank?
      menu.add label: "Profile", url: url_helpers.dashboard_profile_path(1)
    end
  end
end
