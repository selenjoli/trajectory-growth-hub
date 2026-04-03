import { useEffect } from "react";
import ContactForm from "./ContactForm";

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
  program?: string;
  page?: string;
}

const ContactFormModal = ({ open, onClose, program = "", page = "" }: ContactFormModalProps) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "20px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.08)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            color: "#555",
            lineHeight: 1,
          }}
        >
          ×
        </button>
        <ContactForm program={program} page={page} />
      </div>
    </div>
  );
};

export default ContactFormModal;
