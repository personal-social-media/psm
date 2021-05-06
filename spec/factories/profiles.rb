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
FactoryBot.define do
  factory :profile do
    name { "MyString" }
    email { "MyString" }
  end
end
