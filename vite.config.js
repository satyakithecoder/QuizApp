
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './quiz.html',
		newfile: './signUp.html'  
      }
    }
  }
});
