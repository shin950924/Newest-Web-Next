import React from "react";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface PopupDialogProps {
  onClose: () => void;
  onStart: () => void;
}

export function PopupDialog({ onClose, onStart }: PopupDialogProps) {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <Image
          src={"/images/banner.png"}
          width={300}
          height={300}
          alt="앱으로 이동하기"
        />
        <button style={styles.closeButton} onClick={onClose} aria-label="닫기">
          <XIcon size={20} style={styles.closeIcon} />
        </button>

        <div style={styles.contentSection}>
          <div style={styles.placeholders}>
            <span
              style={{ color: "#000", fontWeight: 700, textAlign: "center" }}
            >
              더 많은 기능이 앱에 숨어 있어요
            </span>
            <span
              style={{ color: "#000", fontWeight: 700, textAlign: "center" }}
            >
              추가 기능을 놓치지 마세요!
            </span>
          </div>
          <button
            style={styles.actionButton}
            onClick={() => {
              onStart();
            }}
          >
            앱으로 이동하기
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    animation: "fadeIn 0.3s ease-in-out",
  },
  container: {
    position: "relative",
    width: "90%",
    maxWidth: 300,
    height: 460,
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    fontFamily: "sans-serif",
  },
  topSection: {
    position: "relative",
    height: 128,
    backgroundColor: "#023020",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  closeIcon: {
    color: "#fff",
  },
  contentSection: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  placeholders: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  placeholderLarge: {
    height: 8,
    width: "75%",
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    animation: "pulse 1.5s infinite",
  },
  placeholderSmall: {
    height: 8,
    width: "50%",
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    animation: "pulse 1.5s infinite",
  },
  actionButton: {
    width: "100%",
    padding: "12px 0",
    backgroundColor: "black",
    color: "#fff",
    fontWeight: 500,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};
