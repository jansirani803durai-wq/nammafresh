# NammaFresh Day 69-70-71 Final Pack

Includes React frontend, Django backend, XAMPP MySQL dynamic products/categories, PNG images, AOS animations, cart, wishlist/favorites, checkout, Razorpay test payment, order history, search debounce, filters, sorting, responsive 330px and 770px.

## Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py seed_products
python manage.py runserver
```

Create database in phpMyAdmin first:

```text
nammafresh_db
```

Start XAMPP Apache and MySQL.

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Razorpay Test

Card: `4100 2800 0000 1007`  
Expiry: `12/30`  
CVV: `123`  
OTP: `123456`

After successful payment, the order is saved in MySQL and visible in Order History.
