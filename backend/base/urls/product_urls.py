from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('create/', views.createProduct, name='product-create'),
    path('upload', views.uploadImage, name='image-upload'),
    path('<id>/reviews/', views.createProductReview, name='create-review'),
    path('<id>/', views.getProduct, name='product'),
    path('update/<id>/', views.updateProduct, name='product-update'),
    path('delete/<id>/', views.deleteProduct, name='product-delete'),
]
