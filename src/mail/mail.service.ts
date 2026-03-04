import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendOtp(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Hệ thống Đấu giá Đà Nẵng" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Xác minh OTP - Đặt lại mật khẩu tài khoản Đấu giá',
      html: `
      <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #0052cc;">HỆ THỐNG ĐẤU GIÁ ĐÀ NẴNG</h2>
          <p style="margin: 0; font-size: 15px; color: #666;">Xác thực yêu cầu đặt lại mật khẩu</p>
        </div>

        <p>Chào bạn,</p>
        <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản đấu giá của bạn.</p>
        <p>Vui lòng sử dụng mã OTP bên dưới để xác minh yêu cầu:</p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; padding: 12px 24px; font-size: 28px; font-weight: bold; letter-spacing: 4px; background-color: #e0ecff; color: #0052cc; border-radius: 6px;">
            ${otp}
          </span>
        </div>

        <p style="text-align: center; font-size: 15px; color: #777;">Mã OTP này có hiệu lực trong vòng <strong>10 phút</strong>.</p>

        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.</p>

        <hr style="margin: 30px 0;">

        <div style="font-size: 14px; color: #888; text-align: center;">
          <p>Hệ thống Đấu giá Đà Nẵng</p>
          <p>Website: <a href="https://danang-auction.vn" target="_blank">danang-auction.vn</a> | Email: support@danang-auction.vn</p>
        </div>
      </div>
      `,
    });
  }

  async sendUserVerificationSuccess(email: string) {
    await this.transporter.sendMail({
      from: `"Hệ thống Đấu giá Đà Nẵng" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Tài khoản của bạn đã được xác minh',
      html: `
        <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #28a745;">TÀI KHOẢN ĐƯỢC XÁC MINH</h2>
            <p style="margin: 0; font-size: 15px; color: #666;">Chúc mừng! Tài khoản của bạn đã được xác minh thành công.</p>
          </div>

          <p>Xin chào,</p>
          <p>Hệ thống Đấu giá Đà Nẵng thông báo rằng tài khoản của bạn đã được xác minh và kích hoạt thành công.</p>
          <p>Bạn có thể đăng nhập và bắt đầu tham gia các phiên đấu giá.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://danang-auction.vn" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 6px;">Truy cập hệ thống</a>
          </div>

          <hr style="margin: 30px 0;">

          <div style="font-size: 14px; color: #888; text-align: center;">
            <p>Hệ thống Đấu giá Đà Nẵng</p>
            <p>Website: <a href="https://danang-auction.vn" target="_blank">danang-auction.vn</a> | Email: support@danang-auction.vn</p>
          </div>
        </div>
      `,
    });
  }

  async sendUserRejectionNotice(email: string, reason: string) {
    await this.transporter.sendMail({
      from: `"Hệ thống Đấu giá Đà Nẵng" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Tài khoản bị từ chối xác minh',
      html: `
        <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; font-size: 16px; color: #333; background-color: #fff4f4; padding: 24px; border-radius: 8px; border: 1px solid #f5c2c7;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #dc3545;">TÀI KHOẢN BỊ TỪ CHỐI</h2>
            <p style="margin: 0; font-size: 15px; color: #a94442;">Rất tiếc, tài khoản của bạn không được xác minh.</p>
          </div>

          <p>Chào bạn,</p>
          <p>Tài khoản của bạn đã bị từ chối xác minh với lý do sau:</p>

          <div style="background-color: #f8d7da; padding: 16px; border-radius: 4px; margin: 20px 0; color: #842029;">
            <b>Lý do:</b> ${reason}
          </div>

          <p>Bạn có thể chỉnh sửa lại thông tin và gửi yêu cầu xác minh lại.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://danang-auction.vn/verify" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 6px;">Gửi lại xác minh</a>
          </div>

          <hr style="margin: 30px 0;">

          <div style="font-size: 14px; color: #888; text-align: center;">
            <p>Hệ thống Đấu giá Đà Nẵng</p>
            <p>Website: <a href="https://danang-auction.vn" target="_blank">danang-auction.vn</a> | Email: support@danang-auction.vn</p>
          </div>
        </div>
      `,
    });
  }

  async sendAssetApprovalNotice(email: string, assetCode: string) {
    await this.transporter.sendMail({
      from: `"Hệ thống Đấu giá Đà Nẵng" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Tài sản của bạn đã được duyệt',
      html: `
        <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #28a745;">TÀI SẢN ĐƯỢC DUYỆT</h2>
            <p style="margin: 0; font-size: 15px; color: #666;">Tài sản mã <strong>${assetCode}</strong> đã được phê duyệt để đấu giá.</p>
          </div>

          <p>Xin chào,</p>
          <p>Hệ thống Đấu giá Đà Nẵng thông báo rằng tài sản của bạn (Mã: <strong>${assetCode}</strong>) đã được duyệt và sẽ sớm được đưa vào phiên đấu giá.</p>
          <p>Vui lòng kiểm tra lại thông tin phiên để theo dõi tiến trình.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://danang-auction.vn/assets/${assetCode}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 6px;">Xem chi tiết tài sản</a>
          </div>

          <hr style="margin: 30px 0;">

          <div style="font-size: 14px; color: #888; text-align: center;">
            <p>Hệ thống Đấu giá Đà Nẵng</p>
            <p>Website: <a href="https://danang-auction.vn" target="_blank">danang-auction.vn</a> | Email: support@danang-auction.vn</p>
          </div>
        </div>
      `,
    });
  }

  async sendAssetRejectionNotice(
    email: string,
    assetCode: string,
    reason: string,
  ) {
    await this.transporter.sendMail({
      from: `"Hệ thống Đấu giá Đà Nẵng" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Tài sản bị từ chối phê duyệt',
      html: `
        <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; font-size: 16px; color: #333; background-color: #fff4f4; padding: 24px; border-radius: 8px; border: 1px solid #f5c2c7;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #dc3545;">TỪ CHỐI TÀI SẢN</h2>
            <p style="margin: 0; font-size: 15px; color: #a94442;">Tài sản mã <strong>${assetCode}</strong> không đạt yêu cầu phê duyệt.</p>
          </div>

          <p>Xin chào,</p>
          <p>Tài sản của bạn (Mã: <strong>${assetCode}</strong>) đã bị từ chối duyệt với lý do sau:</p>

          <div style="background-color: #f8d7da; padding: 16px; border-radius: 4px; margin: 20px 0; color: #842029;">
            <b>Lý do:</b> ${reason}
          </div>

          <p>Bạn có thể cập nhật lại thông tin và gửi lại yêu cầu phê duyệt.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://danang-auction.vn/assets/${assetCode}/edit" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 6px;">Chỉnh sửa và gửi lại</a>
          </div>

          <hr style="margin: 30px 0;">

          <div style="font-size: 14px; color: #888; text-align: center;">
            <p>Hệ thống Đấu giá Đà Nẵng</p>
            <p>Website: <a href="https://danang-auction.vn" target="_blank">danang-auction.vn</a> | Email: support@danang-auction.vn</p>
          </div>
        </div>
      `,
    });
  }
}
