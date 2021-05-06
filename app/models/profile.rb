# frozen_string_literal: true

# == Schema Information
#
# Table name: profiles
#
#  id                     :bigint           not null, primary key
#  email                  :string
#  master_password_digest :text             not null
#  name                   :string
#  pin_digest             :string           not null
#  pk_ciphertext          :text
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class Profile < ApplicationRecord
  encrypts :pk, type: :binary
  has_secure_password :master_password, validations: false
  has_secure_password :pin, validations: false
  before_validation :pk, on: :create

  class << self
    def current
      Thread.current[:current_user] ||= Profile.first
    end

    def current_controller
      Thread.current[:current_user_controller]
    end
  end

  def private_key
    @private_key ||= RbNaCl::PrivateKey.new(pk)
  end

  private
    def generate_private_key
      self.pk ||= ProfilesService::CreateNewPrivateKey.new.call
    end
end
