const db = require("../config/sequelizeORM");
const jwt = require("jsonwebtoken");
const api = require("../tools/common");
const md5 = require("md5");

// Users

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // Cek apakah email sudah terdaftar
    const user = await db.tbl_users.findOne({
      where: { email, password: md5(password) },
    });

    if (user) {
      const token = jwt.sign({ user_id: user.user_id }, "test", {
        expiresIn: "7d",
      });
      api.ok(res, {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        token,
      });
    } else {
      api.error(res, "Email atau password salah", 400);
    }
  } catch (error) {
    console.log(error);
    api.error(res, "Terjadi kesalahan saat login", 500);
  }
}

async function register(req, res) {
  try {
    const { name, email, password, address, phone_number } = req.body;

    // Cek apakah email sudah terdaftar
    const user = await db.tbl_users.findOne({ where: { email } });
    if (user !== null) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Enkripsi password menggunakan md5
    const encryptedPassword = md5(password);

    // Insert data user ke database
    await db.tbl_users.create({
      name,
      email,
      password: encryptedPassword,
      address,
      phone_number,
      role: 2,
    });

    return res.status(201).json({ message: "Registrasi Berhasil" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Admin

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    // Cek apakah email sudah terdaftar
    const user = await db.tbl_users.findOne({
      where: { email, password: md5(password) },
    });

    if (user && user.role !== 1) {
      api.error(res, "Anda Bukan Seorang Admin", 401);
    } else if (user && user.role === 1) {
      const token = jwt.sign({ user_id: user.user_id }, "test", {
        expiresIn: '3h',
      });
      api.ok(res, {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      api.error(res, "Email atau password salah", 400);
    }
  } catch (error) {
    console.log(error);
    api.error(res, "Terjadi kesalahan saat login", 500);
  }
}

module.exports = {
  login,
  register,
  loginAdmin,
};
