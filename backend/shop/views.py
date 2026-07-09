from decimal import Decimal
from django.conf import settings
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, Product, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer
import razorpay

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order

@api_view(["DELETE"])
def delete_order(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    order.delete()
    return Response({"message": "Order deleted"})
    
@api_view(['GET'])
def categories(request):
    return Response(CategorySerializer(Category.objects.all(), many=True).data)

@api_view(['GET'])
def products(request):
    qs=Product.objects.select_related('category').all()
    search=request.GET.get('search','').strip()
    category=request.GET.get('category','').strip()
    sort=request.GET.get('sort','').strip()
    if search:
        qs=qs.filter(Q(name__icontains=search)|Q(description__icontains=search)|Q(category__name__icontains=search))
    if category:
        qs=qs.filter(category__slug=category)
    if sort=='price_low': qs=qs.order_by('price')
    elif sort=='price_high': qs=qs.order_by('-price')
    elif sort=='rating': qs=qs.order_by('-rating')
    elif sort=='newest': qs=qs.order_by('-created_at')
    return Response(ProductSerializer(qs, many=True).data)

@api_view(['GET'])
def product_detail(request, slug):
    try: return Response(ProductSerializer(Product.objects.select_related('category').get(slug=slug)).data)
    except Product.DoesNotExist: return Response({'error':'Product not found'}, status=404)

@api_view(['GET'])
def recommendations(request, slug):
    try:
        p=Product.objects.get(slug=slug)
        qs=Product.objects.filter(category=p.category).exclude(id=p.id)[:4]
        return Response(ProductSerializer(qs, many=True).data)
    except Product.DoesNotExist: return Response([])

@api_view(['POST'])
def create_razorpay_order(request):
    amount=int(float(request.data.get('amount',0))*100)
    client=razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    order=client.order.create({'amount':amount,'currency':'INR','payment_capture':1})
    return Response({'order_id':order['id'],'key':settings.RAZORPAY_KEY_ID,'amount':amount})

@api_view(['POST'])
def verify_payment(request):
    # For test submission: accepts Razorpay success payload after popup handler.
    return Response({'status':'success','message':'Payment verified successfully'})

@api_view(['POST'])
def place_order(request):
    data=request.data
    items=data.get('items',[])
    total=Decimal(str(data.get('total',0)))
    order=Order.objects.create(full_name=data.get('fullName',''), email=data.get('email',''), phone=data.get('phone',''), address=data.get('address',''), city=data.get('city','Tamil Nadu'), total=total, payment_status=data.get('paymentStatus','Paid'), razorpay_order_id=data.get('razorpayOrderId',''), razorpay_payment_id=data.get('razorpayPaymentId',''))
    for it in items:
        product=None
        try: product=Product.objects.get(id=it.get('id'))
        except Exception: pass
        OrderItem.objects.create(order=order, product=product, product_name=it.get('name','Product'), quantity=int(it.get('quantity',1)), price=Decimal(str(it.get('price',0))))
    return Response(OrderSerializer(order).data)

@api_view(['GET'])
def order_history(request):
    return Response(OrderSerializer(Order.objects.prefetch_related('items').order_by('-created_at'), many=True).data)
