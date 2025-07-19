# 3D Shoe Showcase

A modern, interactive 3D shoe viewer built with Next.js, Three.js, and React Three Fiber. This application allows users to view a 3D shoe model from different angles, customize its color, and provides a sleek, modern UI with glassmorphism effects.

## Features

- Interactive 3D shoe model with orbit controls
- Color customization with real-time updates
- Responsive design that works on desktop and mobile
- Modern UI with glassmorphism effects
- Dark mode design with cinematic lighting

## Tech Stack

- **Frontend Framework**: Next.js with React
- **Styling**: Tailwind CSS
- **3D Rendering**: Three.js with React Three Fiber
- **3D Utilities**: @react-three/drei
- **Animations**: @react-spring/three

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/3d-shoe-showcase.git
cd 3d-shoe-showcase
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- **Rotate the shoe**: Click and drag with your mouse
- **Zoom**: Use the scroll wheel
- **Change color**: Click on the color swatches in the control panel

## Adding Your Own 3D Model

To replace the placeholder with your own 3D shoe model:

1. Export your 3D model in glTF format (.glb or .gltf) from your 3D modeling software
2. Place the model file in the `public` directory
3. Update the model path in `ShoeModel.tsx`

```tsx
// Replace this line
const { nodes, materials } = useGLTF('/nike.glb') as any;

// With your model path
const { nodes, materials } = useGLTF('/your-model-name.glb') as any;
```

4. Update the model rendering code to match your model's structure

## License

MIT

## Acknowledgments

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
