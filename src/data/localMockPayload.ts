export interface Product {
  id: string;
  name: string;
  category: string;
  hpRange?: string;
  capacity?: string;
  moq?: string;
  description: string;
  image: string;
  specs: Record<string, string>;
}

export interface TimelineMilestone {
  year: number;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  authority: string;
  year: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface GalleryItem {
  id: string;
  category: 'Factory' | 'Products' | 'Team' | 'Certifications & Events';
  title: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  comment: string;
  category?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const COMPANY_PROFILE = {
  name: "Mehta Agro Industries",
  founder: "Kantibhai Mehta",
  established: 1994,
  location: "Plot No. 128, Phase I, GIDC, Naroda, Ahmedabad, Gujarat 382330",
  phone: "+91 98765 43210",
  email: "contact@mehtaagro.com",
  stats: {
    years: 30,
    products: 120,
    distributors: 800,
    states: 18,
    countries: 6,
    teamSize: 140,
    factorySize: "15,000 Sq Ft"
  }
};

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  { year: 1994, title: "Foundation", description: "Established by Kantibhai Mehta with a small machinery workshop in GIDC Naroda, Ahmedabad, producing single-cylinder diesel engines." },
  { year: 2001, title: "Pump Division Launch", description: "Introduced our first range of agricultural monoblock pumps and obtained ISI certification." },
  { year: 2008, title: "Factory Expansion", description: "Moved to our current 15,000 sq ft facility in GIDC Naroda, Phase I, adding automated CNC machinery." },
  { year: 2014, title: "First Exports", description: "Began exporting irrigation equipment to East Africa (Kenya, Tanzania) and registered as an official Export House." },
  { year: 2020, title: "Drip Irrigation Launch", description: "Launched full-scale drip irrigation components manufacturing, covering emitters, laterals, and filter systems." },
  { year: 2024, title: "30 Years Milestone", description: "Serving 800+ distributors in 18 states and exporting to 6 countries with over 120+ certified products." }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert1", title: "BIS Certification", authority: "Bureau of Indian Standards", year: "2002" },
  { id: "cert2", title: "ISI Mark License", authority: "Indian Standards Institution", year: "2003" },
  { id: "cert3", title: "ISO 9001:2015", authority: "Quality Management Systems", year: "2015" },
  { id: "cert4", title: "MSME Registration", authority: "Govt of India", year: "2016" },
  { id: "cert5", title: "Export House Certificate", authority: "Ministry of Commerce", year: "2018" },
  { id: "cert6", title: "CII National Award", authority: "Confederation of Indian Industry", year: "2023" }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "tm1", name: "Kantibhai Mehta", role: "Founder & Managing Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300", bio: "With 40+ years of industrial experience, Kantibhai drives the quality standard and engineering core of Mehta Agro." },
  { id: "tm2", name: "Rajesh Mehta", role: "Co-Director (Operations)", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300", bio: "Rajesh manages the Naroda manufacturing floor, inventory, and global logistics operations." },
  { id: "tm3", name: "Piyush Mehta", role: "Head of R&D", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300", bio: "Piyush oversees product innovation, drip system efficiency ratings, and CNC programming." },
  { id: "tm4", name: "Sanjay K Patel", role: "National Sales Head", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300", bio: "Sanjay leads the distributor network across 18 states and export clients coordination." }
];

export const PRODUCTS: Product[] = [
  // Irrigation Pumps (Category 1)
  {
    id: "p1",
    name: "Premium Monoblock Pump (MB-50)",
    category: "Irrigation Pumps",
    hpRange: "0.5HP to 15HP",
    description: "Heavy-duty monoblock pump with pure copper winding, suitable for high-discharge irrigation systems.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400",
    specs: { "HP Range": "3.0 - 7.5 HP", "Phase": "Three Phase", "RPM": "2880 RPM", "Suction x Delivery": "80 x 65 mm", "Max Head": "36 Meters" }
  },
  {
    id: "p2",
    name: "Submersible Borewell Pump (SB-100)",
    category: "Irrigation Pumps",
    hpRange: "1.0HP to 15HP",
    description: "Multistage stainless steel submersible pumps designed for deep tube wells and agriculture sectors.",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400",
    specs: { "Well Size": "4 inch / 6 inch", "HP Range": "2.0 - 10 HP", "Stages": "10 to 30 Stages", "Outlet Size": "50 mm", "Head Range": "30 - 150 Meters" }
  },
  // Crop Sprayers (Category 2)
  {
    id: "p3",
    name: "Battery Operated Knapsack Sprayer (BS-16)",
    category: "Crop Sprayers",
    capacity: "16 Liters",
    description: "High-density polyethylene 16L tank equipped with heavy-duty 12V rechargeable battery and dual-nozzle system.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400",
    specs: { "Tank Capacity": "16 Liters", "Battery": "12V 8Ah (Dry Battery)", "Pressure": "0.2 - 0.45 Mpa", "Lance": "Stainless Steel Extendable", "Weight": "5.8 kg" }
  },
  {
    id: "p4",
    name: "Tractor-Mounted Boom Sprayer (TS-200)",
    category: "Crop Sprayers",
    capacity: "200 to 500 Liters",
    description: "Heavy-duty farm sprayer featuring high-pressure triple piston pump and 12-meter spray boom width.",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400",
    specs: { "Tank Capacity": "200 Liters / 500 Liters", "Pump Model": "HTP-30 Gold", "Boom Width": "12 Meters (24 Nozzles)", "Required Tractor": "18HP & Above", "Pressure": "40 Bar" }
  },
  // Drip System Components (Category 3)
  {
    id: "p5",
    name: "Flat Drip Lateral Pipe (16mm)",
    category: "Drip System Components",
    description: "Premium UV-stabilized virgin plastic lateral pipe with pre-molded flat drippers spaced at customized intervals.",
    image: "https://images.unsplash.com/photo-1463123081488-729f6db8045b?auto=format&fit=crop&q=80&w=400",
    specs: { "Diameter": "16 mm", "Wall Thickness": "0.2 mm / 0.4 mm", "Dripper Spacing": "30 cm / 40 cm", "Flow Rate": "2.0 L/Hr", "Roll Length": "1000 Meters" }
  },
  {
    id: "p6",
    name: "Disc Filter (Hydro-cyclonic)",
    category: "Drip System Components",
    description: "Secondary water filtration system utilizing compressed plastic discs to catch fine organic sand and solids.",
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400",
    specs: { "Size": "2 inch / 3 inch", "Filtration Element": "Grooved PP Discs", "Max Pressure": "8 kg/cm²", "Flow Capacity": "25 - 40 m³/Hr", "Mesh Grade": "120 Mesh" }
  },
  // Diesel Engine Sets (Category 4)
  {
    id: "p7",
    name: "Water-Cooled Diesel Engine (3.5HP)",
    category: "Diesel Engine Sets",
    hpRange: "3.5HP to 10HP",
    description: "Traditional single-cylinder slow speed engine, highly fuel-efficient and easy to maintain in remote farms.",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=400",
    specs: { "Engine HP": "3.5 HP / 5.0 HP", "Cooling Type": "Water Cooled (Hopper/Radiator)", "Bore x Stroke": "80 x 110 mm", "Fuel Consumption": "240 g/hp-hr", "RPM": "1500 RPM" }
  },
  {
    id: "p8",
    name: "Dual-Fuel Pump Set (Gas/Diesel)",
    category: "Diesel Engine Sets",
    hpRange: "5HP to 10HP",
    description: "Hybrid dual-fuel agricultural pump set runs on both bio-gas and diesel, reducing operating costs by 40%.",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400",
    specs: { "HP Capacity": "6.5 HP", "Fuel Type": "Diesel + CNG/Bio-Gas", "Pump Size": "3 x 3 inch", "Discharge": "750 Liters/min", "Head Capacity": "18 Meters" }
  },
  // Spare Parts & Consumables (Category 5)
  {
    id: "p9",
    name: "Bronze Impeller Series",
    category: "Spare Parts & Consumables",
    description: "Dynamically balanced replacement bronze impellers for centrifugal monoblock pumps.",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=400",
    specs: { "Material": "Grade LTB-2 Bronze", "Fit Model": "MB-50 & MB-75", "Balancing": "ISO Class 6.3 Dynamic", "Diameter": "135 mm to 210 mm" }
  },
  {
    id: "p10",
    name: "Ceramic Mechanical Seals",
    category: "Spare Parts & Consumables",
    description: "Highly wear-resistant carbon-ceramic mechanical seals preventing leakage in high pressure pumps.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
    specs: { "Shaft Size": "16 mm / 22 mm / 28 mm", "Material": "Carbon vs Ceramic / Viton", "Operating Temp": "Up to 120°C", "Max Pressure": "10 Bar" }
  },
  // Wholesale & Export (Category 6)
  {
    id: "p11",
    name: "Export Bulk Submersible Pump Bundle",
    category: "Wholesale & Export",
    moq: "5 units",
    description: "Custom bulk export configurations complete with control panel boxes, cables, and packaging under Export House specs.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specs: { "MOQ": "5 Units", "OEM Branding": "Available (MOQ 50 Units)", "Warranty": "12 Months International", "Packaging": "Seaworthy Wooden Crates" }
  },
  {
    id: "p12",
    name: "Complete Drip System Installation Kit (1 Acre)",
    category: "Wholesale & Export",
    moq: "Bulk (Fits 1 Acre Grid)",
    description: "Comprehensive B2B layout bundle containing filters, main headers, 16mm laterals, valves, and layout connectors.",
    image: "https://images.unsplash.com/photo-1563514220747-a33533e14af9?auto=format&fit=crop&q=80&w=400",
    specs: { "Coverage Area": "1 Acre Grid", "Included Filter": "2\" Screen Filter", "Laterals Length": "3000 Meters", "Emitters Type": "Inline Pre-spaced 40cm", "MOQ Order": "10 Kits" }
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", category: "Factory", title: "Automated CNC Lathe Floor", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=500" },
  { id: "g2", category: "Factory", title: "Heavy Pump Casting Inspection", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=500" },
  { id: "g3", category: "Factory", title: "Impeller Balancing Workstation", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=500" },
  { id: "g4", category: "Products", title: "Borewell Pumps Ready for Quality Test", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=500" },
  { id: "g5", category: "Products", title: "Battery Sprayer Assembly Line", image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=500" },
  { id: "g6", category: "Products", title: "Drip Lateral Extruder Output", image: "https://images.unsplash.com/photo-1463123081488-729f6db8045b?auto=format&fit=crop&q=80&w=500" },
  { id: "g7", category: "Team", title: "Kantibhai Mehta Addressing Quality Team", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500" },
  { id: "g8", category: "Team", title: "Factory Engineers at Daily Standup", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500" },
  { id: "g9", category: "Team", title: "Testing Lab Technical Staff", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500" },
  { id: "g10", category: "Certifications & Events", title: "BIS License Renewal Team Photo", image: "https://images.unsplash.com/photo-1563514220747-a33533e14af9?auto=format&fit=crop&q=80&w=500" },
  { id: "g11", category: "Certifications & Events", title: "Ahmedabad Agri Expo Stall 2025", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=500" },
  { id: "g12", category: "Certifications & Events", title: "ISO Auditing Certificate Handover", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500" },
  { id: "g13", category: "Factory", title: "Raw Material Storage Warehouse", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500" },
  { id: "g14", category: "Products", title: "Drip Connectors Packaged & Labeled", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=500" },
  { id: "g15", category: "Factory", title: "Final Product Packaging Department", image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=500" },
  { id: "g16", category: "Team", title: "Mehta Agro Logistics Coordinators", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500" },
  { id: "g17", category: "Certifications & Events", title: "Export Shipment Loading - Kenya Port", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500" },
  { id: "g18", category: "Factory", title: "Hydraulic Pump Performance Testing Bay", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500" }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Patel Irrigation Store", location: "Mehsana, Gujarat", role: "Authorized Dealer", rating: 5, comment: "We have been selling Mehta Monoblock Pumps since 2005. The BIS certification and copper windings mean zero service complaints. Highly recommended!", category: "Irrigation Pumps" },
  { id: "t2", name: "Karanja Farmers Co-Op", location: "Karanja, Maharashtra", role: "Bulk Distributor", rating: 5, comment: "Mehta Agro's battery sprayers are a hit among our local sugarcane farmers. The 16L HDPE tank and long-lasting battery handle continuous duty flawlessly.", category: "Crop Sprayers" },
  { id: "t3", name: "Nile Agri Solutions Ltd", location: "Nairobi, Kenya", role: "Export Partner", rating: 5, comment: "Quality standard matches European makes but pricing is highly competitive. Custom branding and export packaging services are top notch.", category: "Wholesale & Export" },
  { id: "t4", name: "Shiv Shakt Traders", location: "Jodhpur, Rajasthan", role: "Regional Dealer", rating: 5, comment: "Drip components from Mehta are durable and easy to install. The Disc filters work perfect even with sandy borewell water. Dispatch is prompt.", category: "Drip System Components" },
  { id: "t5", name: "Krishna Diesel Agencies", location: "Vijayawada, AP", role: "B2B Wholesaler", rating: 4.8, comment: "The 3.5HP diesel engine sets are indestructible. Farmers love the low diesel consumption. Excellent dealer Margins and cooperative sales staff.", category: "Diesel Engine Sets" },
  { id: "t6", name: "Gurudev Agri Tech", location: "Karnal, Haryana", role: "Distributor (500+ Sub-dealers)", rating: 5, comment: "Partnering with Mehta Agro helped us double our turnover. Their sales team organizes regional training camps. Great brand support.", category: "Wholesale & Export" },
  { id: "t7", name: "Annapurna Seed & Pump", location: "Patna, Bihar", role: "Retail Dealer", rating: 4.9, comment: "Customer support is very supportive. Whenever we need bronze impellers or mechanical seals, parts are shipped instantly within 3 days.", category: "Spare Parts & Consumables" },
  { id: "t8", name: "Ganga Irrigation Systems", location: "Lucknow, UP", role: "Contractor Partner", rating: 5, comment: "We use Mehta drip laterals in govt subsidy projects. Clear certification documents like ISO 9001 and ISI ensure quick approvals.", category: "Drip System Components" },
  { id: "t9", name: "Mahadev Machinery House", location: "Kathmandu, Nepal", role: "Import Distributor", rating: 4.8, comment: "Very trustworthy relationship for over 15 years. Kantibhai Mehta ensures the quality remains solid year after year. Glad to be a partner.", category: "Irrigation Pumps" }
];

export const DEALER_CITIES: string[] = [
  "Rajkot", "Ahmedabad", "Surat", "Mehsana", "Jodhpur", "Jaipur", "Indore", "Bhopal", 
  "Nashik", "Pune", "Karanja", "Vijayawada", "Karnal", "Patna", "Lucknow", "Nairobi", 
  "Mombasa", "Dar es Salaam", "Dhaka", "Kathmandu", "Colombo"
];

export const REGIONAL_OFFICES = [
  {
    title: "Naroda Head Office & Factory",
    address: "Plot No. 128, Phase I, GIDC, Naroda, Ahmedabad, Gujarat 382330",
    phone: "+91 98765 43210",
    email: "contact@mehtaagro.com",
    role: "Manufacturing, Custom OEM & Corporate Sales"
  },
  {
    title: "Rajkot Sales Branch",
    address: "Plot No. 442, Phase II, GIDC, Rajkot, Gujarat 360002",
    phone: "+91 98765 43211",
    email: "rajkot@mehtaagro.com",
    role: "Domestic Dealer Accounts & Support Office"
  },
  {
    title: "Export Enquiries Desk",
    address: "Plot No. 128, Phase I, GIDC, Naroda, Ahmedabad, Gujarat 382330",
    phone: "+91 98765 43212",
    email: "export@mehtaagro.com",
    role: "Dedicated Desk for Kenya, Tanzania, Nepal & Global Clients"
  }
];

export const FAQS: FAQItem[] = [
  { question: "What is the Minimum Order Quantity (MOQ) for dealerships?", answer: "For local distributors in India, the Minimum Order Quantity is typically 5 units or equivalent package sizes depending on the product category. For OEM custom branding, the MOQ is 50 units." },
  { question: "Are your agricultural pumps certified under government subsidies?", answer: "Yes, our products carry BIS and ISI certifications. Our drip components and irrigation pumps are registered with major state agro industries, making them eligible for central and state farming subsidy schemes." },
  { question: "Do you supply spare parts independently?", answer: "Absolutely. We supply a full range of spares like Impellers, Ceramic Seals, Spray Nozzles, and Lance bars directly to our authorized dealer network to guarantee immediate field repairs." },
  { question: "What is the standard dispatch timeline for bulk orders?", answer: "With a 15,000 sq ft factory size and CNC automation, we process standard wholesale orders within 5 working days. Export containers take 10-15 days to dispatch from GIDC Naroda." },
  { question: "How does the pre-filled WhatsApp ordering system work?", answer: "By clicking the 'WhatsApp Order' on any product page, it opens a secure WhatsApp thread with our sales team pre-filled with the exact model name. Our representative will immediately reply with custom quotes and shipping details." }
];

export const STATES_DEALERS = [
  { state: "Gujarat", dealers: 185 },
  { state: "Maharashtra", dealers: 120 },
  { state: "Rajasthan", dealers: 92 },
  { state: "Madhya Pradesh", dealers: 84 },
  { state: "Uttar Pradesh", dealers: 73 },
  { state: "Haryana", dealers: 41 },
  { state: "Andhra Pradesh", dealers: 38 },
  { state: "Bihar", dealers: 35 },
  { state: "Karnataka", dealers: 28 },
  { state: "Punjab", dealers: 25 },
  { state: "Tamil Nadu", dealers: 25 },
  { state: "Telangana", dealers: 10 }
];
