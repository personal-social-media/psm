class StaticController < ApplicationController
  def not_signed_in_404
    head 404 unless request.method == "GET"
  end
end