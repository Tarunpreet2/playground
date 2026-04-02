import React, { useState, useRef } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import BackButton from "../components/BackButton";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/emailverification.css";

// ===== EmailJS Configuration =====
// 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// 2. Create an Email Service (e.g., Gmail) and get your Service ID
// 3. Create an Email Template with these variables: {{to_email}}, {{otp_code}}
//    Example template body: "Your OTP verification code is: {{otp_code}}"
// 4. Replace the values below with your own:
const EMAILJS_SERVICE_ID = "service_e7kekik";
const EMAILJS_TEMPLATE_ID = "template_9qylh3s";
const EMAILJS_PUBLIC_KEY = "GHA_EVCYPF7JpKjlQ";
// ==================================

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [step, setStep] = useState("email"); // "email" | "otp" | "verified"
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const otpInputsRef = useRef([]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: "danger", message: "Please enter an email address." });
      return;
    }

    setSending(true);
    setStatus({ type: "", message: "" });

    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          otp_code: newOTP,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStep("otp");
      setStatus({
        type: "success",
        message: `OTP sent successfully to ${email}`,
      });
    } catch (error) {
      setStatus({
        type: "danger",
        message: `Failed to send OTP. ${error?.text || "Please check your EmailJS configuration."}`,
      });
    } finally {
      setSending(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Auto-focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setStatus({ type: "danger", message: "Please enter the complete 6-digit OTP." });
      return;
    }

    if (otp === generatedOTP) {
      setStep("verified");
      setStatus({ type: "success", message: "Email verified successfully!" });
    } else {
      setStatus({ type: "danger", message: "Invalid OTP. Please try again." });
    }
  };

  const handleResendOTP = () => {
    setOtp("");
    setStep("email");
    setStatus({ type: "", message: "" });
  };

  const handleReset = () => {
    setEmail("");
    setOtp("");
    setGeneratedOTP("");
    setStep("email");
    setStatus({ type: "", message: "" });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <BackButton />
      <br />
      <br />
      <h1 title="pageTitle">Email Verification</h1>
      <p>Test email OTP verification flow in your automation tool.</p>

      <div className="email-verification-container">
        {status.message && (
          <Alert variant={status.type} data-testid="status-message">
            {status.message}
          </Alert>
        )}

        {step === "email" && (
          <Form onSubmit={handleSendOTP} className="email-form">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email-input">Email Address</Form.Label>
              <Form.Control
                id="email-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email-input"
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={sending}
              data-testid="send-otp-btn"
            >
              {sending ? "Sending OTP..." : "Send OTP"}
            </Button>
          </Form>
        )}

        {step === "otp" && (
          <Form onSubmit={handleVerifyOTP} className="otp-form">
            <p className="otp-instruction">
              Enter the 6-digit OTP sent to <strong>{email}</strong>
            </p>
            <div className="otp-inputs" data-testid="otp-container">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="otp-digit"
                  value={otp[index] || ""}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  data-testid={`otp-input-${index}`}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <div className="otp-actions">
              <Button
                variant="primary"
                type="submit"
                data-testid="verify-otp-btn"
              >
                Verify OTP
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleResendOTP}
                data-testid="resend-otp-btn"
              >
                Resend OTP
              </Button>
            </div>
          </Form>
        )}

        {step === "verified" && (
          <div className="verified-section" data-testid="verified-message">
            <div className="verified-icon">&#10003;</div>
            <h3>Email Verified!</h3>
            <p>
              <strong>{email}</strong> has been successfully verified.
            </p>
            <Button
              variant="primary"
              onClick={handleReset}
              data-testid="reset-btn"
            >
              Verify Another Email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
