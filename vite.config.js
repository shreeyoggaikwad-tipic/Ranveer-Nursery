import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/frontend/src/index.css', 'resources/frontend/src/main.jsx'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
