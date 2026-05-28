/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soviet: {
          red: "#da251d",
          gold: "#ffcd00",
          orange: "#f59e0b",
          white: "#ffffff",
          offwhite: "#fff9f9",
          darkred: "#b01d16",
        }
      },
      fontFamily: {
        // Đổi sang Arial và Inter để đảm bảo máy nào cũng hiển thị tiếng Việt mượt mà, không lỗi dấu
        sans: ['Arial', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Times New Roman', 'Lora', 'serif'],
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(218, 37, 29, 0.2)',
        'gold-glow': '0 0 15px rgba(245, 158, 11, 0.2)',
      }
    },
  },
  plugins: [],
}