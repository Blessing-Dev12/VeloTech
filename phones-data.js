const phonesData = [
  // ===== APPLE =====
  {
    id: "iphone-17",
    brand: "apple",
    name: "Apple iPhone 17",
    price: 19999,
    oldPrice: 22999,
    rating: 4.8,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200",
    badge: "-13%",
    description: "The iPhone 17 brings the powerful A19 chip, a stunning 6.3-inch Super Retina XDR display, and an advanced dual-camera system to the base model. With iOS 26 and Apple Intelligence, it's the smartest iPhone yet.",
    specs: {
      Display: "6.3-inch Super Retina XDR, 120Hz ProMotion",
      Chip: "A19 chip with 6-core CPU",
      Camera: "48MP Fusion Main + 12MP Ultra Wide",
      Front: "18MP Center Stage camera",
      Battery: "Up to 30 hours video playback",
      Storage: "256GB / 512GB",
      OS: "iOS 26 with Apple Intelligence",
      Water: "IP68 water and dust resistant"
    },
    features: [
      "A19 chip delivers blazing-fast performance",
      "48MP Fusion camera with 2x optical-quality zoom",
      "18MP Center Stage front camera for perfect selfies",
      "All-day battery life with fast charging",
      "Apple Intelligence for smarter everyday tasks",
      "Durable Ceramic Shield front cover"
    ]
  },
  {
    id: "iphone-17-pro",
    brand: "apple",
    name: "Apple iPhone 17 Pro",
    price: 24999,
    oldPrice: 27999,
    rating: 4.9,
    reviews: 528,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200",
    badge: "-11%",
    description: "The iPhone 17 Pro is the most powerful Pro model yet, featuring three 48MP Fusion cameras, the A19 Pro chip, and a stunning 6.3-inch ProMotion display. Built for creators and professionals.",
    specs: {
      Display: "6.3-inch Super Retina XDR, 120Hz ProMotion, 3000 nits",
      Chip: "A19 Pro with vapor chamber cooling",
      Camera: "Triple 48MP (Main, Ultra Wide, Telephoto)",
      Zoom: "8x optical zoom at 200mm, 40x digital",
      Front: "18MP Center Stage with Dual Capture",
      Battery: "Up to 33 hours video playback",
      Storage: "256GB / 512GB / 1TB / 2TB",
      OS: "iOS 26 with Apple Intelligence"
    },
    features: [
      "Three 48MP Fusion cameras for pro-level photography",
      "8x optical zoom - the longest ever on iPhone",
      "A19 Pro chip with vapor chamber for sustained performance",
      "ProRes RAW and Log 2 video support",
      "Genlock support for multi-camera productions",
      "Heat-forged aluminum unibody design"
    ]
  },
  {
    id: "iphone-17-pro-max",
    brand: "apple",
    name: "Apple iPhone 17 Pro Max",
    price: 29999,
    oldPrice: 33999,
    rating: 4.9,
    reviews: 891,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200",
    badge: "-12%",
    description: "The ultimate iPhone. With a massive 6.9-inch display, the longest battery life ever in an iPhone, and the most advanced camera system Apple has ever made, the 17 Pro Max is the pinnacle of smartphone technology.",
    specs: {
      Display: "6.9-inch Super Retina XDR, 120Hz ProMotion, 3000 nits",
      Chip: "A19 Pro with vapor chamber cooling",
      Camera: "Triple 48MP (Main, Ultra Wide, Telephoto)",
      Zoom: "8x optical zoom at 200mm, 40x digital",
      Front: "18MP Center Stage with Dual Capture",
      Battery: "Up to 39 hours video playback (eSIM)",
      Storage: "256GB / 512GB / 1TB / 2TB",
      OS: "iOS 26 with Apple Intelligence"
    },
    features: [
      "Largest iPhone display ever at 6.9 inches",
      "Best battery life ever in an iPhone",
      "Triple 48MP camera system with 8x optical zoom",
      "A19 Pro chip - the fastest smartphone chip",
      "ProRes RAW video for professional workflows",
      "Cosmic Orange, Deep Blue, and Silver finishes"
    ]
  },
  {
    id: "iphone-air",
    brand: "apple",
    name: "Apple iPhone Air",
    price: 22999,
    oldPrice: 24999,
    rating: 4.7,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200",
    badge: "-8%",
    description: "The thinnest iPhone ever made. At just 5.6mm and 165 grams, the iPhone Air doesn't compromise on power - it packs the A19 Pro chip and a stunning 6.5-inch display into an impossibly slim titanium frame.",
    specs: {
      Display: "6.5-inch Super Retina XDR, 120Hz ProMotion",
      Thickness: "5.6mm - thinnest iPhone ever",
      Weight: "165 grams",
      Chip: "A19 Pro chip with 5-core GPU",
      Camera: "48MP Fusion Main with 2x Telephoto",
      Front: "18MP Center Stage camera",
      Battery: "Up to 27 hours video playback",
      Storage: "256GB / 512GB / 1TB"
    },
    features: [
      "Thinnest iPhone ever at just 5.6mm",
      "Polished titanium frame for durability",
      "A19 Pro chip with Neural Accelerators",
      "48MP Fusion camera system",
      "Most power-efficient iPhone ever",
      "Ceramic Shield 2 front and back"
    ]
  },
  {
    id: "iphone-18-pro",
    brand: "apple",
    name: "Apple iPhone 18 Pro",
    price: 32999,
    oldPrice: 35999,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200",
    badge: "-8%",
    description: "The future of iPhone is here. The iPhone 18 Pro introduces a revolutionary variable aperture camera system, the A20 Pro chip, and iOS 27 with next-generation Apple Intelligence. Available for pre-order now.",
    specs: {
      Display: "6.3-inch Super Retina XDR, 120Hz ProMotion",
      Chip: "A20 Pro chip",
      Camera: "48MP Fusion with variable aperture",
      Aperture: "Manual f/1.4 to f/4.0 control",
      Front: "18MP Center Stage camera",
      Battery: "All-day battery with fast charging",
      Storage: "256GB / 512GB / 1TB / 2TB",
      OS: "iOS 27 with Apple Intelligence"
    },
    features: [
      "World's first variable aperture on iPhone",
      "A20 Pro chip - the fastest ever",
      "Pro-level camera controls with histogram",
      "Apple Reference Image for photo verification",
      "New burgundy and glacier color options",
      "Pre-order now, ships September 18"
    ]
  },

  // ===== SAMSUNG =====
  {
    id: "galaxy-s26-ultra",
    brand: "samsung",
    name: "Samsung Galaxy S26 Ultra",
    price: 34999,
    oldPrice: 39999,
    rating: 4.8,
    reviews: 623,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200",
    badge: "-13%",
    description: "The Galaxy S26 Ultra is an absolute powerhouse. With a 200MP camera, 6.9-inch Dynamic AMOLED display, S Pen support, and the Snapdragon 8 Elite Gen 5 processor, it redefines what a smartphone can do.",
    specs: {
      Display: "6.9-inch Dynamic AMOLED 2X, 120Hz",
      Processor: "Snapdragon 8 Elite Gen 5 for Galaxy",
      Camera: "200MP Main + 50MP Ultra Wide + 12MP Telephoto",
      Zoom: "3x and 5x optical, 100x digital",
      Battery: "5,000 mAh with 65W fast charging",
      Storage: "256GB / 512GB / 1TB",
      S_Pen: "Built-in S Pen with low latency",
      OS: "Android 15 with One UI 7"
    },
    features: [
      "200MP camera - DSLR quality in your pocket",
      "Snapdragon 8 Elite Gen 5 processor",
      "Built-in S Pen for productivity and creativity",
      "6.9-inch Dynamic AMOLED 2X display",
      "5,000 mAh battery lasts up to 2 days",
      "Galaxy AI features for smarter workflows"
    ]
  },
  {
    id: "galaxy-s26",
    brand: "samsung",
    name: "Samsung Galaxy S26",
    price: 18999,
    oldPrice: 21999,
    rating: 4.7,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200",
    badge: "-14%",
    description: "The Galaxy S26 delivers flagship performance in a compact package. With a 6.3-inch Dynamic AMOLED display, Snapdragon 8 Elite Gen 5 processor, and a versatile triple camera system.",
    specs: {
      Display: "6.3-inch Dynamic AMOLED 2X, 120Hz, FHD+",
      Processor: "Snapdragon 8 Elite Gen 5 for Galaxy",
      Camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
      Zoom: "3x optical, 30x digital",
      Battery: "4,000 mAh",
      Storage: "256GB / 512GB",
      Memory: "12GB RAM",
      OS: "Android 15 with One UI 7"
    },
    features: [
      "Compact 6.3-inch flagship experience",
      "Snapdragon 8 Elite Gen 5 performance",
      "50MP triple camera system",
      "12GB RAM for smooth multitasking",
      "Galaxy AI features built-in",
      "7 years of OS and security updates"
    ]
  },
  {
    id: "galaxy-z-fold8",
    brand: "samsung",
    name: "Samsung Galaxy Z Fold 8",
    price: 44999,
    oldPrice: 49999,
    rating: 4.6,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200",
    badge: "-10%",
    description: "The Galaxy Z Fold 8 is Samsung's most advanced foldable yet. With a massive 7.6-inch inner display, dual 50MP cameras, and refined S Pen support, it's a tablet and phone in one.",
    specs: {
      Display: "7.6-inch Dynamic AMOLED 2X, 120Hz (inner)",
      Cover_Display: "5.5-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Elite Gen 5",
      Camera: "Dual 50MP (Main + Ultra Wide)",
      Front: "10MP + 10MP cover camera",
      Battery: "4,400 mAh",
      Storage: "256GB / 512GB / 1TB",
      OS: "Android 15 with One UI 7"
    },
    features: [
      "7.6-inch foldable display for tablet-like experience",
      "Dual 50MP camera system",
      "S Pen support for productivity",
      "Snapdragon 8 Elite Gen 5 performance",
      "Multi-window and Flex Mode capabilities",
      "Premium build with IPX8 water resistance"
    ]
  },
  {
    id: "galaxy-z-flip8",
    brand: "samsung",
    name: "Samsung Galaxy Z Flip 8",
    price: 27999,
    oldPrice: 31999,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200",
    badge: "-13%",
    description: "The Galaxy Z Flip 8 is the ultimate style statement. With a 6.9-inch foldable display, a large 4.1-inch cover screen, and dual 50MP cameras, it's compact, powerful, and head-turning.",
    specs: {
      Display: "6.9-inch Dynamic AMOLED 2X, 120Hz (inner)",
      Cover_Display: "4.1-inch Super AMOLED",
      Processor: "Snapdragon 8 Elite Gen 5",
      Camera: "50MP Main + 12MP Ultra Wide",
      Front: "10MP",
      Battery: "4,000 mAh",
      Storage: "256GB / 512GB",
      OS: "Android 15 with One UI 7"
    },
    features: [
      "Iconic flip design that fits in your pocket",
      "Large 4.1-inch cover screen for quick tasks",
      "Dual 50MP rear cameras with OIS",
      "Flex Mode for hands-free photos and video",
      "Snapdragon 8 Elite Gen 5 performance",
      "IPX8 water resistance"
    ]
  },
  {
    id: "galaxy-a17-5g",
    brand: "samsung",
    name: "Samsung Galaxy A17 5G",
    price: 4999,
    oldPrice: 5999,
    rating: 4.3,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200",
    badge: "-17%",
    description: "The Galaxy A17 5G brings 5G connectivity, a large 6.7-inch display, and a versatile triple camera system at an unbeatable price. Perfect for everyday use with 6 years of security updates.",
    specs: {
      Display: "6.7-inch Super AMOLED, 90Hz, FHD+",
      Processor: "Octa-core",
      Camera: "50MP Main + 5MP Ultra Wide + 2MP Macro",
      Front: "13MP",
      Battery: "5,000 mAh",
      Storage: "128GB (expandable via microSD up to 2TB)",
      Memory: "8GB RAM",
      OS: "Android 15 with One UI 7"
    },
    features: [
      "Affordable 5G connectivity",
      "6.7-inch Super AMOLED display",
      "50MP triple camera system",
      "Expandable storage up to 2TB",
      "6 years of OS and security updates",
      "5,000 mAh battery for all-day use"
    ]
  },

  // ===== GOOGLE =====
  {
    id: "pixel-10-pro",
    brand: "google",
    name: "Google Pixel 10 Pro",
    price: 26999,
    oldPrice: 29999,
    rating: 4.8,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200",
    badge: "-10%",
    description: "The Pixel 10 Pro is Google's most advanced phone yet. With the Tensor G5 chip, a stunning 6.7-inch LTPO display, and a professional-grade camera system, it's the smartest Pixel ever.",
    specs: {
      Display: "6.7-inch LTPO OLED, 120Hz",
      Processor: "Google Tensor G5",
      Camera: "50MP Main + 48MP Telephoto + 48MP Ultra Wide",
      Zoom: "5x optical, 30x Super Res Zoom",
      Front: "42MP",
      Battery: "5,050 mAh with 45W fast charging",
      Storage: "128GB / 256GB / 512GB / 1TB",
      OS: "Android 16 with Gemini AI"
    },
    features: [
      "Tensor G5 chip with Gemini AI built-in",
      "Professional triple camera system",
      "5x optical zoom with 30x Super Res",
      "7 years of OS and security updates",
      "Magic Eraser, Best Take, and Audio Magic Eraser",
      "IP68 water and dust resistance"
    ]
  },
  {
    id: "pixel-10a",
    brand: "google",
    name: "Google Pixel 10a",
    price: 10999,
    oldPrice: 12999,
    rating: 4.6,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200",
    badge: "-15%",
    description: "The Pixel 10a brings Google's advanced AI features and amazing camera system to an affordable price. With the Tensor G4 chip, 48MP camera, and 7 years of updates, it's incredible value.",
    specs: {
      Display: "6.3-inch Actua display, 120Hz",
      Processor: "Google Tensor G4",
      Camera: "48MP Main + 13MP Ultra Wide",
      Front: "13MP",
      Battery: "4,500 mAh, 30+ hours",
      Storage: "128GB / 256GB",
      OS: "Android 16 with Gemini AI",
      Water: "IP68 water and dust resistant"
    },
    features: [
      "Google Tensor G4 with Gemini AI",
      "48MP camera with Night Sight",
      "7 years of OS and security updates",
      "Auto Best Take for group photos",
      "Camera Coach for better photography",
      "Satellite SOS trial included"
    ]
  },
  {
    id: "pixel-11-pro-fold",
    brand: "google",
    name: "Google Pixel 11 Pro Fold",
    price: 39999,
    oldPrice: 43999,
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200",
    badge: "-9%",
    description: "The Pixel 11 Pro Fold is Google's most sophisticated foldable yet. With the Tensor G6 chip, dual 20% brighter displays, and a revolutionary gearless hinge, it's the future of foldables.",
    specs: {
      Display: "8.0-inch Super Actua Flex (inner)",
      Cover_Display: "6.3-inch Super Actua",
      Processor: "Google Tensor G6",
      RAM: "16GB",
      Camera: "48MP Main + 48MP Telephoto",
      Zoom: "30x Super Zoom",
      Battery: "24+ hours, 30W wired, 25W wireless",
      Storage: "256GB / 512GB / 1TB"
    },
    features: [
      "Most durable Pixel Fold ever",
      "IP68 water and dust resistance",
      "HiLight LED notifications around camera",
      "Gearless hinge for smooth folding",
      "20% brighter displays than last gen",
      "Gemini AI optimized for foldables"
    ]
  },

  // ===== OTHER =====
  {
    id: "oneplus-13",
    brand: "other",
    name: "OnePlus 13",
    price: 22999,
    oldPrice: 25999,
    rating: 4.8,
    reviews: 534,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",
    badge: "-12%",
    description: "The OnePlus 13 is a performance monster. With the Snapdragon 8 Elite chip, a stunning 6.82-inch 120Hz ProXDR display, and a massive 6,000 mAh battery with 100W charging.",
    specs: {
      Display: "6.82-inch QHD+ ProXDR, 120Hz LTPO 4.1",
      Processor: "Snapdragon 8 Elite",
      Camera: "50MP Main + 50MP Telephoto + 50MP Ultra Wide",
      Zoom: "3x optical, 120x digital",
      Battery: "6,000 mAh with 100W SUPERVOOC",
      Storage: "256GB / 512GB UFS 4.0",
      RAM: "12GB / 16GB LPDDR5X",
      OS: "OxygenOS 15 based on Android 15"
    },
    features: [
      "Snapdragon 8 Elite for flagship performance",
      "6,000 mAh battery with 100W fast charging",
      "50MP triple Hasselblad camera system",
      "120Hz ProXDR display with 4500 nits peak",
      "IP68/IP69 water and dust resistance",
      "80W wireless AIRVOOC charging"
    ]
  },
  {
    id: "oppo-find-x9-ultra",
    brand: "other",
    name: "Oppo Find X9 Ultra",
    price: 37999,
    oldPrice: 42999,
    rating: 4.9,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",
    badge: "-12%",
    description: "The Oppo Find X9 Ultra is a camera powerhouse. With a 200MP main camera, 10x optical zoom, and Hasselblad tuning, it pushes mobile photography to new heights. Plus a 7050 mAh battery.",
    specs: {
      Display: "6.82-inch QHD+ AMOLED, 144Hz",
      Processor: "Snapdragon 8 Elite Gen 5",
      Camera: "200MP Main + 200MP Telephoto + 50MP Ultra Telephoto",
      Zoom: "10x optical (230mm), 30x digital",
      Battery: "7,050 mAh with 100W wired, 50W wireless",
      Storage: "512GB / 1TB UFS 4.1",
      RAM: "12GB / 16GB LPDDR5X",
      OS: "ColorOS based on Android 15"
    },
    features: [
      "200MP main camera with Hasselblad tuning",
      "Industry-first 10x optical zoom telephoto",
      "7,050 mAh silicon-carbon battery",
      "144Hz QHD+ AMOLED display",
      "8K video recording at 30fps",
      "3D Cryo-velocity cooling system"
    ]
  },
  {
    id: "honor-magic-v5",
    brand: "other",
    name: "Honor Magic V5",
    price: 32999,
    oldPrice: 37999,
    rating: 4.7,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",
    badge: "-13%",
    description: "The Honor Magic V5 is the world's thinnest foldable at just 8.8mm folded. With Snapdragon 8 Elite, a massive 7.95-inch inner display, and 5000 nits peak brightness.",
    specs: {
      Display: "7.95-inch foldable OLED (inner)",
      Cover_Display: "6.43-inch OLED",
      Thickness: "8.8mm folded, 4.1mm unfolded",
      Processor: "Snapdragon 8 Elite",
      Camera: "50MP Wide + 50MP Ultra Wide + 64MP Telephoto",
      Zoom: "3x optical, 100x digital",
      Battery: "5,820 mAh with 66W wired, 50W wireless",
      Storage: "512GB",
      RAM: "16GB"
    },
    features: [
      "World's thinnest foldable at 8.8mm",
      "5000 nits HDR peak brightness",
      "Snapdragon 8 Elite performance",
      "64MP periscope telephoto camera",
      "AI Defocus Display for eye comfort",
      "MagicOS 9.0.1 with Android 15"
    ]
  },
  {
    id: "motorola-razr-50-ultra",
    brand: "other",
    name: "Motorola Razr 50 Ultra",
    price: 16999,
    oldPrice: 19999,
    rating: 4.5,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",
    badge: "-15%",
    description: "The Motorola Razr 50 Ultra brings the iconic flip phone into the modern era. With a 6.9-inch 165Hz display, a 4-inch cover screen, and dual 50MP cameras, it's stylish and powerful.",
    specs: {
      Display: "6.9-inch LTPO AMOLED, 165Hz",
      Cover_Display: "4.0-inch, 1272x1080",
      Processor: "Snapdragon 8s Gen 3",
      Camera: "50MP Main + 50MP Telephoto",
      Front: "32MP",
      Battery: "4,000 mAh with 45W wired, 15W wireless",
      Storage: "256GB / 512GB UFS 4.0",
      RAM: "8GB / 12GB",
      OS: "Android 14 with Hello UI"
    },
    features: [
      "Iconic flip design with largest cover display",
      "165Hz refresh rate for smooth scrolling",
      "Dual 50MP cameras with 2x optical zoom",
      "IPX8 water resistance",
      "Dolby Atmos with spatial sound",
      "Snapdragon 8s Gen 3 performance"
    ]
  }
];

// Helper function to get phone by ID
function getPhoneById(id) {
  return phonesData.find(phone => phone.id === id);
}
