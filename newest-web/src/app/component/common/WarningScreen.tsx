"use client";
import Warning from "@/assets/svg/Warning";
import XOrange from "@/assets/svg/XOrange";
import React, { useState, CSSProperties } from "react";

const WarningScreen: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Warning />
        <div style={styles.textContainer}>
          <p style={styles.text}>
            Newest는 뉴스 제작사가 아닌 중계업체이며
            <br />본 이미지는 기사 내용과 무관합니다.
          </p>
        </div>
      </div>
      <button
        onClick={() => setClosed(true)}
        aria-label="닫기"
        style={styles.closeButton}
      >
        <XOrange />
      </button>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFBEB",
    height: 70,
    padding: "0 16px",
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  textContainer: {
    width: 250,
    marginLeft: 12,
  },
  text: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: "20px",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
};

export default WarningScreen;
