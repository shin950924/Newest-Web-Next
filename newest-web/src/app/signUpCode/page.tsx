"use client";
import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { postLogin } from "../service/loginService";
import styles from "../../styles/SignUpCode.module.css";
import CustomText from "../component/common/CustomText";
import VerificationCodeInput from "./VerificationCodeInput";
import { useRouter, useSearchParams } from "next/navigation";

const LoadingFallback = () => (
  <div className={styles.safeArea}>
    <CustomText className={styles.signupTitle}>로딩 중...</CustomText>
  </div>
);

function SignUpCodeContent() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const data = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;

  if (!data) {
    router.push("/login");
    return null;
  }

  const resendCode = async () => {
    await postLogin(data.phone);
    window.alert("인증번호가 재발송 되었습니다.");
  };

  const handleContinue = async (code: string) => {
    try {
      setLoading(true);

      const authResult = await signIn("credentials", {
        redirect: false,
        verification_code: code,
        phone_number: data.phone,
        one_time_token: data.token,
      });

      if (authResult?.error) {
        console.warn("NextAuth 로그인 실패:", authResult.error);
        setLoading(false);
        return;
      }

      router.push("/home");
    } catch (nextAuthError) {
      console.warn("NextAuth 오류:", nextAuthError);
    } finally {
      setLoading(false);
    }
  };

  const handleContinuePress = () => {
    handleContinue(code);
    setIsComplete(true);
  };

  return (
    <div className={styles.safeArea}>
      <CustomText className={styles.signupTitle}>인증번호 입력</CustomText>
      <CustomText className={styles.signupSubtitle}>
        인증번호가 곧 도착할 예정이에요!
      </CustomText>
      <VerificationCodeInput
        onComplete={(enteredCode: string) => {
          setCode(enteredCode);
          setIsComplete(true);
        }}
        resendCode={resendCode}
      />
      <div
        onClick={handleContinuePress}
        className={
          isComplete ? styles.continueButton : styles.continueButtonDisable
        }
        aria-label="Continue to complete profile"
      >
        <CustomText
          className={styles.continueButtonText}
          style={{ color: "#fff" }}
        >
          {loading ? "로딩중..." : "인증받기"}
        </CustomText>
      </div>
    </div>
  );
}

export default function SignUpCode() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignUpCodeContent />
    </Suspense>
  );
}
