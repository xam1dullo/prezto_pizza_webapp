# TELEGRAM BOT BACKEND - TEXNIK TOPSHIRIQ

## LOYIHA HAQIDA
Pizza ordering web app uchun Telegram bot backend yaratish. Web appdan kelgan buyurtmalarni qabul qilish va admin bilan bog'lash.

## BOT FUNKSIYALARI

### 1. BUYURTMA QABUL QILISH
- **Start Command**: `/start` va `startapp` parametr bilan buyurtma ma'lumotlarini qabul qilish
- **Query Format**: `Pizza%20Pepperoni=2&Burger%20Oddiy=1&Hot-Dog%20Canada=3`
- **Decoded Format**: `Pizza Pepperoni=2&Burger Oddiy=1&Hot-Dog Canada=3`

### 2. BUYURTMA MA'LUMOTLARINI PARSE QILISH
```python
import urllib.parse

def parse_order_data(start_param):
    # URL decode qilish
    decoded = urllib.parse.unquote(start_param)

    # Query stringni parse qilish
    parsed = urllib.parse.parse_qs(decoded)

    # Buyurtma listini yaratish
    order_items = []
    for product_name, quantity_list in parsed.items():
        quantity = int(quantity_list[0])
        order_items.append({
            'product': product_name,
            'quantity': quantity
        })

    return order_items
```

### 3. MIJOZ MA'LUMOTLARINI YOPLASH
- Telefon raqamini so'rash
- Manzilni so'rash (ixtiyoriy)
- Izohni so'rash (ixtiyoriy)

### 4. ADMIN UCHUN BUYURTMA YUBORISH
```
🍕 YANGI BUYURTMA #1234

👤 Mijoz: @username
📞 Telefon: +998 90 123 45 67
📍 Manzil: Toshkent shahar...

📦 BUYURTMA:
• Pizza Pepperoni - 2ta
• Burger Oddiy - 1ta
• Hot-Dog Canada - 3ta

💰 JAMI: 155,000 so'm

⏰ Vaqt: 2024-01-30 15:30

[✅ Qabul] [❌ Rad etish]
```

### 5. BUYURTMA HOLATI
- Mijozga buyurtma qabul qilinganligi haqida xabar
- Admin javobiga qarab holat o'zgartirish
- Tayyor bo'lganda mijozga xabar

## TEXNIK TALABLAR

### KERAKLI KUTUBXONALAR
```python
import telebot
import urllib.parse
import datetime
import json
import sqlite3  # yoki PostgreSQL
```

### MA'LUMOTLAR BAZASI STRUKTURASI
```sql
-- Buyurtmalar jadvali
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    username TEXT,
    phone TEXT,
    address TEXT,
    comment TEXT,
    order_data TEXT,  -- JSON format
    total_amount INTEGER,
    status TEXT DEFAULT 'pending',  -- pending, accepted, rejected, completed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Buyurtma elementlari jadvali
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_name TEXT,
    quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES orders (id)
);
```

### BOT KONFIGURATSIYA
```python
BOT_TOKEN = "your_bot_token_here"
ADMIN_CHAT_ID = "admin_telegram_id"  # yoki group chat ID
```

## BOT WORKFLOW

### 1. START COMMAND HANDLER
```python
@bot.message_handler(commands=['start'])
def start_handler(message):
    # startapp parametrini olish
    if message.text.startswith('/start '):
        start_param = message.text.split(' ', 1)[1]

        # Buyurtma ma'lumotlarini parse qilish
        order_items = parse_order_data(start_param)

        # Mijozdan telefon so'rash
        request_phone_number(message.chat.id, order_items)
    else:
        # Oddiy start command
        bot.send_message(message.chat.id, "Assalomu alaykum! Buyurtma berish uchun web appdan foydalaning.")
```

### 2. TELEFON RAQAM SO'RASH
```python
def request_phone_number(chat_id, order_items):
    markup = types.ReplyKeyboardMarkup(one_time_keyboard=True, resize_keyboard=True)
    button = types.KeyboardButton("📞 Telefon raqamni yuborish", request_contact=True)
    markup.add(button)

    # Buyurtma ma'lumotlarini ko'rsatish
    order_text = format_order_preview(order_items)

    bot.send_message(chat_id,
        f"Buyurtmangiz:\n{order_text}\n\n"
        "Davom etish uchun telefon raqamingizni yuboring:",
        reply_markup=markup)
```

### 3. KONTAKT HANDLER
```python
@bot.message_handler(content_types=['contact'])
def contact_handler(message):
    phone = message.contact.phone_number
    user_id = message.from_user.id
    username = message.from_user.username

    # Buyurtmani ma'lumotlar bazasiga saqlash
    order_id = save_order_to_db(user_id, username, phone, cached_order_items)

    # Adminga yuborish
    send_order_to_admin(order_id)

    # Mijozga tasdiqlash
    bot.send_message(message.chat.id,
        "✅ Buyurtmangiz qabul qilindi! Admin tez orada siz bilan bog'lanadi.",
        reply_markup=types.ReplyKeyboardRemove())
```

### 4. ADMIN INLINE KEYBOARD
```python
def create_admin_keyboard(order_id):
    keyboard = types.InlineKeyboardMarkup()
    accept_btn = types.InlineKeyboardButton("✅ Qabul qilish",
                                           callback_data=f"accept_{order_id}")
    reject_btn = types.InlineKeyboardButton("❌ Rad etish",
                                           callback_data=f"reject_{order_id}")
    keyboard.row(accept_btn, reject_btn)
    return keyboard
```

### 5. CALLBACK HANDLER
```python
@bot.callback_query_handler(func=lambda call: True)
def callback_handler(call):
    action, order_id = call.data.split('_')

    if action == 'accept':
        # Buyurtma holatini o'zgartirish
        update_order_status(order_id, 'accepted')

        # Mijozga xabar
        notify_customer(order_id, "✅ Buyurtmangiz qabul qilindi! Tez orada tayyor bo'ladi.")

        # Admin xabarini tahrirlash
        bot.edit_message_text(
            f"{call.message.text}\n\n✅ QABUL QILINDI",
            chat_id=call.message.chat.id,
            message_id=call.message.message_id
        )

    elif action == 'reject':
        # Buyurtma rad etish
        update_order_status(order_id, 'rejected')
        notify_customer(order_id, "❌ Kechirasiz, buyurtmangiz rad etildi.")
```

## QOshimcha FUNKSIYALAR

### 1. BUYURTMA HISOBOTI
```python
@bot.message_handler(commands=['stats'])
def stats_handler(message):
    # Faqat admin uchun
    if message.from_user.id == ADMIN_CHAT_ID:
        today_orders = get_today_orders_count()
        total_revenue = get_today_revenue()

        bot.send_message(message.chat.id,
            f"📊 Bugungi statistika:\n"
            f"Buyurtmalar: {today_orders}\n"
            f"Daromad: {total_revenue:,} so'm")
```

### 2. BUYURTMALARNI KO'RISH
```python
@bot.message_handler(commands=['orders'])
def orders_handler(message):
    # Faqat admin uchun
    if message.from_user.id == ADMIN_CHAT_ID:
        pending_orders = get_pending_orders()
        for order in pending_orders:
            send_order_to_admin(order['id'])
```

## ISHGA TUSHIRISH

### 1. ENVIRONMENT O'ZGARUVCHILARI
```bash
BOT_TOKEN=your_telegram_bot_token
ADMIN_CHAT_ID=your_admin_telegram_id
DATABASE_URL=sqlite:///orders.db
```

### 2. BOT ISHGA TUSHIRISH
```python
if __name__ == "__main__":
    # Ma'lumotlar bazasini yaratish
    init_database()

    # Botni ishga tushirish
    print("Bot ishga tushdi...")
    bot.polling(none_stop=True)
```

## XAVFSIZLIK

1. **Admin tekshiruvi** - Faqat admin ID orqali boshqarish komandalariga ruxsat
2. **Ma'lumotlar validatsiyasi** - Kiruvchi ma'lumotlarni tekshirish
3. **Rate limiting** - Spam oldini olish
4. **Error handling** - Xatoliklarni boshqarish

## DEPLOY QILISH

1. **VPS/Cloud server** - Ubuntu 20.04+
2. **Python 3.8+** va kerakli kutubxonalar
3. **systemd service** - Bot avtomatik ishga tushishi uchun
4. **nginx** - webhook uchun (ixtiyoriy)
5. **SSL certificate** - webhook uchun kerak

Bu TZ bo'yicha bot to'liq ishlaydi va web app bilan integratsiya qiladi.