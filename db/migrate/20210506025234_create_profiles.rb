# frozen_string_literal: true

class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :name
      t.string :email
      t.text :pk_ciphertext

      t.timestamps
    end
  end
end
