import { useState } from "react";

const ContactForm = ({ program = "", page = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: program,
    city: "",
    centerName: "",
    comment: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, заполните имя и телефон");
      return;
    }
    if (!agreed) {
      alert("Пожалуйста, дайте согласие на обработку персональных данных");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("http://rostedu.ru/form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, page }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", program: "", city: "", centerName: "", comment: "" });
        setAgreed(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "40px",
      maxWidth: "560px",
      margin: "0 auto",
      boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    }}>
      <h3 style={{
        fontSize: "24px",
        fontWeight: "700",
        color: "#1a2340",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      }}>
        Оставить заявку
      </h3>
      <p style={{ color: "#666", fontSize: "15px", marginBottom: "28px" }}>
        Менеджер свяжется с вами в течение нескольких часов
      </p>

      {/* Имя */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя *"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1.5px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Телефон */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="tel"
          name="phone"
          placeholder="Телефон *"
          value={formData.phone}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1.5px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1.5px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Программа */}
      <div style={{ marginBottom: "16px" }}>
        <select
          name="program"
          value={formData.program}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1.5px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
            color: formData.program ? "#222" : "#999",
            background: "#fff",
            appearance: "none",
          }}
        >
          <option value="" disabled>Что вас интересует?</option>
          <option value="Тур в ОАЭ">Тур в ОАЭ</option>
          <option value="Путешествие в Китай">Путешествие в Китай</option>
          <option value="Лагерь на море">Лагерь на море</option>
          <option value="Лагерь на Алтае">Лагерь на Алтае</option>
          <option value="Онлайн-практика Hilderstone">Онлайн-практика Hilderstone</option>
          <option value="Курс повышения квалификации Hilderstone">Курс повышения квалификации Hilderstone</option>
          <option value="ProSkill Fest">ProSkill Fest</option>
          <option value="Партнёрство">Партнёрство</option>
          <option value="Другое">Другое</option>
        </select>
      </div>

      {/* Город и название центра — только для Партнёрства */}
      {formData.program === "Партнёрство" && (
        <>
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              name="city"
              placeholder="Ваш город"
              value={formData.city}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              name="centerName"
              placeholder="Название образовательного центра"
              value={formData.centerName}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>
        </>
      )}

      {/* Комментарий */}
      <div style={{ marginBottom: "20px" }}>
        <textarea
          name="comment"
          placeholder="Вопрос или комментарий"
          value={formData.comment}
          onChange={handleChange}
          rows={3}
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1.5px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
            resize: "vertical",
          }}
        />
      </div>

      {/* Галочка согласия */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "24px" }}>
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{ marginTop: "3px", width: "16px", height: "16px", cursor: "pointer", flexShrink: 0 }}
        />
        <label htmlFor="agree" style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", cursor: "pointer" }}>
          Я даю согласие на обработку персональных данных в соответствии с{" "}
          <a href="/privacy" style={{ color: "#22c55e", textDecoration: "underline" }}>
            Политикой обработки персональных данных
          </a>{" "}
          и{" "}
          <a href="/consent" style={{ color: "#22c55e", textDecoration: "underline" }}>
            Согласием на обработку персональных данных
          </a>
        </label>
      </div>

      {/* Кнопка */}
      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        style={{
          width: "100%",
          padding: "16px",
          background: status === "loading" ? "#999" : "#22c55e",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {status === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>

      {/* Статус */}
      {status === "success" && (
        <p style={{ marginTop: "16px", color: "#22c55e", textAlign: "center", fontWeight: "600" }}>
          Заявка отправлена! Мы свяжемся с вами в ближайшее время.
        </p>
      )}
      {status === "error" && (
        <p style={{ marginTop: "16px", color: "#e53e3e", textAlign: "center" }}>
          Что-то пошло не так. Попробуйте ещё раз или напишите нам на почту.
        </p>
      )}
    </div>
  );
};

export default ContactForm;
