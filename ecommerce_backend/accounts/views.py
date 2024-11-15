from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Cart, CartItem, Product
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Register a new user.
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        raise ValidationError("All fields are required.")

    if User.objects.filter(username=username).exists():
        raise ValidationError("Username already taken.")

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Log in the user and return JWT tokens.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        raise ValidationError("Username and password are required.")

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "username": user.username,
        "email": user.email,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def logout_user(request):
    """
    Log out the user by blacklisting the provided refresh token.
    """
    try:
        # Get the refresh token from the request body
        refresh_token = request.data.get('refresh')

        # Ensure the refresh token is provided
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Blacklist the refresh token
        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the token so it cannot be used again
        
        return Response({"message": "User logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    """
    Retrieve the logged-in user's data.
    """
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
        "is_staff": user.is_staff,
        "date_joined": user.date_joined,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """
    Add an item to the user's cart.
    """
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    user = request.user

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        raise ValidationError("Product not found.")

    cart, created = Cart.objects.get_or_create(user=user)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    else:
        cart_item.quantity = quantity
        cart_item.save()

    return Response({"message": "Item added to cart successfully."}, status=status.HTTP_200_OK)
