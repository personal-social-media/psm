# frozen_string_literal: true

module SessionHelperConcern
  extend ActiveSupport::Concern
  included do
    after_action :unset_thread_current_user
    helper_method :current_user, :is_signed_in?
  end

  def current_user
    @current_user ||= Profile.current
  end

  def is_signed_in?
    return @is_signed_in if defined? @is_signed_in
    id = session[:profile_id]
    return @is_signed_in = false if id.nil? || id != current_user.id
    @is_signed_in = true
  end

  def require_current_user
    return set_thread_current_user if is_signed_in?
    require_current_user_render_template
  end

  def require_current_user_render_template
    respond_to do |f|
      f.html { render template: "static/not_signed_in_404", layout: "application" }
    end
  end

  private
    def unset_thread_current_user
      Thread.current[:current_user_controller] = nil
    end

    def set_thread_current_user
      Thread.current[:current_user_controller] = current_user
    end
end
