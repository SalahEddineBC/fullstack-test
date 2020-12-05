class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :message_text
      t.integer :info_id
      t.timestamps
    end
  end
end
