from django.db import models

class Category(models.Model):
    name=models.CharField(max_length=100, unique=True)
    slug=models.SlugField(unique=True)
    description=models.TextField(blank=True)
    image=models.CharField(max_length=255, blank=True)
    def __str__(self): return self.name

class Product(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='products')
    name=models.CharField(max_length=150)
    slug=models.SlugField(unique=True)
    description=models.TextField()
    price=models.DecimalField(max_digits=10, decimal_places=2)
    old_price=models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image=models.CharField(max_length=255)
    rating=models.FloatField(default=4.5)
    stock=models.PositiveIntegerField(default=50)
    unit=models.CharField(max_length=40, default='1 kg')
    is_new=models.BooleanField(default=False)
    is_featured=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name

class Order(models.Model):
    full_name=models.CharField(max_length=150)
    email=models.EmailField()
    phone=models.CharField(max_length=20)
    address=models.TextField()
    city=models.CharField(max_length=100, default='Tamil Nadu')
    total=models.DecimalField(max_digits=10, decimal_places=2)
    payment_status=models.CharField(max_length=30, default='Pending')
    razorpay_order_id=models.CharField(max_length=255, blank=True)
    razorpay_payment_id=models.CharField(max_length=255, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return f'Order #{self.id} - {self.full_name}'

class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='items')
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    product_name=models.CharField(max_length=150)
    quantity=models.PositiveIntegerField(default=1)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self): return self.product_name
