# 🎉 Moksha 2025 Website Development Guide

Welcome to the development repository for the **Moksha 2025** website, the annual cultural fest of **Netaji Subhas University of Technology (NSUT)**. Let's work together to create an outstanding online presence for this vibrant event!

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone hhttps://github.com/singhdsp/moksha-website-new.git
   cd moksha-website-new
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the Development Server**:
   ```bash
   pnpm dev
   ```

## 🌳 Branching Strategy

To maintain a clean and efficient workflow:

- **Never commit directly to the `main` branch**. Always create a new branch for your feature or fix:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- **Open a Pull Request (PR)**: Once your work is ready, push your branch and open a PR for review.

## 🎨 Customizing Tailwind CSS

To add new colors to your Tailwind configuration:

1. Open `tailwind.config.ts`.
2. Extend the theme with your custom colors:
   ```javascript
   // tailwind.config.ts
   import { defineConfig } from 'tailwindcss';

   export default defineConfig({
     theme: {
       extend: {
         colors: {
           color1: '#F6CE87', // Example custom color
           // Add more colors as needed
         },
       },
     },
     // Other configurations...
   });
   ```
3. Use your custom colors in your components:
   ```jsx
   <div className="bg-primary text-color1">
     {/* Content */}
   </div>
   ```

For more details, refer to the [Tailwind CSS Documentation](https://tailwindcss.com/docs/customizing-colors).

## 🛡️ Best Practices

- **Code Reviews**: Ensure all code is reviewed via PRs before merging.
- **Consistent Commit Messages**: Use clear and descriptive commit messages.
- **Responsive Design**: Test your changes on various devices to ensure a seamless user experience.

Let's make **Moksha 2025** an unforgettable experience! 🎊 