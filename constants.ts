
import { type MenuItem } from './types';

const menuData = {
    "🍕 PITSA": [
        {id: "p1", name: "Pizza Pepperoni", price: 70000, img: "https://otash2002.github.io/prezto_pizza_bot/img/peperonni.png"},
        {id: "p2", name: "Pizza Pollo", price: 75000, img: "https://otash2002.github.io/prezto_pizza_bot/img/pollo.png"},
        {id: "p3", name: "Pizza Vetchina", price: 75000, img: "https://avatars.mds.yandex.net/i?id=992fa77708ddfcbc1330a5f3319b0fbc76b7f726-12540459-images-thumbs&n=13"},
        {id: "p4", name: "Pizza Carnoso", price: 85000, img: "https://otash2002.github.io/prezto_pizza_bot/img/pitsagosht.png"},
        {id: "p5", name: "Pizza 4 Type", price: 90000, img: "https://otash2002.github.io/prezto_pizza_bot/img/PITSA4.png"},
        {id: "p6", name: "Presto Pizza", price: 100000, img: "https://otash2002.github.io/prezto_pizza_bot/img/presto.png"}
    ],
    "🌭 HOT-DOG": [
        {id: "h1", name: "Hot-Dog Oddiy", price: 10000, img: "https://avatars.mds.yandex.net/i?id=246aa04abd613e368ee1047ba6e11343f8dbdd57-4232390-images-thumbs&n=13"},
        {id: "h2", name: "Hot-Dog Canada", price: 13000, img: "https://avatars.mds.yandex.net/i?id=8ac48ba30280d094ad7138170f0682688b02ffb1-3518654-images-thumbs&n=13"},
        {id: "h3", name: "Hot-Dog Canada 2x", price: 15000, img: "https://avatars.mds.yandex.net/i?id=fd5199baaaea7dc8b96ce54cbe792c99fe4aba84-5428196-images-thumbs&n=13"},
        {id: "h4", name: "Chicken Hot-Dog", price: 18000, img: "https://avatars.mds.yandex.net/i?id=23f0b7aefdfb8e2573faa243dfdcf6683101d95b-4546582-images-thumbs&n=13"},
        {id: "h5", name: "Go'shtli Hot-Dog", price: 20000, img: "https://avatars.mds.yandex.net/i?id=42e47a6f47445ea019c18e060d2a95409b8a8c3c-4220100-images-thumbs&n=13"}
    ],
    "🥪 SANDWICH": [
        {id: "s1", name: "Sandwich Indeyka", price: 35000, img: "https://otash2002.github.io/prezto_pizza_bot/img/donar.png"},
        {id: "s2", name: "Sandwich Carnoso", price: 40000, img: "https://avatars.mds.yandex.net/i?id=f79ed8924f64c758df6a58b380915e35246f3de4-12514352-images-thumbs&n=13"},
        {id: "s3", name: "Sandwich Pollo", price: 35000, img: "https://avatars.mds.yandex.net/i?id=9072b6b076c7bc84cbe324a854bef8a51ec18209-5679382-images-thumbs&n=13"}
    ],
    "🥙 LAVASH & DONER": [
        {id: "l1", name: "Lavash", price: 25000, img: "https://avatars.mds.yandex.net/i?id=c06f400b649c1e2d323228922c8288bba382d67a-5177173-images-thumbs&n=13"},
        {id: "l2", name: "Lavash Sirli", price: 30000, img: "https://yukber.uz/image/cache/catalog/179ccd00e22-600x600.jpg"},
        {id: "d1", name: "Doner", price: 25000, img: "https://otash2002.github.io/prezto_pizza_bot/img/donarr.png"},
        {id: "f1", name: "Free", price: 18000, img: "https://avatars.mds.yandex.net/i?id=e18c4f8d87c317a827a82b0c8f9e29804b85ef0e-9263927-images-thumbs&n=13"}
    ],
    "🍔 BURGER": [
        {id: "b1", name: "Burger Oddiy", price: 15000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop"},
        {id: "b2", name: "Chizburger", price: 17000, img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop"},
        {id: "b3", name: "Chicken Burger", price: 20000, img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&auto=format&fit=crop"},
        {id: "b4", name: "Double Burger", price: 25000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop"}
    ],
    "🥤 ICHIMLIKLAR": [
        {id: "i1", name: "Choy", price: 5000, img: "https://avatars.mds.yandex.net/i?id=d95b58a3fc4c60cc0e2c29c4e508f9ad8fdaf847-6478260-images-thumbs&n=13"},
        {id: "i2", name: "Limonli Choy", price: 15000, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop"},
        {id: "i3", name: "Kofe Cappuchino", price: 5000, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop"},
        {id: "i4", name: "Kofe 3v1", price: 3000, img: "https://avatars.mds.yandex.net/i?id=1a126b64f56ed01b06a13b2f8a6964ae00981a20-9146178-images-thumbs&n=13"}
    ]
};

export const MENU_ITEMS: MenuItem[] = Object.entries(menuData).flatMap(([category, items]) => 
  items.map(item => ({
    id: item.id,
    name: item.name,
    description: '', // Removed description
    price: item.price,
    imageUrl: item.img,
    category: category,
  }))
);
