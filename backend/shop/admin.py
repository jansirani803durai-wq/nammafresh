from django.contrib import admin
from .models import Category,Product,Order,OrderItem
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin): list_display=('name','slug'); prepopulated_fields={'slug':('name',)}
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin): list_display=('name','category','price','stock','rating'); list_filter=('category','is_featured','is_new'); search_fields=('name','description'); prepopulated_fields={'slug':('name',)}
class OrderItemInline(admin.TabularInline): model=OrderItem; extra=0
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin): list_display=('id','full_name','email','total','payment_status','created_at'); inlines=[OrderItemInline]
