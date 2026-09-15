// ============================================
// KENNY'S PORK ROLLS — ORDERS DATA
// ============================================

export const ORDER_HISTORY = [
  {
    id: 'KP-20241205-001',
    date: 'Mon, 5 Dec 2024',
    time: '12:34 PM',
    status: 'delivered',
    type: 'delivery',
    items: [
      { name: 'Classic Crispy Pork Roll', qty: 2, price: 12.50 },
      { name: 'Vietnamese Iced Coffee', qty: 2, price: 6.50 },
      { name: 'Prawn Crackers', qty: 1, price: 5.50 },
    ],
    subtotal: 43.50,
    deliveryFee: 4.99,
    tax: 4.35,
    total: 52.84,
    address: '12 Pitt Street, Sydney NSW 2000',
    deliveredAt: '1:02 PM',
  },
  {
    id: 'KP-20241128-003',
    date: 'Tue, 28 Nov 2024',
    time: '7:14 PM',
    status: 'delivered',
    type: 'pickup',
    items: [
      { name: 'The Kenny Box', qty: 1, price: 32.00 },
      { name: 'Crispy Spring Rolls (4pc)', qty: 1, price: 9.00 },
      { name: 'Fresh Lychee Soda', qty: 2, price: 5.50 },
    ],
    subtotal: 52.00,
    deliveryFee: 0,
    tax: 5.20,
    total: 57.20,
    address: null,
    deliveredAt: '7:38 PM',
  },
  {
    id: 'KP-20241120-007',
    date: 'Tue, 20 Nov 2024',
    time: '1:05 PM',
    status: 'delivered',
    type: 'delivery',
    items: [
      { name: 'Crispy Pork Rice Bowl', qty: 1, price: 15.00 },
      { name: 'Spicy Miso Pork Bowl', qty: 1, price: 16.50 },
      { name: 'Coconut Water', qty: 2, price: 4.50 },
    ],
    subtotal: 40.50,
    deliveryFee: 4.99,
    tax: 4.05,
    total: 49.54,
    address: '1 Martin Place, Sydney NSW 2000',
    deliveredAt: '1:41 PM',
  },
  {
    id: 'KP-20241110-012',
    date: 'Sun, 10 Nov 2024',
    time: '6:50 PM',
    status: 'cancelled',
    type: 'delivery',
    items: [
      { name: 'Family Feast Box', qty: 1, price: 68.00 },
    ],
    subtotal: 68.00,
    deliveryFee: 4.99,
    tax: 6.80,
    total: 79.79,
    address: '12 Pitt Street, Sydney NSW 2000',
    deliveredAt: null,
    cancellationReason: 'Driver unavailable in your area',
  },
]

export const FAVOURITE_IDS = ['pr-001', 'rb-001', 'dr-001', 'si-001']

export const SAVED_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    icon: '🏠',
    street: '12 Pitt Street',
    suburb: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    instructions: 'Buzz unit 4B at the entrance',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Work',
    icon: '🏢',
    street: '1 Martin Place',
    suburb: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    instructions: 'Leave at reception — Level 12',
    isDefault: false,
  },
]
