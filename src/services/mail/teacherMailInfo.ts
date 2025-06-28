//mail the teacher with the password
const mailInformation = {
  from: "EduTech Platform<Sunilkarki670@gmail.com>",
  to: teacherEmail,
  subject: "🎉 Welcome to EduTech Platform - Your Teaching Journey Begins!",
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to EduTech Platform</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: bold;
            }
            .content {
                padding: 40px 30px;
                color: #333;
            }
            .welcome-section {
                text-align: center;
                margin-bottom: 30px;
            }
            .icon {
                font-size: 48px;
                margin-bottom: 15px;
            }
            .credentials-box {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                padding: 25px;
                border-radius: 10px;
                margin: 25px 0;
                text-align: center;
            }
            .password-display {
                background: rgba(255, 255, 255, 0.2);
                padding: 15px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
                margin: 15px 0;
                border: 2px dashed rgba(255, 255, 255, 0.5);
            }
            .features {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin: 30px 0;
            }
            .feature {
                flex: 1;
                min-width: 150px;
                text-align: center;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
            .feature-icon {
                font-size: 32px;
                margin-bottom: 10px;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                margin: 20px 0;
                transition: transform 0.3s ease;
            }
            .footer {
                background: #333;
                color: white;
                text-align: center;
                padding: 25px;
                font-size: 14px;
            }
            .social-links {
                margin: 15px 0;
            }
            .social-links a {
                color: white;
                margin: 0 10px;
                text-decoration: none;
                font-size: 20px;
            }
            @media (max-width: 600px) {
                .features {
                    flex-direction: column;
                }
                .content {
                    padding: 20px 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div style="font-size: 40px; margin-bottom: 10px;">🎓</div>
                <h1>Welcome to EduTech Platform!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Empowering Education, Inspiring Minds</p>
            </div>

            <!-- Main Content -->
            <div class="content">
                <!-- Welcome Section -->
                <div class="welcome-section">
                    <div class="icon">👋</div>
                    <h2 style="color: #667eea; margin-bottom: 15px;">Hello ${teacherName}!</h2>
                    <p style="font-size: 16px; color: #666;">
                        We're thrilled to have you join our educational community! You've been successfully registered as an instructor on our platform.
                    </p>
                </div>

                <!-- Credentials Box -->
                <div class="credentials-box">
                    <div style="font-size: 32px; margin-bottom: 15px;">🔐</div>
                    <h3 style="margin: 0 0 10px 0;">Your Login Credentials</h3>
                    <p style="margin: 10px 0; opacity: 0.9;">
                        <strong>📧 Email:</strong> ${teacherEmail}
                    </p>
                    <p style="margin: 10px 0; opacity: 0.9;"><strong>🔑 Temporary Password:</strong></p>
                    <div class="password-display">
                        ${teacherPasswordPlain}
                    </div>
                    <p style="font-size: 14px; margin-top: 15px; opacity: 0.8;">
                        ⚠️ Please change this password after your first login for security
                    </p>
                </div>

                <!-- Features Section -->
                <h3 style="color: #667eea; text-align: center; margin-bottom: 25px;">🚀 What You Can Do</h3>
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">📚</div>
                        <h4 style="margin: 10px 0; color: #333;">Manage Courses</h4>
                        <p style="font-size: 14px; color: #666;">Create and organize your course content</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">👥</div>
                        <h4 style="margin: 10px 0; color: #333;">Track Students</h4>
                        <p style="font-size: 14px; color: #666;">Monitor student progress and engagement</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📊</div>
                        <h4 style="margin: 10px 0; color: #333;">Analytics</h4>
                        <p style="font-size: 14px; color: #666;">View detailed performance reports</p>
                    </div>
                </div>

                <!-- Call to Action -->
                <div style="text-align: center; margin: 40px 0;">
                    <a href="#" class="cta-button">
                        🚪 Login to Your Dashboard
                    </a>
                    <p style="font-size: 14px; color: #666; margin-top: 15px;">
                        Need help? Contact our support team at 
                        <a href="mailto:support@edutech.com" style="color: #667eea;">support@edutech.com</a>
                    </p>
                </div>

                <!-- Next Steps -->
                <div style="background: #e8f2ff; padding: 25px; border-radius: 10px; border-left: 4px solid #667eea;">
                    <h4 style="margin: 0 0 15px 0; color: #667eea;">📋 Next Steps:</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #555;">
                        <li style="margin-bottom: 8px;">🔐 Login using your credentials above</li>
                        <li style="margin-bottom: 8px;">👤 Complete your profile setup</li>
                        <li style="margin-bottom: 8px;">📚 Explore your assigned courses</li>
                        <li style="margin-bottom: 8px;">🎯 Start creating engaging content for your students</li>
                    </ul>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div style="font-size: 24px; margin-bottom: 15px;">🎓</div>
                <p style="margin: 0 0 10px 0;"><strong>EduTech Platform</strong></p>
                <p style="margin: 0 0 15px 0; opacity: 0.8;">Transforming Education Through Technology</p>
                
                <div class="social-links">
                    <a href="#" title="Facebook">📘</a>
                    <a href="#" title="Twitter">🐦</a>
                    <a href="#" title="LinkedIn">💼</a>
                    <a href="#" title="Instagram">📷</a>
                </div>
                
                <p style="margin: 15px 0 0 0; font-size: 12px; opacity: 0.7;">
                    © 2025 EduTech Platform. All rights reserved.<br>
                    This is an automated email. Please do not reply directly to this message.
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}