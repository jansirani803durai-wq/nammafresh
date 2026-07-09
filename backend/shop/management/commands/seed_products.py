from django.core.management.base import BaseCommand
from shop.models import Category, Product
from django.utils.text import slugify

CATEGORIES=[
 ('Dairy & Honey','Fresh ghee, milk and hill honey','/images/categories/dairy.png'),('Fresh Fruits','Seasonal fruits from Tamil Nadu farms','/images/categories/fruits.png'),('Fresh Vegetables','Daily fresh vegetables','/images/categories/vegetables.png'),('Millets & Grains','Traditional healthy millets and rice','/images/categories/millets.png'),('Spices & Masala','Aromatic spices and powders','/images/categories/spices.png'),('Snacks & Combos','Healthy snacks and family grocery combos','/images/categories/snacks.png')]
PRODUCTS=[
 ('A2 Cow Ghee','Dairy & Honey','Pure traditional A2 cow ghee for daily cooking.',650,750,'/images/products/ghee.png','1 kg',4.8,30,True,True),
 ('Hill Honey','Dairy & Honey','Natural raw honey sourced from hill regions.',320,399,'/images/products/honey.png','500 g',4.7,40,False,True),
 ('Country Tomato','Fresh Vegetables','Juicy farm fresh tomatoes for curries and salads.',45,60,'/images/products/tomato.png','1 kg',4.5,90,False,True),
 ('Small Onion','Fresh Vegetables','Fresh small onions with strong natural flavor.',70,90,'/images/products/onion.png','1 kg',4.4,80,False,False),
 ('Carrot','Fresh Vegetables','Crunchy orange carrots rich in nutrients.',55,75,'/images/products/carrot.png','1 kg',4.6,70,True,False),
 ('Brinjal','Fresh Vegetables','Tender brinjal for sambar, curry and fry.',48,65,'/images/products/brinjal.png','1 kg',4.3,55,False,False),
 ('Drumstick','Fresh Vegetables','Fresh drumstick, perfect for South Indian sambar.',60,80,'/images/products/drumstick.png','500 g',4.4,50,False,False),
 ('Yelakki Banana','Fresh Fruits','Sweet aromatic bananas for healthy snacking.',75,95,'/images/products/banana.png','1 kg',4.8,60,True,True),
 ('Salem Mango','Fresh Fruits','Naturally sweet mangoes from Tamil Nadu orchards.',160,220,'/images/products/mango.png','1 kg',4.9,45,True,True),
 ('Pomegranate','Fresh Fruits','Ruby red pomegranates packed with freshness.',190,240,'/images/products/pomegranate.png','1 kg',4.7,45,False,False),
 ('Black Pepper','Spices & Masala','Whole black pepper with bold aroma and heat.',180,230,'/images/products/black-pepper.png','250 g',4.8,35,False,True),
 ('Turmeric Powder','Spices & Masala','Bright turmeric powder for cooking and wellness.',90,120,'/images/products/turmeric-powder.png','250 g',4.6,50,False,False),
 ('Red Chilli Powder','Spices & Masala','Spicy red chilli powder for authentic taste.',110,150,'/images/products/red-chilli-powder.png','250 g',4.5,50,False,False),
 ('Ragi Grains','Millets & Grains','Traditional ragi grains for healthy recipes.',95,130,'/images/products/ragi.png','1 kg',4.7,60,False,True),
 ('Thinai Millet','Millets & Grains','Foxtail millet for nutritious meals.',120,160,'/images/products/thinai.png','1 kg',4.6,55,False,False),
 ('Millet Cookies','Snacks & Combos','Crunchy millet cookies made with wholesome grains.',140,180,'/images/products/millet-cookies.png','250 g',4.5,40,True,False),
 ('Banana Chips','Snacks & Combos','Crispy banana chips for evening snacks.',120,150,'/images/products/banana-chips.png','250 g',4.3,40,False,False),
 ('Fresh Combo','Snacks & Combos','Weekly combo pack with fruits and vegetables.',499,650,'/images/products/family-combo.png','1 kg',4.8,25,True,True),
]
class Command(BaseCommand):
    help='Seed NammaFresh products and categories with PNG image paths'
    def handle(self,*args,**kwargs):
        cats={}
        for name,desc,img in CATEGORIES:
            cat,_=Category.objects.update_or_create(slug=slugify(name), defaults={'name':name,'description':desc,'image':img})
            cats[name]=cat
        for name,cat,desc,price,old,image,unit,rating,stock,is_new,is_featured in PRODUCTS:
            Product.objects.update_or_create(slug=slugify(name), defaults={'name':name,'category':cats[cat],'description':desc,'price':price,'old_price':old,'image':image,'unit':unit,'rating':rating,'stock':stock,'is_new':is_new,'is_featured':is_featured})
        self.stdout.write(self.style.SUCCESS('NammaFresh products, categories and PNG paths seeded successfully'))
