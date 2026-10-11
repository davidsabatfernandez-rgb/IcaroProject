"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Arrow, SectionLabel } from "@/components/ui";
import { site } from "@/config/site";
import { disciplines, type Discipline } from "@/data/disciplines";
import "./disciplines.css";

function DisciplineVisual({ discipline }: { discipline: Discipline }) {
  if (discipline.visual === "terrain") {
    return (
      <div className="discipline-diagram discipline-terrain">
        <span className="micro">EL CONTEXTO DEL RECORRIDO</span>
        <svg viewBox="0 0 540 310" fill="none" aria-hidden="true">
          <path
            d="M35 235H505M35 160H505M35 85H505"
            className="discipline-gridline"
          />
          <path
            d="m35 235 64-29 48-87 55 53 57-104 48 62 50-15 48 71 49-33 51 82"
            className="discipline-terrain-path"
          />
          <path d="M35 267H505" className="discipline-gridline" />
          <circle cx="147" cy="119" r="5" className="discipline-point" />
          <circle cx="259" cy="68" r="5" className="discipline-point" />
          <circle cx="405" cy="186" r="5" className="discipline-point" />
          <path
            d="M147 119V267M259 68V267M405 186V267"
            className="discipline-terrain-guides"
          />
        </svg>
        <div className="discipline-diagram-terms">
          <span>DESNIVEL</span>
          <span>TERRENO</span>
          <span>DURACIÓN</span>
        </div>
        <p>Un mismo kilometraje puede plantear demandas distintas.</p>
        <small>Esquema conceptual · no representa una ruta real.</small>
      </div>
    );
  }

  if (discipline.visual === "strength") {
    return (
      <div className="discipline-diagram discipline-strength">
        <span className="micro">PREPARACIÓN CONJUNTA</span>
        <svg viewBox="0 0 540 310" fill="none" aria-hidden="true">
          <path d="M30 155H510M270 25V285" className="discipline-gridline" />
          <circle
            cx="211"
            cy="155"
            r="112"
            className="discipline-endurance-ring"
          />
          <circle
            cx="329"
            cy="155"
            r="112"
            className="discipline-strength-ring"
          />
          <path d="m260 145 10 10 20-20" className="discipline-terrain-path" />
        </svg>
        <div className="discipline-diagram-terms">
          <span>RESISTENCIA</span>
          <span>FUERZA</span>
        </div>
        <p>Dos capacidades. Una planificación que coordina su dosis.</p>
        <small>El equilibrio depende del objetivo y del atleta.</small>
      </div>
    );
  }

  return (
    <div
      className={`discipline-photography discipline-photography-${discipline.visual}`}
    >
      <div className="discipline-main-photo">
        <Image
          src={discipline.image!}
          alt={discipline.imageAlt!}
          fill
          sizes={
            discipline.visual === "swim"
              ? "(max-width: 540px) 240px, 300px"
              : "(max-width: 840px) 90vw, 43vw"
          }
        />
      </div>
      {discipline.visual === "triathlon" && (
        <div className="discipline-triathlon-inset">
          <div>
            <Image
              src={site.images.swimming}
              alt="Nadadora realizando crol; fotografía editorial"
              fill
              sizes="(max-width: 540px) 112px, 140px"
            />
            <span>NATACIÓN</span>
          </div>
          <div>
            <Image
              src={site.images.running}
              alt="Silueta de una persona en una playa; fotografía editorial"
              fill
              sizes="(max-width: 540px) 112px, 140px"
            />
            <span>CARRERA</span>
          </div>
        </div>
      )}
      {discipline.visual === "swim" && (
        <div className="discipline-swim-note">
          <span className="micro">GESTO · RITMO · RECUPERACIÓN</span>
          <p>La intención de cada serie cambia lo que buscamos en el agua.</p>
        </div>
      )}
      <span className="discipline-photo-credit">
        Fotografía editorial · no representa atletas de ICARO
      </span>
    </div>
  );
}

export function DisciplinesSection() {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  const discipline = disciplines[selected];

  function selectInterest() {
    window.dispatchEvent(
      new CustomEvent("icaro-interest", {
        detail: {
          interest: "coaching",
          sport: discipline.formSport,
          source: "disciplinas",
        },
      }),
    );
  }

  return (
    <section
      className="section disciplines-section"
      id="disciplinas"
      aria-labelledby="disciplines-title"
    >
      <div className="disciplines-heading">
        <div>
          <SectionLabel number="06">
            DISCIPLINES / EL PROPÓSITO CAMBIA. EL CRITERIO PERMANECE.
          </SectionLabel>
          <h2 id="disciplines-title" lang="en">
            ONE METHOD.
            <br />
            YOUR DISCIPLINE.
          </h2>
        </div>
        <p>
          Triatlón como especialidad. Resistencia como lenguaje común. La
          preparación se concreta en las demandas de tu deporte y en tu punto de
          partida.
        </p>
      </div>

      <div
        className="disciplines-selector"
        role="group"
        aria-label="Elige una disciplina"
      >
        {disciplines.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === index}
            aria-controls={panelId}
            onClick={() => setSelected(index)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="discipline-panel" id={panelId}>
        <DisciplineVisual discipline={discipline} />
        <div className="discipline-profile">
          <div aria-live="polite" aria-atomic="true">
            <span className="discipline-selected micro">
              0{selected + 1} / {discipline.label}
            </span>
            <h3>
              {discipline.statement.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
            <p className="discipline-introduction">{discipline.introduction}</p>
          </div>
          <dl className="discipline-criteria">
            {discipline.criteria.map((criterion) => (
              <div key={criterion.label}>
                <dt>{criterion.label}</dt>
                <dd>{criterion.text}</dd>
              </div>
            ))}
          </dl>
          <a
            className="text-link discipline-contact"
            href="#contacto"
            onClick={selectInterest}
          >
            {discipline.action}
            <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}
