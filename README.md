# Mehta Agro Industries B2B Portal

A high-performance, fully responsive, and interactive B2B website built for **Mehta Agro Industries** (manufacturers of ISI & BIS certified agricultural equipment like monoblock pumps, battery sprayers, drip lines, and diesel engine sets).

## 🚀 Key Features & 3D Upgrades

1. **3D Interactive CAD Pump Viewer (Products Page):**
   - Renders a stylized 3D monoblock water pump assembly (stator, copper windings, brass impeller casing, silver shaft, and cooling fan) dynamically in Three.js.
   - Drag-to-rotate interaction, toggleable auto-spin, and live RPM calculations.
   - **Exploded View Control**: Pulls the motor parts apart dynamically using smooth linear interpolation (Lerp) to inspect internal copper cores and volutes.
   - Click-to-identify highlights displaying custom technical descriptions for each sub-assembly.

2. **3D Export Globe Visualizer (About Page):**
   - Golden wireframe Earth globe rotating in real time with a glowing dark-navy core.
   - Pulsing surface coordinates representing global B2B export targets (India HQ, Kenya, Tanzania, Sri Lanka, Nepal, and Bangladesh).

3. **3D Wireframe Hero Header (Home Page):**
   - Rotating wireframe gold dodecahedron with a solid inner core floating over a low-opacity starfield and breathing aurora gradients.
   - Staggered word-by-word reveal transitions using GSAP.

4. **Tactile Interaction & Micro-Animations:**
   - **Custom cursor**: Circle-lag ring that scales and changes color dynamically on interactive hover states.
   - **3D Tilt Cards**: Perspective shifts that follow mouse client coordinates on testimonials grid, regional networks, and horizontal credentials scrolls.
   - **Flip Cards**: Y-axis 3D flip animations to audit B2B standards.
   - **Confetti bursts** on successful form submissions and green particle sparks on WhatsApp CTA hover.

5. **Local Business Optimization & SEO:**
   - Strict meta definitions, keywords, open graph tags, and fully compiled static routes.
   - LocalBusiness structured schema injected directly into `layout.tsx` (centered on Naroda GIDC coordinates: `23.0827` N, `72.6560` E).
   - Fully optimized Suspense boundary segments for search query client bails.

---

## 🛠️ Technology Stack

- **Core Framework**: Next.js (App Router, Turbopack compiler)
- **Styling**: Tailwind CSS (v4)
- **3D Renderers**: Three.js (v0.174)
- **Animations**: GSAP (v3) & Framer Motion
- **Icons**: Lucide React
- **Target Location**: Naroda GIDC, Ahmedabad, Gujarat 382330

---

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Run

1. Clone this repository:
   ```bash
   git clone https://github.com/Sarthak13121/growth-business-website.git
   cd growth-business-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) on your browser.

4. Compile production assets:
   ```bash
   npm run build
   ```
