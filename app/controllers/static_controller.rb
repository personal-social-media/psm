# frozen_string_literal: true

class StaticController < ApplicationController
  before_action :require_current_user, only: :home
  def home
    redirect_to dashboard_root_path
  end

  def not_signed_in_404
    head 404 unless request.method == "GET"
  end
end
