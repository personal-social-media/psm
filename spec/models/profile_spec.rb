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
require "rails_helper"

RSpec.describe Profile, type: :model do
  describe "private #generate_private_key" do
    let(:profile) { build(:profile) }
    subject do
      profile.send(:generate_private_key)
      profile.save!
    end

    it "sets the private_key" do
      subject
      expect(profile.private_key).to be_present
    end
  end
end
