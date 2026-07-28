const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const sharp = require('sharp');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 20 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.'));
    }
    cb(null, true);
  },
});

// Resizes + converts every uploaded image to WebP, writes it to public/uploads,
// and attaches the resulting public URLs as req.uploadedImagePaths / req.uploadedImagePath.
async function processUploadedImages(req, res, next) {
  try {
    const files = req.files && req.files.length ? req.files : req.file ? [req.file] : [];
    if (!files.length) return next();

    const results = [];
    for (const file of files) {
      const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.webp`;
      const destPath = path.join(UPLOAD_DIR, filename);
      await sharp(file.buffer).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toFile(destPath);
      results.push(`/uploads/${filename}`);
    }

    req.uploadedImagePaths = results;
    req.uploadedImagePath = results[0];
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, processUploadedImages };
