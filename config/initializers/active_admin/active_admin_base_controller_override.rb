# frozen_string_literal: true

ActiveAdmin::BaseController.class_eval do
  include SessionHelperConcern

  rescue_from ActiveRecord::RecordNotFound, with: :redirect_to_root_not_found
  rescue_from AbstractController::ActionNotFound, with: :redirect_no_action if Rails.env.production?
  before_action :require_current_user
end
