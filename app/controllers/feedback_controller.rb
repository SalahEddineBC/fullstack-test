class FeedbackController < ApplicationController
  def index
    per_page = params[:n]
    page = params[:p]
    @messages = Message.joins(:info).select("messages.*, infos.*").all.order(created_at: :desc)
    # if we have pagination parameters, we use them 
    if per_page and page 
      @messages=@messages.paginate(page: page.to_i, per_page: per_page.to_i) 
      return render json: {data:@messages,meta: {
          total_pages: @messages.total_pages,
          total_count: @messages.count,
          page: page}
      }
    else
      #we render everything
      return render json:{data:@messages}
    end
  end

  def create
    email = feebdack_params[:uid]
    f_name = feebdack_params[:first_name]
    l_name = feebdack_params[:last_name]
    message=feebdack_params[:message_text]
    #check if email exists
    @info = Info.find_by(uid: email)
    if @info.nil?
      #if email doesn't exist, we create a new one
      @info = Info.new(uid:email,first_name:f_name,last_name:l_name)
      if !@info.save
       return  render json: @info.errors, status: :unprocessable_entity
      end
    else
      #if email exists, we update it
      if !@info.update(first_name:f_name,last_name:l_name)
        return  render json: @info.errors, status: :unprocessable_entity
      end
    end
      # we create a message and save it 
      @message = Message.new(message_text:message,info_id:@info.id)
      if @message.save
        render json: {message:"created"}, status: :created
      else
        p @message.errors
        render json: @message.errors, status: :unprocessable_entity
      end
    
  end

  def show
    if message
      render json: message
    else
      render json: {message:"not found"}, status: :not_found
    end
  end

  private

  def feebdack_params
    params.require(:feedback).permit(
        :uid,
        :last_name,
        :first_name,
        :message_text 
      )
  end

  def message
    @message ||= Message.joins(:info).select("messages.*, infos.*").find_by(id:params[:id])
  end
end
