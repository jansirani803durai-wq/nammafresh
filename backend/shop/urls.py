from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories),
    path('products/', views.products),
    path('products/<slug:slug>/', views.product_detail),
    path('recommendations/<slug:slug>/', views.recommendations),
    path('orders/history/', views.order_history),

    path(
        'orders/<int:pk>/delete/',
        views.delete_order,
        name='delete_order'
    ),

    path('orders/place/', views.place_order),
    path('razorpay/create-order/', views.create_razorpay_order),
    path('razorpay/verify/', views.verify_payment),
]