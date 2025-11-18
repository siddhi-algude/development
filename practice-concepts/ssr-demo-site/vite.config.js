import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  build: {
    ssr: true,
  }
}
