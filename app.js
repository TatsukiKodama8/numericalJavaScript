/* ========== EXTERNAL FILES ========== */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

/* ========== CONSTANTS ========== */
const PORT = 3000;

/* ========== SETTINGS ========== */
// 静的ファイルを提供するためのミドルウェアを設定
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());  // これを追加してJSON形式のデータも扱えるようにする

// __dirname の代わりに fileURLToPath を使用
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

/* =========== INDEX =========== */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* ========== LISTEN ========== */
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}.`);
});
