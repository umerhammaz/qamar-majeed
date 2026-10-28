import { quiz } from "../../data/quiz.data.js";
import { bus } from "../../core/events.js";

export default {
  mount(root) {
    const form = root.querySelector("#quiz-form");
    const submit = root.querySelector("#quiz-submit");
    const result = root.querySelector("#quiz-result");

    form.innerHTML = quiz
      .map((q, i) => `
        <fieldset class="f-quiz__q">
          <legend>${i + 1}. ${q.q}</legend>
          ${q.options
            .map((opt, j) => `
              <label>
                <input type="radio" name="q${i}" value="${j}" required />
                ${opt}
              </label>
            `)
            .join("")}
        </fieldset>
      `)
      .join("");

    submit.addEventListener("click", () => {
      let score = 0;
      quiz.forEach((q, i) => {
        const checked = form.querySelector(`input[name="q${i}"]:checked`);
        if (checked && Number(checked.value) === q.answer) score++;
      });
      const pct = Math.round((score / quiz.length) * 100);
      let msg;
      if (pct === 100) msg = "🏆 Legend! Qamar bhai khud proud hain.";
      else if (pct >= 60) msg = "😎 Solid bhai vibes.";
      else if (pct >= 20) msg = "🤔 Thoda aur padho Bhai Code.";
      else msg = "😂 Bhai, abhi toh shuruaat hai.";
      result.textContent = `Score: ${score}/${quiz.length} (${pct}%) — ${msg}`;
      if (pct >= 60) bus.emit("points:award", 5);
    });
  }
};