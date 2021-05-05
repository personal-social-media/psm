module ActiveAdminService
  class LayoutExtension
    def self.initial_load; end

    def self.load
      layout_override = Module.new do
        def build_active_admin_head
          within super do
            render "dashboard/customized/custom_head"
          end
        end

        def build_page
          within super do
            render "dashboard/customized/custom_body"
          end
        end
      end

      ActiveAdmin::Views::Pages::Base.send :prepend, layout_override
    end
  end
end
ActiveAdminService::LayoutExtension.load