import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        
        laravel({
            input: ['resources/js/app.ts','resources/css/app.scss',

             // login register forget password
             "resources/css/entrance.scss",
             "resources/js/entrance/app.ts",
        ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
