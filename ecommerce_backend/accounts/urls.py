from django.urls import path
from .views import register_user, login_user, logout_user, get_user_data, add_to_cart
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('user/', get_user_data, name='get_user_data'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    # path('api/logout/', logout_user, name='logout'),
]
