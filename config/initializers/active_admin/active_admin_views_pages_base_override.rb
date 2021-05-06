# frozen_string_literal: true

ActiveAdmin::Views::Pages::Base.class_eval do
  alias_method :default_build_active_admin_head, :build_active_admin_head
  alias_method :default_build_page, :build_page

  def build_active_admin_head(*args)
    app = active_admin_application
    app.clear_javascripts!
    app.clear_stylesheets!

    default_build_active_admin_head(*args)
    within head do
      render "dashboard/customized/custom_head"
    end
  end

  def build_page(*args)
    default_build_page(*args)
    within body do
      render "dashboard/customized/custom_body"
    end
  end
end
