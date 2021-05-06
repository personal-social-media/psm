# frozen_string_literal: true

ActiveAdmin.register Profile, namespace: :dashboard, as: "Profile" do
  menu false

  controller do
    skip_before_action :require_current_user, only: %i(new create)
    before_action :can_create_new_profile, only: %i(new create)

    def can_create_new_profile
      return if Profile.count.zero?

      require_current_user_render_template
    end
  end
end
