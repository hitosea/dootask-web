import fs from "fs";
import path from "path";
import {execSync} from "child_process";
import {defineConfig, loadEnv} from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2';
import vitePluginRequire from 'vite-plugin-require'
import vitePluginFileCopy from 'vite-plugin-file-copy';
import autoprefixer from 'autoprefixer';
import chokidar from 'chokidar';

const argv = process.argv;
const publicPath = argv.includes('electronBuild') ? 'electron/public' : 'public';
const staticDir = {src: path.resolve(__dirname, 'resources/assets/statics/public'), dest: path.resolve(__dirname, publicPath)}

if (!argv.includes('fromcmd')) {
    execSync(`npx ${path.resolve(__dirname, 'cmd')} ${argv.includes("build") ? "build" : "dev"}`, {stdio: "inherit"});
    process.exit()
}

export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    const host = "0.0.0.0"
    const port = parseInt(env['VITE_DEV_PORT'])
    let basePath = argv.includes('electronBuild') ? './' : env['VITE_APP_DEBUG'] === 'true' ? '/' : env['VITE_APP_BASE_PATH'];
    if (basePath === '') {
        basePath = '/'
    }

    const plugins = [
        createVuePlugin({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('micro-app'),
                }
            }
        }),
        vitePluginRequire(),
        vitePluginFileCopy([staticDir]),
    ]
    if (mode === "development") {
        plugins.push({
            name: 'watch-copy',
            configureServer() {
                chokidar.watch(staticDir.src, {
                    ignoreInitial: true,
                }).on('all', (event, filePath) => {
                    if (['add', 'change', 'unlink'].includes(event)) {
                        const relativePath = path.relative(staticDir.src, filePath);
                        const destPath = path.resolve(staticDir.dest, relativePath);
                        if (event === 'unlink') {
                            if (fs.existsSync(destPath)) {
                                fs.unlinkSync(destPath);
                                console.log(`Removed ${destPath}`);
                            }
                            return;
                        }
                        if (path.basename(filePath) === '.DS_Store') {
                            return;
                        }
                        fs.mkdirSync(path.dirname(destPath), {recursive: true});
                        fs.copyFileSync(filePath, destPath);
                        console.log(`Copied ${filePath} to ${destPath}`);
                    }
                });
            }
        })
    }

    return {
        base: basePath,
        publicDir: publicPath,
        server: {
            host,
            port,
            strictPort: false,
            proxy: {
                '/api': {
                    target: env['VITE_APP_URL'],
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        resolve: {
            alias: {
                '~element-sea': path.resolve(__dirname, 'node_modules/element-sea'),
                '~quill-hi': path.resolve(__dirname, 'node_modules/quill-hi'),
                '~quill-mention-hi': path.resolve(__dirname, 'node_modules/quill-mention-hi'),
                '../images': path.resolve(__dirname, command === 'serve' ? '/images' : 'resources/assets/statics/public/images'),
                '../css': path.resolve(__dirname, command === 'serve' ? '/css' : 'resources/assets/statics/public/css')
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        build: {
            manifest: true,
            outDir: publicPath,
            assetsDir: "js/build",
            emptyOutDir: false,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            },
            brotliSize: false,
            chunkSizeWarningLimit: 1500,
        },
        plugins,
        css: {
            postcss: {
                plugins: [
                    autoprefixer
                ]
            }
        }
    };
});
