# == Schema Information
#
# Table name: profiles
#
#  id            :bigint           not null, primary key
#  email         :string
#  name          :string
#  pk_ciphertext :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Profile < ApplicationRecord
  encrypts :pk, type: :binary
  before_validation :pk, on: :create

  def private_key
    @private_key ||= RbNaCl::PrivateKey.new(pk)
  end

  private

  def generate_private_key
    self.pk ||= ProfilesService::CreateNewPrivateKey.new.call
  end
end
