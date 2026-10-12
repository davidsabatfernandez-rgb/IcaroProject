import { planFaqs } from "@/data/plans";

export function PlanFaq({ id = "plan-faq" }: { id?: string }) {
  return (
    <section className="plan-faq" aria-labelledby={`${id}-title`}>
      <div>
        <span className="micro">EL CONTACTO, CLARO DESDE EL PRINCIPIO</span>
        <h3 id={`${id}-title`}>Tus dudas. Nuestras condiciones.</h3>
        <p>
          La planificación se adapta a ti. Elige también cómo quieres hablar con
          tu entrenador.
        </p>
      </div>
      <div className="plan-faq-list">
        {planFaqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
