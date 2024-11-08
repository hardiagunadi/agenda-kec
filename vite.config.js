import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

const ASSET_URL = process.env.ASSET_URL || '';

export default defineConfig({
    	base: `${ASSET_URL}/build/`,
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
