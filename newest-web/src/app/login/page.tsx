"use client";
import Image from "next/image";
import Header from "../home/Header";
import { useRouter } from "next/navigation";
import styles from "../../styles/Login.module.css";
import { oneTimeTokenProps } from "../../../types";
import { phoneRegex, postLogin } from "../service/loginService";
import React, { useState, useCallback } from "react";
import CustomText from "../component/common/CustomText";
import BottomTabBar from "../component/common/BottomTabBar";

const Login: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validatePhone = useCallback((phoneNumber: string): boolean => {
    return /^\d{10,}$/.test(phoneNumber);
  }, []);

  const handleContinue = useCallback(async () => {
    try {
      if (!acceptedTerms) {
        window.alert("서비스 이용약관을 동의해주세요");
        return;
      }
      if (!phoneRegex.test(phone)) {
        window.alert("올바른 휴대폰 번호를 입력해주세요");
        return;
      }
      const token: oneTimeTokenProps = await postLogin(phone);
      const data = JSON.stringify({ phone, token: token.one_time_token });
      router.push(`/signUpCode?data=${encodeURIComponent(data)}`);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  }, [phone, router, acceptedTerms]);

  const isContinueDisabled = !validatePhone(phone) || !acceptedTerms;

  return (
    <div>
      <Header leftArrow={false} />
      <div className={styles.safeArea}>
        <div className={styles.container}>
          <CustomText className={styles.signupTitle}>로그인</CustomText>
          <CustomText className={styles.signupSubtitle}>
            로그인 하여 소설에 참여히세요!
          </CustomText>
          <div className={styles.phoneInputContainer}>
            <input
              className={styles.phoneInput}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="핸드폰 번호"
              maxLength={15}
              aria-label="핸드폰 번호 입력"
            />
          </div>
          <div className={styles.termsContainer}>
            <button
              type="button"
              onClick={() => setAcceptedTerms((prev) => !prev)}
              aria-label="Accept terms and conditions"
              className={styles.checkboxButton}
            >
              {acceptedTerms ? (
                <Image
                  src="/svg/Checked_CheckBox.svg"
                  alt="Checked Checkbox"
                  width={13}
                  height={13}
                />
              ) : (
                <Image
                  src="/svg/CheckBox.svg"
                  alt="Checkbox"
                  width={13}
                  height={13}
                />
              )}
            </button>
            <CustomText className={styles.termsText}>
              <span className={styles.linkText}>서비스 이용 약관</span>
              <span>&nbsp; 과 &nbsp;</span>
              <span className={styles.linkText}>개인정보 약관</span>
              <span>에 동의합니다.</span>
            </CustomText>
          </div>
          <div
            onClick={handleContinue}
            className={`${styles.continueButton} ${
              isContinueDisabled ? styles.buttonDisabled : ""
            }`}
            aria-label="Continue to complete profile"
          >
            <CustomText
              className={styles.continueButtonText}
              style={{ color: "#fff" }}
            >
              인증번호 발송
            </CustomText>
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Login;
