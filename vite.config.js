/**
 * @Author: Your name
 * @Date:   2023-08-07 11:10:21
 * @Last Modified by:   Your name
 * @Last Modified time: 2023-08-07 11:12:18
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/impex-data-processor",
  plugins: [react()],
})
