// controllers/authController.js
const supabase = require('../config/supabaseClient')
const userModel = require('../models/userModel')

// Đăng ký
exports.register = async (req, res) => {
  const { email, password, fullname, phone, address } = req.body

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullname }, // Lưu fullname vào user_metadata
    },
  })

  if (signUpError) return res.status(400).json({ error: signUpError.message })

  const user = signUpData.user
  // Gọi model để insert vào bảng users
  const insertError = await userModel.insertUserProfile({
    id: user.id,
    email: user.email,
    fullname: user.user_metadata.fullname,
  })

  if (insertError) return res.status(500).json({ error: insertError.message })

  return res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, email, fullname }
  })
}
// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return res.status(400).json({ error: error.message })
  res.status(200).json({ message: 'Login successful', session: data.session })
}
exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/reset-password',
  })
  if (error) return res.status(400).json({ error: error.message })
  res.status(200).json({ message: 'Password reset email sent', data })
}
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and password are required.' });
  }

  try {
    // Gọi API reset password của Supabase
    const { data, error } = await supabase.auth.api.updateUser(token, {
      password: password
    });

    // Kiểm tra lỗi trả về từ Supabase
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Trả về phản hồi thành công
    return res.status(200).json({ message: 'Password reset successful', data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


// Lấy thông tin user hiện tại
exports.getProfile = async (req, res) => {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).json({ error: 'No token provided' })

  const token = authorization.replace('Bearer ', '')

  const supabaseWithToken = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  )

  const { data: { user }, error } = await supabaseWithToken.auth.getUser()

  if (error) return res.status(400).json({ error: error.message })

  res.status(200).json({ user })
}


// Lấy tất cả user
exports.getAllUser = async (req, res) => {
  try {
    const { data, error } = await userModel.getUser();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy user thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy user thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
}


// Lấy user theo ID
exports.getUserById = async (req, res) => {
  const { id } = req.params
  const { data, error } = await userModel.getUserById(id)
  if (error) return res.status(404).json({ error: 'User not found' })
  res.status(200).json({ user: data })
}

// Cập nhật user theo ID
exports.updateUserById = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  const { data, error } = await userModel.updateUserById(id, updateData)
  if (error) return res.status(400).json({ error: error.message })

  res.status(200).json({ message: 'User updated successfully', user: data })
}

// Xóa user theo ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.params

  const { data, error } = await userModel.deleteUserById(id)
  if (error) return res.status(400).json({ error: error.message })

  res.status(200).json({ message: 'User deleted successfully', user: data })
}