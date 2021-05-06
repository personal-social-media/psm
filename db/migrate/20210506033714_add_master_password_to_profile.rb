class AddMasterPasswordToProfile < ActiveRecord::Migration[6.1]
  def change
    change_table :profiles do |t|
      t.column :master_password_digest, :text, null: false
      t.column :pin_digest, :string, null: false
    end
  end
end
