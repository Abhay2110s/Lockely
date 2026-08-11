import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 8,
  className = "",
}) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < Math.floor((iteration / maxIterations) * text.length)) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
      iteration += 1;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations]);

  return <span className={className}>{displayText}</span>;
}
