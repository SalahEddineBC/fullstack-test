class Message < ApplicationRecord
    belongs_to :info    
    validates :message_text, presence: true
end
