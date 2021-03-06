class Admin::UsersController < Admin::BaseController
  def index
    @users = User.page params[:page]
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_users_url
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to admin_users_url
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    redirect_to admin_users_url
  end

  def export
    @users = User.all
    respond_to do |format|
      header_string = 'attachment; filename=users' + DateTime.now.to_s(:number) + ".xlsx"
      format.xlsx{  response.headers['Content-Disposition'] = header_string}
    end
  end

  private
    def user_params
      params.require(:user).permit(
        :openid, :avatar, :name, :email,
        :cell, :number, :channel)
    end
end