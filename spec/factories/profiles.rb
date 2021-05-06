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
FactoryBot.define do
  factory :profile do
    name { "MyString" }
    email { "MyString" }
    master_password { SecureRandom.hex }
    pin { "000000" }
  end
end
