// controllers/authController.js
const supabase = require('../config/supabaseClient')
const userModel = require('../models/userModel')

// Đăng ký
exports.register = async (req, res) => {
  const { email, password, fullname, phone, address } = req.body

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) return res.status(400).json({ error: signUpError.message })

  const user = signUpData.user

  // Gọi model để insert vào bảng users
  const insertError = await userModel.insertUserProfile({
    id: user.id,
    email: user.email,
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
