"use client";
import React, { useState, useRef, useEffect } from "react";
import { VerificationCodeInputProps } from "../../../types";
import styles from "../../styles/VerificationCodeInput.module.css";
import CustomText from "../component/common/CustomText";

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  onComplete,
  resendCode,
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value) {
      onComplete(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(30);
    resendCode();
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className={styles.container}>
      <div className={styles.codeInputContainer}>
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            className={styles.codeInput}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoFocus={i === 0}
            aria-label={`인증 코드 입력 ${i + 1}`}
          />
        ))}
      </div>

      <div className={styles.resendContainer}>
        <CustomText className={styles.timerText}>
          {timeLeft > 0 ? `${timeLeft}초 뒤 만료` : "인증코드가 만료됨"}
        </CustomText>
        <button
          onClick={handleResend}
          disabled={timeLeft > 0}
          aria-label="인증 코드 재발송"
          className={styles.resendButton}
        >
          <CustomText
            className={styles.resendButtonText}
            style={{ color: timeLeft > 0 ? "#a3a3f0" : "#2563EB" }}
          >
            코드 재발송
          </CustomText>
        </button>
      </div>
    </div>
  );
};

export default VerificationCodeInput;
